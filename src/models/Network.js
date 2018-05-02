import {Blockchains} from './Blockchains';

export default class Network {
    constructor(_host = '', _port = 0, blockchain = Blockchains.EOS){
        this.blockchain = blockchain;
        this.chainId = '';
        this.host = _host;
        this.port = _port;
    }

    static placeholder(){ return new Network(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
    unique(){ return `${this.blockchain}:` + (this.chainId.length ? `chain:${this.chainId}` : `${this.host}:${this.port}`); }
    hostport(){ return `${this.host}${this.port ? ':' : ''}${this.port}` }
    clone(){ return Network.fromJson(JSON.parse(JSON.stringify(this))) }
    isEmpty(){ return !this.host.length; }
}