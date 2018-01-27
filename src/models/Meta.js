export default class Meta {

    constructor(){
        const extension = (chrome && chrome.app) ? chrome.app.getDetails() : {};
        this.version = extension.version || '';
        this.extensionId = extension.id || '';
    }

    static placeholder(){ return new Meta(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
}