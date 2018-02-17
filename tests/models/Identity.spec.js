import {IdentityFields, PersonalFields, PersonalInformation, LocationInformation, LocationFields} from '../../src/models/Identity'
import Identity from '../../src/models/Identity'
import Account from '../../src/models/Account'
import ObjectHelpers from '../../src/util/ObjectHelpers'
import { expect, assert } from 'chai';
import 'mocha';

describe('Identity', () => {

    it('should be able to check if an identity has certain fields', () => {
        const identity = Identity.placeholder();
        identity.personal.firstname = 'Bob';
        identity.location.address = 'Rainbow Road';

        assert(identity.hasRequiredFields([PersonalFields.firstname]));
        assert(identity.hasRequiredFields([LocationFields.address]));

        assert(!identity.hasRequiredFields([PersonalFields.lastname]));
        assert(!identity.hasRequiredFields([LocationFields.city]));
        assert(!identity.hasRequiredFields([IdentityFields.account]));
    });

    it('should be able to return an identity with only the specified fields', () => {
        const identity = Identity.placeholder();
        identity.personal.firstname = 'Bob';
        identity.personal.email = 'b@b.com';
        identity.location.country = {code:'US', name:'United States'};
        identity.account = Account.fromJson({name:'hi', authority:'active', publicKey:'EOS5i9qh2SQ4FG84FBtxG7wAXAD54gNwx2nCjfy4zYsJkX8arTKra'});

        const fields = ['firstname'];
        const mandatoryFields = ['name', 'hash', 'network']

        const requiredOnlyFields = ObjectHelpers.objectToFlatKeys(identity.asOnlyRequiredFields(fields));
        assert(requiredOnlyFields.every(a => fields.concat(mandatoryFields).includes(a)), "Came back with too many or too few required fields")
    })

});