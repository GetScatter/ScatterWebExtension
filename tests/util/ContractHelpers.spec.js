import ContractHelpers from '../../src/util/ContractHelpers'
import { expect, assert } from 'chai';
import 'mocha';

describe('ContractHelpers', () => {

    const domain = 'test.com';
    const network = { host:'test.com', port:8080 };

    const message = {
        authorization:[{ account:'test', permission:'active' }],
        code:'eos',
        type:'transfer',
        data:{
            from:'test',
            to:'inita',
            amount:'10',
            memo:''
        }
    };

    const differentMessages = [
        {
            authorization:[{ account:'inita', permission:'active' }],
            code:'eos',
            type:'transfer',
            data:{
                from:'inita',
                to:'test',
                amount:'10',
                memo:''
            }
        },
        {
            authorization:[{ account:'test', permission:'active' }],
            code:'eos',
            type:'transfer',
            data:{
                from:'test',
                to:'inita',
                amount:'11',
                memo:''
            }
        },
        {
            authorization:[{ account:'test', permission:'active' }],
            code:'eos',
            type:'something_else',
            data:{
                from:'test',
                to:'inita',
                amount:'10',
                memo:''
            }
        },
        {
            authorization:[{ account:'test', permission:'active' }],
            code:'eos2',
            type:'transfer',
            data:{
                from:'test',
                to:'inita',
                amount:'10',
                memo:''
            }
        }
    ];

    let checksum = '';

    it('should be able to create a checksum', () => {
        checksum = ContractHelpers.messageChecksum(message, 'test', domain, network);
    });

    it('should know that a contract itself or the message conditions have changed and should fail the checksum validation', () => {
        differentMessages.map(msg => {
            assert(!ContractHelpers.validChecksum(checksum, msg, 'test', domain, network), "checksum came back valid but should not have");
        })
    });

    it('should know that an exact same message is valid by it\'s checksum', () => {
        assert(ContractHelpers.validChecksum(checksum, message, 'test', domain, network));
    });

});