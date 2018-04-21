<template>
    <section>

        <search v-on:changed="changed => bind(changed, 'searchText')"></search>

        <section class="permissions" v-if="permissions.length">
            <section class="item" v-for="(perms, domain) in filterBySearch()">
                <router-link :to="{name:routeNames.DOMAIN_PERMISSIONS, query:{domain}}" v-if="perms.find(perm => perm.isIdentityOnly())">
                    <figure class="icon">{{perms.length}}</figure>
                    <figure class="text">{{domain}}</figure>
                </router-link>
            </section>
        </section>

        <section class="nothing-here" v-else>
            <figure class="header">{{locale(langKeys.PERMISSIONS_Header)}}</figure>
            <figure class="sub-header">{{locale(langKeys.PERMISSIONS_Description)}}</figure>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import ObjectHelpers from '../util/ObjectHelpers'
    import Permission from '../models/Permission'

    export default {
        data(){ return {
            searchText:'',
            domains:[],
            routeNames:RouteNames
        }},
        mounted(){
            this.domains = ObjectHelpers.groupBy(this.permissions, 'domain');
            console.log(this.permissions);
        },
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'permissions'
            ]),
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            filterBySearch(){
                return Object.keys(this.domains)
                    .filter(x => JSON.stringify(x).indexOf(this.searchText) > -1)
                    .reduce((acc,key) => {
                        acc[key] = this.domains[key];
                        return acc;
                    }, {})
            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER
            ])
        }
    }
</script>

<style lang="scss">

    .permissions {
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