<template>
    <section class="nav-actions">
        <figure class="action blue" v-on:click="emit(action)" v-for="action in actions">
            <i class="fa" :class="'fa-'+action.icon"></i>
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
        top:0;
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
            color:#eaeaea;
            float:right;
            margin-left:10px;
            transition: color 0.2s ease;

            &.red { &:hover {
                color:#ff0d0c;
            }}

            &.blue { &:hover {
                color:#83baff;
            }}
        }
    }
</style>