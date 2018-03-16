const ecc = require('eosjs-ecc');
const scrypt = require('scrypt-async');

export default class Hasher {

    /***
     * Hashes a cleartext using the SHA-256 algorithm.
     * This is INSECURE and should only be used for fingerprinting.
     * @param cleartext
     */
    static insecureHash(cleartext) {
        return ecc.sha256(cleartext);
    }

    /***
     * Hashes a cleartext using scrypt.
     * @param cleartext
     */
    static async secureHash(cleartext) {
        return new Promise((resolve, reject) => {
            //TODO: Need to provide salt
            scrypt(cleartext, 'SALT_ME', {
                N: 16384,
                r: 8,
                p: 1,
                dkLen: 16,
                encoding: 'hex'
            }, (derivedKey) => {
                resolve(derivedKey);
            })
        });
    }

    /***
     * Checks a cleartext against a insecureHash
     * @param cleartext
     * @param hash
     * @returns {boolean}
     */
    static validate(cleartext, hash) {
        return Hasher.insecureHash(cleartext) === hash
    }
}