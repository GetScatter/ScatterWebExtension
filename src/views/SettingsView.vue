<template>
    <section class="settings">
        <section class="item" v-for="link in links">
            <router-link :to="{name:link.route}">
                <figure class="icon"><i class="fa" :class="'fa-'+link.icon"></i></figure>
                <figure class="text">{{link.name}}</figure>
            </router-link>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import AlertMsg from '../models/alerts/AlertMsg'

    export default {
        data(){ return {
            links:[]
        }},
        mounted(){
            this.links = [
                {route:RouteNames.NETWORKS, name:this.locale(this.langKeys.SETTINGSMENU_Networks), icon:'globe'},
                {route:RouteNames.LANGUAGE, name:this.locale(this.langKeys.SETTINGSMENU_Language), icon:'language'},
                {route:RouteNames.AUTO_LOCK, name:this.locale(this.langKeys.SETTINGSMENU_AutoLock), icon:'clock-o'},
                {route:RouteNames.CHANGE_PASSWORD, name:this.locale(this.langKeys.SETTINGSMENU_Password), icon:'asterisk'},
                {route:RouteNames.BACKUP, name:this.locale(this.langKeys.SETTINGSMENU_Backup), icon:'save'},
                {route:RouteNames.DESTROY, name:this.locale(this.langKeys.SETTINGSMENU_Destroy), icon:'trash-o'},
            ]
        }
    }
</script>

<style lang="scss">

    .settings {
        padding:40px 0;

        .item {
            cursor: pointer;
            padding:0 40px;
            transition:background 0.2s ease;

            &:hover {
                background:#f8f8f8;
            }

            .icon {
                padding:16px 0;
                display:inline-block;
                font-size:18px;
                color:#656565;
                width:30px;
                text-align:center;
                margin-right:10px;

                &:not(.last){
                    border-bottom:1px solid #e3e3e3;
                }
            }

            .text {
                padding:16px 0;
                display:inline-block;
                font-size:24px;
                color:#656565;
                font-family:'Raleway',sans-serif;
                font-weight:300;
            }
        }
    }
</style>