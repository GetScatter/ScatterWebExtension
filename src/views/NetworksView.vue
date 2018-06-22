<template>
    <section class="networks">

        <nav-actions :actions="[
            {event:'create', text:locale(langKeys.GENERIC_New)}
        ]" v-on:create="createNetwork"></nav-actions>

        <search v-on:changed="changed => bind(changed, 'searchText')"></search>

        <section class="p20 scroller with-search">
            <section v-for="network in filterBySearch()" class="panel-box">

                <!-- Header -->
                <section class="panel" v-if="network.name">
                    <figure class="header big">{{network.name}}</figure>
                </section>
                <section class="panel">
                    <figure class="header big">
                        <a target="_blank" :href="`${network.protocol}://${network.hostport()}`">
                            <u>{{network.host}}</u>
                        </a>
                    </figure>
                    <figure class="header small margin"><i class="fa fa-chain"></i>{{network.blockchain.toUpperCase()}}</figure>
                    <figure class="header small margin"><i class="fa fa-globe"></i>{{network.protocol}}</figure>
                    <figure class="header small margin"><i class="fa fa-plug"></i>{{network.port}}</figure>
                </section>
                <section class="panel" v-if="network.chainId && network.chainId.length">
                    <figure class="header small margin"><i class="fa fa-chain"></i> Chain ID</figure><br>
                    <figure class="header small margin">{{network.chainId}}</figure>
                </section>

                <!-- Actions -->
                <section class="panel">
                    <section class="actions">
                        <figure class="action red right" v-on:click="deleteNetwork(network)"><i class="fa fa-ban"></i></figure>
                    </section>
                </section>

            </section>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import Scatter from '../models/Scatter'
    import AlertMsg from '../models/alerts/AlertMsg'
    import PluginRepository from '../plugins/PluginRepository'

    export default {
        data(){ return {
            searchText:''
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'networks'
            ])
        },
        mounted(){
            console.log('networks', this.networks)
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            createNetwork(){ this.$router.push({ name:RouteNames.NETWORK, query: { networkunique: '' } }) },
            filterBySearch(){ return this.networks.filter(x => JSON.stringify(x).indexOf(this.searchText) > -1) },
            async deleteNetwork(network){
                const plugin = PluginRepository.plugin(network.blockchain);
                if(await plugin.isEndorsedNetwork(network)){
                    this[Actions.PUSH_ALERT](AlertMsg.RemovingEndorsedNetwork());
                    return false;
                }

                this[Actions.PUSH_ALERT](AlertMsg.RemovingNetwork()).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    const scatter = this.scatter.clone();
                    scatter.settings.networks = scatter.settings.networks.filter(x => x.unique() !== network.unique());

                    scatter.keychain.identities.map(id => {
                        id.removeAccount(network);
                    });

                    this[Actions.UPDATE_STORED_SCATTER](scatter);
                })
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