import {LocalStream} from 'extension-streams';
import AES from 'aes-oop';
import * as InternalMessageTypes from './messages/InternalMessageTypes';
import InternalMessage from './messages/InternalMessage';
import StorageService from './services/StorageService'
import Scatter from './models/Scatter'
import Network from './models/Network'
import Identity from './models/Identity'
import {LocationFields} from './models/Identity'
import IdentityService from './services/IdentityService'
import NotificationService from './services/NotificationService'
import HistoricEvent from './models/histories/HistoricEvent'
import * as HistoricEventTypes from './models/histories/HistoricEventTypes'
import Prompt from './models/prompts/Prompt';
import * as PromptTypes from './models/prompts/PromptTypes'
import ObjectHelpers from './util/ObjectHelpers'
import Permission from './models/Permission'
import TimingHelpers from './util/TimingHelpers';
import Error from './models/errors/Error'
import ContractHelpers from './util/ContractHelpers'
const ecc = require('eosjs-ecc');

// Gets bound when a user logs into scatter
// and unbound when they log out
// Is not on the Background's scope to keep it private
let seed = '';
// let seed = '2d965eadab5c85a522ab146c4fe6871b2bf6e6ad028479dca622783bed78d7e5493a84396a339e972f916e93ab1fb5fd511e43c90007ff252eaf536973d6c48e';

let inactivityInterval = 0;
let timeoutLocker = null;

// This is the script that runs in the extension's background ( singleton )
export default class Background {

    constructor(){
        this.setupInternalMessaging();
    }



