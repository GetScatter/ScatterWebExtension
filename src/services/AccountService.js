import Account from '../models/Account'
import KeyPair from '../models/KeyPair'
import AlertMsg from '../models/alerts/AlertMsg'
import EOSKeygen from '../util/EOSKeygen'

export default class AccountService {

    /***
     * Tries to import an account using an existing private key
     * @param privateKey
     * @param pushAlert
     * @returns {Promise}
     */
    static importFromKey(privateKey, pushAlert){
        // TODO: Replace pushAlert with contextual calls
        return new Promise((resolve, reject) => {
            if(!EOSKeygen.validPrivateKey(privateKey)){
                pushAlert(AlertMsg.InvalidPrivateKey());
                reject();
                return false;
            }

            const keypair = KeyPair.fromJson({privateKey, publicKey:EOSKeygen.privateToPublic(privateKey)});
            const accountSelected = (account) => resolve({keypair, account});

            AccountService.getAccountsFromPrivateKey(keypair.privateKey).then(accounts => {
                switch(accounts.length){
                    case 0: pushAlert(AlertMsg.NoAccountsFound()); reject(); return false;
                    // Only one account, so returning it
                    case 1: accountSelected(Account.fromJson({name:accounts[0].name, authority:accounts[0].authority, publicKey:keypair.publicKey })); break;
                    // More than one account, prompting account selection
                    default: pushAlert(AlertMsg.SelectAccount(accounts)).then(res => {
                        if(!res || !res.hasOwnProperty('selected')) { reject(); return false; }
                        accountSelected(Account.fromJson(Object.assign(res.selected, {publicKey:keypair.publicKey})));
                    })
                }
            });
        })
    }

    /***
     * Tries to create a new account using a name, does not register the account
     * @param accountName
     * @param pushAlert
     * @returns {Promise}
     */
    static create(accountName, pushAlert){
        return new Promise((resolve, reject) => {
            if(!Account.nameIsValid(accountName)){ pushAlert(AlertMsg.BadAccountName()); reject(); return false; }

            AccountService.nameExists(accountName).then(exists => {
                if(exists){ pushAlert(AlertMsg.AccountNameExists()); reject(); return false; }

                const keypair = EOSKeygen.generateKeys();
                const account = Account.fromJson({name:accountName, 'authority':'active', publicKey:keypair.publicKey});
                resolve({keypair, account})
            })
        })
    }

    /***
     * Checks if an account exists, and if not it registers it.
     * @param account
     * @param scatter
     * @returns {Promise}
     */
    static existsOrRegister(account, scatter){
        return new Promise((resolve, reject) => {
            AccountService.nameExists(account.name).then(exists => {
                if(exists) resolve();
                else AccountService.register(account, scatter).then(res => resolve());
            });
        })
    }

    /***
     * Registers and stakes an account with EOS
     * @param account
     * @param scatter
     * @returns {Promise}
     */
    static register(account, scatter){
        return new Promise((resolve, reject) => {
            //TODO Mock
            // Register account with EOS by passing through a
            // scatter contract which creates and stakes the account
            resolve(true)
        })
    }







    //TODO: This is just a mock right now
    static getAccountsFromPrivateKey(privateKey){
        return new Promise((resolve, reject) => {
            resolve([
                {name:'test', authority:'owner'},
                {name:'test', authority:'active'},
                {name:'test.22', authority:'active'},
                {name:'test', authority:'active'},
                {name:'test.22', authority:'active'},
                {name:'test', authority:'active'},
                {name:'test.22', authority:'active'}
            ].map(json => Account.fromJson(json)))
        })
    }

    /***
     * Checks if the account name is taken on EOS
     * @param name
     * @returns {Promise}
     */
    static nameExists(name){
        return new Promise((resolve, reject) => {
            //TODO Mock
            resolve(false);
        })
    }
}