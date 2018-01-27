import Account from '../models/Account'

export default class AccountService {

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

    //TODO Mock
    static nameExists(name){
        return new Promise((resolve, reject) => {
            resolve(false);
        })
    }

    //TODO Mock
    static register(account, scatter){
        return new Promise((resolve, reject) => {
            // Register account with EOS
            // Pass through a scatter contract which creates and stakes the account
            resolve(true)
        })
    }
}