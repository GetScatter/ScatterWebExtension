<template>
    <section class="networks">

        <nav-actions :actions="[
            {event:'create', text:locale(langKeys.GENERIC_New)}
        ]" v-on:create="createKeyPair"></nav-actions>

        <search v-on:changed="changed => bind(changed, 'searchText')"></search>

        <section class="p20 scroller with-search" v-if="keypairs.length">
            <section v-for="keypair in filterBySearch()" class="panel-box">

                <!-- Header -->
                <section class="panel">
                    <figure class="header big"><i class="fa fa-globe"></i>{{keypair.name}}</figure>
                    <figure class="header small margin"><i class="fa fa-globe"></i>{{keypair.publicKey.substr(0,12)}}...</figure>
                    <figure class="header small margin"><i class="fa fa-plug"></i>{{keypair.blockchain.toUpperCase()}}</figure>
                </section>

                <!-- Actions -->
                <section class="panel">
                    <section class="actions">
                        <figure class="action blue" v-on:click="copyKeypair(keypair)"><i class="fa fa-copy"></i></figure>
                        <figure class="action red right" v-on:click="deleteKeypair(keypair)"><i class="fa fa-ban"></i></figure>
                    </section>
                </section>

            </section>
        </section>

        <section class="nothing-here" v-else>
            <figure class="header">{{locale(langKeys.KEYPAIRS_NoKeyPairsHeader)}}</figure>
            <figure class="sub-header">{{locale(langKeys.KEYPAIRS_NoKeyPairsDescription)}}</figure>
        </section>

        <!-- INPUT FIELD USED FOR COPYING -->
        <input tabindex="-1" type="text" ref="copier" class="copier" />
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import Scatter from '../models/Scatter'
    import AlertMsg from '../models/alerts/AlertMsg'

    export default {
        data(){ return {
            searchText:''
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'keypairs',
                'identities'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            copyKeypair(keypair){
                const copier = this.$refs.copier;
                copier.value = keypair.publicKey;
                copier.select();
                document.execCommand("copy");
            },
            createKeyPair(){ this.$router.push({ name:RouteNames.KEYPAIRS }) },
            filterBySearch(){ return this.keypairs.filter(keypair => JSON.stringify(keypair).indexOf(this.searchText) > -1) },
            deleteKeypair(keypair){
                const usedInIdentities = [];
                this.identities.map(id => {
                    if(id.getAccountFromPublicKey(keypair.publicKey))
                        usedInIdentities.push(id);
                });
                this[Actions.PUSH_ALERT](AlertMsg.DeletingKeyPair(usedInIdentities.map(id => id.name))).then(accepted => {
                    if(!accepted || !accepted.hasOwnProperty('accepted')) return false;

                    const scatter = this.scatter.clone();
                    if(usedInIdentities.length){
                        usedInIdentities.map(_id => {
                            const id = scatter.keychain.identities.find(x => x.publicKey === _id.publicKey)
                            // Remove account from identities
                            Object.keys(id.accounts).map(network => {
                                if(id.accounts[network].publicKey === keypair.publicKey)
                                    id.removeAccount(network);
                            });

                            // Remove permissions
                            scatter.keychain.removePermissionsByKeypair(keypair);
                        });
                    }
                    scatter.keychain.removeKeyPair(keypair);
                    this[Actions.UPDATE_STORED_SCATTER](scatter).then(() => {});
                });
            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT,
            ])
        }
    }
</script>

<style lang="scss">
    .header {
        &.small {
            display:inline-block;
            margin-right:8px;
        }
    }
</style>