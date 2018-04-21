import NetworkMessage from './messages/NetworkMessage';
import * as NetworkMessageTypes from './messages/NetworkMessageTypes'
import * as PairingTags from './messages/PairingTags'
import Error from './models/errors/Error'
import IdGenerator from './util/IdGenerator';
import PluginRepository from './plugins/PluginRepository';
const ecc = require('eosjs-ecc');


const throws = (msg) => {
    throw new Error(msg);
};

/***
 * This is just a helper to manage resolving fake-async
 * requests using browser messaging.
 */
class DanglingResolver {
    constructor(_id, _resolve, _reject){
        this.id = _id;
        this.resolve = _resolve;
        this.reject = _reject;
    }
}

// Removing properties from exposed scatterdapp object
// Pseudo privacy
let provider = new WeakMap();
let stream = new WeakMap();
let resolvers = new WeakMap();
let network = new WeakMap();
let publicKey = new WeakMap();
let currentVersion = new WeakMap();
let requiredVersion = new WeakMap();

const throwIfNoIdentity = () => {
    if(!publicKey) throws(
        'You must select an Identity to use before requesting transaction signatures. ' +
        'Request an Identity and then use scatter.useIdentity() with the hash or add a parameter to this with {publicKey}.');
};


/***
 * Messages do not come back on the same thread.
 * To accomplish a future promise structure this method
 * catches all incoming messages and dispenses
 * them to the open promises. */
const _subscribe = () => {
    stream.listenWith(msg => {
        if(!msg || !msg.hasOwnProperty('type')) return false;
        for(let i=0; i < resolvers.length; i++) {
            if (resolvers[i].id === msg.resolver) {
                if(msg.type === 'error') resolvers[i].reject(msg.payload);
                // Temporary error handling to catch rejector
                // if(msg.payload === null) resolvers[i].reject(msg.payload);
                else resolvers[i].resolve(msg.payload);
                resolvers = resolvers.slice(i, 1);
            }
        }
    });
};

/***
 * Binds a network to this instance of scatterdapp.
 * Only one network can be bound, and it cannot be re-bound.
 * @param _network
 * @returns {boolean}
 */
const _bindNetwork = (_network) => {
    if(network)
        throws("You can only bind a network once.");

    if(!_network || !_network.hasOwnProperty('host') || !_network.hasOwnProperty('port'))
        throws('Malformed network. { host:string, port:number }');

    if(isNaN(_network.port) || !_network.host.length || _network.host.indexOf('.') === -1)
        throws('"port" must be a number and "host" must be a string of a domain or an ip.');

    network = _network;
};

/***
 * Only a Scatterdapp which has had a network bound to it
 * can be used.
 * @param _reject
 * @param _runIfNetworkBound
 * @param bypassNetwork
 */
const _networkGuard = (_reject, _runIfNetworkBound, bypassNetwork) => {
    if(!bypassNetwork && !network) {
        throws(`It seems that a network was not set. 
                Did you create your eosjs instance using scatter.eos() ?`);
        _reject(null);
    }
    _runIfNetworkBound();
};

/***
 * Turns message sending between the application
 * and the content script into async promises
 * @param _type
 * @param _payload
 * @param bypassNetwork
 */
const _send = (_type, _payload, bypassNetwork = false) => {
    return new Promise((resolve, reject) => {

        // Version requirements
        if(!!requiredVersion && requiredVersion > currentVersion){
            const mandatoryNetwork = network ? network : {host:'', port:0};
            let message = new NetworkMessage(NetworkMessageTypes.REQUEST_VERSION_UPDATE, {domain:location.host}, -1, null, location.host);
            stream.send(message, PairingTags.SCATTER);
            reject(Error.requiresUpgrade());
            return false;
        }

        _networkGuard(reject, () => {
            let id = IdGenerator.numeric(6);
            let message = new NetworkMessage(_type, _payload, id, network, location.host);
            resolvers.push(new DanglingResolver(id, resolve, reject));
            stream.send(message, PairingTags.SCATTER);
        }, bypassNetwork);
    });
};

const setupSigProviders = context => {
    PluginRepository.signatureProviders().map(sigProvider => {
        context[sigProvider.name] = sigProvider.signatureProvider(_bindNetwork, _send, throwIfNoIdentity);
    })
};

/***
 * Scatterdapp is the object injected into the web application that
 * allows it to interact with Scatter. Without using this the web application
 * has no access to the extension.
 */
export default class Scatterdapp {

    constructor(_stream, _options){
        currentVersion = parseFloat(_options.version);
        publicKey = _options.identity ? _options.identity.publicKey : null;
        this.identity = _options.identity;
        stream = _stream;
        network = null;
        resolvers = [];

        setupSigProviders(this);
        // const proxies = new BlockchainPlugins(_bindNetwork, _send, throwIfNoIdentity, publicKey, network)
        // this['eos'] = proxies.eos;

        _subscribe();

        if(this.identity) this.useIdentity(publicKey);

    }

    /***
     * Gets an Identity from the user to use.
     * You shouldn't rely on the state of this object to be immutable.
     * Identities are subject to change and if you use values you saved in
     * a database vs the values on the identity currently signature providers will not work.
     * @param fields - You can specify required fields such as ['email', 'country', 'firstname']
     */
    getIdentity(fields = []){
        return _send(NetworkMessageTypes.GET_OR_REQUEST_IDENTITY, {
            domain:location.host,
            network:network,
            fields
        });
    }

    /***
     * Sets which Identity to use for transaction signing
     * @param _identityObjectOrPublicKey - The publicKey of the identity, or an Identity object
     */
    useIdentity(_identityObjectOrPublicKey){
        if(typeof _identityObjectOrPublicKey === 'object') this.identity = _identityObjectOrPublicKey;
        publicKey = typeof _identityObjectOrPublicKey === 'string' ? _identityObjectOrPublicKey :
            _identityObjectOrPublicKey.hasOwnProperty('hash') ? _identityObjectOrPublicKey.publicKey : '';
    }

    /***
     * Allows an application to prompt the user to add the network they are using to the user's Scatter
     * Will instantly return true if the network already exists
     */
    suggestNetwork(){
        return _send(NetworkMessageTypes.REQUEST_ADD_NETWORK, {
            domain:location.host,
            network:network
        });
    }

    async authenticate(){
        throwIfNoIdentity();

        // TODO: Verify identity matches RIDL registration

        const signature = await _send(NetworkMessageTypes.AUTHENTICATE, {
            domain:location.host,
            publicKey
        }, true).catch(err => err);

        // If the `signature` is an object, it's an error message
        if(typeof signature === 'object') return signature;

        try {
            if(ecc.verify(signature, location.host, publicKey))
                return signature;
        } catch (e) {
            this.identity = null;
            publicKey = '';
            throws('Could not authenticate identity');
        }
    }

    /***
     * Sets a version requirement. If the version is not met all
     * scatter requests will fail and notify the user of the reason.
     * @param _version
     */
    requireVersion(_version){
        requiredVersion = _version;
    }

}