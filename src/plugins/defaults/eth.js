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
        const accounts = ['0x25eeb9393caf76698c084cfc372855f0426bc658'];
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
            txData.value = txData.value || '0x00';
            txData.data = ethUtil.addHexPrefix(txData.data);

            // const requiredFields = [];
            // const payload = Object.assign(txData, { domain:location.host.replace('www.',''), network, requiredFields });
            // const result = await internalMessageSender(NetworkMessageTypes.REQUEST_SIGNATURE, payload);

            const privateKey = ethUtil.toBuffer('0xf842b62a117bb22f51c9dc42acafebab561ac163450ffac3baef3ff538b4cbf9');

            const tx = new EthTx(txData);
            tx.sign(privateKey);
            const sig = '0x' + tx.serialize().toString('hex');
            resolve(sig);
            callback(null, sig);
        })
    }
}

export default class ETH extends Plugin {

    constructor(){
        super(Blockchains.ETH, PluginTypes.BLOCKCHAIN_SUPPORT)
    }

    accountFormatter(account){
        return `${account.publicKey}`
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

            const rpcUrl = `${_prefix}://${network.host}:${network.port}`;

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