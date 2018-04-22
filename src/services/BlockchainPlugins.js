import * as NetworkMessageTypes from '../messages/NetworkMessageTypes'

let _bindNetwork = new WeakMap();
let _send = new WeakMap();
let throwIfNoIdentity = new WeakMap();
let publicKey = new WeakMap();

const proxy = (dummy, handler) => new Proxy(dummy, handler);

export default class BlockchainPlugins {

    constructor(...args){
        _bindNetwork = args[0];
        _send = args[1];
        throwIfNoIdentity = args[2];
        publicKey = args[3];
    }


    /***
     * Returns an instance of eosjs with a signature provider and endpoint bound
     * to it. Adds a level of security over signature provider manipulation.
     * No matter what options are provided, httpEndpoint and signProvider are always overwritten.
     * @param _eos - An instance of Eos.Localnet or Eos.Testnet
     * @param network - The network you are binding to {host:string, port:number}
     * @param _options - Passable object of eosjs options
     * @returns {*}
     */
    eos(_eos, network, _options = {}){
        //TODO: Clean up and extrapolate

        _bindNetwork(network);
        const httpEndpoint = `http://${network.host}:${network.port}`;

        // The proxy stands between the eosjs object and scatter.
        // This is used to add special functionality like adding `requiredFields` arrays to transactions
        return proxy(_eos(), {
            get(eosInstance, method) {

                // We're holding a reference to the returned fields
                // in the case of a requirement during transactions
                let returnedFields = null;

                return (...args) => {

                    console.log('arg', args);
                    if(args.find(arg => arg.hasOwnProperty('keyProvider'))){
                        throw new Error("Do not use a `keyProvider` with a Scatter. Use a `signProvider` and return only signatures to this object. A malicious person could retrieve your keys otherwise.");
                    }

                    // It is possible to pass requiredFields to the eosjs options parameter
                    // which will be sent along with the signature request to scatter and return
                    // with the signature.
                    let requiredFields = args.find(arg => arg.hasOwnProperty('requiredFields'));
                    requiredFields = requiredFields ? requiredFields.requiredFields : [];

                    // The signature provider which gets elevated into the user's Scatter
                    const signProvider = async signargs => {
                        throwIfNoIdentity();

                        // Friendly formatting
                        signargs.messages = await Promise.all(signargs.transaction.actions.map(async action => {
                            let data = null;

                            const eos = _eos({httpEndpoint});
                            if(action.account === 'eosio') data = eos.fc.fromBuffer(action.name, action.data);
                            else {
                                const abi = await eos.contract(args[0]);
                                data = abi.fc.fromBuffer(action.name, action.data);
                            }

                            console.log('data', data);

                            return {
                                data,
                                code:action.account,
                                type:action.name,
                                authorization:action.authorization
                            };
                        }));
                        const payload = Object.assign(signargs, { domain:location.host, network, publicKey, requiredFields });

                        const result = await _send(NetworkMessageTypes.REQUEST_SIGNATURE, payload);

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
                                    console.log('primary method', result)
                                    result = Object.assign(result, {returnedFields});
                                    resolve(result);
                                    return;
                                }

                                // Catching chained methods
                                const contractProxy = proxy(result, {
                                    get(instance,method){
                                        if(method === 'then') return instance[method];
                                        return (...args) => {
                                            console.log('args', args);
                                            return new Promise(async (res, rej) => {
                                                instance[method](...args).then(actionResult => {
                                                    res(Object.assign(actionResult, {returnedFields}));
                                                }).catch(rej);
                                            })

                                        }
                                    }
                                })

                                resolve(contractProxy);
                            })
                            .catch(error => reject(error))
                    })
                }
            }
        });
    }


}