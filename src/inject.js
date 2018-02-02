import IdGenerator from './util/IdGenerator';
import {EncryptedStream} from 'extension-streams';
// import Scatterdapp from 'scatterdapp';
import Eos from 'eosjs';
import * as PairingTags from './messages/PairingTags'
import Identity from './models/Identity'
import * as NetworkMessageTypes from './messages/NetworkMessageTypes'
import Scatterdapp from './scatterdapp'

/***
 * This is the javascript which gets injected into
 * the application and facilitates communication between
 * Scatter and the web application.
 */
class Inject {

    constructor(){
        // TODO: Should scatter be handling eosjs injection?
        // Perhaps it should be up to the website to host eosjs so that it isn't bound to the window's scope.
        // Or perhaps it should be up to Scatter to inject it because of version issues.
        // ------------------------------------------------
        // I'm leaning towards having the application host it itself.
        // There might be memory overhead by injecting eosjs into every single page.
        // ------------------------------------------------
        window.Eos = Eos;
        // ------------------------------------------------


        // Injecting an encrypted stream into the
        // web application.
        const stream = new EncryptedStream(PairingTags.INJECTED, IdGenerator.text(64));

        // Waiting for scatter to push itself onto the application
        stream.listenWith(msg => {
            if(msg && msg.hasOwnProperty('type') && msg.type === NetworkMessageTypes.PUSH_SCATTER)
                window.scatter = new Scatterdapp(stream);
        });

        // Syncing the streams between the
        // extension and the web application
        stream.sync(PairingTags.SCATTER, stream.key);
    }

}

new Inject();




