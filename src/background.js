import {LocalStream} from 'extension-streams';
import AES from 'aes-oop';
import * as InternalMessageTypes from './messages/InternalMessageTypes';
import InternalMessage from './messages/InternalMessage';
import StorageService from './services/StorageService'
import Scatter from './models/Scatter'
import Network from './models/Network'
import Identity from './models/Identity'
import IdentityService from './services/IdentityService'
import NotificationService from './services/NotificationService'
import HistoricEvent from './models/histories/HistoricEvent'
import * as HistoricEventTypes from './models/histories/HistoricEventTypes'
import Prompt from './models/prompts/Prompt';
import * as PromptTypes from './models/prompts/PromptTypes'
const ecc = require('eosjs-ecc');

// Gets bound when a user logs into scatter
// and unbound when they log out
// Is not on the Background's scope to keep it private
let seed = '';


// This is the script that runs in the extension's background ( singleton )
export default class Background {

    constructor(){
        this.setupInternalMessaging();
    }



    /********************************************/
    /*                   VueInitializer                  */
    /********************************************/

    // Watches the internal messaging system ( LocalStream )
    setupInternalMessaging(){
        LocalStream.watch((request, sendResponse) => {
            const message = InternalMessage.fromJson(request);
            this.dispenseMessage(sendResponse, message);
        })
    }

    /***
     * Delegates message processing to methods by message type
     * @param sendResponse - Delegating response handler
     * @param message - The message to be dispensed
     */
    dispenseMessage(sendResponse, message){
        switch(message.type){
            case InternalMessageTypes.SET_SEED:                 Background.setSeed(sendResponse, message.payload); break;
            case InternalMessageTypes.IS_UNLOCKED:              Background.isUnlocked(sendResponse); break;
            case InternalMessageTypes.LOAD:                     Background.load(sendResponse); break;
            case InternalMessageTypes.UPDATE:                   Background.update(sendResponse, message.payload); break;
            case InternalMessageTypes.PUB_TO_PRIV:              Background.publicToPrivate(sendResponse, message.payload); break;
            case InternalMessageTypes.DESTROY:                  Background.destroy(sendResponse); break;
            case InternalMessageTypes.REQUEST_UNLOCK:           Background.requestUnlock(sendResponse); break;
            case InternalMessageTypes.GET_OR_REQUEST_IDENTITY:  Background.getOrRequestIdentity(sendResponse, message.payload); break;
            case InternalMessageTypes.REQUEST_SIGNATURE:        Background.requestSignature(sendResponse, message.payload); break;
        }
    }





    /********************************************/
    /*                 Handlers                 */
    /********************************************/

    /***
     * Sets the seed on scope to use from decryption
     * @param sendResponse - Delegating response handler
     * @param _seed - The seed to set
     */
    static setSeed(sendResponse, _seed){
        seed = _seed;
        sendResponse(true);
    }

    /***
     * Checks whether Scatter is locked
     * @param sendResponse - Delegating response handler
     * @returns {boolean}
     */
    static isUnlocked(sendResponse){
        // Even if a seed is set, that doesn't mean that the seed is correct.
        if(seed.length) StorageService.get().then(scatter => {
            try {
                scatter.decrypt(seed);
                sendResponse(typeof scatter.keychain === 'object')
            } catch(e) {
                sendResponse(false);
            }
        });
        // If no seed is set, Scatter is definitely locked
        else sendResponse(false);
    }

    /***
     * Returns the saved instance of Scatter from the storage
     * @param sendResponse - Delegating response handler
     * @returns {Scatter}
     */
    static load(sendResponse){
        StorageService.get().then(scatter => {
            if(seed.length) scatter.decrypt(seed);
            sendResponse(scatter)
        })
    }

    /***
     * Updates the Scatter instance inside persistent storage
     * @param sendResponse - Delegating response handler
     * @param scatter - The updated cleartext Scatter instance
     * @returns {boolean}
     */
    static update(sendResponse, scatter){
        this.lockGuard(sendResponse, () => {
            scatter = Scatter.fromJson(scatter);

            // Private Keys are always separately encrypted
            scatter.keychain.keypairs.map(keypair => keypair.encrypt(seed));

            // Keychain is always stored encrypted.
            scatter.encrypt(seed);

            StorageService.save(scatter).then(saved => {
                scatter.decrypt(seed);
                sendResponse(scatter)
            })
        })
    }

