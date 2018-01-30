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
}