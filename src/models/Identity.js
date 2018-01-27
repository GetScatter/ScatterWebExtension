import IdGenerator from '../util/IdGenerator'
import Account from './Account';
import Network from './Network';


/********************************************/
/*          Personal Information            */
/********************************************/

/* Requirable Fields for an Identity's PersonalInformation */
export const PersonalFields = {
    firstname:'firstname',
    lastname:'lastname',
    email:'email',
    age:'age'
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
    address:'address',
    city:'city',
    state:'state',
    country:'country',
    zipcode:'zipcode'
};

export class LocationInformation {
    constructor(){ Object.keys(LocationFields).forEach(fieldName => this[fieldName] = ''); }
    static placeholder(){ return new LocationInformation(); }
    static fromJson(json){ return Object.assign(this.placeholder(), json); }
    findFields(fields){ return fields.filter(field => this.hasOwnProperty(field) && this[field].length); }
}



/********************************************/
/*                 Identity                 */
/********************************************/

/* Requirable Fields for an Identity */
export const IdentityFields = {
    account:'account'
};

export default class Identity {

    constructor(){
        this.hash = IdGenerator.text(128);
        this.name = '';

        this.account = null;
        this.network = null;

        this.personal = PersonalInformation.placeholder();
        this.location = LocationInformation.placeholder();
    }

    static placeholder(){ return new Identity(); }
    static fromJson(json){
        let p = Object.assign(this.placeholder(), json);
        if(json.hasOwnProperty('account') && json.account) this.account = Account.fromJson(json.account);
        if(json.hasOwnProperty('network') && json.network) this.network = Network.fromJson(json.network);
        this.personal = PersonalInformation.fromJson(json.personal);
        this.location = LocationInformation.fromJson(json.location);
        return p;
    }

    /***
     * Checks if this Identity has an associated account.
     * @returns {boolean}
     */
    hasAccount(){ return this.account && this.account.hasOwnProperty('name') && this.account.name.length; }

    /***
     * Checks if an Identity has specified fields.
     * This is used when an interacting application requires specific information.
     * @param fields - The fields to check for
     * @returns {boolean}
     */
    hasRequiredFields(fields){
        let foundFields = [];
        if(fields.includes(IdentityFields.account) && this.hasAccount()) foundFields.push(IdentityFields.account);
        foundFields = foundFields.concat(this.personal.findFields(fields));
        foundFields = foundFields.concat(this.location.findFields(fields));
        return fields.every(field => foundFields.includes(field));
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