    /********************************************/
    /*               VueInitializer             */
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
        console.log(message);
        Background.checkAutoLock();
        switch(message.type){
            case InternalMessageTypes.SET_SEED:                 Background.setSeed(sendResponse, message.payload); break;
            case InternalMessageTypes.SET_TIMEOUT:              Background.setTimeout(sendResponse, message.payload); break;
            case InternalMessageTypes.IS_UNLOCKED:              Background.isUnlocked(sendResponse); break;
            case InternalMessageTypes.LOAD:                     Background.load(sendResponse); break;
            case InternalMessageTypes.UPDATE:                   Background.update(sendResponse, message.payload); break;
            case InternalMessageTypes.PUB_TO_PRIV:              Background.publicToPrivate(sendResponse, message.payload); break;
            case InternalMessageTypes.DESTROY:                  Background.destroy(sendResponse); break;
            case InternalMessageTypes.GET_OR_REQUEST_IDENTITY:  Background.getOrRequestIdentity(sendResponse, message.payload); break;
            case InternalMessageTypes.REQUEST_SIGNATURE:        Background.requestSignature(sendResponse, message.payload); break;
            case InternalMessageTypes.REQUEST_ADD_NETWORK:      Background.requestAddNetwork(sendResponse, message.payload); break;
            case InternalMessageTypes.REQUEST_GET_VERSION:      Background.requestGetVersion(sendResponse); break;
            case InternalMessageTypes.REQUEST_VERSION_UPDATE:   Background.requestVersionUpdate(sendResponse, message.payload); break;
        }
    }

    // Lock the user due to inactivity
    static checkAutoLock() {
        if (timeoutLocker) clearTimeout(timeoutLocker);
        if (seed) timeoutLocker = setTimeout(() => seed = '', inactivityInterval);
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
                seed = '';
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

            // sync the timeout inactivity interval
            inactivityInterval = scatter.settings.inactivityInterval;

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

    /***
     * Sets the timeout interval on scope to determine the lockout time
     * @param sendResponse - Delegating response handler
     * @param _timeoutMinutes - The timeout minutes to set
     */
    static setTimeout(sendResponse, _timeoutMinutes){
        this.load(scatter => {
            inactivityInterval = TimingHelpers.minutes(_timeoutMinutes);
            scatter.settings.inactivityInterval = inactivityInterval;
            this.update(() => {}, scatter);
        });

        sendResponse(true);
    }













    /********************************************/
    /*              Web Application             */
    /********************************************/

    /***
     * Prompts a request for Identity provision
     * @param sendResponse
     * @param payload
     */
    static getOrRequestIdentity(sendResponse, payload){
        this.lockGuard(sendResponse, () => {
            Background.load(scatter => {
                console.log(payload)
                const {domain, fields} = payload;
                const network = Network.fromJson(payload.network);

                IdentityService.getOrRequestIdentity(domain, network, fields, scatter, (identity, fromPermission) => {
                    if(!identity){
                        sendResponse(Error.signatureError("identity_rejected", "User rejected the provision of an Identity"));
                        return false;
                    }

                    if(!fromPermission) {
                        this.addHistory(HistoricEventTypes.PROVIDED_IDENTITY, {
                            domain,
                            network,
                            provided:!!identity,
                            identityName:identity ? identity.name : false,
                            identityHash:(identity) ? identity.hash : false
                        });

                        this.addPermissions([Permission.fromJson({
                            domain,
                            network,
                            identityHash:identity.hash,
                            timestamp:+ new Date()
                        })])
                    }

                    sendResponse(identity);
                });
            });
        })
    }

    /***
     * Prompts a request for a transaction signature
     * @param sendResponse
     * @param payload
     */
    static requestSignature(sendResponse, payload){
        this.lockGuard(sendResponse, () => {
            Background.load(scatter => {

                //TODO: This is too much code here, it should be put into a separate file with
                //TODO: a clear intent and single concern.

                // Checking if identity still exists
                const identity = scatter.keychain.findIdentity(payload.identityHash);
                if(!identity){
                    sendResponse(Error.signatureError("identity_missing", "Identity no longer exists on the user's keychain"));
                    return false;
                }

                // Checking if the identity is on the same network
                if(identity.network.unique() !== Network.fromJson(payload.network).unique()){
                    sendResponse(Error.signatureError("wrong_network", "Identity is not on the same network"));
                    return false;
                }

                // Checking if Identity still has all the necessary accounts
                const requiredAccounts = ObjectHelpers.flatten(
                    payload.transaction.messages
                        .map(message => message.authorization
                            .map(auth => `${auth.account}@${auth.permission}`)));

                const identityAccountAuth = `${identity.account.name}@${identity.account.authority}`;

                if(!requiredAccounts.some(accountAuth => accountAuth === identityAccountAuth)) {
                    sendResponse(Error.signatureError("account_missing", "Missing required accounts"));
                    return false;
                }


                const sign = (returnedFields) => {


                    // Pre loading the buffer so that it doesn't waste time before the key is released.
                    const buf = Buffer.from(payload.buf.data, 'utf8');

                    this.publicToPrivate(privateKey => {
                        if(!privateKey){
                            sendResponse(Error.maliciousEvent());
                            return false;
                        }

                        // Signing the transaction
                        let signed = ecc.sign(buf, privateKey);

                        // Overwriting memory pointer
                        privateKey = 'RELEASED';

                        // Adding historic event
                        this.addHistory(HistoricEventTypes.SIGNED_TRANSACTION, {
                            domain:payload.domain,
                            network:payload.network,
                            identityName:identity.name,
                            identityHash:identity.hash,
                            account:identity.account,
                            transaction:payload.transaction,
                            hash:'' // <-- hmmm, what to do with this? There is no insecureHash here to track yet. :(
                        });

                        sendResponse({
                            signatures:[signed],
                            returnedFields:returnedFields
                        });
                    }, identity.account.publicKey);
                };

                const needsLocationAndIdentityHasMultiple = identity.locations.length > 1 &&
                    payload.requiredFields.some(field => Object.keys(LocationFields).includes(field));

                const hasTransactionPermissions = payload.transaction.messages.every(message => {
                    const checksum = ContractHelpers.messageChecksum(message, identity.account.name, payload.domain, payload.network, payload.requiredFields);
                    return scatter.keychain.hasContractPermission(checksum)
                });

                if(!needsLocationAndIdentityHasMultiple && hasTransactionPermissions) {
                    const identityClone = identity.clone();
                    const returnedFields = Identity.asReturnedFields(payload.requiredFields, identityClone, identityClone.locations[0]);
                    sign(returnedFields);
                }
                else NotificationService.open(new Prompt(PromptTypes.REQUEST_SIGNATURE, payload.domain, payload.network, payload, approval => {
                    if(!approval || !approval.hasOwnProperty('accepted')){
                        sendResponse(Error.signatureError("signature_rejected", "User rejected the signature request"));
                        return false;
                    }

                    if(approval.whitelisted){
                        this.addPermissions(payload.transaction.messages.map(message => {
                            const checksum = ContractHelpers.messageChecksum(message, identity.account.name, payload.domain, payload.network, payload.requiredFields);
                            return Permission.fromJson({
                                domain:payload.domain,
                                network:payload.network,
                                identityHash:identity.encryptHash(true),
                                contract:message.code,
                                action:message.type,
                                checksum,
                                timestamp:+ new Date()
                            });
                        }));
                    }

                    sign(approval.returnedFields);
                }));

            })
        })
    }

    /***
     *
     * @param sendResponse
     * @param payload
     */
    static requestAddNetwork(sendResponse, payload){
        this.lockGuard(sendResponse, () => {
            Background.load(scatter => {

                const network = Network.fromJson(payload.network);

                // Already has network, returning true
                if(scatter.settings.networks.find(_network => _network.unique() === network.unique())) sendResponse(true);

                // Prompting for network addition
                else NotificationService.open(new Prompt(PromptTypes.REQUEST_ADD_NETWORK, payload.domain, payload.network, network, approved => {
                    if(approved === false || approved.hasOwnProperty('isError')) sendResponse(approved);
                    else {
                        scatter.settings.networks.unshift(network);
                        this.update(() => sendResponse(approved), scatter);
                    }
                }));

            })
        })
    }

    /***
     * Gets the current version of the app from the manifest.json
     * @param sendResponse
     */
    static requestGetVersion(sendResponse){
        sendResponse(chrome.app.getDetails().version)
    }

    /***
     * Notifies the user that the application they are using is
     * requiring a newer version of Scatter than they have installed
     * @param sendResponse
     * @param payload
     */
    static requestVersionUpdate(sendResponse, payload){
        const network = Network.fromJson({host:'', port:0});
        NotificationService.open(new Prompt(PromptTypes.UPDATE_VERSION, payload.domain, network, network, () => {}))
    }





    /********************************************/
    /*                 Helpers                  */
    /********************************************/

    /***
     * Returns a an error if Scatter is locked,
     * or passes through the callback if Scatter is open
     * @param sendResponse - Delegating response handler
     * @param cb - Callback to perform if open
     */
    static lockGuard(sendResponse, cb){
        if(!seed.length) {
            NotificationService.open(Prompt.scatterIsLocked());
            sendResponse(Error.locked());
        }
        else cb();
    }



    // TODO: ---------------------------------------
    // TODO: There's a possibility of race conditions here.
    // TODO: Perhaps the keychain should be stored in multiple stores
    // TODO: and only merged when retrieving.
    // TODO: ---------------------------------------

    /***
     * Adds a historic event to the keychain
     * @param type
     * @param data
     */
    static addHistory(type, data){
        this.load(scatter => {
            scatter.histories.unshift(new HistoricEvent(type, data));
            this.update(() => {}, scatter);
        })
    }

    /***
     * Adds a permission to the keychain
     * @param permissions
     */
    static addPermissions(permissions){
        this.load(scatter => {
            permissions
                .filter(permission => permission.isIdentityOnly() || !scatter.keychain.hasContractPermission(permission.checksum))
                .map(permission => scatter.keychain.permissions.unshift(permission));
            this.update(() => {}, scatter);
        })
    }

}

const background = new Background();
