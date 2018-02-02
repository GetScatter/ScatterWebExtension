<template>
    <section>

        <nav-actions :actions="navActions" v-on:save="exportHistories" v-on:clear="clearHistories"></nav-actions>

        <search v-on:changed="changed => bind(changed, 'searchText')"></search>

        <section class="p20 scroller with-search" v-if="histories.length">
            <section v-for="hist in filterBySearch()" class="panel-box">

                <!-- Header -->
                <section class="panel" style="overflow:hidden;">
                    <figure class="header big">
                        <i class="fa" :class="typeIcon(hist.type)"></i>
                        {{hist.type}}
                    </figure>
                    <figure class="header small margin">
                        <i class="fa fa-globe"></i>
                        {{`${hist.data.network.host}:${hist.data.network.port}`}}
                    </figure>
                    <figure class="header small margin">
                        <figure class="fl black">
                            {{hist.data.domain}}
                        </figure>
                        <figure class="fr">{{hist.timestamp/1000 | moment('from', 'now')}}</figure>
                    </figure>
                </section>

                <!-- Provided Identity -->
                <section class="panel" v-if="hist.type === historyTypes.PROVIDED_IDENTITY">
                    <figure class="header small reverse-margin">identity</figure>
                    <section class="items">
                        <section class="item">
                            <span>name</span>
                            <span>
                                <router-link :class="{'link':findIdentity(hist.data.identityHash)}" :to="(findIdentity(hist.data.identityHash)) ?
                                    {name:routeNames.IDENTITY, query:{hash:findIdentity(hist.data.identityHash).hash}} : {}">
                                    {{hist.data.identityName}} <i v-if="!findIdentity(hist.data.identityHash)">( removed )</i>
                                </router-link>
                            </span>
                        </section>
                    </section>
                </section>

                <!-- Signed Transaction -->
                <section class="panel" v-if="hist.type === historyTypes.SIGNED_TRANSACTION">
                    <figure class="header small reverse-margin">identity</figure>
                    <section class="items">
                        <section class="item">
                            <span>name</span>
                            <span>
                                <router-link :class="{'link':findIdentity(hist.data.identityHash)}" :to="(findIdentity(hist.data.identityHash)) ?
                                    {name:routeNames.IDENTITY, query:{hash:findIdentity(hist.data.identityHash).hash}} : {}">
                                    {{hist.data.identityName}} <i v-if="!findIdentity(hist.data.identityHash)">( removed )</i>
                                </router-link>
                            </span>
                        </section>
                    </section>
                </section>

                <!--&lt;!&ndash; Personal Information &ndash;&gt;-->
                <!--<section class="panel" v-if="fullKeysOf(identity.personal).length">-->
                    <!--<figure class="header small reverse-margin">personal information</figure>-->
                    <!--<section class="items">-->
                        <!--<section class="item" v-for="key in fullKeysOf(identity.personal)">-->
                            <!--<span>{{key}}</span>-->
                            <!--<span>{{identity.personal[key]}}</span>-->
                        <!--</section>-->
                    <!--</section>-->
                <!--</section>-->

                <!--&lt;!&ndash; Location Information &ndash;&gt;-->
                <!--<section class="panel" v-if="fullKeysOf(identity.location).length">-->
                    <!--<figure class="header small reverse-margin">location information</figure>-->
                    <!--<section class="items">-->
                        <!--<section class="item" v-for="key in fullKeysOf(identity.location)">-->
                            <!--<span>{{key}}</span>-->
                            <!--<span v-if="key === 'country'">{{identity.location[key].name}}</span>-->
                            <!--<span v-else>{{identity.location[key]}}</span>-->
                        <!--</section>-->
                    <!--</section>-->
                <!--</section>-->

                <!--&lt;!&ndash; Actions &ndash;&gt;-->
                <!--<section class="panel">-->
                    <!--<section class="actions">-->
                        <!--<figure v-on:click="goToIdentity(identity)" class="action"><i class="fa fa-pencil-square-o"></i></figure>-->
                        <!--<figure class="action"><i class="fa fa-clone"></i></figure>-->
                        <!--<figure class="action red right" v-on:click="removeIdentity(identity)"><i class="fa fa-minus-square"></i></figure>-->
                        <!--<figure class="action toggle-switch right" v-on:click="toggleIdentity(identity)">-->
                            <!--<figure class="switch" :class="{'enabled':!identity.disabled}">{{(identity.disabled) ? 'Disabled' : 'Enabled'}}</figure>-->
                        <!--</figure>-->
                    <!--</section>-->
                <!--</section>-->

            </section>
        </section>

        <!--<section class="history" v-if="histories.length">-->
            <!--<section class="item" v-for="hist in filterBySearch()">-->
                <!--<router-link :to="{name:routeNames.DOMAIN_PERMISSIONS, query:{hist}}">-->
                    <!--<figure class="icon">hi</figure>-->
                    <!--<figure class="text">{{hist}}</figure>-->
                <!--</router-link>-->
            <!--</section>-->
        <!--</section>-->

        <section class="nothing-here" v-else>
            <figure class="header">
                You don't have any historic events to display.
            </figure>
            <figure class="sub-header">
                Once you have them, you will be able to see a list of all of the events that pass
                through your Scatter. What you will <u>not</u> see is events that occurred on your
                accounts outside of scatter.
                <br><br>
                <figure class="line"></figure>
                <section style="margin-top:10px; font-size:9px;">
                    <b>Note:</b> Exporting your keychain as JSON data from the backup option in the settings panel
                    does not save these events. When you import that Scatter
                    instance again your histories will be empty. If you would like to export your histories
                    in the future you can do so using the action buttons on the navbar.
                </section>
            </figure>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import ArrayHelpers from '../util/ArrayHelpers'
    import Permission from '../models/Permission'
    import * as HistoricEventTypes from '../models/histories/HistoricEventTypes'

    export default {
        data(){ return {
            searchText:'',
            routeNames:RouteNames,
            historyTypes:HistoricEventTypes
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'histories'
            ]),
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            filterBySearch(){ return this.histories.filter(x => JSON.stringify(x).indexOf(this.searchText) > -1) },
            findIdentity(hash){ return this.scatter.keychain.findIdentity(hash); },
            typeIcon(type){
                switch(type){
                    case HistoricEventTypes.SIGNED_TRANSACTION: return 'fa-cubes';
                    case HistoricEventTypes.PROVIDED_IDENTITY: return 'fa-cube';
                }
                return '';
            },
            navActions(){
                return (this.histories.length) ? [
                    {event:'save', icon:'hdd-o'},
                    {event:'clear', icon:'trash-o'}
                ] : [];
            },
            exportHistories(){

            },
            clearHistories(){

            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER
            ])
        }
    }
</script>

<style lang="scss">

    .link {
        color:blue;
        text-decoration: underline;
    }

    .fl { float:left; }
    .fr { float:right; }

    .black {
        color:#555;
    }

</style>