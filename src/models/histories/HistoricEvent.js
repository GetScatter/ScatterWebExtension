
export default class HistoricEvent {

    constructor(_type = '', _data = null){
        this.type = _type;
        this.data = _data;
        this.timestamp = + new Date();
    }

    static placeholder(){ return new HistoricEvent(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
}