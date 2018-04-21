import Prompt from '../models/prompts/Prompt';
import * as PromptTypes from '../models/prompts/PromptTypes'
import Identity from '../models/Identity';
import Network from '../models/Network';
import Error from '../models/errors/Error';
import {LocationFields} from '../models/Identity';
import * as HistoricEventTypes from '../models/histories/HistoricEventTypes'
import ObjectHelpers from '../util/ObjectHelpers'
import ContractHelpers from '../util/ContractHelpers'
import NotificationService from './NotificationService'
import Permission from '../models/Permission'
import {Blockchains} from '../models/Blockchains';
const ecc = require('eosjs-ecc');

class TransactionSigner {
    static eos(context, payload, publicKey, callback){
        const buf = Buffer.from(payload.buf.data, 'utf8');
        context.publicToPrivate(privateKey => {
            callback(privateKey ? ecc.sign(buf, privateKey) : null);
        }, publicKey);
    }
}

export default class SignatureService {

    static requestSignature(payload, scatter, context, sendResponse, blockchain = Blockchains.EOS){
        const {domain, network, requiredFields} = payload;

        // TODO: consolidate functionality and switch based on blockchain type ( EOS, ETH, etc )

        // Checking if identity still exists
        const identity = scatter.keychain.findIdentity(payload.publicKey);
        if(!identity){
            sendResponse(Error.identityMissing());
            return false;
        }

        // Getting the account from the identity based on the network
        const account = identity.networkedAccount(Network.fromJson(network));

        // Checking if Identity still has all the necessary accounts
        // const requiredAccounts = ContractHelpers.actionParticipants(payload, blockchain);
        // if(!requiredAccounts.includes(account['format'+blockchain]())){
        //     sendResponse(Error.signatureAccountMissing());
        //     return false;
        // }


        const sign = (returnedFields) => {
            TransactionSigner.eos(context, payload, account.publicKey, signature => {
                if(!signature){
                    sendResponse(Error.maliciousEvent());
                    return false;
                }

                // Adding historic event
                context.addHistory(HistoricEventTypes.SIGNED_TRANSACTION, {
                    domain,
                    network,
                    identityName:identity.name,
                    publicKey:identity.publicKey,
                    account:account,
                    transaction:payload.transaction, // TODO: EOS Specific
                    hash:'' // <-- hmmm, what to do with this? There is no hash here to track yet. :(
                });

                console.log('sending back fields', returnedFields);

                sendResponse({
                    signatures:[signature],
                    returnedFields:returnedFields
                });
            });
        };



        const hasTransactionPermissions = payload.messages.every(message => {
            const {contract, action} = ContractHelpers.getContractAndActionNames(message);
            const checksum = ContractHelpers.contractActionChecksum(contract, action, domain, network);
            const fields = ContractHelpers.getActionFields(message);
            return scatter.keychain.hasPermission(checksum, fields);
        });

        const needsLocationAndIdentityHasMultiple = identity.locations.length > 1 &&
            requiredFields.some(field => Object.keys(LocationFields).includes(field));

        if(!needsLocationAndIdentityHasMultiple && hasTransactionPermissions) {
            const identityClone = identity.clone();
            const returnedFields = Identity.asReturnedFields(requiredFields, identityClone, identityClone.locations[0]);
            sign(returnedFields);
        }

        else NotificationService.open(new Prompt(PromptTypes.REQUEST_SIGNATURE, domain, network, payload, approval => {
            if(!approval || !approval.hasOwnProperty('accepted')){
                sendResponse(Error.signatureError("signature_rejected", "User rejected the signature request"));
                return false;
            }

            if(approval.whitelisted){
                context.addPermissions(payload.messages.map(message => {
                    const fields = ContractHelpers.getActionFields(message);
                    const {contract, action} = ContractHelpers.getContractAndActionNames(message);
                    const checksum = ContractHelpers.contractActionChecksum(contract, action, domain, network);
                    return Permission.fromJson({
                        domain,
                        network,
                        contract,
                        action,
                        publicKey:identity.publicKey,
                        checksum,
                        timestamp:+ new Date(),
                        mutableFields:approval.mutableFields,
                        fields
                    });
                }));
            }

            sign(approval.returnedFields);
        }));
    }

}