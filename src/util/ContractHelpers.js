import Hasher from './Hasher'
import ObjectHelpers from './ObjectHelpers'
import {Blockchains} from '../models/Blockchains';

class EOSContractHelpers {

    static actionParticipants(payload){
        return ObjectHelpers.flatten(
            payload.messages
                .map(message => message.authorization
                    .map(auth => `${auth.actor}@${auth.permission}`))
        );
    }

    static contractAndActionNames(transaction){
        return {contract:transaction.code, action:transaction.type};
    }

    static actionFields(payload){
        return payload.data;
    }
}

export default class ContractHelpers {

    static actionParticipants(payload, blockchain = Blockchains.EOS){
        switch(blockchain){
            case Blockchains.EOS: return EOSContractHelpers.actionParticipants(payload);
        }
    }

    static getContractAndActionNames(transaction, blockchain = Blockchains.EOS){
        switch(blockchain){
            case Blockchains.EOS: return EOSContractHelpers.contractAndActionNames(transaction);
        }
    }

    static getActionFields(transaction, blockchain = Blockchains.EOS){
        switch(blockchain){
            case Blockchains.EOS: return EOSContractHelpers.actionFields(transaction);
        }
    }




    static contractActionChecksum(contract, action, domain, network){
        return Hasher.insecureHash(JSON.stringify(Object.assign({},
            {contract, action, domain, network})
        ));
    }

    static messageChecksum(message, signingAccountName, domain, network, requiredFields = []){
        return Hasher.insecureHash(JSON.stringify(Object.assign(message, {domain, network, requiredFields})))
    }

}