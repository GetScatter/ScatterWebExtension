import Account from '../models/Account'
import KeyPair from '../models/KeyPair'
import AlertMsg from '../models/alerts/AlertMsg'
import EOSKeygen from '../util/EOSKeygen'
import * as Eos from 'eosjs';
import * as Actions from '../store/constants';

export default class AccountService {

    /***
     * Tries to import an account using an existing private key
     * @param privateKey
     * @param network
     * @param context
     * @returns {Promise}
     */
    static importFromKey(privateKey, network, context){
        return new Promise((resolve, reject) => {
            if(!EOSKeygen.validPrivateKey(privateKey)){
                context[Actions.PUSH_ALERT](AlertMsg.InvalidPrivateKey());
                reject();
                return false;
            }

            const keypair = KeyPair.fromJson({privateKey, publicKey:EOSKeygen.privateToPublic(privateKey)});
            const accountSelected = (account) => resolve({keypair, account});

            AccountService.getAccountsFromPublicKey(keypair.publicKey, network).then(accounts => {
                switch(accounts.length){
                    case 0: context[Actions.PUSH_ALERT](AlertMsg.NoAccountsFound()); reject(); return false;
                    // Only one account, so returning it
                    case 1: accountSelected(Account.fromJson({name:accounts[0].name, authority:accounts[0].authority, publicKey:keypair.publicKey })); break;
                    // More than one account, prompting account selection
                    default: context[Actions.PUSH_ALERT](AlertMsg.SelectAccount(accounts)).then(res => {
                        if(!res || !res.hasOwnProperty('selected')) { reject(); return false; }
                        accountSelected(Account.fromJson(Object.assign(res.selected, {publicKey:keypair.publicKey})));
                    })
                }
            });
        })
    }


    /***
     * Gets a list of {name:string, authority:string} accounts from a public key
     * @param publicKey
     * @param network
     * @returns {Promise}
     */
    static getAccountsFromPublicKey(publicKey, network){
        return new Promise((resolve, reject) => {
            const eos = Eos.Localnet({httpEndpoint:`http://${network.unique()}`});
            eos.getKeyAccounts(publicKey).then(res => {
                if(!res || !res.hasOwnProperty('account_names')){ resolve([]); return false; }

                Promise.all(res.account_names.map(name => eos.getAccount(name).catch(e => resolve([])))).then(multires => {
                    let accounts = [];
                    multires.map(account => {
                        account.permissions.map(permission => {
                            accounts.push({name:account.account_name, authority:permission.perm_name});
                        });
                    });
                    resolve(accounts)
                }).catch(e => {
                    console.log(e);
                    resolve([])
                });
            });
        })
    }
}