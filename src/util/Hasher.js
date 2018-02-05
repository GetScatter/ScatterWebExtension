const ecc = require('eosjs-ecc');

export default class Hasher {

    /***
     * Hashes a cleartext using the SHA-256 algorithm.
     * @param cleartext
     */
    static hash(cleartext) {
        return ecc.sha256(cleartext);
    }

    /***
     * Checks a cleartext against a hash
     * @param cleartext
     * @param hash
     * @returns {boolean}
     */
    static validate(cleartext, hash) {
        return Hasher.hash(cleartext) === hash
    }
}