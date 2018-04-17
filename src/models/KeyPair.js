import AES from 'aes-oop';

export const KeyPairFormats = {
    EOS:'EOS',
    ETH:'ETH'
};

export default class KeyPair {

    constructor(){
        this.format = KeyPairFormats.EOS;
        this.privateKey = '';
        this.publicKey = '';
    }

    static placeholder(){ return new KeyPair(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }

    /***
     * Checks whether a private key is encrypted
     * @returns {boolean}
     */
    isEncrypted(){ switch(this.format) {
        // EOS private keys are 51 chars long
        case KeyPairFormats.EOS: return this.privateKey.length > 51;
        // ETH private keys are 64 chars long
        case KeyPairFormats.ETH: return this.privateKey.length > 64;
    }}

    /***
     * Encrypts this KeyPair's Private Key
     * @param seed - The seed to encrypt with
     */
    encrypt(seed){
        if(!this.isEncrypted())
            this.privateKey = AES.encrypt(this.privateKey, seed);
    }

    /***
     * Decrypts this KeyPair's Private Key
     * @param seed - The seed to decrypt with
     */
    decrypt(seed){
        if(this.isEncrypted())
            this.privateKey = AES.decrypt(this.privateKey, seed);
    }
}