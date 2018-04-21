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

    removePermission(permission){ this.permissions.splice(this.permissions.indexOf(permission),1); }
    getPermission(checksum){ return this.permissions.find(permission => permission.checksum === checksum); }
    hasPermission(checksum, fields = []){
        const fieldKeys = () => Array.isArray(fields) ? fields : Object.keys(fields);

        const permission = this.getPermission(checksum);
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
        if(idFromPermissions) return this.findIdentity(idFromPermissions.publicKey);
        else return null;
    }
    updateOrPushIdentity(identity){
        this.identities.find(id => id.publicKey === identity.publicKey)
            ? this.identities = this.identities.map(id => id.publicKey === identity.publicKey ? identity : id)
            : this.identities.unshift(identity);
    }
}