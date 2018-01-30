<template>
    <section class="backup scroller">

        <!-- Unverified -->
        <section class="panel" v-if="!verified">
            <figure class="header">Verify Your Current Password</figure>
            <figure class="sub-header">
                Before resetting your password we need to verify your current password.
                Once it's verified you will be able to set a new password.
            </figure>
            <cin placeholder="your current password" type="password" v-on:changed="changed => bind(changed, 'currentPassword')" :key="1"></cin>
            <btn v-on:clicked="verifyCurrentPassword" text="Verify Password" :margined="true"></btn>
        </section>

        <!-- Verified -->
        <section class="panel" v-else>
            <figure class="header">Enter a new password</figure>
            <figure class="sub-header">
                By changing your password you will be decrypting all of the saved information which is usually always
                encrypted, and then re-encrypting it with a seed from the new password. If you are using Blockchain backups, you will
                also be propagating those changes to the Blockchain.
            </figure>
            <cin placeholder="new password" type="password" v-on:changed="changed => bind(changed, 'newPassword')" :key="2"></cin>
            <cin placeholder="confirm new password" type="password" v-on:changed="changed => bind(changed, 'newPasswordConfirmation')" :key="3"></cin>
            <btn v-on:clicked="changePassword" text="Change Password" :margined="true"></btn>
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
                })
            },
            changePassword(){
                if(AuthenticationService.validPassword(this.newPassword, this.newPasswordConfirmation, this))
                    AuthenticationService.changePassword(this.currentPassword, this.newPassword, this)
            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT,
                Actions.SET_SEED,
                Actions.SET_MNEMONIC,
                Actions.IS_UNLOCKED,
                Actions.BACKUP_SCATTER_ON_BLOCKCHAIN
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