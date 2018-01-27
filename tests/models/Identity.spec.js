import {IdentityFields, PersonalFields, PersonalInformation, LocationInformation, LocationFields} from '../../src/models/Identity'
import Identity from '../../src/models/Identity'
import { expect, assert } from 'chai';
import 'mocha';

describe('Identity', () => {

    it('should be able to check if an identity has certain fields', () => {
        const identity = new Identity.placeholder();
        identity.personal.firstname = 'Bob';
        identity.location.address = 'Rainbow Road';

        assert(identity.hasRequiredFields([PersonalFields.firstname]));
        assert(identity.hasRequiredFields([LocationFields.address]));

        assert(!identity.hasRequiredFields([PersonalFields.lastname]));
        assert(!identity.hasRequiredFields([LocationFields.city]));
        assert(!identity.hasRequiredFields([IdentityFields.account]));
    });

});