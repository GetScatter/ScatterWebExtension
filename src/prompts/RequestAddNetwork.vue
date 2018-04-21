<template>
    <section class="prompt-body">

        <section class="prompt-actions">
            <btn :text="locale(langKeys.BUTTON_Deny)" half="true" v-on:clicked="denied"></btn>
            <btn :text="locale(langKeys.BUTTON_Accept)" half="true" is-blue="true" v-on:clicked="accepted"></btn>
        </section>

        <section class="partitioned">

            <section class="partition">

                <section class="description">
                    <b>{{prompt.domain}}</b> {{locale(langKeys.REQUEST_AddNetwork)[0]}}
                </section>

                <section class="key-value">
                    <figure class="key">{{locale(langKeys.GENERIC_Host)}}</figure>
                    <figure class="value">{{prompt.network.host}}</figure>
                </section>

                <section class="key-value">
                    <figure class="key">{{locale(langKeys.GENERIC_Port)}}</figure>
                    <figure class="value">{{prompt.network.port}}</figure>
                </section>

            </section>

            <section class="partition">
                <section class="nothing-here">
                    <figure class="header">{{locale(langKeys.REQUEST_AddNetwork)[1]}}</figure>
                    <figure class="sub-header">{{locale(langKeys.REQUEST_AddNetwork)[2]}}</figure>
                </section>
            </section>

        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import AlertMsg from '../models/alerts/AlertMsg'
    import IdentityService from '../services/IdentityService'
    import NotificationService from '../services/NotificationService'
    import Identity from '../models/Identity'

    export default {
        data(){ return {

        }},
        computed: {
            ...mapState([
                'prompt'
            ])
        },
        methods: {
            accepted(){
                this.prompt.responder(true);
                NotificationService.close();
            },
            denied(){
                this.prompt.responder(false);
                NotificationService.close();
            }
        }
    }
</script>

<style lang="scss">
    span {

        .red {

        }
    }
    .prompt-body {
        font-family: 'Open Sans', sans-serif;

        .identity-header {
            width:calc(100% - 98px);
            display:inline-block;
        }

        .select-identity {
            cursor: pointer;
            padding:0 10px;
            height:24px;
            line-height:21px;
            display:inline-block;
            color:#bebebe;
            font-family: 'Open Sans', sans-serif;
            font-size: 11px;
            border:1px solid #dfdfdf;
            border-radius: 4px;
            transition:all 0.2s ease;
            transition-property: background, border, color;

            &:hover, &.selected {
                background:#54a7fc;
                border:1px solid #54a7fc;
                color:#fff;
            }
        }

        .description {
            margin-top:5px;
            font-size:9px;
            color:#b8b8b8;

            b { color:#707070; }
        }

        .partitioned {
            overflow:hidden;
            height:436px;
            width:100%;

            .partition {
                width:50%;
                float:left;
                height:436px;
                overflow-y:auto;
                position: relative;
                display:block;

                &.scroller {
                    height:405px;
                }

                &:first-child {
                    /*padding:20px;*/
                    padding:40px 50px;

                    .key-value {
                        padding:20px;
                        border:2px dashed rgba(0,0,0,0.05);
                        border-radius: 4px;
                        margin-bottom:20px;
                        margin-top:20px;

                        .key {
                            font-size:9px;
                            color:#bbbbbb;
                        }

                        .value {
                            font-size:12px;
                            color:#707070;
                            font-weight:900;
                            font-style: italic;
                        }
                    }
                }

                &:last-child {
                    background:#f5f5f5;
                    padding:20px;
                }
            }
        }
    }
</style>