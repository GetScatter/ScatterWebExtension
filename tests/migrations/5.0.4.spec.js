import Network from '../../src/models/Network'

const {m5_0_4} = require('../../src/migrations/versions/5.0.4');

import { expect, assert } from 'chai';
import 'mocha';

describe('Identity', () => {

    it('should upgrade a scatter instances endorsed networks', done => {
        new Promise(async () => {
            const fakeScatter = {
                settings:{
                    networks:[
                        Network.fromJson({host:'nodes.get-scatter.com', port:80}),
                        Network.fromJson({host:'tester.com', port:80}),
                        Network.fromJson({host:'tester2.com', port:443})
                    ]
                }
            };

            await m5_0_4(fakeScatter);

            assert(fakeScatter.settings.networks[0].name === 'EOS Mainnet', 'EOS Endorsed network was not named');
            assert(fakeScatter.settings.networks[1].protocol === 'http', 'Port 80 got the wrong protocol');
            assert(fakeScatter.settings.networks[2].protocol === 'https', 'Port 443 got the wrong protocol');

            done();
        });
    })
});