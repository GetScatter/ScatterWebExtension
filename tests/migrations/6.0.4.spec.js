import Network from '../../src/models/Network'
import PluginRepository from '../../src/plugins/PluginRepository';
import {Blockchains} from '../../src/models/Blockchains'

const {m6_0_4} = require('../../src/migrations/versions/6.0.4');

import { expect, assert } from 'chai';
import 'mocha';

describe('Identity', () => {

    it('should upgrade a scatter instances endorsed networks', done => {
        new Promise(async () => {
            const eosEnd = await PluginRepository.plugin(Blockchains.EOS).getEndorsedNetwork();
            const eodEndWrongPort = eosEnd;
            eosEnd.port = 80;
            const fakeScatter = {
                keychain:{
                    identities:[
                        {
                            accounts:{
                                'unlinkednetwork':{shouldBe:'deleted'},
                                [eosEnd.unique()]:{shouldBe:'left'}
                            }
                        }
                    ]
                },
                settings:{
                    networks:[eodEndWrongPort]
                }
            };

            await m6_0_4(fakeScatter);

            assert(fakeScatter.settings.networks[0].port === 443, 'EOS Endorsed network had a bad port');
            assert(Object.keys(fakeScatter.keychain.identities[0].accounts).length === 1, 'Too many accounts');
            assert(JSON.stringify(fakeScatter.keychain.identities[0].accounts[eosEnd.unique()]) === JSON.stringify({shouldBe:'left'}), 'Did not delete the right accounts');

            done();
        });
    })
});