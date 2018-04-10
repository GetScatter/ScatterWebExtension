export default class Network {
    constructor(_host = '', _port = 0){
        this.host = _host;
        this.port = _port;
    }

    static placeholder(){ return new Network(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
    unique(){ return `${this.host}:${this.port}`; }
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

    static hostIsValid(host){ return host.indexOf('.') > -1 }
}