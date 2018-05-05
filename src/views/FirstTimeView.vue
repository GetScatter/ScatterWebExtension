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
                <form v-on:submit.prevent="createNewIdentity">
                    <cin icon="fa-lock" placeholder="name your identity" v-on:changed="changed => bind(changed, 'identityName')"></cin>
                    <btn text="Create Identity" type="submit" margined="true"></btn>
                </form>
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
                <form v-on:submit.prevent="importAccount">
                    <sel :selected="identity.network" :options="networks" :parser="(network) => network.unique()" v-on:changed="bindNetwork"></sel>
                    <cin icon="fa-lock" placeholder="private key" v-on:changed="changed => bind(changed, 'importKey')"></cin>
                    <btn text="Import Account" type="submit" margined="true"></btn>
                </form>
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
    import Network from '../models/Network';
    import KeyPair from '../models/KeyPair';
    import Scatter from '../models/Scatter';
    import AlertMsg from '../models/alerts/AlertMsg'
    import EOSKeygen from '../util/EOSKeygen'
    import AccountService from '../services/AccountService'
    import IdentityService from '../services/IdentityService'

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
            ]),
            ...mapGetters([
                'networks'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            bindNetwork(network){ this.identity.network = network; },
            firstTimeState(){
                if(!this.scatter.keychain.identities.length && !this.identity) return 'firstIdentity';
                else if (!this.scatter.keychain.identities.length || this.identity) return 'firstAccount';
                else return 'none';
            },

            // Starts the creation of a new Identity.
            // Identity names are not persisted until an account is bound to it.
            createNewIdentity(){
                if(!Identity.nameIsValid(this.identityName)){
                    this[Actions.PUSH_ALERT](AlertMsg.BadIdentityName());
                    return false;
                }

                IdentityService.nameExists(this.identityName, this.scatter).then(exists => {
                    if(exists){
                        this[Actions.PUSH_ALERT](AlertMsg.IdentityNameExists());
                        return false;
                    }

                    this.identity = Identity.fromJson({name:this.identityName, network:this.scatter.settings.networks[0]});
                })
            },

            // Imports an EOS account@authority which is bound to the user's new Identity
            importAccount(){
//                AccountService.importFromKey(this.importKey, this.identity.network, this).then(imported => {
//                    this.identity.account = imported.account;
//                    this.addNewIdentity(imported.keypair, this.identity);
//                });
            },

            // Adds the user's first Identity to the keychain and
            // registers it with the Scatter contract
            addNewIdentity(keypair, identity){
                identity.account.publicKey = keypair.publicKey;

                // TODO: The first account needs to be on the network where Scatter's
                // TODO: identity contract exists. For now disabling for easy development
                // TODO: ----------------------------------
                // Always using the endorsed network for the first identity/account
                // identity.network = this.scatter.settings.networks.find(x => x.isEndorsedNetwork());

                IdentityService.register(identity.name, this.scatter).then(identityHash => {
                    let scatter = this.scatter.clone();
                    scatter.keychain.keypairs.push(keypair);
                    scatter.keychain.identities.push(identity);
                    this[Actions.UPDATE_STORED_SCATTER](scatter)
                        .then(() => this.$router.push({name:RouteNames.MAIN_MENU}))
                })
            },
            ...mapActions([
                Actions.CREATE_NEW_SCATTER,
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT
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
        /*height:390px;*/
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