<template>
    <section class="backup scroller">

        <!-- Unverified -->
        <section class="panel" v-if="!verified">
            <figure class="header">Verify Your Password</figure>
            <figure class="sub-header">
                Before destroying your Scatter keychain we need to verify your
                password since this is such a volatile action.
            </figure>
            <cin placeholder="your current password" type="password" v-on:changed="changed => bind(changed, 'currentPassword')"></cin>
            <btn v-on:clicked="verifyCurrentPassword" text="Verify Password" :margined="true"></btn>
        </section>

        <!-- Verified -->
        <section class="panel" v-else>
            <figure class="header">Destroying Scatter</figure>
            <figure class="sub-header">
                You are about to destroy your entire Scatter keychain. The only way to get this exact Scatter back
                is by importing an exported Scatter JSON. You will not be able to claim your identities otherwise.
                Make sure you have done so before hand.
            </figure>
            <btn v-on:clicked="destroy" text="Destroy Scatter" is-red="true" :margined="true"></btn>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import AlertMsg from '../models/alerts/AlertMsg'
    import IdentityService from '../services/IdentityService';
    import Mnemonic from '../util/Mnemonic'
    import EOSKeygen from '../util/EOSKeygen'
    import StorageService from '../services/StorageService'
    import AuthenticationService from '../services/AuthenticationService'

    export default {
        data(){ return {
            currentPassword:'',
            newPassword:'',
            newPasswordConfirmation:'',
            verified:false,
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'backupToBlockchain'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            verifyCurrentPassword(){
                AuthenticationService.verifyPassword(this.currentPassword, this).then(() => {
                    this.verified = true;
                });
            },
            destroy(){
                this[Actions.PUSH_ALERT](AlertMsg.AreYouSure('Destroying Scatter', ['Settings', 'Destroy'],
                    'This is your last chance to double check your backups.')).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    this[Actions.DESTROY]().then(() => this.$router.push({name:RouteNames.ENTRY}));
                });
            },
            ...mapActions([
                Actions.PUSH_ALERT,
                Actions.SET_SEED,
                Actions.IS_UNLOCKED,
            ])
        }
    }
</script>

<style lang="scss">
    .checkbox {
        width:56px;
        float:left;
        margin-right:15px;
    }
    .backup {
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
            }
        }
    }
</style>