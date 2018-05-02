import {Blockchains} from './Blockchains';

export default class Network {
    constructor(_host = '', _port = 0){
        this.blockchain = Blockchains.EOS;
        this.chainId = '';
        this.host = _host;
        this.port = _port;
    }

    static placeholder(){ return new Network(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
    unique(){ return `${this.blockchain}:` + (this.chainId.length ? `chain:${this.chainId}` : `${this.host}:${this.port}`); }
    hostport(){ return `${this.host}${this.port ? ':' : ''}${this.port}` }
    clone(){ return Network.fromJson(JSON.parse(JSON.stringify(this))) }

    /***
     * The endorsed Scatter network that holds it's contracts
     * @returns {Network}
     */
    static endorsedNetwork(){ return new Network('mainnet.eos.io', 8080); }

    /***
     * Checks if this is the Scatter endorsed network
     * @returns {boolean}
     */
    isEndorsedNetwork(){ return this.host === 'mainnet.eos.io' && this.port === 8080 }

    isEmpty(){ return !this.host.length; }
}