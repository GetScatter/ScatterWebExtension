import Scatter from '../models/Scatter'

export default class StorageService {

    constructor(){}

    static save(scatter){
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({scatter}, () => {
                resolve(scatter);
            });
        })
    };

    static get() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get('scatter', (possible) => {
                (possible && Object.keys(possible).length && possible.hasOwnProperty('scatter'))
                    ? resolve(Scatter.fromJson(possible.scatter))
                    : resolve(Scatter.placeholder());
            });
        })
    }

    static remove(){
        return new Promise((resolve, reject) => {
            chrome.storage.local.remove('scatter', () => {
                resolve();
            });
        })
    }
}