<template>
    <section class="backup scroller">

        <!-- Unverified -->
        <section class="panel" v-if="!verified">
            <figure class="header">Verify Your Password</figure>
            <figure class="sub-header">
                Before exporting you decrypted Scatter keychain we need to verify your password.
            </figure>
            <cin placeholder="your current password" type="password" v-on:changed="changed => bind(changed, 'password')"></cin>
            <btn v-on:clicked="verifyPassword" text="Verify Password" :margined="true"></btn>
        </section>

        <!-- Verified -->
        <section class="panel" v-else>
            <figure class="header">Export decrypted JSON</figure>
            <figure class="sub-header">
                Exporting your decrypted JSON gives you access to all of your normally encrypted information such as
                your Scatter unique id and your keypairs including your private keys. This information is solely for the
                purposes of creating backups. Do not share this information publicly.
                <br><br>
                <b style="color:red;">
                    Anyone with access to this information can transfer your funds and use your Identities.
                </b>
            </figure>
            <a id="PRIVATE_KEY_DOWNLOAD">
                <btn v-on:clicked="exportJson" text="Export JSON" is-red="true" :margined="true"></btn>
            </a>
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
            password:'',
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
            verifyPassword(){
                AuthenticationService.verifyPassword(this.password, this).then(() => {
                    this.verified = true;
                });
            },
            exportJson(){
                alert("no longer supported")
//                const scatter = this.scatter.clone();
//                const [mnemonic, seed] = Mnemonic.generateMnemonic(this.password);
//                scatter.keychain.keypairs.map(keypair => keypair.decrypt(seed));
//
//                const filename = `scatter_${scatter.keychain.id}.json`;
//                const filetext = JSON.stringify(scatter.keychain);
//                const filelink = document.getElementById('PRIVATE_KEY_DOWNLOAD');
//                if(!filelink) return false;
//                filelink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(filetext));
//                filelink.setAttribute('download', filename);
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