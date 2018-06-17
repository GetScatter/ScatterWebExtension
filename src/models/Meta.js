import {apis} from '../util/BrowserApis';

const extension = (apis && apis.app && typeof apis.app.getDetails === 'function') ? apis.app.getDetails() : {};
export default class Meta {

    constructor(){
        this.version = extension.version || '';
        this.extensionId = extension.id || '';
        this.lastVersion = '0';
        this.acceptedTerms = false;
    }

    regenerateVersion(){
        this.version = extension.version || '';
    }

    needsUpdating(){
        return this.version !== this.lastVersion;
    }

    static placeholder(){ return new Meta(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
}