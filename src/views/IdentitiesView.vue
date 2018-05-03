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
                            <span>{{network}}</span>
                            <span>{{identity.accounts[network].formatted()}}</span>
                            <!--<span class="big">{{getBalanceFor(identities.accounts[account])}}</span>-->
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
    import Scatter from '../models/Scatter'
    import AlertMsg from '../models/alerts/AlertMsg'
    import ObjectHelpers from '../util/ObjectHelpers'
    import AccountService from '../services/AccountService'

    export default {
        data(){ return {
            searchText:'',
            balances:{}
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'identities',
            ])
        },
        mounted(){
            this.bindBalances();
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
            bindBalances(){
                //TODO: Fix for network account map
//                const identityAccountMap = ObjectHelpers.distinctObjectArray(
//                    this.identities.filter(id => Object.keys(id.accounts).length).map(network => {
//
//                        return {account:id.account.name, network:id.network.unique()}
//                    })
//                );
//
//                const _balances = {};
//
//                Promise.all(identityAccountMap.map(id => {
//                    return AccountService.getBalance(id.account, id.network).then(balance => {
//                        if(!_balances.hasOwnProperty(id.network)) _balances[id.network] = {};
//                        _balances[id.network][id.account] = balance;
//                        return _balances;
//                    })
//                }))
//                    // Vue will not update semi-ticks
//                    .then(balanceMap => this.balances = balanceMap[0])
            },
            getBalanceFor(identity){
                if(!this.balances.hasOwnProperty(identity.network.unique())) return 'Network is down';
                if(!this.balances[identity.network.unique()].hasOwnProperty(identity.account.name)) return "Can't find account";
                return this.balances[identity.network.unique()][identity.account.name];
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
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT,
            ])
        }
    }
</script>

<style lang="scss">

    .identities {

    }

</style>