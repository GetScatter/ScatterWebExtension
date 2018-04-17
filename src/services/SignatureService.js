import Prompt from '../models/prompts/Prompt';
import * as PromptTypes from '../models/prompts/PromptTypes'
import Identity from '../models/Identity';
import Network from '../models/Network';
import {LocationFields} from '../models/Identity';
import * as HistoricEventTypes from '../models/histories/HistoricEventTypes'
import ObjectHelpers from '../util/ObjectHelpers'
import ContractHelpers from '../util/ContractHelpers'
import NotificationService from './NotificationService'
import Permission from '../models/Permission'
const ecc = require('eosjs-ecc');

export default class SignatureService {

    static requestSignature(payload, scatter, context, sendResponse){
        console.log("Requesting signature");

        // TODO: consolidate functionality and switch based on blockchain type ( EOS, ETH, etc )
        // switch(proxy_type){}

        // Checking if identity still exists
        const identity = scatter.keychain.findIdentity(payload.identityHash);
        if(!identity){
            sendResponse(Error.signatureError("identity_missing", "Identity no longer exists on the user's keychain"));
            return false;
        }

        const account = identity.networkedAccount(Network.fromJson(payload.network));

        // TODO: EOS SPECIFIC
        // Checking if Identity still has all the necessary accounts
        const requiredAccounts = ObjectHelpers.flatten(
            payload.transaction.messages
                .map(message => message.authorization
                    .map(auth => `${auth.account}@${auth.permission}`)));
        const identityAccountAuth = account.formatEOS();
        if(!requiredAccounts.some(accountAuth => accountAuth === identityAccountAuth)) {
            sendResponse(Error.signatureError("account_missing", "Missing required accounts"));
            return false;
        }


        const sign = (returnedFields) => {


            // Pre loading the buffer so that it doesn't waste time before the key is released.
            const buf = Buffer.from(payload.buf.data, 'utf8');

            context.publicToPrivate(privateKey => {
                if(!privateKey){
                    sendResponse(Error.maliciousEvent());
                    return false;
                }

                // Signing the transaction
                let signed = ecc.sign(buf, privateKey);

                // Overwriting memory pointer
                privateKey = 'RELEASED';

                // Adding historic event
                context.addHistory(HistoricEventTypes.SIGNED_TRANSACTION, {
                    domain:payload.domain,
                    network:payload.network,
                    identityName:identity.name,
                    identityHash:identity.hash,
                    account:account,
                    transaction:payload.transaction,
                    hash:'' // <-- hmmm, what to do with this? There is no hash here to track yet. :(
                });

                sendResponse({
                    signatures:[signed],
                    returnedFields:returnedFields
                });
            }, account.publicKey);
        };

        const needsLocationAndIdentityHasMultiple = identity.locations.length > 1 &&
            payload.requiredFields.some(field => Object.keys(LocationFields).includes(field));

        const hasTransactionPermissions = payload.transaction.messages.every(message => {
            const checksum = ContractHelpers.messageChecksum(message, account.name, payload.domain, payload.network, payload.requiredFields);
            return scatter.keychain.hasContractPermission(checksum)
        });

        if(!needsLocationAndIdentityHasMultiple && hasTransactionPermissions) {
            const identityClone = identity.clone();
            const returnedFields = Identity.asReturnedFields(payload.requiredFields, identityClone, identityClone.locations[0]);
            sign(returnedFields);
        }
        else NotificationService.open(new Prompt(PromptTypes.REQUEST_SIGNATURE, payload.domain, payload.network, payload, approval => {
            if(!approval || !approval.hasOwnProperty('accepted')){
                sendResponse(Error.signatureError("signature_rejected", "User rejected the signature request"));
                return false;
            }

            if(approval.whitelisted){
                context.addPermissions(payload.transaction.messages.map(message => {
                    const checksum = ContractHelpers.messageChecksum(message, account.name, payload.domain, payload.network, payload.requiredFields);
                    return Permission.fromJson({
                        domain:payload.domain,
                        network:payload.network,
                        identityHash:identity.hash,
                        contract:message.code,
                        action:message.type,
                        checksum,
                        timestamp:+ new Date()
                    });
                }));
            }

            sign(approval.returnedFields);
        }));
    }

}