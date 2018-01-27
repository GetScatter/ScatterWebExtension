import Network from './Network';
import Identity from './Identity';

export default class Permission {

    constructor(){
        // Mandatory
        this.domain = '';
        this.network = '';
        this.identity = Identity.placeholder();

        // Optional
        this.contractAddress = null;
        this.contract = null;
        this.action = null;
    }

    static placeholder(){ return new Keychain(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('network')) p.network = Network.fromJson(json.network);
        if(json.hasOwnProperty('identity')) p.identity = Identity.fromJson(json.identity);
        return p;
    }

    isIdentityOnly(){
        return !this.contract && !this.action
    }

    isContractAction(){
        return !this.isIdentityOnly() && this.contract.length && this.action.length
    }
}