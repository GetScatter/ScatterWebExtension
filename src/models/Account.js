import KeyPair from './KeyPair';

export default class Account {
    constructor(){
        this.keypairUnique = '';
        this.publicKey = '';
        this.name = '';
        this.authority = '';
    }

    static placeholder(){ return new Account(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }

    static nameIsValid(name){
        return /(^[a-z1-5.]{1,11}[a-z1-5]$)|(^[a-z1-5.]{12}[a-j1-5]$)/g.test(name)
    }
}