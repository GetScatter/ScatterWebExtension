export default class Network {
    constructor(){
        this.host = '';
        this.port = 0;
    }

    static placeholder(){ return new Network(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
}