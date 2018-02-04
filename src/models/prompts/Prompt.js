import {RouteNames, promptPrefix} from '../../vue/Routing'

export default class Prompt {

    constructor(_type = '', _domain = '', _network = null, _data = {}, _responder = null){
        this.type = _type;
        this.domain = _domain;
        this.network = _network;
        this.data = _data;
        this.responder = _responder;
        this.closeWindow = null;
    }

    static placeholder(){ return new Prompt(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }

    routeName(){
        return `${promptPrefix}${this.type}`;
    }

    typeToTitle(){

    }

}