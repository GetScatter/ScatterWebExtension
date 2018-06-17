<template>
    <section class="identities">

        <nav-actions :actions="[
            {event:'create', text:locale(langKeys.GENERIC_New)}
        ]" v-on:create="createIdentity"></nav-actions>

        <search v-on:changed="changed => bind(changed, 'searchText')"></search>

        <section v-if="!identities.length" class="nothing-here">

            <figure class="header">
                {{locale(langKeys.IDENTITIES_Header)}}
            </figure>
            <figure class="sub-header">
                {{locale(langKeys.IDENTITIES_Description)}}
                <br><br>
                <btn :text="locale(langKeys.BUTTON_CreateIdentity)" v-on:clicked="createIdentity" margined="true"></btn>
            </figure>

        </section>
        <section v-if="identities.length" class="p20 scroller with-search">
            <section v-for="identity in filterBySearch()" class="panel-box">

                <!-- Header -->
                <section class="panel">
                    <figure class="header big">{{identity.name}}</figure>
                </section>

                <!-- Account information -->
                <section class="panel" v-if="Object.keys(identity.accounts).length">
                    <figure class="header small reverse-margin">accounts</figure>
                    <section class="items" v-for="network in Object.keys(identity.accounts)">
                        <section class="item">
                            <span>{{networkToName(network)}}</span>
                            <span>{{identity.accounts[network].formatted()}}</span>
                            <section class="items token-balances" v-if="loadingTokenBalances">
                                <section class="item">
                                    Loading token balances
                                </section>
                            </section>
                            <section class="items token-balances" v-else v-for="balances in balancesFor(network)">
                                <section class="items" v-for="balance in balances">
                                    <section class="item">
                                        <span>{{balance[0]}}</span>
                                        <span>{{balance[1]}}</span>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>

                <!-- Personal Information -->
                <section class="panel" v-if="fullKeysOf(identity.personal).length">
                    <figure class="header small reverse-margin">personal information</figure>
                    <section class="items">
                        <section class="item" v-for="key in fullKeysOf(identity.personal)">
                            <span>{{key}}</span>
                            <span>{{identity.personal[key]}}</span>
                        </section>
                    </section>
                </section>

                <!-- Location Information -->
                <section class="panel" v-for="location in identity.locations">
                    <section v-if="fullKeysOf(location).length">
                        <figure class="header small reverse-margin">location information</figure>
                        <section class="items">
                            <section class="item" v-for="key in fullKeysOf(location)">
                                <span>{{key}}</span>
                                <span v-if="key === 'country'">{{location[key].name}}</span>
                                <span v-else>{{location[key]}}</span>
                            </section>
                        </section>
                    </section>
                </section>

                <!-- Actions -->
                <section class="panel">
                    <section class="actions">
                        <figure v-on:click="goToIdentity(identity)" class="action"><i class="fa fa-pencil"></i></figure>
                        <section v-if="Object.keys(identity.accounts).length">
                            <figure class="action" @click="showingTokens = identity" v-if="!showingTokensFor(identity)"><i class="fa fa-circle-thin"></i></figure>
                            <figure class="action" @click="showingTokens = null" v-else><i class="fa fa-times-circle"></i></figure>
                        </section>
                        <figure class="action red right" v-on:click="removeIdentity(identity)"><i class="fa fa-minus-square"></i></figure>
                    </section>
                </section>

            </section>
        </section>
    </section>
</template>

<script>
    import Vue from 'vue'
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import Identity from '../models/Identity'
    import Network from '../models/Network'
    import Scatter from '../models/Scatter'
    import AlertMsg from '../models/alerts/AlertMsg'
    import ObjectHelpers from '../util/ObjectHelpers'
    import AccountService from '../services/AccountService'
    import PluginRepository from '../plugins/PluginRepository'

    export default {
        data(){ return {
            searchText:'',
            balances:[],
            showingTokens:null,
            loadingTokenBalances:false,
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'identities',
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            fullKeysOf(obj){ return Object.keys(obj).filter(key => {
                switch(typeof obj[key]){
                    case 'string': return obj[key].length;
                    case 'boolean': return true;
                    default: return obj[key][Object.keys(obj[key])[0]].length;
                }
//                return (typeof obj[key] === 'string') ? obj[key].length : obj[key][Object.keys(obj[key])[0]].length
            }) },
            showingTokensFor(identity){
                return this.showingTokens && (identity.publicKey === this.showingTokens.publicKey);
            },
            async bindBalances(identity){
                this.loadingTokenBalances = true;
                let netAccountMap = [];
                Object.keys(identity.accounts).map(netString =>
                    netAccountMap.push({account:identity.accounts[netString], netString}))

                netAccountMap = ObjectHelpers.distinct(netAccountMap);

                await Promise.all(netAccountMap.map(async netAccount => {
                    await this.accountBalances(netAccount);
                }));

                this.loadingTokenBalances = false;
            },
            async accountBalances({account, netString}){
                let network = Network.fromUnique(netString);

                if(!network.host){
                    const hostedNetwork = this.scatter.settings.networks.find(n => n.chainId === network.chainId && n.host !== '');
                    if(!hostedNetwork) return false;
                    network = hostedNetwork;
                }

                await PluginRepository.plugin(account.blockchain()).getBalances(account, network).then(balances => {
                    this.balances.push({network:netString, balances});
                    return true;
                });
            },
            balancesFor(network){
                return this.balances.filter(b => b.network === network).map(b => b.balances);
            },
            filterBySearch(){ return this.identities.filter(x => JSON.stringify(x).indexOf(this.searchText) > -1) },
            removeIdentity(identity){
//                if(this.identities.length === 1){
//                    this[Actions.PUSH_ALERT](AlertMsg.CantRemoveLastIdentity());
//                    return false;
//                }

                this[Actions.PUSH_ALERT](AlertMsg.RemovingIdentity(identity.name)).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    const scatter = this.scatter.clone();
                    scatter.keychain.identities = scatter.keychain.identities.filter(id => id.publicKey !== identity.publicKey);
                    scatter.keychain.permissions = scatter.keychain.permissions.filter(perm => perm.identity !== identity.publicKey);
                    this[Actions.UPDATE_STORED_SCATTER](scatter);
                });

            },
            goToIdentity(identity){
                this.$router.push({ name:RouteNames.IDENTITY, query: { publicKey: identity.publicKey } })
            },
            createIdentity(){
                this.$router.push({ name:RouteNames.IDENTITY, query: { publicKey: 'create' } })
            },
            networkToName(_network){
                const network = this.scatter.settings.networks.find(network => network.unique() === _network);
                if(!network) return 'Deleted Network';
                return network.hasOwnProperty('name') && network.name.length ? network.name : network.unique();
            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT,
            ])
        },
        watch:{
            showingTokens(){
                this.balances = [];
                if(this.showingTokens)
                    this.bindBalances(this.showingTokens)
            }
        }
    }
</script>

<style lang="scss">

    .token-balances {
        display: inline-block;
        border-left: 10px solid rgba(0,0,0,0.1);
        width: 100%;
        padding: 0 0 0 5px;

        .items {
            margin-top:0 !important;
        }
    }

</style>