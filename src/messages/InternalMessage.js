import {LocalStream} from 'extension-streams';

export default class InternalMessage {

    constructor(){
        this.type = '';
        this.payload = '';
    }

    static placeholder(){ return new InternalMessage(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }

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

    send(){
        return LocalStream.send(this);
    }
}