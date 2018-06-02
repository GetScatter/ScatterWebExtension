import Scatter from '../../src/models/Scatter'
import Scatterdapp from '../../src/scatterdapp'
import KeyPair from '../../src/models/KeyPair'
import Account from '../../src/models/Account'
import Identity from '../../src/models/Identity'
import {PersonalInformation, LocationInformation} from '../../src/models/Identity'
import Network from '../../src/models/Network'
import chrome from '../helpers/chrome';
import PluginRepository from '../../src/plugins/PluginRepository'
import {EncryptedStream} from 'extension-streams';
import {Blockchains} from '../../src/models/Blockchains'

import Eos from 'eosjs';

import { expect, assert } from 'chai';
import 'mocha';


describe('Signature Request', async testDone => {

    global.chrome = chrome;

    const network = Network.fromJson({
        host:'x.x.x.x',
        port:'0000'
    });

    // Using a pre-generated keypair to evade entropy gathering
    const keypair = KeyPair.fromJson({
        publicKey:'EOS68fyx6VBXvk4TtEC8GL5GP5qJcod9f7ZcZWBTVSbAYhAwkWkQu',
        privateKey:'5KLkgBvMi1Ed9x2xWkiNdZNYZR1DSfJxVqK9fhRtDuKucn1bcUY'
    });

    const account = Account.fromJson({
        publicKey:keypair.publicKey,
        name:'test123',
        authority:'active'
    });

    const identity = new Identity();
    identity.name = 'e2eTest';
    identity.personal = PersonalInformation.fromJson({
        firstname:'hello',
        lastname:'world',
        email:'asdf@asdf.com'
    });
    identity.locations = [LocationInformation.fromJson({
        name:'Home',
        isDefault:true,
        phone:'47912559',
        address:'1561 Dylan Dr',
        city:'Virginia Beach',
        state:'VA',
        country:{code:'US', name:'United States'},
        zipcode:'23464'
    })];
    identity.setAccount(network, account);


    const scatter = new Scatter();
    scatter.keychain.keypairs.push(keypair);
    scatter.keychain.identities.push(identity);

    // TODO: Update to dawn 3 once eosjs is ready
    let unsignedTransaction = {
        scope: [account.name, 'inita'],
        messages: [
            {
                code: 'eos',
                type: 'transfer',
                authorization: [{
                    account: account.name,
                    permission: 'active'
                }],
                data: {
                    from: account.name,
                    to: 'inita',
                    amount: 1,
                    memo: 'Test'
                }
            }
        ]
    };

    const eos = Eos({
        keyProvider: [keypair.privateKey],
        mockTransactions: () => 'pass',
        broadcast: false,
        sign: true
    });

    // it('should initialize deferred mock vars', done => {
    //     identity.initialize().then(done());
    // });

    it('should be able to set up a transaction to be signed', done => {

        const signProvider = PluginRepository.plugin(Blockchains.EOS).signatureProvider();
        eos.transfer('inita', 'initb', '10.000 EOS', '', {signProvider}).then(done => {

        });

        done();
    });



});