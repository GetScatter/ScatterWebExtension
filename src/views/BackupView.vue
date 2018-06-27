<template>
    <section class="backup scroller">

        <!-- Unverified -->
        <section class="panel" v-if="!verified">
            <figure class="header">{{locale(langKeys.GENERIC_VerifyPassword_Header)}}</figure>
            <figure class="sub-header">{{locale(langKeys.GENERIC_VerifyPassword_Description)}}</figure>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_Password)" type="password" v-on:changed="changed => bind(changed, 'password')" :key="1"></cin>
            <btn v-on:clicked="verifyCurrentPassword" :text="locale(langKeys.PLACEHOLDER_ConfirmPassword)" :margined="true"></btn>
        </section>

        <!-- Verified -->
        <section class="panel" v-else>
            <figure class="header">{{locale(langKeys.BACKUP_Header)}}</figure>
            <figure class="sub-header">{{locale(langKeys.BACKUP_Description)}}</figure>

            <a id="KEYCHAIN_DOWNLOAD">
                <btn v-on:clicked="exportBackup" :text="locale(langKeys.BUTTON_ExportScatter)" is-red="true" :margined="true"></btn>
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
    import AES from 'aes-oop';

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

            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            verifyCurrentPassword(){
                AuthenticationService.verifyPassword(this.password, this).then(() => {
                    this.verified = true;
                });
            },
            async exportBackup(){
                const [mnemonic, seed] = await Mnemonic.generateMnemonic(this.password);
                if(!seed) return false;

                const scatter = this.scatter.clone();
                let filetext = AES.encrypt(scatter, seed);
                filetext += `|SSLT|${await StorageService.getSalt()}`;
                const filename = `scatter_${+new Date()}.scatter_backup.txt`;
                this.save(filename, filetext);
            },
            save(filename, data) {
                const elem = window.document.createElement('a');
                elem.target = '_blank';
                elem.href = window.URL.createObjectURL(new Blob([data], {type: 'text/csv'}));
                elem.download = filename;
                document.body.appendChild(elem);
                elem.click();
                document.body.removeChild(elem);
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