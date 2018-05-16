import {assert} from 'chai';
import 'mocha';

import PluginRepository from '../src/plugins/PluginRepository';
import {Blockchains} from '../src/models/Blockchains'

import ecc from 'eosjs-ecc';
import secp256k1 from 'secp256k1';
import utils from 'ethereumjs-util';

describe('Ethereum key to EOS key', () => {

    // Private Key: 5JtFoHqGeR7GD7i73uJvqBYfn6h2ChELZGrppKJosxg4nL6moGC
    // Public Key: EOS6aMw6j5JcUaPNuzGB2fs9VyHepxKHvDjuhpHYm7FMF8BA3qpW4

    const eth = PluginRepository.plugin(Blockchains.ETH);
    const eos = PluginRepository.plugin(Blockchains.EOS);

    const ethPrivateKey = eth.randomPrivateKey();
    const ethPublicKey = '0x'+utils.privateToPublic(utils.toBuffer(utils.addHexPrefix(ethPrivateKey))).toString('hex');
    console.log('eth', ethPrivateKey, ethPublicKey)
    let eosPublicKey = '';

    console.log('test');

    it('should convert publicKeys', () => {
        let buffer    =         Buffer.from(ethPublicKey.slice(2), 'hex'),
            converted =         secp256k1.publicKeyConvert(Buffer.concat([ Buffer.from([4]), buffer ]), true);
        eosPublicKey =      ecc.PublicKey.fromBuffer(converted).toString();
    })

    it('should convert keys', () => {
        let ethBuffer = Buffer.from(ethPrivateKey, 'hex');
        const p = ecc.PrivateKey.fromHex(ethBuffer);
        const pk = ecc.privateToPublic(p);
        console.log('private',eosPublicKey, pk);
    })

});