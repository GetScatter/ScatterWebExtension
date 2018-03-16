import {EncryptedStream} from 'extension-streams';
import IdGenerator from './util/IdGenerator';
import * as PairingTags from './messages/PairingTags'
import NetworkMessage from './messages/NetworkMessage';
import * as NetworkMessageTypes from './messages/NetworkMessageTypes'
import InternalMessage from './messages/InternalMessage';
import * as InternalMessageTypes from './messages/InternalMessageTypes'
import Error from './models/errors/Error'

import Identity from './models/Identity'
import Scatterdapp from './scatterdapp'

// The stream that connects between the content script
// and the website
let stream = new WeakMap();

// The filename of the injected communication script.
let INJECTION_SCRIPT_FILENAME = 'inject.js';

let isReady = false;

/***
 * The content script is what gets run on the application.
 * It also injects and instance of Scatterdapp
 */
class Content {

    constructor(){
        this.setupEncryptedStream();
        this.injectInteractionScript();
    }


    setupEncryptedStream(){
        // Setting up a new encrypted stream for
        // interaction between the extension and the application
        stream = new EncryptedStream(PairingTags.SCATTER, IdGenerator.text(64));
        stream.listenWith((msg) => this.contentListener(msg));

        // Binding Scatter to the application once the
        // encrypted streams are synced.
        stream.onSync(() => {
            this.getVersion().then(version => {
                // Pushing an instance of Scatterdapp to the web application
                stream.send(NetworkMessage.payload(NetworkMessageTypes.PUSH_SCATTER, {version}), PairingTags.INJECTED);

                // Dispatching the loaded event to the web application.
                isReady = true;

                document.dispatchEvent(new CustomEvent("scatterLoaded"));
            });
        })
    }

    /***
     * Injecting the interaction script into the application.
     * This injects an encrypted stream into the application which will
     * sync up with the one here.
     */
    injectInteractionScript(){
        let script = document.createElement('script');
        script.src = chrome.extension.getURL(INJECTION_SCRIPT_FILENAME);
        (document.head||document.documentElement).appendChild(script);
        script.onload = () => script.remove();
    }

    contentListener(msg){
        console.log('content listener',msg);
        if(!isReady) return;
        if(!msg) return;
        if(!stream.synced && (!msg.hasOwnProperty('type') || msg.type !== 'sync')) {
            stream.send(nonSyncMessage.error(Error.maliciousEvent()), PairingTags.INJECTED);
            return;
        }

        let nonSyncMessage = NetworkMessage.fromJson(msg);

        switch(msg.type){
            case 'sync': this.sync(msg); break;
            case NetworkMessageTypes.GET_OR_REQUEST_IDENTITY:           this.getOrRequestIdentity(nonSyncMessage); break;
            case NetworkMessageTypes.REQUEST_SIGNATURE:                 this.requestSignature(nonSyncMessage); break;
            case NetworkMessageTypes.REQUEST_ADD_NETWORK:               this.requestAddNetwork(nonSyncMessage); break;
            case NetworkMessageTypes.REQUEST_VERSION_UPDATE:            this.requestVersionUpdate(nonSyncMessage); break;
            default:                                                    stream.send(nonSyncMessage.error(Error.maliciousEvent()), PairingTags.INJECTED)
        }
    }

    respond(message, payload){
        if(!isReady) return;
        const response = (!payload || payload.hasOwnProperty('isError'))
            ? message.error(payload)
            : message.respond(payload);
        stream.send(response, PairingTags.INJECTED);
    }

    sync(message){
        stream.key = message.handshake.length ? message.handshake : null;
        stream.send({type:'sync'}, PairingTags.INJECTED);
        stream.synced = true;
    }

    getOrRequestIdentity(message){
        if(!isReady) return;
        InternalMessage.payload(InternalMessageTypes.GET_OR_REQUEST_IDENTITY, message.payload)
            .send().then(res => this.respond(message, res))
    }

    requestSignature(message){
        if(!isReady) return;
        InternalMessage.payload(InternalMessageTypes.REQUEST_SIGNATURE, message.payload)
            .send().then(res => this.respond(message, res))
    }

    requestAddNetwork(message){
        if(!isReady) return;
        InternalMessage.payload(InternalMessageTypes.REQUEST_ADD_NETWORK, message.payload)
            .send().then(res => this.respond(message, res))
    }

    requestVersionUpdate(message){
        if(!isReady) return;
        InternalMessage.payload(InternalMessageTypes.REQUEST_VERSION_UPDATE, message.payload)
            .send().then(res => this.respond(message, res))
    }

    getVersion(){
        return InternalMessage.signal(InternalMessageTypes.REQUEST_GET_VERSION)
            .send()
    }

}

new Content();
