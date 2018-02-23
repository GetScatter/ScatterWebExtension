import NetworkMessage from './messages/NetworkMessage';
import * as NetworkMessageTypes from './messages/NetworkMessageTypes'
import * as PairingTags from './messages/PairingTags'
import Error from './models/errors/Error'
import IdGenerator from './util/IdGenerator';


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
let identityHash = new WeakMap();
let currentVersion = new WeakMap();
let requiredVersion = new WeakMap();



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
 */
const _networkGuard = (_reject, _runIfNetworkBound) => {
    if(!network) {
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
 */
const _send = (_type, _payload) => {
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
        });
    });
};

/***
 * Scatterdapp is the object injected into the web application that
 * allows it to interact with Scatter. Without using this the web application
 * has no access to the extension.
 */
export default class Scatterdapp {

    constructor(_stream, _options){
        currentVersion = parseFloat(_options.version);
        stream = _stream;
        network = null;
        identityHash = null;
        resolvers = [];
        _subscribe();
    }


    /***
     * Returns an instance of eosjs with a signature provider and endpoint bound
     * to it. Adds a level of security over signature provider manipulation.
     * No matter what options are provided, httpEndpoint and signProvider are always overwritten.
     * @param _eos - An instance of Eos.Localnet or Eos.Testnet
     * @param _network - The network you are binding to {host:string, port:number}
     * @param _options - Passable object of eosjs options
     * @returns {*}
     */
    eos(_eos, _network, _options = {}){
        //TODO: Clean up and extrapolate

        _bindNetwork(_network);
        const httpEndpoint = `http://${_network.host}:${_network.port}`;

        // The proxy stands between the eosjs object and scatter.
        // This is used to add special functionality like adding `requiredFields` arrays to transactions
        return new Proxy(_eos(), {
            get(eosInstance, method) {

                // We're holding a reference to the returned fields
                // in the case of a requirement during transactions
                let returnedFields = null;

                return (...args) => {

                    // It is possible to pass requiredFields to the eosjs options parameter
                    // which will be sent along with the signature request to scatter and return
                    // with the signature.
                    let requiredFields = args.find(arg => arg.hasOwnProperty('requiredFields'));
                    requiredFields = requiredFields ? requiredFields.requiredFields : [];

                    // The signature provider which gets elevated into the user's Scatter
                    const signProvider = async signargs => {


                        // TODO: We might not need this now that we can pass things into the transaction
                        // TODO: itself. We should check to see if it's a better workflow to just pass
                        // TODO: the identity hash here instead.
                        if(!identityHash) {
                            throws('You must select an Identity to use before requesting transaction signatures. ' +
                                'Request an Identity and then use scatter.useIdentity() with the hash or add a parameter to this with {identityHash:anIdentityHash}.');
                            return null;
                        }

                        const payload = Object.assign(signargs, { domain:location.host, network, identityHash, requiredFields });

                        const result = await _send(NetworkMessageTypes.REQUEST_SIGNATURE, payload);


                        //TODO: This will need to be returned as an error message in the future
                        if(!result) return null;

                        // Scatter has some special logic for signature requests
                        if(result.hasOwnProperty('signatures')){
                            // Holding onto the returned fields for the result to the application.
                            returnedFields = result.returnedFields;

                            // Local Multi Sig Support
                            // Dapps can pass a keyProvider either in instantation or per-request which will
                            // sign things locally outside of the scope of scatter
                            let multiSigKeyProvider = args.find(arg => arg.hasOwnProperty('keyProvider')) ||
                                _options.find(arg => arg.hasOwnProperty('keyProvider'));
                            if(multiSigKeyProvider) {
                                const localMutiSig = signargs.sign(signargs.buf, multiSigKeyProvider.keyProvider);
                                result.signatures = result.signatures.concat(localMutiSig);
                            }

                            console.log(result)

                            // Returning only the signatures to eosjs
                            return result.signatures;
                        }

                        return result;
                    };

                    // TODO: We need to check about the implications of multiple eosjs instances
                    return new Promise((resolve, reject) => {
                        _eos(Object.assign(JSON.stringify(_options), {httpEndpoint, signProvider}))[method](...args)
                            .then(result => {
                                // We are binding back the required fields that were stored earlier
                                if(requiredFields.length) result = Object.assign(result, {returnedFields});
                                resolve(result)
                            })
                            .catch(error => reject(error))
                    })
                }
            }
        });
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
     * Allows an application to prompt the user to add the network they are using to the user's Scatter
     * Will instantly return true if the network already exists
     */
    suggestNetwork(){
        return _send(NetworkMessageTypes.REQUEST_ADD_NETWORK, {
            domain:location.host,
            network:network
        });
    }

    /***
     * Sets which Identity to use for transaction signing
     * @param _identityObjectOrHash - The hash of the identity, or an Identity object
     */
    useIdentity(_identityObjectOrHash){
        identityHash = typeof _identityObjectOrHash === 'string' ? _identityObjectOrHash :
            _identityObjectOrHash.hasOwnProperty('hash') ? _identityObjectOrHash.hash : '';
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