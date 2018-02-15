import {RouteNames, promptPrefix} from '../../vue/Routing'
import * as PromptTypes from './PromptTypes'

export default class Prompt {

    constructor(_type = '', _domain = '', _network = null, _data = {}, _responder = null){
        this.type = _type;
        this.domain = _domain;
        this.network = _network;
        this.data = _data;
        this.responder = _responder;
    }

    static placeholder(){ return new Prompt(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }

    routeName(){
        return `${promptPrefix}${this.type}`;
    }

    static scatterIsLocked(){
        return new Prompt(PromptTypes.REQUEST_UNLOCK, '', {host:'',port:0}, {}, function(){});
    }

}