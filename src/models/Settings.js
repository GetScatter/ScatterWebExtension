import Network from './Network';
import TimingHelpers from '../util/TimingHelpers';
import {LANG} from '../localization/locales';

export default class Settings {

    constructor(){
        this.networks = [];
        this.backupToBlockchain = false;
        this.hasEncryptionKey = false;
        this.inactivityInterval = 0;
        this.language = 'ENGLISH';
    }

    static placeholder(){ return new Settings(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('networks')) p.networks = json.networks.map(x => Network.fromJson(x));
        return p;
    }
}