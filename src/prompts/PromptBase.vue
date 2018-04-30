<template>
    <section class="prompt-base" v-if="prompt">

        <section class="head">
            <figure class="type">{{flipWords(camelToTitle(prompt.type))}}</figure>
            <section class="split-tag">
                <figure class="tag">{{prompt.domain}}</figure>
                <figure class="tag" v-if="prompt.network && prompt.network.host">{{prompt.network.host}}</figure>
            </section>

        </section>

        <section class="body">
            <router-view></router-view>
        </section>
        <alert></alert>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames, RouteDepth} from '../vue/Routing'
    import StringHelpers from '../util/StringHelpers'

    export default {
        data(){ return {

        }},
        computed: {
            ...mapState([
                'prompt'
            ])
        },
        methods: {
            camelToTitle(camel){
                return StringHelpers.camelToTitle(camel);
            },
            flipWords(words){
                return words.split(" ").reverse().join(" ")
            },
            ...mapActions([
                Actions.SET_MNEMONIC,
            ])
        }
    }
</script>

<style lang="scss">
    main {
        background:#fff;
    }

    .prompt-base {
        position: relative;
        font-family: 'Open Sans', sans-serif;

        .description {
            margin-top:5px;
            font-size:9px;
            color:#b8b8b8;

            b { color:#707070; }
        }

        .prompt-actions {
            position:absolute;
            right:20px;
            top:20px;
            width:200px;
        }

        .head {
            padding:50px;

            .type {
                color:#4f4f4f;
                font-family: 'Raleway', sans-serif;
                font-size:14px;
                font-weight:bold;
            }

            .split-tag {
                margin-top:5px;
                font-size:9px;
                line-height:8px;

                .tag {
                    padding:3px 5px;
                    display:inline-block;

                    &:first-child {
                        background:#4f4f4f;
                        color:#fff;
                    }

                    &:last-child {
                        margin-left:-3px;
                        background:transparent;
                        border:1px solid #4f4f4f;
                        color:#4f4f4f;
                        padding:2px 5px;
                    }
                }
            }
        }

        > .body {
            height:436px;
            background:#f9f9f9;
        }
    }
</style>