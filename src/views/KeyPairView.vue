<template>
    <section class="network scroller">
        <section class="panel">
            <figure class="header">{{locale(langKeys.KEYPAIR_Header)}}</figure>
            <figure class="sub-header">{{locale(langKeys.KEYPAIR_Description)}}</figure>
            <figure class="sub-header" style="color:red; font-weight:bold; font-size:13px;">{{locale(langKeys.KEYPAIR_Important)}}</figure>
            <sel :selected="keypair.blockchain.toUpperCase()" :options="blockchains" :parser="blockchain => blockchain.key.toUpperCase()" v-on:changed="blockchainChanged" :key="1"></sel>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_Name)" :text="keypair.name" v-on:changed="changed => bind(changed, 'name')"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_PublicKey)" :disabled="true" :text="keypair.publicKey" v-on:changed="changed => bind(changed, 'publicKey')"></cin>
            <cin type="password" :placeholder="locale(langKeys.PLACEHOLDER_PrivateKey)" @changed="makePublicKey" :text="keypair.privateKey" v-on:changed="changed => bind(changed, 'privateKey')"></cin>
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
    import {BlockchainsArray, Blockchains} from '../models/Blockchains';
    import KeyPair from '../models/KeyPair';
    import ecc from 'eosjs-ecc';
    import PluginRepository from '../plugins/PluginRepository'
    import KeyPairService from '../services/KeyPairService'

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
            bind(changed, field) { this.keypair[field] = changed.trim() },
            blockchainChanged(blockchainObject){
                const blockchain = blockchainObject.value;
                const clearAndChange = () => {
                    this.keypair.blockchain = blockchain;
                    this.keypair.privateKey = '';
                    this.keypair.publicKey = '';
                };
                if(this.keypair.privateKey.length){
                    if(PluginRepository.plugin(this.keypair.blockchain).convertsTo().includes(blockchain)){
                        this.keypair.privateKey =
                            PluginRepository.plugin(blockchain)
                                ['from_'+this.keypair.blockchain](this.keypair.privateKey);
                    } else clearAndChange();
                } else clearAndChange();
            },
            copyKeyPair(){
                const copier = this.$refs.copier;
                copier.value = `Private Key: ${this.keypair.privateKey} Public Key: ${this.keypair.publicKey}`;
                copier.select();
                document.execCommand("copy");
                copier.value = '';
            },
            async makePublicKey(){
                setTimeout(async () => {
                    console.log(this.keypair.privateKey.length);
                    if(this.keypair.privateKey.length < 50) return false;

                    this.isValid = false;

                    await KeyPairService.makePublicKey(this.keypair);
                    console.log('kp', this.keypair);

                    if(this.keypair.publicKey) this.isValid = true;
                    else this[Actions.PUSH_ALERT](AlertMsg.InvalidPrivateKey());
                }, 100)
            },
            async generateKeyPair(){
                this.keypair.publicKey = '';
                this.keypair.privateKey = '';

                await KeyPairService.generateKeyPair(this.keypair);

                if(this.keypair.publicKey.length) this.isValid = true;
            },
            saveKeyPair(){
                if(!this.isValid) return this[Actions.PUSH_ALERT](AlertMsg.InvalidPrivateKey());
                KeyPairService.saveKeyPair(this.keypair, this, () => {
                    this.$router.back();
                })
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