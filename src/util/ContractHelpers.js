import Hasher from './Hasher'
import ObjectHelpers from './ObjectHelpers'
import {Blockchains} from '../models/Blockchains';

export default class ContractHelpers {

    static getContractAndActionNames(transaction){
        return {contract:transaction.code, action:transaction.type};
    }

    static contractActionChecksum(contract, action, domain, network){
        return Hasher.insecureHash(JSON.stringify(Object.assign({},
            {contract, action, domain, network})
        ));
    }

}