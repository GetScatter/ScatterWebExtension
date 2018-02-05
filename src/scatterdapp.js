import NetworkMessage from './messages/NetworkMessage';
import * as NetworkMessageTypes from './messages/NetworkMessageTypes'
import * as PairingTags from './messages/PairingTags'
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

// This is used to verify that private method calls came
// explicitly from inside the class
let instanceRef = new WeakMap();
instanceRef = IdGenerator.text(128);

/***
 * Scatterdapp is the object injected into the web application that
 * allows it to interact with Scatter. Without using this the web application
 * has no access to the extension.
 */
export default class Scatterdapp {

    constructor(_stream){
        this.network = null;
        this.identityHash = null;
        stream = _stream;
        resolvers = [];
        this._subscribe(instanceRef);

        // Sets up the provider to be used by eosjs
        provider = async signargs => {
            if(!this.identityHash) {
                throws('You must select an Identity to use before requesting transaction signatures. ' +
                       'Request an Identity and then use scatter.useIdentity() with the hash.');
                return null;
            }

            const domain = location.host;
            const network = this.network;
            const identityHash = this.identityHash;
            return await this._send(NetworkMessageTypes.REQUEST_SIGNATURE,
                Object.assign(signargs, {domain, network, identityHash})
            , instanceRef);
        }
    }



    /********************************/
    /*                              */
    /*           Private            */
    /*     --------------------     */
    /*     Methods here are         */
    /*     protected using weak     */
    /*     maps and a random id     */
    /*                              */
    /********************************/

    /***
     * Messages do not come back on the same thread.
     * To accomplish a future promise structure this method
     * catches all incoming messages and dispenses
     * them to the open promises. */
    _subscribe(_instanceRef) {
        if(instanceRef !== _instanceRef) throws('Can only subscribe internally.');

        stream.listenWith(msg => {
            if(!msg || !msg.hasOwnProperty('type')) return false;
            for(let i=0; i < resolvers.length; i++) {
                if (resolvers[i].id === msg.resolver) {
                    if(msg.type === 'error') resolvers[i].reject(msg.payload);
                    else resolvers[i].resolve(msg.payload);
                    resolvers = resolvers.slice(i, 1);
                }
            }
        });
    }

    /***
     * Binds a network to this instance of scatterdapp.
     * Only one network can be bound, and it cannot be re-bound.
     * @param _network
     * @param _instanceRef
     * @returns {boolean}
     */
    _bindNetwork(_network, _instanceRef){
        if(instanceRef !== _instanceRef) throws('Can only bind network internally.');

        if(this.network)
            throws("You can only bind a network once.");

        if(!_network || !_network.hasOwnProperty('host') || !_network.hasOwnProperty('port'))
            throws('Malformed network. { host:string, port:number }');

        if(isNaN(_network.port) || !_network.host.length || _network.host.indexOf('.') === -1)
            throws('"port" must be a number and "host" must be a string of a domain or an ip.');

        this.network = _network;
    }

    /***
     * Only a Scatterdapp which has had a network bound to it
     * can be used.
     * @param _reject
     * @param _runIfNetworkBound
     * @param _instanceRef
     */
    _networkGuard(_reject, _runIfNetworkBound, _instanceRef){
        if(instanceRef !== _instanceRef) throws('Can only check network guard internally.');

        if(!this.network) {
            throws(`It seems that a network was not set. 
                Did you create your eosjs instance using scatter.eos() ?`);
            _reject(null);
        }
        _runIfNetworkBound();
    }

    /***
     * Turns message sending between the application
     * and the content script into async promises
     * @param _type
     * @param _payload
     * @param _instanceRef
     */
    _send(_type, _payload, _instanceRef) {
        if(instanceRef !== _instanceRef) throws('Can only send messages internally.');

        return new Promise((resolve, reject) => {
            this._networkGuard(reject, () => {
                let id = IdGenerator.numeric(6);
                let message = new NetworkMessage(_type, _payload, id, this.network, location.host);
                resolvers.push(new DanglingResolver(id, resolve, reject));
                stream.send(message, PairingTags.SCATTER);
            }, _instanceRef);
        })

    }




    /********************************/
    /*                              */
    /*           Public             */
    /*                              */
    /********************************/

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
        this._bindNetwork(_network, instanceRef);
        const httpEndpoint = `http://${_network.host}:${_network.port}`;
        return _eos(Object.assign(_options, {httpEndpoint, signProvider: provider}))
    }


    /***
     * Gets an Identity from the user to use.
     * You shouldn't rely on the state of this object to be immutable.
     * Identities are subject to change and if you use values you saved in
     * a database vs the values on the identity currently signature providers will not work.
     * @param fields - You can specify required fields such as ['email', 'country', 'firstname']
     */
    getIdentity(fields = []){
        return this._send(NetworkMessageTypes.GET_OR_REQUEST_IDENTITY, {
            domain:location.host,
            network:this.network,
            fields
        }, instanceRef);
    }

    /***
     * Sets which Identity to use for transaction signing
     * @param _identityHash - The hash of the identity
     */
    useIdentity(_identityHash){
        this.identityHash = _identityHash;
    }

}