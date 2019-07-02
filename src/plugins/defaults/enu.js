import Plugin from '../Plugin';
import * as PluginTypes from '../PluginTypes';
import {Blockchains} from '../../models/Blockchains'
import * as NetworkMessageTypes from '../../messages/NetworkMessageTypes'
import StringHelpers from '../../util/StringHelpers'
import Error from '../../models/errors/Error'
import Network from '../../models/Network'
import Account from '../../models/Account'
import AlertMsg from '../../models/alerts/AlertMsg'
import * as Actions from '../../store/constants';
import Enu from 'enujs'
let {ecc, Fcbuffer} = Enu.modules;
import {IdentityRequiredFields} from '../../models/Identity';
import ObjectHelpers from '../../util/ObjectHelpers'
import * as ricardianParser from 'eos-rc-parser';
import StorageService from '../../services/StorageService'
import {strippedHost} from '../../util/GenericTools'

let networkGetter = new WeakMap();
let messageSender = new WeakMap();
let throwIfNoIdentity = new WeakMap();

const proxy = (dummy, handler) => new Proxy(dummy, handler);

export default class ENU extends Plugin {

    constructor(){ super(Blockchains.ENU, PluginTypes.BLOCKCHAIN_SUPPORT) }
    accountFormatter(account){ return `${account.name}@${account.authority}` }
    returnableAccount(account){ return { name:account.name, authority:account.authority }}

    async getEndorsedNetwork(){
        return new Promise((resolve, reject) => {
            resolve(new Network(
                'ENU Mainnet', 'https',
                'rpc.enu.one',
                443,
                Blockchains.ENU,
                'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
            ));
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
                const enu = Enu({httpEndpoint:`${network.protocol}://${network.hostport()}`});
                enu.getKeyAccounts(publicKey).then(res => {
                    if(!res || !res.hasOwnProperty('account_names')){ resolve([]); return false; }

                    Promise.all(res.account_names.map(name => enu.getAccount(name).catch(e => resolve([])))).then(multires => {
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
        }).catch(e => {
            console.log('error', e);
            accountSelected(null);
        });
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

    async getBalances(account, network, code = 'enu.token', table = 'accounts'){
        const enu = Enu({httpEndpoint:`${network.protocol}://${network.hostport()}`, chainId:network.chainId});
        const contract = await enu.contract(code);
        return await enu.getTableRows({
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

        // Protocol will be deprecated.
        return (network, _enu, _options = {}, protocol = 'http') => {


            if(!['http', 'https', 'ws'].includes(protocol))
                throw new Error('Protocol must be either http, https, or ws');

            // Backwards compatibility: Networks now have protocols, but some older dapps still use the argument
            if(!network.hasOwnProperty('protocol') || !network.protocol.length)
                network.protocol = protocol;

            network = Network.fromJson(network);
            if(!network.isValid()) throw Error.noNetwork();
            const httpEndpoint = `${network.protocol}://${network.hostport()}`;

            const chainId = network.hasOwnProperty('chainId') && network.chainId.length ? network.chainId : _options.chainId;
            network.chainId = chainId;

            // The proxy stands between the enujs object and scatter.
            // This is used to add special functionality like adding `requiredFields` arrays to transactions
            return proxy(_enu({httpEndpoint, chainId}), {
                get(enuInstance, method) {

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
                            signargs.messages = await requestParser(signargs, network);

                            const payload = Object.assign(signargs, { domain:strippedHost(), network, requiredFields });
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

                                // Returning only the signatures to enujs
                                return result.signatures;
                            }

                            return result;
                        };

                        // TODO: We need to check about the implications of multiple enujs instances
                        return new Promise((resolve, reject) => {
                            _enu(Object.assign(_options, {httpEndpoint, signProvider, chainId}))[method](...args)
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

const requestParser = async (signargs, network) => {
    const enu = Enu({httpEndpoint:network.fullhost(), chainId:network.chainId});

    const contracts = signargs.transaction.actions.map(action => action.account)
        .reduce((acc, contract) => {
            if(!acc.includes(contract)) acc.push(contract);
            return acc;
        }, []);

    const staleAbi = +new Date() - (1000 * 60 * 60 * 24 * 2);
    const abis = {};

    await Promise.all(contracts.map(async contractAccount => {
        const cachedABI = await Promise.race([
            messageSender(NetworkMessageTypes.ABI_CACHE, {abiContractName:contractAccount, abiGet:true, chainId:network.chainId}),
            new Promise(resolve => setTimeout(() => resolve('no cache'), 500))
        ]);

        if(cachedABI === 'object' && cachedABI.timestamp > +new Date((await enu.getAccount(contractAccount)).last_code_update))
            abis[contractAccount] = enu.fc.abiCache.abi(contractAccount, cachedABI.abi);

        else {
            abis[contractAccount] = (await enu.contract(contractAccount)).fc;
            const savableAbi = JSON.parse(JSON.stringify(abis[contractAccount]));
            delete savableAbi.schema;
            delete savableAbi.structs;
            delete savableAbi.types;
            savableAbi.timestamp = +new Date();

            await messageSender(NetworkMessageTypes.ABI_CACHE,
                {abiContractName: contractAccount, abi:savableAbi, abiGet: false, chainId:network.chainId});
        }
    }));

    return await Promise.all(signargs.transaction.actions.map(async (action, index) => {
        const contractAccountName = action.account;

        let abi = abis[contractAccountName];

        const data = abi.fromBuffer(action.name, action.data);
        const actionAbi = abi.abi.actions.find(fcAction => fcAction.name === action.name);
        let ricardian = actionAbi ? actionAbi.ricardian_contract : null;

        if(ricardian){
            const htmlFormatting = {h1:'div class="ricardian-action"', h2:'div class="ricardian-description"'};
            const signer = action.authorization.length === 1 ? action.authorization[0].actor : null;
            ricardian = ricardianParser.parse(action.name, data, ricardian, signer, htmlFormatting);
        }

        return {
            data,
            code:action.account,
            type:action.name,
            authorization:action.authorization,
            ricardian
        };
    }));
};
