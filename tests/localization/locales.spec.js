import {locales} from '../../src/localization/locales'
import chrome from '../helpers/chrome';

import Eos from 'eosjs';

import { expect, assert } from 'chai';
import 'mocha';


describe('Signature Request', async testDone => {

    global.chrome = chrome;

    it('should work', done => {
        console.log('locales', locales());
        done();
    });



});