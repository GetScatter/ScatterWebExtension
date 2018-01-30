<template>
    <section class="identities">

        <nav-actions :actions="[
            {event:'create', icon:'plus-square-o'}
        ]" v-on:create="createIdentity"></nav-actions>

        <search v-on:changed="changed => bind(changed, 'searchText')"></search>

        <section class="p20 scroller with-search">
            <section v-for="identity in filterBySearch()" class="panel-box" :class="{'disabled':identity.disabled}">

                <!-- Header -->
                <section class="panel">
                    <figure class="header big">{{identity.name}}</figure>
                    <figure class="header small margin"><i class="fa fa-globe"></i>{{identity.network.host}}</figure>
                </section>

                <!-- Account information -->
                <section class="panel" v-if="identity.account">
                    <figure class="header small reverse-margin">account</figure>
                    <section class="items">
                        <section class="item">
                            <span class="big">{{`${identity.account.name}@${identity.account.authority}`}}</span>
                            <span class="big">12 EOS</span>
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
                <section class="panel" v-if="fullKeysOf(identity.location).length">
                    <figure class="header small reverse-margin">location information</figure>
                    <section class="items">
                        <section class="item" v-for="key in fullKeysOf(identity.location)">
                            <span>{{key}}</span>
                            <span v-if="key === 'country'">{{identity.location[key].name}}</span>
                            <span v-else>{{identity.location[key]}}</span>
                        </section>
                    </section>
                </section>

                <!-- Actions -->
                <section class="panel">
                    <section class="actions">
                        <figure v-on:click="goToIdentity(identity)" class="action"><i class="fa fa-pencil-square-o"></i></figure>
                        <figure class="action"><i class="fa fa-clone"></i></figure>
                        <figure class="action red right" v-on:click="removeIdentity(identity)"><i class="fa fa-minus-square"></i></figure>
                        <figure class="action toggle-switch right" v-on:click="toggleIdentity(identity)">
                            <figure class="switch" :class="{'enabled':!identity.disabled}">{{(identity.disabled) ? 'Disabled' : 'Enabled'}}</figure>
                        </figure>
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
    import Identity from '../models/Identity'
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
                'identities'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            fullKeysOf(obj){ return Object.keys(obj).filter(key => {
                return (typeof obj[key] === 'string') ? obj[key].length : obj[key][Object.keys(obj[key])[0]].length
            }) },
            filterBySearch(){ return this.identities.filter(x => JSON.stringify(x).indexOf(this.searchText) > -1) },
            toggleIdentity(identity){
                const scatter = this.scatter.clone();
                scatter.keychain.identities.find(x => x.hash === identity.hash).disabled = !identity.disabled;
                this[Actions.UPDATE_STORED_SCATTER](scatter);
            },
            removeIdentity(identity){
                if(this.identities.length === 1){
                    this[Actions.PUSH_ALERT](AlertMsg.CantRemoveLastIdentity());
                    return false;
                }

                this[Actions.PUSH_ALERT](AlertMsg.AreYouSure('Removing Identity', ['Scatter', 'Identities', 'Remove'],
                    `You are about to remove an Identity with the name '${identity.name}'. Removing Identities is not reversible and
                    all permissions will be . If the Identity is being used on applications perhaps you should just disable it instead.`
                )).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    const scatter = this.scatter.clone();
                    scatter.keychain.identities = scatter.keychain.identities.filter(id => id.hash !== identity.hash);
                    scatter.keychain.permissions = scatter.keychain.permissions.filter(perm => perm.identityHash !== identity.hash);
                    this[Actions.UPDATE_STORED_SCATTER](scatter);
                });

            },
            goToIdentity(identity){
                this.$router.push({ name:RouteNames.IDENTITY, query: { hash: identity.hash } })
            },
            createIdentity(){
                this.$router.push({ name:RouteNames.IDENTITY, query: { hash: 'create' } })
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