import Network from './Network';
import Identity from './Identity';

export default class Permission {

    constructor(){
        // Mandatory
        this.domain = '';
        this.network = '';
        this.identity = '';
        this.keypair = '';

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

    getIdentity(keychain){
        return keychain.findIdentity(this.identity);
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
}