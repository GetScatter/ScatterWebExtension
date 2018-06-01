import Plugin from '../Plugin';
import * as PluginTypes from '../PluginTypes';
import {Blockchains} from '../../models/Blockchains'
import * as NetworkMessageTypes from '../../messages/NetworkMessageTypes'
import StringHelpers from '../../util/StringHelpers'
import Error from '../../models/errors/Error'
import Network from '../../models/Network'
import Account from '../../models/Account'
// const ecc = require('eosjs-ecc');
import AlertMsg from '../../models/alerts/AlertMsg'
import * as Actions from '../../store/constants';
import Eos from 'eosjs'
let {ecc} = Eos.modules;
import {IdentityRequiredFields} from '../../models/Identity';
import ObjectHelpers from '../../util/ObjectHelpers'

let networkGetter = new WeakMap();
let messageSender = new WeakMap();
let throwIfNoIdentity = new WeakMap();

const proxy = (dummy, handler) => new Proxy(dummy, handler);

export default class EOS extends Plugin {

    constructor(){ super(Blockchains.EOS, PluginTypes.BLOCKCHAIN_SUPPORT) }
    accountFormatter(account){ return `${account.name}@${account.authority}` }
    returnableAccount(account){ return { name:account.name, authority:account.authority }}

    async getEndorsedNetwork(){
        return new Promise((resolve, reject) => {
            resolve(new Network('159.65.161.242', 8888, Blockchains.EOS));
        });
    }

    async isEndorsedNetwork(network){
        const endorsedNetwork = await this.getEndorsedNetwork();
        return network.hostport() === endorsedNetwork.hostport();
    }

    accountsAreImported(){ return true; }
    importAccount(keypair, network, context, accountSelected){
        const getAccountsFromPublicKey = (publicKey, network) => {
            return new Promise((resolve, reject) => {
                const eos = Eos.Localnet({httpEndpoint:`http://${network.hostport()}`});
                eos.getKeyAccounts(publicKey).then(res => {
                    if(!res || !res.hasOwnProperty('account_names')){ resolve([]); return false; }

                    Promise.all(res.account_names.map(name => eos.getAccount(name).catch(e => resolve([])))).then(multires => {
                        let accounts = [];
                        multires.map(account => {
                            account.permissions.map(permission => {
                                accounts.push({name:account.account_name, authority:permission.perm_name});
                            });
                        });
                        resolve(accounts)
                    }).catch(e => resolve([]));
                }).catch(e => resolve([]));
            })
        }

        getAccountsFromPublicKey(keypair.publicKey, network).then(accounts => {
            switch(accounts.length){
                case 0: context[Actions.PUSH_ALERT](AlertMsg.NoAccountsFound()); reject(); return false;
                // Only one account, so returning it
                case 1: accountSelected(Account.fromJson({name:accounts[0].name, authority:accounts[0].authority, publicKey:keypair.publicKey, keypairUnique:keypair.unique() })); break;
                // More than one account, prompting account selection
                default: context[Actions.PUSH_ALERT](AlertMsg.SelectAccount(accounts)).then(res => {
                    if(!res || !res.hasOwnProperty('selected')) { reject(); return false; }
                    accountSelected(Account.fromJson(Object.assign(res.selected, {publicKey:keypair.publicKey, keypairUnique:keypair.unique()})));
                })
            }
        }).catch(e => reject());
    }

    privateToPublic(privateKey){ return ecc.privateToPublic(privateKey); }
    validPrivateKey(privateKey){ return ecc.isValidPrivate(privateKey); }
    validPublicKey(publicKey){   return ecc.isValidPublic(publicKey); }
    randomPrivateKey(){ return ecc.randomKey(); }
    convertsTo(){
        return [];
    }
    from_eth(privateKey){
        return ecc.PrivateKey.fromHex(Buffer.from(privateKey, 'hex')).toString();
    }

    async getBalances(account, network, code = 'eosio.token', table = 'accounts'){
        const eos = Eos.Localnet({httpEndpoint:`http://${network.hostport()}`});
        const contract = await eos.contract(code);
        return await eos.getTableRows({
            json: true,
            code,
            scope: account.name,
            table,
            limit: 5000
        }).then(res => res.rows.map(row => row.balance.split(' ').reverse()));
    }

    actionParticipants(payload){
        return ObjectHelpers.flatten(
            payload.messages
                .map(message => message.authorization
                    .map(auth => `${auth.actor}@${auth.permission}`))
        );
    }

    signer(bgContext, payload, publicKey, callback, arbitrary = false, isHash = false){
        bgContext.publicToPrivate(privateKey => {
            if(!privateKey){
                callback(null);
                return false;
            }

            let sig;
            if(arbitrary && isHash) sig = ecc.Signature.signHash(payload.data, privateKey).toString();
            else sig = ecc.sign(Buffer.from(arbitrary ? payload.data : payload.buf.data, 'utf8'), privateKey);

            callback(sig);
        }, publicKey)
    }

    signatureProvider(...args){

        messageSender = args[0];
        throwIfNoIdentity = args[1];

        return (network, _eos, _options = {}, protocol = 'http') => {
            if(!['http', 'https', 'ws'].includes(protocol))
                throw new Error('Protocol must be either http, https, or ws');

            network = Network.fromJson(network);
            if(!network.isValid()) throw Error.noNetwork();
            const httpEndpoint = `${protocol}://${network.hostport()}`;

            // The proxy stands between the eosjs object and scatter.
            // This is used to add special functionality like adding `requiredFields` arrays to transactions
            return proxy(_eos(), {
                get(eosInstance, method) {

                    let returnedFields = null;

                    return (...args) => {

                        if(args.find(arg => arg.hasOwnProperty('keyProvider'))) throw Error.usedKeyProvider();

                        let requiredFields = args.find(arg => arg.hasOwnProperty('requiredFields'));
                        requiredFields = IdentityRequiredFields.fromJson(requiredFields ? requiredFields.requiredFields : {});
                        if(!requiredFields.isValid()) throw Error.malformedRequiredFields();

                        // The signature provider which gets elevated into the user's Scatter
                        const signProvider = async signargs => {
                            throwIfNoIdentity();

                            // Friendly formatting
                            signargs.messages = await messagesBuilder(_eos, signargs, httpEndpoint, args[0]);

                            const payload = Object.assign(signargs, { domain:location.host.replace('www.',''), network, requiredFields });
                            const result = await messageSender(NetworkMessageTypes.REQUEST_SIGNATURE, payload);

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
                            _eos(Object.assign(_options, {httpEndpoint, signProvider}))[method](...args)
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