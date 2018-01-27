<template>
    <section>

        <section v-if="firstTimeState() === 'firstIdentity'" :key="1">
            <section class="white-bg">
                <figure class="title">Create your first Identity</figure>
                <figure class="breaker"></figure>
                <figure class="description">
                    Identities may hold accounts and are
                    what applications use to identify you.
                    They may also hold things like emails,
                    phone numbers, and addresses.
                    <br>
                    <br>

                    They let you do things like sign into
                    applications without passwords, do
                    one-click shopping, and sign
                    documents without third party
                    arbitration.
                    <br>
                    <br>

                    For now though, let’s just give your
                    first identity a name.
                </figure>
            </section>
            <section class="p20">
                <cin icon="fa-lock" placeholder="name your identity" v-on:changed="changed => bind(changed, 'identityName')"></cin>
                <btn text="Create Identity" v-on:clicked="createNewIdentity" margined="true"></btn>
            </section>
        </section>

        <section v-if="firstTimeState() === 'firstAccount'" :key="2">
            <section class="white-bg">
                <figure class="title">Add your first account</figure>
                <figure class="breaker"></figure>
                <figure class="description">
                    Accounts are directly connected to
                    public/private keypairs. They are what
                    hold your funds and allow you to
                    interact with blockchain contracts.
                    <br>
                    <br>

                    <b>This account will be linked to the Identity you just created.</b>
                </figure>
            </section>
            <section class="p20">
                <cin icon="fa-lock" placeholder="account name" v-on:changed="changed => bind(changed, 'accountName')"></cin>
                <btn text="Create New Account" v-on:clicked="createNewAccount" margined="true"></btn>
            </section>
            <figure class="line"></figure>
            <section class="p20">
                <cin icon="fa-lock" placeholder="private key" v-on:changed="changed => bind(changed, 'importKey')"></cin>
                <btn text="Import Account" v-on:clicked="importAccount" margined="true"></btn>
            </section>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import Identity from '../models/Identity';
    import Account from '../models/Account';
    import KeyPair from '../models/KeyPair';
    import Scatter from '../models/Scatter';
    import EOSKeygen from '../util/EOSKeygen'
    import AccountService from '../services/AccountService'
    import IdentityService from '../services/IdentityService'

    import AlertMsg from '../models/alerts/AlertMsg'

    export default {
        data(){ return {
            identityName:'',
            accountName:'',
            importKey:'',
            identity:null
        }},
        computed: {
            ...mapState([
                'scatter'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            firstTimeState(){
                if(!this.scatter.keychain.identities.length && !this.identity) return 'firstIdentity';
                else if (!this.scatter.keychain.identities.length || this.identity) return 'firstAccount';
                else return 'none';
            },

            // Starts the creation of a new Identity.
            // Identity names are not persisted until an account is bound to it.
            createNewIdentity(){
                if(!Identity.nameIsValid(this.identityName)){
                    this[Actions.PUSH_ERROR](AlertMsg.BadIdentityName());
                    return false;
                }

                IdentityService.nameExists(this.identityName).then(exists => {
                    if(exists){
                        this[Actions.PUSH_ERROR](AlertMsg.IdentityNameExists());
                        return false;
                    }

                    this.identity = Identity.fromJson({name:this.identityName});
                })
            },

            // Creates a new EOS account which is bound to the user's new Identity
            createNewAccount(){
                if(!Account.nameIsValid(this.accountName)){
                    this[Actions.PUSH_ERROR](AlertMsg.BadAccountName());
                    return false;
                }

                AccountService.nameExists(this.accountName).then(exists => {
                    if(exists){
                        this[Actions.PUSH_ERROR](AlertMsg.AccountNameExists());
                        return false;
                    }

                    const keypair = EOSKeygen.generateKeys();
                    this.identity.account = Account.fromJson({name:this.accountName, 'authority':'active', publicKey:keypair.publicKey});

                    this.addNewIdentity(keypair, this.identity);
                })
            },

            // Imports an EOS account@authority which is bound to the user's new Identity
            importAccount(){
                if(!EOSKeygen.validPrivateKey(this.importKey)){
                    this[Actions.PUSH_ERROR](AlertMsg.InvalidPrivateKey());
                    return false;
                }

                const keypair = KeyPair.fromJson({
                    privateKey:this.importKey,
                    publicKey:EOSKeygen.privateToPublic(this.importKey)
                });

                const accountSelected = (account) => {
                    this.identity.account = account;
                    this.addNewIdentity(keypair, this.identity);
                };

                AccountService.getAccountsFromPrivateKey(keypair.privateKey).then(accounts => {
                    switch(accounts.length){
                        case 0:
                            this[Actions.PUSH_ERROR](AlertMsg.NoAccountsFound());
                            return false;

                        case 1: accountSelected(Account.fromJson({
                            name:accounts[0].name,
                            authority:accounts[0].authority,
                            publicKey:keypair.publicKey
                        })); break;

                        default: this[Actions.PUSH_ERROR](AlertMsg.SelectAccount(accounts)).then(res => {
                            if(!res || !res.hasOwnProperty('selected')) return false;
                            accountSelected(Account.fromJson(Object.assign(res.selected, {publicKey:keypair.publicKey})));
                        })
                    }
                });
            },

            // Adds the user's first Identity to the keychain and
            // registers it with the Scatter contract
            addNewIdentity(keypair, identity){
                identity.publicKey = keypair.publicKey;

                //TODO: --------------------------------------------------------------------
                //TODO: Might want to bind these together as a transaction so that they can
                //TODO: be rolled back if either fails.
                //TODO: --------------------------------------------------------------------
                IdentityService.register(identity.name, this.scatter).then(identityHash => {
                    AccountService.register(identity.account, this.scatter).then(accountHash => {
                        //TODO: ------------------------------------------------------------

                        let scatter = Scatter.fromJson(this.scatter);
                        scatter.keychain.keypairs.push(keypair);
                        scatter.keychain.identities.push(identity);
                        this[Actions.UPDATE_STORED_SCATTER](scatter)
                            .then(() => this.$router.push({name:RouteNames.MAIN_MENU}))
                    })
                })
            },
            ...mapActions([
                Actions.CREATE_NEW_SCATTER,
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ERROR
            ])
        },
    }
</script>

<style lang="scss">
    .white-bg {
        text-align:center;
        width:100%;
        padding:40px;
        padding-top:20px;
        font-family:'Raleway', sans-serif;

        .title {
            font-size:24px;
            font-weight:300;
            color:#656565;
        }

        .description {
            font-size:12px;
            line-height:18px;
            font-weight:300;
            color:#b2b2b2;
            text-align: left;
        }

        .breaker {
            width:200px;
            display:inline-block;
            height:1px;
            background:#dbdbdb;
            margin:15px 0;
        }
    }
</style>