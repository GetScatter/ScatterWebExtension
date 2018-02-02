<template>
    <section>

        Request Signature Prompt

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import AlertMsg from '../models/alerts/AlertMsg'
    import IdentityService from '../services/IdentityService'

    export default {
        data(){ return {

        }},
        computed: {
            ...mapState([
                'scatter'
            ])
        },
        methods: {
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT,
                Actions.BACKUP_SCATTER_ON_BLOCKCHAIN
            ])
        }
    }
</script>

<style lang="scss">
    body {
        background:#fff;
    }
</style>