import Identity from './Identity';
import Permission from './Permission';
import KeyPair from './KeyPair';
import IdGenerator from '../util/IdGenerator';
import AES from 'aes-oop';

export default class Keychain {

    constructor(){
        this.id = IdGenerator.text(256);
        this.keypairs = [];
        this.identities = [];
        this.permissions = [];
    }

    static placeholder(){ return new Keychain(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('keypairs')) p.keypairs = json.keypairs.map(x => KeyPair.fromJson(x));
        if(json.hasOwnProperty('identities')) p.identities = json.identities.map(x => Identity.fromJson(x));
        if(json.hasOwnProperty('permissions')) p.permissions = json.permissions.map(x => Permission.fromJson(x));
        return p;
    }

    /***
     * Returns a KeyPair object or null
     * @param publicKey
     * @returns {KeyPair | null}
     */
    findKeyPair(publicKey){
        return this.keypairs.find(keypair => keypair.publicKey === publicKey);
    }

    /***
     * Finds an Identity on the keychain by a insecureHash
     * @param identityHash
     * @returns {*}
     */
    findIdentity(identityHash){
        return this.identities.find(id => id.hash === identityHash) || this.identities.find(id => id.encryptHash(true) === identityHash);
    }

    /***
     * Checks if Scatter has a specific permission
     * @param checksum
     */
    hasContractPermission(checksum){
        if(!checksum) return false;
        return !!this.permissions.find(permission => permission.checksum === checksum);
    }
}