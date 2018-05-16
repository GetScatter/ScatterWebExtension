import {assert} from 'chai';
import 'mocha';

import PluginRepository from '../src/plugins/PluginRepository';
import {Blockchains} from '../src/models/Blockchains'

import ecc from 'eosjs-ecc';
import secp256k1 from 'secp256k1';
import utils from 'ethereumjs-util';

describe('Ethereum key to EOS key', () => {

    const eth = PluginRepository.plugin(Blockchains.ETH);
    const eos = PluginRepository.plugin(Blockchains.EOS);

    let ethPrivateKey = '';
    let ethPublicKey = '';
    let eosPublicKey = '';

    it('should generate base keys', done => {
        new Promise(async(resolve, reject) => {
            ethPrivateKey = await eth.randomPrivateKey();
            ethPublicKey = '0x'+utils.privateToPublic(utils.toBuffer(utils.addHexPrefix(ethPrivateKey))).toString('hex')
            done();
        });
    });

    it('should convert publicKeys', () => {
        let buffer    =         Buffer.from(ethPublicKey.slice(2), 'hex'),
            converted =         secp256k1.publicKeyConvert(Buffer.concat([ Buffer.from([4]), buffer ]), true);
        eosPublicKey =          ecc.PublicKey.fromBuffer(converted).toString();
        assert(eos.validPublicKey(eosPublicKey), "Eos public key was not valid")
    });

    it('should convert keys', () => {
        let ethBuffer =     Buffer.from(ethPrivateKey, 'hex');
        const p =           ecc.PrivateKey.fromHex(ethBuffer);
        const pk =          ecc.privateToPublic(p);
        assert(eosPublicKey === pk, "Converted public and converted private -> public key does not match");
    })

});