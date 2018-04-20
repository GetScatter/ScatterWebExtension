import Network from './Network';
import Identity from './Identity';

export default class Permission {

    constructor(){
        // Mandatory
        this.domain = '';
        this.network = '';
        this.publicKey = '';

        // Optional
        this.contract = null;
        this.action = null;
        this.checksum = null;

        this.timestamp = 0;

        this.fields = [];
        this.mutableFields = [];
    }

    static placeholder(){ return new Permission(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('network')) p.network = Network.fromJson(json.network);
        return p;
    }

    identity(keychain){
        return keychain.findIdentity(this.publicKey);
    }

    isIdentityOnly(){
        return !this.contract && !this.action
    }

    isContractAction(){
        return !this.isIdentityOnly() && this.contract.length && this.action.length
    }

    isIdentityFor(domain){
        return this.isIdentityOnly() && this.domain === domain;
    }

    // TODO: There will be a problem with multiple identity permissions where an
    // TODO: identity was disabled, and another was used in it's place. Possibly if there is
    // TODO: already a permission for any identity another should not be added.
    identityIsNotDisabled(keychain){
        return !this.identity(keychain).disabled;
    }
}