import Network from '../models/Network'
import NetworkMessageTypes from './NetworkMessageTypes';

export default class NetworkMessage {

    constructor(){
        this.type = '';
        this.payload = {};
        this.resolver = '';
        this.network = Network.placeholder();
        this.domain = '';
    }

    static placeholder(){ return new NetworkMessage(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('network')) p.network = Network.fromJson(json.network);
        return p;
    }

    static payload(type, payload){
        let p = this.placeholder();
        p.type = type;
        p.payload = payload;
        return p;
    }

    static signal(type){
        let p = this.placeholder();
        p.type = type;
        return p;
    }

    respond(payload){ return new NetworkMessage(this.type, payload, this.resolverId); }
    error(payload){ return new NetworkMessage(NetworkMessageTypes.ERROR, payload, this.resolverId); }
}