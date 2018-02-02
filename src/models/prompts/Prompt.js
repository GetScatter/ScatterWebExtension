import {RouteNames, promptPrefix} from '../../vue/Routing'

export default class Prompt {

    constructor(_type = '', _data = {}){
        this.type = _type;
        this.data = _data;
    }

    static placeholder(){ return new Prompt(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }

    routeName(){
        return `${promptPrefix}${this.type}`;
    }

}