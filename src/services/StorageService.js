import Scatter from '../models/Scatter'

export default class StorageService {

    constructor(){}

    /***
     * Saves an instance of Scatter in the extension's local storage
     * The keychain will always be encrypted when in storage
     * @param scatter
     * @returns {Promise}
     */
    static save(scatter){
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({scatter}, () => {
                resolve(scatter);
            });
        })
    };

    /***
     * Gets an instance of Scatter from the extension's local storage
     * Will return a new Scatter instance if not found.
     * @returns {Promise}
     */
    static get() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get('scatter', (possible) => {
                (possible && Object.keys(possible).length && possible.hasOwnProperty('scatter'))
                    ? resolve(Scatter.fromJson(possible.scatter))
                    : resolve(Scatter.placeholder());
            });
        })
    }

    /***
     * Removes the instance of Scatter.
     * This will delete all user data.
     * @returns {Promise}
     */
    static remove(){
        return new Promise((resolve, reject) => {
            chrome.storage.local.remove('scatter', () => {
                resolve();
            });
        })
    }

    /***
     * Backs up the user's Scatter to the Blockchain.
     * @param scatter
     * @returns {Promise}
     */
    static backup(scatter){
        return new Promise((resolve, reject) => {
            resolve(true);
        })
    }
}