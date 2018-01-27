<template>
    <section class="settings p40">
        Settings
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'

    export default {
        data(){ return {

        }},
        computed: {
            ...mapState([
                'scatter',
                'mnemonic'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            ...mapActions([
                Actions.CREATE_NEW_SCATTER
            ])
        }
    }
</script>

<style lang="scss">

    .settings {

    }
</style>