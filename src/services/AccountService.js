import Account from '../models/Account'
import KeyPair from '../models/KeyPair'
import AlertMsg from '../models/alerts/AlertMsg'
import EOSKeygen from '../util/EOSKeygen'
import * as Actions from '../store/constants';
import PluginRepository from '../plugins/PluginRepository'

// TODO: Only dependence on eosjs
import * as Eos from 'eosjs';

export default class AccountService {

    /***
     * Tries to import an account using an existing private key
     * @param keypair
     * @param network
     * @param context
     * @returns {Promise}
     */
    static importFromKey(keypair, network, context){
        return new Promise((resolve, reject) => {
            const accountSelected = (account) => resolve({keypair, account});

            // Accounts for this blockchain need importation
            if(PluginRepository.plugin(network.blockchain).accountsAreImported()){

                context[Actions.PUSH_ALERT](AlertMsg.NamedAccount()).then(res => {
                    if(!res || !res.hasOwnProperty('text')) return reject();
                    const accountName = res.text.trim();
                    const eos = Eos.Localnet({httpEndpoint:`http://${network.hostport()}`});
                    eos.getAccount(accountName).then(account => {
                        if(!account || !account.hasOwnProperty('account_name') || account.account_name !== accountName){
                            context[Actions.PUSH_ALERT](AlertMsg.NoAccountsFound());
                            return reject();
                        }

                        const accounts = account.permissions
                            .filter(p => p.required_auth.keys.find(k => k.key === keypair.publicKey))
                            .map(acc => ({name:accountName, authority:acc.perm_name}));

                        switch(accounts.length){
                            case 0: context[Actions.PUSH_ALERT](AlertMsg.NoAccountsFound()); reject(); return false;
                            case 1: accountSelected(Account.fromJson({
                                name:accounts[0].name,
                                authority:accounts[0].authority,
                                publicKey:keypair.publicKey,
                                keypairUnique:keypair.unique() })
                            ); break;
                            default: context[Actions.PUSH_ALERT](AlertMsg.SelectAccount(accounts)).then(res => {
                                if(!res || !res.hasOwnProperty('selected')) { reject(); return false; }
                                accountSelected(Account.fromJson(Object.assign(res.selected, {
                                    publicKey:keypair.publicKey,
                                    keypairUnique:keypair.unique()
                                })));
                            })
                        }
                    });
                });

                //TODO: This was removed from Dawn 4, and caused a bad user-experience problem.
                // AccountService.getAccountsFromPublicKey(keypair.publicKey, network).then(accounts => {
                //     switch(accounts.length){
                //         case 0: context[Actions.PUSH_ALERT](AlertMsg.NoAccountsFound()); reject(); return false;
                //         // Only one account, so returning it
                //         case 1: accountSelected(Account.fromJson({name:accounts[0].name, authority:accounts[0].authority, publicKey:keypair.publicKey, keypairUnique:keypair.unique() })); break;
                //         // More than one account, prompting account selection
                //         default: context[Actions.PUSH_ALERT](AlertMsg.SelectAccount(accounts)).then(res => {
                //             if(!res || !res.hasOwnProperty('selected')) { reject(); return false; }
                //             accountSelected(Account.fromJson(Object.assign(res.selected, {publicKey:keypair.publicKey, keypairUnique:keypair.unique()})));
                //         })
                //     }
                // });
            }

            // Accounts for this blockchain are freebased.
            else accountSelected(Account.fromJson({
                name:keypair.name,
                authority:'',
                publicKey:keypair.publicKey,
                keypairUnique:keypair.unique()
            }))


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
            const eos = Eos.Localnet({httpEndpoint:`http://${network.hostport()}`});
            eos.getAccounts(publicKey).then(res => {
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
                    console.error(e);
                    resolve([])
                });
            });
        })
    }
}