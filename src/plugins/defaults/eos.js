import Plugin from '../Plugin';
import * as PluginTypes from '../PluginTypes';
import {Blockchains} from '../../models/Blockchains'
import * as NetworkMessageTypes from '../../messages/NetworkMessageTypes'
const ecc = require('eosjs-ecc');

let networkBinder = new WeakMap();
let internalMessageSender = new WeakMap();
let throwIfNoIdentity = new WeakMap();

const proxy = (dummy, handler) => new Proxy(dummy, handler);

export default class EOS extends Plugin {

    constructor(){
        super(Blockchains.EOS, PluginTypes.BLOCKCHAIN_SUPPORT)
    }

    accountFormatter(account){
        return `${account.name}@${account.authority}`
    }

    signer(bgContext, payload, publicKey, callback){
        const buf = Buffer.from(payload.buf.data, 'utf8');
        bgContext.publicToPrivate(privateKey => {
            callback(privateKey ? ecc.sign(buf, privateKey) : null);
        }, publicKey);
    }

    signatureProvider(...args){

        networkBinder = args[0];
        internalMessageSender = args[1];
        throwIfNoIdentity = args[2];

        return (_eos, network, _options = {}) => {

            networkBinder(network);
            const httpEndpoint = `http://${network.host}:${network.port}`;

            // The proxy stands between the eosjs object and scatter.
            // This is used to add special functionality like adding `requiredFields` arrays to transactions
            return proxy(_eos(), {
                get(eosInstance, method) {

                    let returnedFields = null;

                    return (...args) => {

                        if(args.find(arg => arg.hasOwnProperty('keyProvider'))) throw Error.usedKeyProvider();

                        let requiredFields = args.find(arg => arg.hasOwnProperty('requiredFields'));
                        requiredFields = requiredFields ? requiredFields.requiredFields : [];

                        // The signature provider which gets elevated into the user's Scatter
                        const signProvider = async signargs => {
                            throwIfNoIdentity();

                            // Friendly formatting
                            signargs.messages = await messagesBuilder(_eos, signargs, httpEndpoint, args[0]);

                            const payload = Object.assign(signargs, { domain:location.host, network, requiredFields });
                            const result = await internalMessageSender(NetworkMessageTypes.REQUEST_SIGNATURE, payload);

                            // No signature
                            if(!result) return null;

                            if(result.hasOwnProperty('signatures')){
                                // Holding onto the returned fields for the final result
                                returnedFields = result.returnedFields;

                                // Grabbing buf signatures from local multi sig sign provider
                                let multiSigKeyProvider = args.find(arg => arg.hasOwnProperty('signProvider'));
                                if(multiSigKeyProvider){
                                    result.signatures.push(multiSigKeyProvider.signProvider(signargs.buf, signargs.sign));
                                }

                                // Returning only the signatures to eosjs
                                return result.signatures;
                            }

                            return result;
                        };

                        // TODO: We need to check about the implications of multiple eosjs instances
                        return new Promise((resolve, reject) => {
                            _eos(Object.assign(JSON.stringify(_options), {httpEndpoint, signProvider}))[method](...args)
                                .then(result => {

                                    // Standard method ( ie. not contract )
                                    if(!result.hasOwnProperty('fc')){
                                        result = Object.assign(result, {returnedFields});
                                        resolve(result);
                                        return;
                                    }

                                    // Catching chained promise methods ( contract .then action )
                                    const contractProxy = proxy(result, {
                                        get(instance,method){
                                            if(method === 'then') return instance[method];
                                            return (...args) => {
                                                return new Promise(async (res, rej) => {
                                                    instance[method](...args).then(actionResult => {
                                                        res(Object.assign(actionResult, {returnedFields}));
                                                    }).catch(rej);
                                                })

                                            }
                                        }
                                    });

                                    resolve(contractProxy);
                                }).catch(error => reject(error))
                        })
                    }
                }
            }); // Proxy
        }
    }
}


const messagesBuilder = async (_eos, signargs, httpEndpoint, contractName) => await Promise.all(signargs.transaction.actions.map(async action => {
    console.log('message builder');
    let data = null;

    const eos = _eos({httpEndpoint});
    if(action.account === 'eosio') data = eos.fc.fromBuffer(action.name, action.data);
    else {
        const abi = await eos.contract(contractName);
        data = abi.fc.fromBuffer(action.name, action.data);
    }

    return {
        data,
        code:action.account,
        type:action.name,
        authorization:action.authorization
    };
}));