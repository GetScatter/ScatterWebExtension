import createHash from 'create-hash';

export default class PasswordHasher {

    /***
     * Hashes a password using the SHA-256 algorithm.
     * @param password
     */
    static hash(password) {
        return createHash("sha256").update(password).digest('hex');
    }

    /***
     * Checks a password against a hash
     * @param password
     * @param hash
     * @returns {boolean}
     */
    static validate(password, hash) {
        return PasswordHasher.hash(password) === hash
    }
}