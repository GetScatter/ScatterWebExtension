import {Blockchains} from './Blockchains';

export default class Network {
    constructor(_host = '', _port = 0, blockchain = Blockchains.EOS, chainId = ''){
        this.host = _host;
        this.port = _port;
        this.blockchain = blockchain;
        this.chainId = chainId.toString();
    }

    static placeholder(){ return new Network(); }

    static fromJson(json){
        const p = Object.assign(Network.placeholder(), json);
        p.chainId = p.chainId.toString();
        return p;
    }

    unique(){ return `${this.blockchain}:` + (this.chainId.length ? `chain:${this.chainId}` : `${this.host}:${this.port}`); }
    hostport(){ return `${this.host}${this.port ? ':' : ''}${this.port}` }
    clone(){ return Network.fromJson(JSON.parse(JSON.stringify(this))) }
    isEmpty(){ return !this.host.length; }
    isValid(){ return (this.host.length && this.port) || this.chainId.length }
}