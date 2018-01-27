import Background from '../../src/background';
import InternalMessage from '../../src/messages/InternalMessage';
import InternalMessageTypes from '../../src/messages/InternalMessageTypes';
import Scatter from '../../src/models/Scatter'
import KeyPair from '../../src/models/KeyPair'
import chrome from '../helpers/chrome';

import { expect, assert } from 'chai';
import 'mocha';


// NOTE: This will fail!
// Turn off automatic instantiation of the background.js script before testing!

describe('Background', () => {

    global.chrome = chrome;

    const background = new Background();
    const seed = 'helloworld';
    let scatter = null;

    const randomKeyPair = KeyPair.fromJson({
        publicKey:'EOS7Lgs9MDLuW8PTD2ACjfLZ83wpCDK5r3HKJw8C8U72eguuBsaeD',
        privateKey:'5KXVuuHqyPFrkyQSnvQpcqc2EjNecjhrWDAXJpB5ZSZwCYgeKRT'
    });

    it('should be locked without a seed', done => {
        InternalMessage.signal(InternalMessageTypes.IS_UNLOCKED).send().then(unlocked => {
            assert(!unlocked, "Scatter was locked");
            done();
        })
    });

    it('should be able to seed the background script', done => {
        InternalMessage.payload(InternalMessageTypes.SEED, seed).send().then(seeded => {
            assert(seeded);
            done();
        });
    });

    it('should be able to return a lock status', done => {
        InternalMessage.signal(InternalMessageTypes.IS_UNLOCKED).send().then(unlocked => {
            assert(unlocked, "Scatter was locked");
            done();
        })
    });

    it('should be able to return the Scatter instance', done => {
        InternalMessage.signal(InternalMessageTypes.LOAD).send().then(_scatter => {
            assert(_scatter instanceof Scatter, "Scatter was not loaded properly");
            scatter = Scatter.fromJson(_scatter);
            done();
        })
    });

    it('should be able to update the Scatter instance', done => {
        scatter.meta.version = 'TEST';
        scatter.keychain.keypairs.push(randomKeyPair);
        InternalMessage.payload(InternalMessageTypes.UPDATE, scatter).send().then(updated => {
            InternalMessage.signal(InternalMessageTypes.LOAD).send().then(_scatter => {
                assert(_scatter.meta.version === scatter.meta.version, "Scatter didn't save the version");
                assert(_scatter.keychain.keypairs.length === 1, "Scatter didn't save the KeyPair");
                done();
            })
        })
    });

    it('should save and load with encrypted keypairs', done => {
        InternalMessage.signal(InternalMessageTypes.LOAD).send().then(_scatter => {
            scatter = Scatter.fromJson(_scatter);
            assert(scatter.keychain.keypairs[0].isEncrypted(), "Persisted KeyPair came back decrypted");
            done();
        })
    });

    it('should be able to retrieve a private key from a public key', done => {
        const keypair = scatter.keychain.keypairs[0];
        InternalMessage.payload(InternalMessageTypes.PUB_TO_PRIV, keypair.publicKey).send().then(_privateKey => {
            keypair.privateKey = _privateKey;
            assert(!keypair.isEncrypted(), "Could not get or decrypt private key");
            done();
        })
    });

});