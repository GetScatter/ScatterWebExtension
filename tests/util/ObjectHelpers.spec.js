import ObjectHelpers from '../../src/util/ObjectHelpers'
import {LocationFields, LocationInformation} from '../../src/models/Identity'
import { expect, assert } from 'chai';
import 'mocha';

describe('ObjectHelpers', () => {

    const location = LocationInformation.fromJson({
        name:'test',
        country:{code:'US', name:'United States'}
    });

    it('should be able to get a property from a field using dot notation', () => {
        assert(ObjectHelpers.getFieldFromObjectByDotNotation(location, 'country.code') === 'US',
            "Could not get `country.code` property from the object.");

        assert(ObjectHelpers.getFieldFromObjectByDotNotation(location, 'name') === 'test',
            "Could not get `name` property from the object.");
    });

    it('should return undefined from non-existent properties', () => {
        assert(ObjectHelpers.getFieldFromObjectByDotNotation(location, 'noprop') === undefined,
            "Trying to get non existant prop was not undefined");
    });

});