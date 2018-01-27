import AES from 'aes-oop';

export default class KeyPair {

    constructor(){
        this.privateKey = '';
        this.publicKey = '';
    }

    static placeholder(){ return new KeyPair(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }

    /***
     * Checks whether a private key is encrypted
     * @returns {boolean}
     */
    isEncrypted(){
        // EOS private keys are 51 characters long
        // AES encrypted EOS private keys are 108 characters long
        return this.privateKey.length > 70
    }

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