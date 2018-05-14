import Identity from './Identity';
import Permission from './Permission';
import KeyPair from './KeyPair';
import IdGenerator from '../util/IdGenerator';
import ObjectHelpers from '../util/ObjectHelpers';
import AES from 'aes-oop';

export default class Keychain {

    constructor(){
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

    clone(){ return Keychain.fromJson(JSON.parse(JSON.stringify(this))) }

    removePermissionsByKeypair(keypair){ this.permissions = this.permissions.filter(perm => perm.keypair !== keypair.unique()); }
    removePermission(permission){ this.permissions = this.permissions.filter(perm => perm.checksum !== permission.checksum); }
    getPermission(checksum){ return this.permissions.find(permission => permission.checksum === checksum); }
    hasPermission(checksum, fields = []){
        const fieldKeys = () => Array.isArray(fields) ? fields : Object.keys(fields);

        const permission = this.getPermission(checksum);
        console.log('checksum', checksum, permission);
        if(!permission) return false;

        // If no fields are supplied but permission exists | valid.
        if(fields === null || !fieldKeys().length) return true;

        let fieldsCloneA = Object.assign({}, fields);
        let fieldsCloneB = Object.assign({}, permission.fields);
        permission.mutableFields.map(field => {
            delete fieldsCloneA[field];
            delete fieldsCloneB[field];
        });

        return ObjectHelpers.deepEqual(fieldsCloneA, fieldsCloneB);

    }

    findIdentity(publicKey){ return this.identities.find(id => id.publicKey === publicKey); }
    findIdentityFromDomain(domain){
        const idFromPermissions =  this.permissions.find(permission => permission.isIdentityOnly() && permission.domain === domain);
        if(idFromPermissions) return this.findIdentity(idFromPermissions.identity);
        else return null;
    }
    updateOrPushIdentity(identity){
        this.identities.find(id => id.publicKey === identity.publicKey)
            ? this.identities = this.identities.map(id => id.publicKey === identity.publicKey ? identity : id)
            : this.identities.unshift(identity);
    }

    findAccountsWithPublicKey(publicKey){
        return this.identities.map(id => id.getAccountFromPublicKey(publicKey)).filter(acc => !!acc);
    }

    forBackup(){
        const clone = this.clone();
        clone.keypairs = [];
        clone.permissions = [];
        return clone;

    }

    getKeyPair(keypair){
        return this.getKeyPairByPublicKey(keypair.publicKey);
        // return this.keypairs.find(key => key.publicKey.toLowerCase() === keypair.publicKey.toLowerCase())
    }

    getKeyPairByName(name){
        return this.keypairs.find(key => key.name.toLowerCase() === name.toLowerCase())
    }

    getKeyPairByPublicKey(publicKey){
        return this.keypairs.find(key => key.publicKey.toLowerCase() === publicKey.toLowerCase())
    }

    removeKeyPair(keypair){
        this.keypairs = this.keypairs.filter(key => key.unique() !== keypair.unique());
    }
}