<template>
    <section>

        <section v-if="step == 0">
            <section class="white-bg">
                <figure class="title">Welcome to Scatter!</figure>
                <figure class="breaker"></figure>
                <figure class="description">
                    The Scatter team holds no liability towards your digital assets. It is your responsibility to constantly make sure your
                    computer is free of malware. We have taken every measure in our capabilities to ensure that Scatter is safe to use
                    as intended however your computer itself is your worst enemy and should be treated as such.
                    <br><br>
                    By using Scatter you are relinquishing any ability to take legal actions against the Scatter team
                    and recognize yourself as the sole legal owner of your own Scatter instance, your keys, and your data.
                </figure>
            </section>
            <section class="p20">
                <btn text="Start Basic Setup" :is-blue="true" v-on:clicked="stepToKeypair" margined="true"></btn>
                <btn text="Skip Basic Setup" :is-red="true" v-on:clicked="finished" margined="true"></btn>
            </section>
        </section>

        <section v-if="step == 1">
            <section class="white-bg">
                <figure class="title">Import Key Pair</figure>
                <figure class="breaker"></figure>
                <figure class="description">
                    Scatter supports multiple blockchains. When you enter your Key Pair we will determine which
                    one you are using and set up your Identity for you.
                </figure>
            </section>
            <section class="p20">

                <cin :placeholder="locale(langKeys.PLACEHOLDER_Name)" :text="keypair.name" v-on:changed="changed => bind(changed, 'keypair.name')"></cin>
                <cin :placeholder="locale(langKeys.PLACEHOLDER_PublicKey)" :disabled="true" :text="keypair.publicKey" v-on:changed="changed => bind(changed, 'keypair.publicKey')"></cin>
                <cin :placeholder="locale(langKeys.PLACEHOLDER_PrivateKey)" @changed="makePublicKey" :text="keypair.privateKey" v-on:changed="changed => bind(changed, 'keypair.privateKey')"></cin>

                <btn :text="`Import ${keypair.blockchain.toUpperCase()} Key Pair`" v-on:clicked="saveKeyPair" :is-blue="true" margined="true"></btn>
                <btn text="No Blockchain" :is-red="true" v-on:clicked="finished" margined="true"></btn>
            </section>
        </section>

        <section v-if="step == 2">
            <section class="white-bg">
                <figure class="title">That's it!</figure>
                <figure class="breaker"></figure>
                <figure class="description">
                    You now have a Scatter Identity with an {{keypair.blockchain.toUpperCase()}} account linked to it.
                    <br><br>
                    You can go to your Identity and fill out any extra fields applications might want from you, but none of the fields in your
                    Identity are mandatory.
                    <br><br>
                    Enjoy using Scatter.
                </figure>
            </section>
            <section class="p20">
                <btn text="Main Menu" :is-blue="true" v-on:clicked="finished" margined="true"></btn>
            </section>
        </section>



    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import KeyPair from '../models/KeyPair'
    import Network from '../models/Network'
    import Scatter from '../models/Scatter'
    import AlertMsg from '../models/alerts/AlertMsg'
    import IdentityService from '../services/IdentityService'
    import {BlockchainsArray, Blockchains} from '../models/Blockchains';
    import KeyPairService from '../services/KeyPairService'
    import AccountService from '../services/AccountService'

    export default {
        data(){ return {
            step:0,
            identity:null,
            keypair:KeyPair.fromJson({name:'My First Key Pair'})
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'networks'
            ])
        },
        mounted(){
            this.identity = this.scatter.keychain.identities[0];
        },
        methods: {
            bind(changed, dotNotation) {
                let props = dotNotation.split(".");
                const lastKey = props.pop();
                props.reduce((obj,key)=> obj[key], this)[lastKey] = changed.trim();
            },
            stepToKeypair(){
                if(this.scatter.keychain.keypairs.length) this.step = 2;
                else this.step = 1;
            },
            async makePublicKey(){
                await KeyPairService.makePublicKey(this.keypair);
                if(!this.keypair.publicKey.length) return this[Actions.PUSH_ALERT](AlertMsg.InvalidPrivateKey());
            },
            async saveKeyPair(){
                if(!this.keypair.publicKey.length) return this[Actions.PUSH_ALERT](AlertMsg.InvalidPrivateKey());
                if(await this.importAccount()) KeyPairService.saveKeyPair(this.keypair, this, () => {
                    const scatter = this.scatter.clone();
                    scatter.keychain.updateOrPushIdentity(this.identity);
                    this[Actions.UPDATE_STORED_SCATTER](scatter).then(() => this.step++);
                })
            },
            async importAccount(){
                const selectedKeypair = this.keypair;
                const selectedNetwork = this.scatter.settings.networks.find(network => network.blockchain === selectedKeypair.blockchain);
                if(!selectedKeypair || !selectedKeypair.publicKey.length) return false;
                return await AccountService.importFromKey(selectedKeypair, selectedNetwork, this).then(imported => {
                    if(!imported.account) return false;
                    this.identity.setAccount(selectedNetwork, imported.account);
                    return true;
                }).catch(() => false);
            },
            finished(){
                const scatter = this.scatter.clone();
                scatter.meta.acceptedTerms = true;
                this[Actions.UPDATE_STORED_SCATTER](scatter).then(() => this.step++);
                this.$router.push({name:RouteNames.MAIN_MENU});
            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT
            ])
        }
    }
</script>

<style lang="scss">
</style>