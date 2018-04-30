import Plugin from '../Plugin';
import * as PluginTypes from '../PluginTypes';
import {Blockchains} from '../../models/Blockchains'
import * as NetworkMessageTypes from '../../messages/NetworkMessageTypes'
import StringHelpers from '../../util/StringHelpers'
import Error from '../../models/errors/Error'
// const ecc = require('eosjs-ecc');
import Eos from 'eosjs'
let {ecc} = Eos.modules;

let networkGetter = new WeakMap();
let internalMessageSender = new WeakMap();
let throwIfNoIdentity = new WeakMap();

const proxy = (dummy, handler) => new Proxy(dummy, handler);

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

        return (_web3, _options = {}) => {

            const network = networkGetter();
            if(!network) throw Error.noNetwork();

            const httpEndpoint = `http://${network.host}:${network.port}`;



            // The proxy stands between the eosjs object and scatter.
            // This is used to add special functionality like adding `requiredFields` arrays to transactions
            return proxy(new _web3(), {
                get(web3Instance, method) {


                }
            }); // Proxy
        }
    }
}