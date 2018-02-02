<template>
    <section class="prompt-base">

        <router-view></router-view>
        <alert></alert>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames, RouteDepth} from '../vue/Routing'

    export default {
        data(){ return {

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
        }
    }
</script>

<style lang="scss">
    .prompt-base {

    }
</style>