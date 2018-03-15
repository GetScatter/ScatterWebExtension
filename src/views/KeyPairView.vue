<template>
    <section class="network scroller">
        <section class="panel">
            <figure class="header">Generate a new Key Pair</figure>
            <figure class="sub-header">
                You can use this panel to generate EOS key pairs. These key pairs are generated locally on
                your machine and are never sent anywhere. You can also paste in a keypair and check that the
                private key matches the public key.
                <b>Note that these keys are generated using entropy gathered from your computer and not from any specific seed.</b>
            </figure>
            <cin placeholder="Public Key" :text="publicKey" v-on:changed="changed => bind(changed, 'publicKey')"></cin>
            <cin placeholder="Private Key" :text="privateKey" v-on:changed="changed => bind(changed, 'privateKey')"></cin>
            <btn text="Generate Key Pair" v-on:clicked="generateKeyPair()" margined="true"></btn>
            <btn text="Validate Key Pair" v-on:clicked="checkKeyPair()" margined="true"></btn>
        </section>

        <section class="panel" v-if="matches !== null">
            <figure class="header">Key Pair Validation</figure>
            <figure class="sub-header blue" v-if="matches">
                The private key is valid and the public key generated from it matches the public key provided.
            </figure>
            <figure class="sub-header red" v-else>
                The public key generated from the private key did <b>not</b> match the public key provided!
            </figure>
        </section>

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