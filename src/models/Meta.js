import {apis} from '../util/BrowserApis';

export default class Meta {

    constructor(){
        const extension = (apis && apis.app && typeof apis.app.getDetails === 'function') ? apis.app.getDetails() : {};
        this.version = extension.version || '';
        this.extensionId = extension.id || '';
        this.lastVersion = '0';
    }

    needsUpdating(){
        return this.version !== this.lastVersion;
    }

    static placeholder(){ return new Meta(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
}