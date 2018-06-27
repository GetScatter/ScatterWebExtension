<template>
    <section class="panel">
        <figure class="header">{{locale(langKeys.IMPORT_Header)}}</figure>
        <figure class="sub-header">{{locale(langKeys.IMPORT_Description)}}</figure>

        <cin :placeholder="locale(langKeys.PLACEHOLDER_PasteYourBackup)" :text="encryptedJson" v-on:changed="changed => bind(changed, 'encryptedJson')"></cin>

        <cin icon="fa-lock" v-if="encryptedJson" :placeholder="locale(langKeys.PLACEHOLDER_Password)" type="password" v-on:changed="changed => bind(changed, 'password')"></cin>
        <btn v-on:clicked="importBackup" v-if="encryptedJson" :text="locale(langKeys.GENERIC_Import)" :is-blue="encryptedJson" :margined="true"></btn>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import AlertMsg from '../models/alerts/AlertMsg'
    import AuthenticationService from '../services/AuthenticationService'
    import Mnemonic from '../util/Mnemonic'
    import AES from 'aes-oop';
    import StorageService from '../services/StorageService'

    export default {
        data(){ return {
            password:'',
            encryptedJson:'',
        }},
        computed: {
            ...mapState([
                'scatter',
                'mnemonic'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            async importBackup(){
                const parts = this.encryptedJson.split('|SSLT|');
                const encrypted = parts[0];
                const salt = await (async () => {
                    if(parts.length > 1) return StorageService.setSalt(parts[1]);
                    else return await StorageService.getSalt()
                })();

                let decrypted;
                let seed;

                //TODO: Code duplication from actions set seed
                try {
                    if(this.password.split(' ').length >= 12){
                        // MNEMONIC
                        seed = await Mnemonic.mnemonicToSeed(this.password);
                        decrypted = AES.decrypt(encrypted, seed);
                    } else {
                        // PASSWORD
                        const [m, s] = await Mnemonic.generateMnemonic(this.password);
                        seed = s;
                        decrypted = AES.decrypt(encrypted, seed);
                    }
                } catch(e){
                    console.log('err', e);
                }

                if(typeof decrypted === 'object' && decrypted.hasOwnProperty('keychain')){
                    this[Actions.IMPORT_SCATTER]({imported:decrypted, seed}).then(() => {
                        this.$router.push({name:RouteNames.MAIN_MENU});
                    })
                } else this[Actions.PUSH_ALERT](AlertMsg.BadPassword());
            },
            ...mapActions([
                Actions.IMPORT_SCATTER,
                Actions.PUSH_ALERT
            ])
        },
    }
</script>

<style lang="scss">
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
</style>
