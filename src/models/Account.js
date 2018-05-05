import KeyPair from './KeyPair';
import PluginRepository from '../plugins/PluginRepository';

export default class Account {
    constructor(){
        this.keypairUnique = '';
        this.publicKey = '';
        this.name = '';
        this.authority = '';
    }

    formatted(){
        const blockchain = this.blockchain();
        if(!blockchain || !blockchain.length) return this.name;
        return PluginRepository.plugin(blockchain).accountFormatter(this);
    }

    blockchain(){
        return this.keypairUnique.split(':')[0];
    }

    static placeholder(){ return new Account(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }

    static nameIsValid(name){
        return /(^[a-z1-5.]{1,11}[a-z1-5]$)|(^[a-z1-5.]{12}[a-j1-5]$)/g.test(name)
    }
}