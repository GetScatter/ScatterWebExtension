import {IdentityBaseFields, PersonalFields, PersonalInformation, LocationInformation, LocationFields} from '../../src/models/Identity'
import Network from '../../src/models/Network'
import KeyPair from '../../src/models/KeyPair'
import {Blockchains} from '../../src/models/Blockchains'
import Identity from '../../src/models/Identity'
import Account from '../../src/models/Account'
import ObjectHelpers from '../../src/util/ObjectHelpers'
import Hasher from '../../src/util/Hasher'
import RIDLService from '../../src/services/RIDLService'
let {PrivateKey} = require('eosjs-ecc');
import { expect, assert } from 'chai';
import 'mocha';

describe('Identity', () => {

    const randomName = () => {
        return `RandomTester${Math.floor(Math.random() * 1000 + 1)}`;
    };

    const networkEOS = new Network('127.0.0.1', 8888, Blockchains.EOS);
    const networkETH = new Network('127.0.0.1', 8888, Blockchains.ETH, 1);

    const keypairEOS = KeyPair.fromJson({
        blockchain:Blockchains.EOS,
        name:'Eos Test',
        privateKey:'5JPAmzqGszE7gTVsqVacGwxVf5ynyjfWu75v6JMN2LgcdMcFGn1',
        publicKey:'EOS72r7fskhQPvfy16r7FNCqx45CszTuWRqpTZhUjS7CstfXYGJhS'
    });

    const keypairETH = KeyPair.fromJson({
        blockchain:Blockchains.EOS,
        name:'Eos Test',
        privateKey:'a700c8b2744f67adee8a52e0555c351faf087d45d8c6d03a3831ed85f3619b7c',
        publicKey:'0xdb83ff100ec0b6e7e8d385c437e184e4d0112c23'
    });

    const accountEOS = Account.fromJson({
        keypairUnique:keypairEOS.unique(),
        publicKey:keypairEOS.publicKey,
        name:'eostest',
        authority:'active'
    });

    const accountETH = Account.fromJson({
        keypairUnique:keypairETH.unique(),
        publicKey:keypairETH.publicKey,
        name:keypairETH.name,
        authority:''
    });

    const accounts = {
        [networkEOS.unique()]:accountEOS,
        [networkETH.unique()]:accountETH
    };

    const personal = {
        [PersonalFields.firstname]:'Bob',
        [PersonalFields.lastname]:'Sagat',
        [PersonalFields.email]:'bs@dude.com',
        [PersonalFields.birthdate]:'5-11-1987',
    };

    const homeAddress = {
        name:'Home',
        isDefault:true,
        [LocationFields.address]:'5555 Rainbow Road.',
        [LocationFields.city]:'Virginia Beach',
        [LocationFields.state]:'VA',
        [LocationFields.zipcode]:'23464',
        [LocationFields.phone]:'(555)555-5555',
        [LocationFields.country]:{code:'US', name:'United States'},
    };

    const workAddress = {
        name:'Work',
        isDefault:false,
        [LocationFields.address]:'1234 Rainbow Road.',
        [LocationFields.city]:'Virginia Beach',
        [LocationFields.state]:'VA',
        [LocationFields.zipcode]:'23464',
        [LocationFields.phone]:'(555)555-5555',
        [LocationFields.country]:{code:'US', name:'United States'},
    };

    const locations = [homeAddress,workAddress];

    const personalFields = { personal:Object.keys(PersonalFields) };
    const locationFields = { location:Object.keys(LocationFields) };
    const accountFields = {
        accounts:[
            {blockchain:Blockchains.EOS, host:'127.0.0.1', port:8888},
            {blockchain:Blockchains.ETH, chainId:1}
        ]
    };

    let emptyIdentity, accountsIdentity, fullIdentity;
    
    it('should initialize test identities', () => {
        new Promise(async() => {
            const privateKey = '5JSKrbWQsR4Vo7GQiPKDw5VNWHsTqo7j2Qvd9zmX3t6s4a8rHzj';
            const publicKey = 'EOS5nnndpxbBHMZxK8DwxccigWnp7Uwve4KHNotaWtbxqnrNVjSWj';
            const hash = Hasher.insecureHash(publicKey);

            emptyIdentity = Identity.fromJson({ name:randomName(), privateKey, publicKey, hash});
            accountsIdentity = Identity.fromJson({ name:randomName(), privateKey, publicKey, hash, accounts });
            fullIdentity = Identity.fromJson({ name:randomName(), privateKey, publicKey, hash, accounts, personal, locations });
        });
    });

    it('should be able to check if an identity has certain fields', () => {
        assert(!emptyIdentity.hasRequiredFields(accountFields), "Does not have fields but says it does 1");
        assert(!emptyIdentity.hasRequiredFields(locationFields), "Does not have fields but says it does 2");
        assert(!emptyIdentity.hasRequiredFields(accountFields), "Does not have fields but says it does 3");
        assert(fullIdentity.hasRequiredFields(accountFields), "Has fields but says it doesn't 1");
        assert(fullIdentity.hasRequiredFields(Object.assign(accountFields, locationFields)),
            "Has fields but says it doesn't 2");
        assert(fullIdentity.hasRequiredFields(Object.assign(personalFields, Object.assign(accountFields, locationFields))),
            "Has fields but says it doesn't 3");
    });

    const checkReturnedFields = result => {
        assert(result.hasOwnProperty('name') && result.name.length, "Basic Field Missing: name");
        assert(result.hasOwnProperty('hash') && result.hash.length, "Basic Field Missing: hash");
        assert(result.hasOwnProperty('publicKey') & result.publicKey.length, "Basic Field Missing: publicKey");

        assert(result.hasOwnProperty('personal'), "personal field was missing");
        assert(result.personal.hasOwnProperty('firstname') && result.personal.firstname.length, "firstname field was missing");
        assert(result.personal.hasOwnProperty('lastname') && result.personal.lastname.length, "lastname field was missing");
        assert(result.personal.hasOwnProperty('email') && result.personal.email.length, "email field was missing");
        assert(result.personal.hasOwnProperty('birthdate') && result.personal.birthdate.length, "birthdate field was missing");

        assert(result.hasOwnProperty('location'), "location field was missing");
        assert(result.location.hasOwnProperty('country') && typeof result.location.country === 'object', "country field was missing");
        assert(result.location.country.code === 'US' && result.location.country.name === 'United States', "country field was wrong");
        assert(result.location.hasOwnProperty('phone') && result.location.phone.length, "phone field was missing");
        assert(result.location.hasOwnProperty('city') && result.location.city.length, "city field was missing");
        assert(result.location.hasOwnProperty('state') && result.location.state.length, "state field was missing");
        assert(result.location.hasOwnProperty('address') && result.location.address.length, "address field was missing");
        assert(result.location.hasOwnProperty('zipcode') && result.location.zipcode.length, "zipcode field was missing");

        assert(result.hasOwnProperty('accounts'), "accounts field was missing");
        result.accounts.map(account => {
            assert(account.hasOwnProperty('blockchain') && account.blockchain.length, "account was missing blockchain field");
            assert(account.hasOwnProperty('publicKey') || account.hasOwnProperty('name'), "account was missing publicKey or name field");
            if(account.hasOwnProperty('name')) assert(account.name.length, "account was missing name field");
            if(account.hasOwnProperty('publicKey')) assert(account.publicKey.length, "account was missing publicKey field");
        })
    }

    it('should be able to return an identity with only the specified fields', () => {

        assert(Object.keys(fullIdentity.asOnlyRequiredFields({
            personal:['firstname'],
            accounts:accountFields.accounts
        })).length === 5, "Came back with the wrong amount of fields");

        const required = Object.assign(personalFields, Object.assign(accountFields, locationFields));
        checkReturnedFields(fullIdentity.asOnlyRequiredFields(required));
        checkReturnedFields(Identity.asReturnedFields(required, fullIdentity.clone(), workAddress));
    })

    it('should be able to allow/disallow names', () => {
        const passingNames = [
            'HelloWorld',
            'helloworld',
            'test1234',
            'test_1234',
            'test-1234'
        ];
        const failingNames = [
            '',
            'a',
            'ab',
            'This is',
            '.AFailing',
            '#Name',
            'ascvdfertghtrfdsase21'
        ];
        passingNames.map(name => assert(Identity.nameIsValid(name), `Name should have been valid but wasn't: ${name}`))
        failingNames.map(name => assert(!Identity.nameIsValid(name), `Name should not have been valid but was: ${name}`));
    });

});