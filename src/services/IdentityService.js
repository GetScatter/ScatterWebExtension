import Identity from '../models/Identity'

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
        // Requested identities must always have an account
        fields = fields.concat(['account']);

        // Possibly getting an Identity that has been synced with this application.
        const identityFromPermission = scatter.keychain.permissions.find(perm => perm.isIdentityFor(domain, network));
        let identity = identityFromPermission ? identityFromPermission.identity(scatter.keychain.identities) : null;

        // TODO: Mock | For testing only ----------------------------
        identity = scatter.keychain.identities[0];
        console.log(identity);
        // identity = Identity.placeholder();
        // identity.name = 'TestIdentity';
        // identity.account = scatter.keychain.identities[0].account;
        // identity.personal.firstname = 'Bob';
        // identity.location.country = {code:'US', name:'United States'};
        // TODO: ----------------------------------------------------

        const sendBackIdentity = id => {
            id.encryptHash();
            callback(id.asOnlyRequiredFields(fields));
        };

        if(identity){
            // Even though there is a previous permission,
            // the identity might have changed and no longer
            // meets the requirements.
            if(!identity.hasRequiredFields(fields)){
                //TODO: Add popup to allow a user to fix the issue.
                callback(null);
                return false;
            }

            sendBackIdentity(identity);
        }
        else {
            const usableIdentities = scatter.keychain.identities.filter(id => id.hasRequiredFields(fields));
            if(!usableIdentities.length) {
                //TODO: Popup error that you have no usable identities.
            }
            else {
                // TODO: Prompt for an identity from the usableIdentities
            }

            sendBackIdentity(null);
        }
    }
}