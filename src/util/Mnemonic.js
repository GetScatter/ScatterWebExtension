import PasswordHasher from "./PasswordHasher";
import bip39 from 'bip39'

export class Mnemonic {

    /***
     * Generates a mnemonic from a password
     * @param password
     * @returns {[string,string]}
     */
    static generateMnemonic(password) {
        const hash = PasswordHasher.hash(password);
        let mnemonic = bip39.entropyToMnemonic(hash);
        return [mnemonic, bip39.mnemonicToSeedHex(mnemonic)];
    }

    /***
     * Generates a random mnemonic
     * @returns {[string,string]}
     */
    static generateDanglingMnemonic() {
        let mnemonic = bip39.generateMnemonic();
        return [mnemonic, bip39.mnemonicToSeedHex(mnemonic)];
    }

    /***
     * Checks if a mnemonic matches a seed
     * @param mnemonic
     * @param seed
     * @returns {boolean}
     */
    static mnemonicPasses(mnemonic, seed) {
        if(!bip39.validateMnemonic(mnemonic)) return false;
        return bip39.mnemonicToSeedHex(mnemonic) === seed
    }

    /***
     * Checks if a mnemonic matches a password
     * @param password
     * @param seed
     * @returns {boolean}
     */
    static mnemonicPassesFromPassword(password, seed) {
        const hash = PasswordHasher.hash(password);
        let mnemonic = bip39.entropyToMnemonic(hash);
        if(!bip39.validateMnemonic(mnemonic)) return false;
        return bip39.mnemonicToSeedHex(mnemonic) === seed
    }

    /***
     * Gets a seed from a hash
     * @param hash
     * @returns {*}
     */
    static getSeed(hash){
        let mnemonic = bip39.entropyToMnemonic(hash);
        return bip39.mnemonicToSeedHex(mnemonic);
    }
}

export default Mnemonic;