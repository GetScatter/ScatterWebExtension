<template>
    <section class="panel">
        <figure class="header">{{locale(langKeys.IMPORT_Header)}}</figure>
        <figure class="sub-header">{{locale(langKeys.IMPORT_Description)}}</figure>

        <btn v-on:clicked="selectFile" v-if="!file" :text="locale(langKeys.BUTTON_SelectFile)" :is-blue="!file" :margined="true"></btn>
        <cin icon="fa-lock" v-if="file" :placeholder="locale(langKeys.PLACEHOLDER_Password)" type="password" v-on:changed="changed => bind(changed, 'password')"></cin>
        <btn v-on:clicked="importBackup" :text="locale(langKeys.BUTTON_ImportKeychain)" :disabled="!file || password.length < 8" :is-blue="file && password.length >= 8" :margined="true"></btn>

        <input @change="fileChanged($event.target.files)" id="FILE_INPUT" type="file" style="display:none;" accept=".keychain" />
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

    export default {
        data(){ return {
            file:null,
            password:'',
        }},
        computed: {
            ...mapState([
                'scatter',
                'mnemonic'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            selectFile(){
                const elem = document.getElementById('FILE_INPUT');
                elem.click();
            },
            fileChanged(files){
                const file = files[0];
                if(file.name.indexOf('.keychain') === -1) return false;
                const reader = new FileReader();
                reader.onload = (e) => this.file = e.target.result;
                reader.readAsText(file);
            },
            async importBackup(){
                console.log(this.file);
                let decrypted;
                let seed;
                try {
                    if(this.password.split(' ').length > 12){
                        // MNEMONIC
                        seed = Mnemonic.mnemonicToSeed(this.password);
                        decrypted = AES.decrypt(this.file, seed);
                    } else {
                        // PASSWORD
                        const [m, s] = await Mnemonic.generateMnemonic(this.password);
                        seed = s;
                        decrypted = AES.decrypt(this.file, seed);
                    }
                } catch(e){}

                console.log('decrypted',decrypted);

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
