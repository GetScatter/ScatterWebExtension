import Account from '../models/Account'
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
            if(PluginRepository.plugin(network.blockchain).accountsAreImported())
                PluginRepository.plugin(network.blockchain).importAccount(keypair, network, context, accountSelected);

            // Accounts for this blockchain are freebased.
            else accountSelected(Account.fromJson({
                name:keypair.name,
                authority:'',
                publicKey:keypair.publicKey,
                keypairUnique:keypair.unique()
            }))


        })
    }
}