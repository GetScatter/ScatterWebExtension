import Identity from '../models/Identity'

export default class IdentityService {

    //TODO Mock
    static nameExists(name){
        return new Promise((resolve, reject) => {
            resolve(false);
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
}