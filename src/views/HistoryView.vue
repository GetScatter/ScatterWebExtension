<template>
    <section>

        <nav-actions :actions="navActions" v-on:save="exportHistories" v-on:clear="clearHistories"></nav-actions>

        <search v-on:changed="changed => bind(changed, 'searchText')"></search>

        <section class="history" v-if="histories.length">
            <section class="item" v-for="hist in filterBySearch()">
                <router-link :to="{name:routeNames.DOMAIN_PERMISSIONS, query:{hist}}">
                    <figure class="icon">hi</figure>
                    <figure class="text">{{hist}}</figure>
                </router-link>
            </section>
        </section>

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

    export default {
        data(){ return {
            searchText:'',
            routeNames:RouteNames
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

    .history {
        padding:40px 0;


        .item {
            cursor: pointer;
            padding:0 40px;
            transition:background 0.2s ease;

            &:hover {
                background:#fff;
            }

            .icon {
                font-family:'Open Sans', sans-serif;
                display:inline-block;
                font-size:11px;
                font-weight:bolder;
                color:#d6d6d6;
                border:1px solid #d6d6d6;
                border-radius:4px;
                width:30px;
                height:30px;
                line-height:30px;
                text-align:center;
                margin-right:10px;
                vertical-align: middle;

                &:not(:last-child){
                    &:after {
                        content:'';
                        display:block;
                        margin-top:10px;
                        border-bottom:1px solid #e3e3e3;
                    }
                }
            }

            .text {
                padding:16px 0;
                display:inline-block;
                font-size:16px;
                color:#656565;
                font-family:'Raleway',sans-serif;
                font-weight:300;
            }
        }
    }
</style>