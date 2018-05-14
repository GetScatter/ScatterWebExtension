<template>
    <section class="network scroller">
        <section class="panel">
            <figure class="header">{{locale(langKeys.KEYPAIR_Header)}}</figure>
            <figure class="sub-header">{{locale(langKeys.KEYPAIR_Description)}}</figure>
            <figure class="sub-header" style="color:red; font-weight:bold; font-size:13px;">{{locale(langKeys.KEYPAIR_Important)}}</figure>
            <sel :selected="keypair.blockchain.toUpperCase()" :options="blockchains" :parser="blockchain => blockchain.key.toUpperCase()" v-on:changed="changed => bind(changed.value, 'blockchain')" :key="1"></sel>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_Name)" :text="keypair.name" v-on:changed="changed => bind(changed, 'name')"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_PublicKey)" :text="keypair.publicKey" v-on:changed="changed => bind(changed, 'publicKey')"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_PrivateKey)" @changed="makePublicKey" :text="keypair.privateKey" v-on:changed="changed => bind(changed, 'privateKey')"></cin>
            <btn :text="locale(langKeys.BUTTON_GenerateKeyPair)" @click.native="generateKeyPair()" margined="true"></btn>
            <btn :text="locale(langKeys.GENERIC_Save)" half="true" @click.native="saveKeyPair()" margined="true"></btn>
            <btn :text="locale(langKeys.BUTTON_Copy)" half="true" @click.native="copyKeyPair()" margined="true"></btn>
        </section>

        <!-- INPUT FIELD USED FOR COPYING -->
        <input tabindex="-1" type="text" ref="copier" class="copier" />

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import Network from '../models/Network'
    import Scatter from '../models/Scatter'
    import AlertMsg from '../models/alerts/AlertMsg'
    import * as AlertTypes from '../models/alerts/AlertTypes'
    import IdentityService from '../services/IdentityService'
    import {BlockchainsArray} from '../models/Blockchains';
    import KeyPair from '../models/KeyPair';
    import ecc from 'eosjs-ecc';
    import PluginRepository from '../plugins/PluginRepository'

    export default {
        data(){ return {
            blockchains:BlockchainsArray,
            keypair:KeyPair.placeholder(),
            isValid:false,
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
            bind(changed, field) { this.keypair[field] = changed },
            copyKeyPair(){
                const copier = this.$refs.copier;
                copier.value = `Private Key: ${this.keypair.privateKey} Public Key: ${this.keypair.publicKey}`;
                copier.select();
                document.execCommand("copy");
                copier.value = '';
            },
            makePublicKey(){
                setTimeout(() => {
                    this.isValid = false;
                    if(!this.keypair.privateKey.length) return false;

                    let publicKey = '';

                    BlockchainsArray.map(blockchainKV => {
                        try {
                            if(publicKey.length) return false;
                            const blockchain = blockchainKV.value;

                            const plugin = PluginRepository.plugin(blockchain);
                            if(!plugin) return false;
                            if(plugin.validPrivateKey(this.keypair.privateKey)){
                                publicKey = plugin.privateToPublic(this.keypair.privateKey);
                                this.keypair.blockchain = blockchain;
                            }
                        } catch(e){}
                    });

                    if(publicKey) {
                        this.keypair.publicKey = publicKey;
                        this.isValid = true;
                    }
                    else this[Actions.PUSH_ALERT](AlertMsg.InvalidPrivateKey());
                },1)
            },
            generateKeyPair(){
                const plugin = PluginRepository.plugin(this.keypair.blockchain);
                if(!plugin) return false;

                plugin.randomPrivateKey().then(privateKey => {
                    const publicKey = plugin.privateToPublic(privateKey);
                    if(plugin.validPublicKey(publicKey) && plugin.validPrivateKey(privateKey)){
                        this.keypair.publicKey = publicKey;
                        this.keypair.privateKey = privateKey;
                        this.isValid = true;
                    }
                });
            },
            saveKeyPair(){
                if(!this.isValid) return this[Actions.PUSH_ALERT](AlertMsg.InvalidPrivateKey());
                if(!this.keypair.name.length) return this[Actions.PUSH_ALERT](AlertMsg.BadKeyPairName());

                const scatter = this.scatter.clone();
                if(scatter.keychain.getKeyPair(this.keypair))
                    return this[Actions.PUSH_ALERT](AlertMsg.KeyPairExists());
                if(scatter.keychain.getKeyPairByName(this.keypair.name))
                    return this[Actions.PUSH_ALERT](AlertMsg.KeyPairExists());

                scatter.keychain.keypairs.push(this.keypair);
                this[Actions.UPDATE_STORED_SCATTER](scatter).then(() => this.$router.back());
            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT
            ])
        }
    }
</script>

<style lang="scss">
    .network {
        font-family:'Open Sans', sans-serif;



        .panel {
            padding:20px;

            &:not(:last-child){
                border-bottom:1px solid #eaeaea;
            }

            .header {
                color:#cecece;
                font-size:11px;
                padding-bottom:5px;
                margin-top:-5px;
                margin-bottom:10px;
                border-bottom:1px solid #eaeaea;
            }

            .sub-header {
                color:#aeaeae;
                font-size:9px;
                margin-bottom:20px;

                &.blue {
                    color:blue;
                }

                &.red {
                    color:red;
                }
            }
        }
    }
</style>