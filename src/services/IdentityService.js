import Identity from '../models/Identity'
import Prompt from '../models/prompts/Prompt';
import * as PromptTypes from '../models/prompts/PromptTypes'
import NotificationService from '../services/NotificationService'

export default class IdentityService {

    /***
     * Checks if an identity exists, and if not it registers it.
     * @param name
     * @param scatter
     * @returns {Promise}
     */
    static existsOrRegister(name, scatter){
        return new Promise((resolve, reject) => {
            IdentityService.nameExists(name).then(exists => {
                if(exists) resolve();
                else IdentityService.register(name, scatter).then(res => resolve());
            });
        })
    }

    //TODO Mock
    static register(name, scatter){
        return new Promise((resolve, reject) => {
            // Register name with scatter.keychain.id
            // We might need to do this with keypairs so that they can be provably owned
            resolve(true)
        })
    }

    //TODO Mock
    static nameExists(name, scatter){
        return new Promise((resolve, reject) => {
            // Check if exists within another scatter
            resolve(false);
        })
    }

    static getOrRequestIdentity(domain, network, fields, scatter, callback){

        // Possibly getting an Identity that has been synced with this application.
        const identityFromPermission = scatter.keychain.permissions.find(perm => perm.isIdentityFor(domain, network));
        let identity = identityFromPermission ? identityFromPermission.identity(scatter.keychain) : null;

        console.log('identity', identity)

        const sendBackIdentity = id => {
            if(!id){
                callback(null);
                return false;
            }
            id.encryptHash();
            callback(id.asOnlyRequiredFields(fields));
        };

        if(identity){
            // Even though there is a previous permission,
            // the identity might have changed and no longer
            // meets the requirements.
            if(identity.hasRequiredFields(fields)){
                sendBackIdentity(identity);
                return false;
            } else {
                // TODO: Remove permission
            }
        }
        else {
            const prompt = new Prompt(PromptTypes.REQUEST_IDENTITY, domain, network, fields, sendBackIdentity);
            NotificationService.open(prompt);
        }
    }
}