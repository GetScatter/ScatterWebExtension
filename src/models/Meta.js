import {apis} from '../util/BrowserApis';

export default class Meta {

    constructor(){
        const extension = (apis && apis.app && typeof apis.app.getDetails === 'function') ? apis.app.getDetails() : {};
        this.version = extension.version || '';
        this.extensionId = extension.id || '';
    }

    static placeholder(){ return new Meta(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
}