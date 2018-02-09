import Network from './Network';
import TimingHelpers from '../util/TimingHelpers';

export default class Settings {

    constructor(){
        this.networks = [];
        this.backupToBlockchain = false;
        this.hasEncryptionKey = false;
        this.timeoutInactivityInterval = TimingHelpers.minutes(15)
    }

    static placeholder(){ return new Settings(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('networks')) p.networks = json.networks.map(x => Network.fromJson(x));
        return p;
    }
}