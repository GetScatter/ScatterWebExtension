import KeyPair from '../models/KeyPair';
import Mnemonic from './Mnemonic';
import {PrivateKey} from 'eosjs-ecc';

export default class EOSKeygen {

    /***
     * Generates a KeyPair
     * @param blockchain_prefix - TELOS support changes: optional change to prefix for pubkey when generated. Defaults to EOS
     * @returns {KeyPair}
     */
    static generateKeys(blockchain_prefix = 'EOS'){
        let [mnemonic, seed] = Mnemonic.generateDanglingMnemonic();
        let privateKey = EOSKeygen.generatePrivateKey(seed);
        let publicKey = EOSKeygen.privateToPublic(privateKey, blockchain_prefix);
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
     * @param blockchain_prefix - TELOS support changes: optional change to prefix for pubkey when generated. Defaults to EOS
     */
    static privateToPublic(privateKey, blockchain_prefix = 'EOS') {
        return PrivateKey.fromWif(privateKey).toPublic().toString(blockchain_prefix)
    }

    /***
     * Checks if a private key is a valid EOS private key
     * @param privateKey - The private key to check
     * @returns {boolean}
     */
    static validPrivateKey(privateKey){
        return PrivateKey.isValid(privateKey);
    }

}