    /***
     * Retrieves a Private Key from a Public Key
     * @param sendResponse - Delegating response handler
     * @param publicKey - The Public Key to search for
     * @returns {privateKey:string | null}
     */
    static publicToPrivate(sendResponse, publicKey){
        this.lockGuard(sendResponse, () => {
            StorageService.get().then(scatter => {
                scatter.decrypt(seed);
                const keypair = scatter.keychain.keypairs.find(x => x.publicKey === publicKey);
                sendResponse((keypair) ? AES.decrypt(keypair.privateKey, seed) : null);
            })
        })
    }

    /***
     * Destroys this instance of Scatter
     * @param sendResponse
     */
    static destroy(sendResponse){
        // TODO: Mock
        this.lockGuard(sendResponse, () => {
            console.log("Destroying");
            seed = '';
            chrome.storage.local.clear();
            sendResponse(true);
        })
    }













    /********************************************/
    /*              Web Application             */
    /********************************************/

    /***
     * Returns true if unlock or requests that the user unlock Scatter
     * @param sendResponse
     * @param payload
     */
    static requestUnlock(sendResponse, payload){
        if(seed.length) sendResponse(true)
        else {
            // TODO: Prompt user to unlock Scatter
            sendResponse(false);
        }
    }

    /***
     * Destroys this instance of Scatter
     * @param sendResponse
     * @param payload
     */
    static getOrRequestIdentity(sendResponse, payload){
        this.lockGuard(sendResponse, () => {
            Background.load(scatter => {
                const domain = payload.domain,
                      network = Network.fromJson(payload.network),
                      fields = payload.fields;

                IdentityService.getOrRequestIdentity(domain, network, fields, scatter, identity => {
                    if(identity) this.addHistory(HistoricEventTypes.PROVIDED_IDENTITY, {
                        domain,
                        network,
                        provided:!!identity,
                        identityName:identity ? identity.name : false,
                        identityHash:(identity) ? identity.hash : false
                    });
                    sendResponse(identity)
                });
            });
        })
    }

    /***
     * Destroys this instance of Scatter
     * @param sendResponse
     * @param payload
     */
    static requestSignature(sendResponse, payload){
        this.lockGuard(sendResponse, () => {
            Background.load(scatter => {
                console.log('payload', payload);
                // TODO: Mock

                // TODO: Check in whitelist for permissions

                // TODO: Prompt user for signature authorization
                NotificationService.open(new Prompt(PromptTypes.REQUEST_SIGNATURE, payload.domain, payload.network, payload, approval => {

                }));

                // let signed = ecc.sign(new Buffer(payload.buf.data), privateKey);
                // sendResponse(signed);

                // TODO: Mock for testing only
                const identity = scatter.keychain.identities[0];
                identity.encryptHash();
                const signed = true;
                if(signed) this.addHistory(HistoricEventTypes.SIGNED_TRANSACTION, {
                    domain:payload.domain,
                    network:payload.network,
                    identityName:identity.name,
                    identityHash:identity.hash,
                    account:identity.account,
                    transaction:payload.transaction,
                    hash:''
                });

                sendResponse(null);
            })
        })
    }





    /********************************************/
    /*                 Helpers                  */
    /********************************************/

    /***
     * Returns a null response if Scatter is locked,
     * or passes through the callback if Scatter is open
     * @param sendResponse - Delegating response handler
     * @param cb - Callback to perform if open
     */
    static lockGuard(sendResponse, cb){
        // TODO: Change failure to a more explanatory message
        if(!seed.length) sendResponse(null);
        else cb();
    }

    /***
     * Adds a historic event to the keychain
     * @param historicEvent
     */
    static addHistory(type, data){
        this.load(scatter => {
            scatter.histories.unshift(new HistoricEvent(type, data));
            this.update(() => {}, scatter);
        })
    }

}

const background = new Background();