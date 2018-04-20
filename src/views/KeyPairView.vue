<template>
    <section class="network scroller">
        <section class="panel">
            <figure class="header">{{locale(langKeys.KEYPAIR_Header)}}</figure>
            <figure class="sub-header">{{locale(langKeys.KEYPAIR_Description)}}</figure>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_PublicKey)" :text="publicKey" v-on:changed="changed => bind(changed, 'publicKey')"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_PrivateKey)" :text="privateKey" v-on:changed="changed => bind(changed, 'privateKey')"></cin>
            <btn :text="locale(langKeys.BUTTON_GenerateKeyPair)" @click.native="generateKeyPair()" margined="true"></btn>
            <btn :text="locale(langKeys.BUTTON_Validate)" half="true" @click.native="checkKeyPair()" margined="true"></btn>
            <btn :text="locale(langKeys.BUTTON_Copy)" half="true" @click.native="copyKeyPair()" margined="true"></btn>
        </section>

        <section class="panel" v-if="matches !== null">
            <figure class="header">{{locale(langKeys.KEYPAIR_Validation_Header)}}</figure>
            <figure class="sub-header blue" v-if="matches">
                {{locale(langKeys.KEYPAIR_Validation_Valid)}}
            </figure>
            <figure class="sub-header red" v-else>
                {{locale(langKeys.KEYPAIR_Validation_Invalid)}}
            </figure>
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

    import ecc from 'eosjs-ecc';

    export default {
        data(){ return {
            publicKey:'',
            privateKey:'',
            matches:null
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
            copyKeyPair(){
                const copier = this.$refs.copier;
                copier.value = `Private Key: ${this.privateKey} Public Key: ${this.publicKey}`;
                copier.select();
                document.execCommand("copy");
                copier.value = '';
            },
            generateKeyPair(){
                this.matches = null;
                ecc.randomKey().then(privateKey => {
                    this.privateKey = privateKey;
                    this.publicKey = ecc.privateToPublic(privateKey);
                })
            },
            checkKeyPair(){
                this.matches = null;
                if(!this.privateKey.length || !this.publicKey.length){

                    this[Actions.PUSH_ALERT](new AlertMsg(
                        AlertTypes.Error,
                        'Invalid Key Pair',
                        'Error',
                        ['Settings', 'Key Pair'],
                        'Both the Public Key and Private Key must be provided'
                    ));
                    return false;
                }

                if(!ecc.isValidPublic(this.publicKey)){
                    this[Actions.PUSH_ALERT](new AlertMsg(
                        AlertTypes.Error,
                        'Invalid Public Key',
                        'Error',
                        ['Settings', 'Key Pair'],
                        'The Public Key you entered is not valid!'
                    ));
                    return false;
                }

                if(!ecc.isValidPrivate(this.privateKey)){
                    this[Actions.PUSH_ALERT](new AlertMsg(
                        AlertTypes.Error,
                        'Invalid Private Key',
                        'Error',
                        ['Settings', 'Key Pair'],
                        'The Private Key you entered is not valid!'
                    ));
                    return false;
                }

                this.matches = ecc.privateToPublic(this.privateKey) === this.publicKey;
            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT
            ])
        }
    }
</script>

<style lang="scss">
    .copier {
        position:absolute;
        top:-9999px;
    }
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