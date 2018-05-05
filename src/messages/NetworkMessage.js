import Network from '../models/Network'
import * as NetworkMessageTypes from './NetworkMessageTypes';

export default class NetworkMessage {

    constructor(_type = '', _payload = {}, _resolver = '', _domain = ''){
        this.type = _type;
        this.payload = _payload;
        this.resolver = _resolver;
        this.domain = _domain;
    }

    static placeholder(){ return new NetworkMessage(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
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

    respond(payload){ return new NetworkMessage(this.type, payload, this.resolver); }
    error(payload){ return new NetworkMessage(NetworkMessageTypes.ERROR, payload, this.resolver); }
}