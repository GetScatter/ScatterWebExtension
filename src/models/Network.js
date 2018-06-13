import {Blockchains} from './Blockchains';

export default class Network {
    constructor(_host = '', _port = 0, blockchain = Blockchains.EOS, chainId = '', _protocol='http'){
        this.host = _host;
        this.port = _port;
        this.protocol = _protocol;
        this.blockchain = blockchain;
        this.chainId = chainId.toString();
    }

    static placeholder(){ return new Network(); }

    static fromJson(json){
        const p = Object.assign(Network.placeholder(), json);
        p.chainId = p.chainId ? p.chainId.toString() : '';
        return p;
    }

    static fromUnique(netString){
        const blockchain = netString.split(':')[0];
        if(netString.indexOf(':chain:') > -1)
            return new Network('','',blockchain, netString.replace(`${blockchain}:chain:`,''));

        const splits = netString.replace(`${blockchain}:`, '').split(':');
        var ret = new Network(splits[1], parseInt(splits[2] || 80), blockchain, '', splits[0]);
        return ret;
    }

    unique(){ 
        return `${this.blockchain}:` + (this.chainId.length ? `chain:${this.chainId}` : `${this.protocol}:${this.host}:${this.port}`); 
    }
    hostport(){ 
        if (this.blockchain === Blockchains.EOS) {
            // EOS needs to a protocol as well.
            return `${this.protocol}://${this.host}${this.port ? ':' : ''}${this.port}` 
        } else 
            return `${this.host}${this.port ? ':' : ''}${this.port}` 
    }
    clone(){ return Network.fromJson(JSON.parse(JSON.stringify(this))) }
    isEmpty(){ return !this.host.length; }
    isValid(){ return (this.host.length && this.port) || this.chainId.length }
}
