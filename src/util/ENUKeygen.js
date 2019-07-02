import KeyPair from '../models/KeyPair';
import Mnemonic from './Mnemonic';
import {PrivateKey} from 'enujs-ecc';

export default class ENUKeygen {

    /***
     * Generates a KeyPair
     * @returns {KeyPair}
     */
    static generateKeys(){
        let [mnemonic, seed] = Mnemonic.generateDanglingMnemonic();
        let privateKey = ENUKeygen.generatePrivateKey(seed);
        let publicKey = ENUKeygen.privateToPublic(privateKey);
        return KeyPair.fromJson({publicKey, privateKey})
    }

    /***
     * Generates only a private key
     * @param seed - The seed to build the key from
     * @returns {wif}
     */
    static generatePrivateKey(seed) {
        return PrivateKey.fromSeed(seed).toWif()
    }

    /***
     * Converts a private key to a public key
     * @param privateKey - The private key to convert
     */
    static privateToPublic(privateKey) {
        return PrivateKey.fromWif(privateKey).toPublic().toString()
    }

    /***
     * Checks if a private key is a valid ENU private key
     * @param privateKey - The private key to check
     * @returns {boolean}
     */
    static validPrivateKey(privateKey){
        return PrivateKey.isValid(privateKey);
    }

}
