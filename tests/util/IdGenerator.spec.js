import IdGenerator from '../../src/util/IdGenerator'
import { expect, assert } from 'chai';
import 'mocha';

describe('IdGenerator', () => {

    it('should be able to generate a random textual id', () => {
        const random32 = IdGenerator.text(32);
        const random32_2 = IdGenerator.text(32);
        const random64 = IdGenerator.text(64);
        const random128 = IdGenerator.text(128);
        assert(random32.length === 32);
        assert(random32 !== random32_2);
        assert(random64.length === 64);
        assert(random128.length === 128);
    });

    it('should be able to generate a random numeric id', () => {
        const random32 = IdGenerator.numeric(32);
        const random32_2 = IdGenerator.numeric(32);
        const random64 = IdGenerator.numeric(64);
        const random128 = IdGenerator.numeric(128);
        assert(random32.length === 32);
        assert(random32 !== random32_2);
        assert(random64.length === 64);
        assert(random128.length === 128);
        assert(!isNaN(random32));
    });

});