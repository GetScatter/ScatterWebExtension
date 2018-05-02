import IdGenerator from '../util/IdGenerator'
import Account from './Account';
import Network from './Network';
import ObjectHelpers from '../util/ObjectHelpers'
import Hasher from '../util/Hasher'
import AES from 'aes-oop';


/********************************************/
/*          Personal Information            */
/********************************************/

/* Requirable Fields for an Identity's PersonalInformation */
export const PersonalFields = {
    firstname:'firstname',
    lastname:'lastname',
    email:'email',
    birthdate:'birthdate'
};

export class PersonalInformation {
    constructor(){ Object.keys(PersonalFields).forEach(fieldName => this[fieldName] = ''); }
    static placeholder(){ return new PersonalInformation(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
    findFields(fields){ return fields.filter(field => this.hasOwnProperty(field) && this[field].length); }
}


/********************************************/
/*          Location Information            */
/********************************************/

/* Requirable Fields for an Identity's LocationInformation */
export const LocationFields = {
    phone:'phone',
    address:'address',
    city:'city',
    state:'state',
    country:'country',
    zipcode:'zipcode'
};

export class LocationInformation {
    constructor(){
        this.name = 'Unnamed Location';
        this.isDefault = false;
        Object.keys(LocationFields).forEach(fieldName => this[fieldName] = '');
    }
    static placeholder(){ return new LocationInformation(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
    findFields(fields){
        let foundFields = fields.filter(field => field !== LocationFields.country)
            .filter(field => this.hasOwnProperty(field) && this[field].length);

        if(fields.includes(LocationFields.country) &&
            this.hasOwnProperty('country') &&
            typeof this.country !== 'string')
            foundFields.push(LocationFields.country)

        return foundFields;
    }
}



/********************************************/
/*                 Identity                 */
/********************************************/

/* Requirable Fields for an Identity */
export const IdentityFields = {
    account:'account'
};

let {PrivateKey} = require('eosjs-ecc');

export default class Identity {

    constructor(){
        this.hash = '';
        this.privateKey = '';
        this.publicKey = '';

        this.name = '';

        this.accounts = {};
        this.network = null;

        this.personal = PersonalInformation.placeholder();
        this.locations = [LocationInformation.placeholder()];

        this.disabled = false;
    }

    initialize(){
        return new Promise((resolve, reject) => {
            PrivateKey.randomKey().then(privateKey => {
                this.privateKey = privateKey.toWif();
                this.publicKey = privateKey.toPublic().toString();
                this.hash = Hasher.insecureHash(this.publicKey);
                resolve(true);
            });
        });
    }

    static placeholder(){ return new Identity(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('accounts')) p.accounts = Object.keys(json.accounts).reduce((acc, network) => {
            acc[network] = Account.fromJson(json.accounts[network]);
            return acc;
        }, {});
        if(json.hasOwnProperty('network') && json.network) p.network = Network.fromJson(json.network);
        p.personal = PersonalInformation.fromJson(json.personal);
        if(json.hasOwnProperty('locations')) p.locations = json.locations.map(location => LocationInformation.fromJson(location));
        else p.locations = [LocationInformation.placeholder()];
        return p;
    }

    clone(){ return Identity.fromJson(JSON.parse(JSON.stringify(this))) }


    /***
     * Checks whether a private key is encrypted
     * @returns {boolean}
     */
    isEncrypted(){
        // EOS private keys are 51 characters long
        // AES encrypted EOS private keys are 108 characters long
        return this.privateKey.length > 70
    }

    /***
     * Encrypts this Identity's Private Key
     * @param seed - The seed to encrypt with
     */
    encrypt(seed){
        if(!this.isEncrypted())
            this.privateKey = AES.encrypt(this.privateKey, seed);
    }

    /***
     * Decrypts this Identity's Private Key
     * @param seed - The seed to decrypt with
     */
    decrypt(seed){
        if(this.isEncrypted())
            this.privateKey = AES.decrypt(this.privateKey, seed);
    }

    /***
     * Returns a pre-defined default location or the first on the stack
     * @returns {T|*}
     */
    defaultLocation(){ return this.locations.find(location => location.isDefault) || this.locations[0]; }

    setAccount(network, account){ this.accounts[network.unique()] = account; }

    removeAccount(network){
        const unique = typeof network === 'string' ? network : network.unique();
        this.accounts[unique] = null;
        delete this.accounts[unique];
    }

    /***
     * Checks if this Identity has an associated account.
     * @returns {boolean}
     */
    hasAccount(network){ return this.accounts.hasOwnProperty(network.unique()) }

    /***
     * Gets an account from a public key
     * @returns {boolean}
     */
    getAccountFromPublicKey(publicKey){
        let account;
        Object.keys(this.accounts).map(key => {
            if(this.accounts[key].publicKey === publicKey) account = this.accounts[key];
        })
        return account;
    }

    networkedAccount(network) { return this.accounts[network.unique()] }

    /***
     * Checks if an Identity has specified fields.
     * This is used when an interacting application requires specific information.
     * @param fields - The fields to check for
     * @param network
     * @returns {boolean}
     */
    hasRequiredFields(fields, network = null){
        let foundFields = [];

        // fields should always be lowercase and insecureHash and name should never be searched for
        fields = fields.map(field => field.toLowerCase()).filter(field => field !== 'hash' && field !== 'name');

        if(fields.includes(IdentityFields.account) && this.hasAccount(network)) foundFields.push(IdentityFields.account);
        foundFields = foundFields.concat(this.personal.findFields(fields));
        this.locations.map(location => foundFields = foundFields.concat(location.findFields(fields)));
        foundFields = ObjectHelpers.distinct(foundFields);
        return fields.every(field => foundFields.includes(field));
    }

    /***
     * Returns the value of a property based on the requirable name.
     * @param requirable
     */
    getPropertyValueByName(requirable){
        if(Object.keys(this).includes(requirable)) return this[requirable];
        else if(Object.keys(this.personal).includes(requirable)) return this.personal[requirable];
        else return this.defaultLocation()[requirable];
    }

    /***
     * Returns an object with only the required fields from this Identity
     * @param fields
     * @param network
     */
    asOnlyRequiredFields(fields, network){
        // Adding mandatory fields and converting to lowercase
        fields = ObjectHelpers.distinct(fields.map(field => field.toLowerCase()).concat(['hash', 'publicKey', 'name']));

        const clone = {personal:{},location:{}};
        fields.map(field => {
            if(Object.keys(this).includes(field)) clone[field] = this[field];
            if(Object.keys(PersonalFields).includes(field))
               clone.personal[PersonalFields[field]] = this.personal[PersonalFields[field]];
            if(Object.keys(LocationFields).includes(field))
               clone.location[LocationFields[field]] = this.defaultLocation()[LocationFields[field]];
            if(field === IdentityFields.account) clone[IdentityFields.account] = this.networkedAccount(network)
        });

        if(!Object.keys(clone.personal).length) delete clone.personal;
        if(!Object.keys(clone.location).length) delete clone.location;

        return clone;
    }

    /***
     * Sets up the fields returned to the application
     * @param requiredFields
     * @param fieldsObject
     * @param selectedLocation
     */
    static asReturnedFields(requiredFields, fieldsObject, selectedLocation){
        fieldsObject.location = selectedLocation;
        let returnedFields = {};
        requiredFields.map(field => {
            let fullPath = '';
            if(Object.keys(LocationFields).includes(field)) fullPath = `location.${field}`;
            else if(Object.keys(PersonalFields).includes(field)) fullPath = `personal.${field}`;
            else fullPath = field;
            returnedFields[field] = ObjectHelpers.getFieldFromObjectByDotNotation(fieldsObject, fullPath);
        });
        return returnedFields;
    }

    /***
     * Checks if a name is valid
     * Names must be alphanumeric and may contain spaces, dashes, and underscores.
     * @param name - The name to validate
     * @returns {boolean}
     */
    static nameIsValid(name){
        return name.length > 3 && name.length < 20 && /^([a-zA-Z0-9 _-]+)$/.test(name)
    }
}