<template>
    <section class="nav-actions">
        <figure class="action blue" v-on:click="emit(action)" v-for="action in actions">
            <i v-if="action.icon" class="fa" :class="'fa-'+action.icon"></i>
            <b v-else>{{action.text}}</b>
        </figure>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import Identity from '../models/Identity'

    export default {
        methods: { emit(action){ this.$emit(action.event) } },
        props:['actions']
    }
</script>

<style lang="scss">
    .nav-actions {
        position:fixed;
        top:1px;
        right:53px;
        opacity:1;
        transition:opacity 0.5s ease;
        z-index:2;

        .action {
            cursor: pointer;
            height:60px;
            line-height:60px;
            text-align:center;
            font-size:24px;
            color: #c0c0c0;
            float:right;
            margin-left:10px;
            transition: color 0.2s ease;

            b {
                font-size: 11px;
                border: 1px solid rgba(0,0,0,0.1);
                padding: 5px 8px;
                border-radius: 4px;
                display: inline-block;
                line-height: 12px;
                vertical-align: super;
                margin-top: 18px;
                transition: border 0.2s ease;
            }

            &.red { &:hover {
                color:#ff0d0c;
                b {
                    border: 1px solid #ff0d0c;
                }
            }}

            &.blue {
                b {
                    border: 1px solid transparent;
                    color:#fff;
                    background:#83baff;
                }

                &:hover {
                    background:transparent;
                    color:#83baff;
                    b {
                        border: 1px solid #83baff;
                    }
            }}
        }
    }
</style>
