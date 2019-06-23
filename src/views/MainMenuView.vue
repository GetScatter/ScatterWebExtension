<template>
    <!--<section class="main-menu">-->
        <!--<section class="item" v-for="link in links">-->
            <!--<router-link :to="{name:link.route}" v-if="link.name != locale(langKeys.MAINMENU_Lock)">-->
                <!--<figure class="icon"><i class="fa" :class="'fa-'+link.icon"></i></figure>-->
                <!--<figure class="text">{{link.name}}</figure>-->
            <!--</router-link>-->

            <!--<section v-else v-on:click="lockScatter">-->
                <!--<figure class="icon last"><i class="fa" :class="'fa-'+link.icon"></i></figure>-->
                <!--<figure class="text">{{link.name}}</figure>-->
            <!--</section>-->
        <!--</section>-->
    <!--</section>-->

    <section class="dead">
        <section class="container">
            <figure class="title">Goodbye, Scatter Extension</figure>
            <figure class="details">
                This extension is very old, and we at Scatter no longer maintain it which makes it unsafe to use.
                <br>
                <br>
                <b>Because of this we are disabling it until it gets some love.</b>
                <br>
                <br>
                <br>
                <br>
                <figure @click="getScatterDesktop" class="bbutton">Download Scatter Desktop</figure>
                <figure @click="exportBackup" class="bbutton bordered">Export Backup for Desktop</figure>
                <figure @click="joinTelegram" class="bbutton text">Join our Telegram</figure>
            </figure>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import * as LANG_KEYS from '../localization/keys';

    import AES from 'aes-oop';


    import Network from '../models/Network'
    import Identity from '../models/Identity'
    import Permission from '../models/Permission'
    import InternalMessage from "../messages/InternalMessage";
    import * as InternalMessageTypes from "../messages/InternalMessageTypes";
    import StorageService from "../services/StorageService";

    export default {
        data(){ return {
            links:[
                {route:RouteNames.IDENTITIES, name:this.locale(LANG_KEYS.MAINMENU_Identities), icon:'address-book'},
                {route:RouteNames.KEYS, name:this.locale(LANG_KEYS.MAINMENU_Keys), icon:'key'},
                {route:RouteNames.PERMISSIONS, name:this.locale(LANG_KEYS.MAINMENU_Permissions), icon:'shield'},
//                {route:RouteNames.HISTORY, name:this.locale(LANG_KEYS.MAINMENU_History), icon:'history'},
                {name:this.locale(LANG_KEYS.MAINMENU_Lock), icon:'lock'},
            ]
        }},
        computed: {
            ...mapState([
                'scatter'
            ])
        },
        mounted(){
        },
        methods: {
            bind(changed, original) { this[original] = changed },

	        async exportBackup(){
		        const seed = await InternalMessage.payload(InternalMessageTypes.GET_SEED).send();
		        if(!seed) return false;

		        const scatter = this.scatter.clone();
		        let filetext = AES.encrypt(scatter, seed);
		        filetext += `|SSLT|${await StorageService.getSalt()}`;
		        const filename = `scatter_${+new Date()}.scatter_backup.txt`;
		        this.save(filename, filetext);
	        },
	        save(filename, data) {
		        const elem = window.document.createElement('a');
		        elem.target = '_blank';
		        elem.href = window.URL.createObjectURL(new Blob([data], {type: 'text/csv'}));
		        elem.download = filename;
		        document.body.appendChild(elem);
		        elem.click();
		        document.body.removeChild(elem);
	        },
            getScatterDesktop(){
	            chrome.tabs.create({url:'https://get-scatter.com'});
            },
            joinTelegram(){
	            chrome.tabs.create({url:'https://t.me/Scatter'});
            },
            ...mapActions([
                Actions.LOCK,
                Actions.UPDATE_STORED_SCATTER
            ])
        }
    }
</script>

<style lang="scss">

    .main-menu {
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

    .dead {
        display:flex;
        height:calc(100vh - 60px);
        justify-content: center;
        align-items: center;
        overflow:hidden;

        .container {
            padding:40px;
            text-align:center;

            .logo {
                width:180px;
                margin:0 auto;
            }

            .title {
                font-size: 24px;
            }

            .details {
                margin-top:15px;
            }

            .bbutton {
                cursor: pointer;
                padding:20px 10px;
                background:#0799ff;
                color:#fff;
                border-radius:4px;
                font-weight: bold;
                margin-top:5px;

                &.bordered {
                    padding:10px 10px;
                    background:transparent;
                    border:1px solid #0799ff;
                    color:#0799ff;
                    display:block;
                }

                &.text {
                    padding:10px 10px;
                    background:transparent;
                    color:#0799ff;
                    display:block;
                }
            }
        }
    }

</style>