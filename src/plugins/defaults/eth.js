import Plugin from '../Plugin';
import * as PluginTypes from '../PluginTypes';
import {Blockchains} from '../../models/Blockchains'
import * as NetworkMessageTypes from '../../messages/NetworkMessageTypes'
import StringHelpers from '../../util/StringHelpers'
import Error from '../../models/errors/Error'
import Web3 from 'web3';
const ProviderEngine = require('web3-provider-engine');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
const WebsocketSubprovider = require('web3-provider-engine/subproviders/websocket');
import HookedWalletSubprovider from "web3-provider-engine/subproviders/hooked-wallet";
const EthTx = require('ethereumjs-tx')
const ethUtil = require('ethereumjs-util')



let networkGetter = new WeakMap();
let internalMessageSender = new WeakMap();
let throwIfNoIdentity = new WeakMap();

const proxy = (dummy, handler) => new Proxy(dummy, handler);

class ScatterEthereumWallet {
    constructor(){
        this.getAccounts = this.getAccounts.bind(this);
        this.signTransaction = this.signTransaction.bind(this);
    }

    getAccounts(callback) {
        console.log('getting account');
        // const web3 = new Web3();
        // const account = web3.eth.accounts.create();
        // const accounts = [account];
        const accounts = ['0x8bde5c170f48b3e94acb08996f95bfe8dfeba5f3'];
        return new Promise((resolve, reject) => {
            callback(null, accounts);
            resolve(accounts)
        })
    }

    signTransaction(txData, callback){
        // defaults
        const network = networkGetter();
        if(!network) throw Error.noNetwork();


        return new Promise(async (resolve, reject) => {
            if (txData.gas !== undefined) txData.gasLimit = txData.gas;
            console.log('txData', txData);
            txData.value = txData.value || '0x00';
            txData.data = ethUtil.addHexPrefix(txData.data);

            // const requiredFields = [];
            // const payload = Object.assign(txData, { domain:location.host.replace('www.',''), network, requiredFields });
            // const result = await internalMessageSender(NetworkMessageTypes.REQUEST_SIGNATURE, payload);

            const privateKey = ethUtil.addHexPrefix('2861292df0a197151202d08495e8f58c1c2b00bb24a5d3e2a9968a81ed2d08f3');

            const tx = new EthTx(txData);
            tx.sign(ethUtil.toBuffer(privateKey));
            const sig = '0x' + tx.serialize().toString('hex');
            resolve(sig);
            callback(null, sig);
        })
    }
}

const toBuffer = key => ethUtil.toBuffer(ethUtil.addHexPrefix(key));

export default class ETH extends Plugin {

    constructor(){
        super(Blockchains.ETH, PluginTypes.BLOCKCHAIN_SUPPORT)
    }

    accountFormatter(account){
        return `${account.publicKey}`
    }

    privateToPublic(privateKey){ return ethUtil.addHexPrefix(ethUtil.privateToAddress(toBuffer(privateKey)).toString('hex')); }
    validPrivateKey(privateKey){ return ethUtil.isValidPrivate(toBuffer(privateKey)); }
    validPublicKey(publicKey){   return ethUtil.isValidAddress(publicKey); }
    randomPrivateKey(){
        return new Promise((resolve, reject) => {
            const entropy = Array.from({length:32}).map(i => Math.round(Math.random() * 255));
            const privateKey = new Buffer(entropy);
            resolve(privateKey.toString('hex'));
        })
    }

    signer(bgContext, payload, publicKey, callback, arbitrary = false, isHash = false){

    }

    signatureProvider(...args){

        networkGetter = args[0];
        internalMessageSender = args[1];
        throwIfNoIdentity = args[2];

        return (_web3, _prefix) => {
            const network = networkGetter();
            if(!network) throw Error.noNetwork();

            const rpcUrl = `${_prefix}://${network.hostport()}`;

            const engine = new ProviderEngine();
            const web3 = new Web3(engine);





            console.log('new ScatterEthereumWallet()', new ScatterEthereumWallet());

            const walletSubprovider = new HookedWalletSubprovider(new ScatterEthereumWallet());
            console.log('walletSubprovider', walletSubprovider);
            engine.addProvider(walletSubprovider);

            if(_prefix.indexOf('http') !== -1) engine.addProvider(new RpcSubprovider({rpcUrl}));
            else engine.addProvider(new WebsocketSubprovider({rpcUrl}));

            engine.start();


            return web3;

            //

        }
    }

}