import Scatter from '../models/Scatter'
import {apis} from '../util/BrowserApis';

export default class StorageService {

    constructor(){}

    /***
     * Saves an instance of Scatter in the extension's local storage
     * The keychain will always be encrypted when in storage
     * @param scatter
     * @returns {Promise}
     */
    static save(scatter){
        return new Promise(resolve => {
            apis.storage.local.set({scatter}, () => {
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
        return new Promise(resolve => {
            apis.storage.local.get('scatter', (possible) => {
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
        return new Promise(resolve => {
            apis.storage.local.remove('scatter', () => {
                resolve();
            });
        })
    }

    /***
     * Caches an ABI
     * @param contractName
     * @param chainId
     * @param abi
     * @returns {Promise}
     */
    static cacheABI(contractName, chainId, abi){
        return new Promise(resolve => {
            apis.storage.local.set({[`abi:${contractName}:${chainId}`]:abi}, () => {
                resolve(abi);
            });
        });
    }

    /***
     * Fetches an ABI from cache
     * @param contractName
     * @param chainId
     * @returns {Promise}
     */
    static getABI(contractName, chainId){
        return new Promise(resolve => {
            const prop = `abi:${contractName}:${chainId}`;
            apis.storage.local.get(prop, (possible) => {
                if(JSON.stringify(possible) !== '{}') resolve(possible[prop]);
                else resolve('no cache');
            });
        })
    }

    static getSalt(){
        return new Promise(resolve => {
            apis.storage.local.get('salt', (possible) => {
                if(JSON.stringify(possible) !== '{}') resolve(possible.salt);
                else resolve('SALT_ME');
            });
        })
    }

    static setSalt(salt){
        return new Promise(resolve => {
            apis.storage.local.set({salt}, () => {
                resolve(salt);
            });
        })
    }
}