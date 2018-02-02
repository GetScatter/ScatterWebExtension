import {EncryptedStream} from 'extension-streams';
import IdGenerator from './util/IdGenerator';
import * as PairingTags from './messages/PairingTags'
import NetworkMessage from './messages/NetworkMessage';
import * as NetworkMessageTypes from './messages/NetworkMessageTypes'
import InternalMessage from './messages/InternalMessage';
import * as InternalMessageTypes from './messages/InternalMessageTypes'

import Identity from './models/Identity'
import Scatterdapp from './scatterdapp'

// The stream that connects between the content script
// and the website
let stream = new WeakMap();

// The filename of the injected communication script.
let INJECTION_SCRIPT_FILENAME = 'inject.js';

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
            // Pushing an instance of Scatterdapp to the web application
            const pushScatter = NetworkMessage.signal(NetworkMessageTypes.PUSH_SCATTER);
            stream.send(pushScatter, PairingTags.INJECTED);

            // Dispatching the loaded event to the web application.
            document.dispatchEvent(new CustomEvent("scatterLoaded"));
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
        console.log('content script msg', msg)
        if(!stream.synced && (!msg.hasOwnProperty('type') || msg.type !== 'sync')) { stream.send({type:'error'}, "mal-warn"); return; }
        let nonSyncMessage = NetworkMessage.fromJson(msg);

        switch(msg.type){
            case 'sync': this.sync(msg); break;
            case NetworkMessageTypes.GET_OR_REQUEST_IDENTITY:           this.getOrRequestIdentity(nonSyncMessage); break;
            case NetworkMessageTypes.REQUEST_SIGNATURE:                 this.requestSignature(nonSyncMessage); break;

            default: this.rejectWithError(nonSyncMessage.error('No such message can be parsed'))
        }
    }

    respond(message, payload){
        stream.send(message.respond(payload), PairingTags.INJECTED);
    }

    rejectWithError(err, reject = null){
        stream.send(err, PairingTags.INJECTED); if(reject) reject(err);
    }

    sync(message){
        stream.key = message.handshake.length ? message.handshake : null;
        stream.send({type:'sync'}, PairingTags.INJECTED);
        stream.synced = true;
    }

    getOrRequestIdentity(message){
        console.log("Getting ID")
        InternalMessage.payload(InternalMessageTypes.GET_OR_REQUEST_IDENTITY, message.payload)
            .send().then(res => this.respond(message, res))
            .catch(e => this.rejectWithError(message.error('Could not get an identity')))
    }

    requestSignature(message){
        InternalMessage.payload(InternalMessageTypes.REQUEST_SIGNATURE, message.payload)
            .send().then(res => this.respond(message, res))
            .catch(e => this.rejectWithError(message.error('User refused to sign transaction')))
    }

}

new Content();
