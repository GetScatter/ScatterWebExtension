<template>
    <section class="backup scroller">

        <!-- Blockchain Backup -->
        <!-- TODO: Remove blockchain backup, no need now with import only structure -->
        <!--<section class="panel">-->
            <!--<figure class="header">Blockchain Backup</figure>-->

            <!--<figure class="sub-header">-->
                <!--<section class="checkbox">-->
                    <!--<cin :tag="(backupToBlockchain) ? 'fa-check' : ''" :checkbox="true" v-on:untagged="toggleBackup"></cin>-->
                <!--</section>-->
                <!--By enabling this option your Scatter’s identities will be backed-->
                <!--up on the EOS blockchain. You will still need your password in-->
                <!--order to decrypt your data.-->
            <!--</figure>-->
        <!--</section>-->

        <!-- Export JSON -->
        <section class="panel">
            <figure class="header">Export JSON Data Backup</figure>
            <figure class="sub-header">
                Exporting your data in JSON will provide you with an unencrypted JSON
                document which allows you to view your private keys and transfer your
                Scatter from computer to computer. You will not need your password to
                import this data, which allows you to change passwords.
            </figure>
            <btn v-on:clicked="goToExportJson" text="Export JSON Data"></btn>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import AlertMsg from '../models/alerts/AlertMsg'
    import IdentityService from '../services/IdentityService'

    export default {
        data(){ return {

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
            toggleBackup(_backupToBlockchain){
                const commit = () => {
                    const scatter = this.scatter.clone();
                    scatter.settings.backupToBlockchain = _backupToBlockchain;
                    this[Actions.UPDATE_STORED_SCATTER](scatter).then(() => {
                        if(_backupToBlockchain)
                            this[Actions.BACKUP_SCATTER_ON_BLOCKCHAIN](scatter)
                    })
                };

                if(_backupToBlockchain) this[Actions.PUSH_ALERT](AlertMsg.AreYouSure('Enabling Blockchain Backups', ['Settings', 'Backup'],
                    'Enabling blockchain backups means you\'re going to be saving an encrypted version of your keychain on the blockchain under ' +
                    'a Scatter contract. This is safe as long as your password is strong, but not very safe if your password is not.')).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    else commit();
                }); else commit();
            },
            goToExportJson(){
                this.$router.push({name:RouteNames.EXPORT_JSON});
            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT,
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