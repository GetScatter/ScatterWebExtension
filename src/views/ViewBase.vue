<template>
    <section class="view-base">

        <section class="router-base">
            <div class="upgrade-notice">
                <div class=notice>
                    <h3>Please upgrade</h3>
                    <p>Scatter Desktop is more powerful, more secure, and easier to use.</p>
                    <a class="button" href="https://get-scatter.com/">Upgrade to Scatter Desktop</a>
                </div>
            </div>
            <navbar></navbar>
            <transition :name="transitionName">
                <router-view></router-view>
            </transition>
        </section>
        <alert></alert>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames, RouteDepth} from '../vue/Routing'

    export default {
        data(){ return {
            transitionName:'',
        }},
        computed: {
            ...mapState([
                'mnemonic'
            ])
        },
        methods: {
            ...mapActions([
                Actions.SET_MNEMONIC,
            ])
        },
        watch: {
            '$route' (to, from) {
                this.transitionName = RouteDepth[to.name] < RouteDepth[from.name] ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>

<style lang="scss">
    $speed:0.2s;
    .router-base {
        position: relative;
    }

    @keyframes fadein {
        0% { opacity:0; }
        100% { opacity:1; }
    }

    .slide-left-leave-active,
    .slide-left-enter-active {
        position:absolute;
        top:60px; left:0; right:0;
        transition: $speed;

        .nav-actions {
            opacity:0;
        }
    }
    .slide-left-enter {
        transform: translate(100%, 0);

        .search {
            transform:translateY(-30px);
        }
    }
    .slide-left-leave-to {
        transform: translate(-100%, 0);
    }

    .slide-right-leave-active,
    .slide-right-enter-active {
        position:absolute;
        top:60px; left:0; right:0;
        transition: $speed;

        .nav-actions {
            opacity:0;
        }
    }
    .slide-right-enter {
        transform: translate(-100%, 0);

        .search {
            transform:translateY(-30px);
        }
    }
    .slide-right-leave-to {
        transform: translate(200%, 0);
    }
</style>