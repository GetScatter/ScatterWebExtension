<template>
    <section class="prompt-body">

        <section class="prompt-actions">
            <btn text="Okay" v-on:clicked="accepted"></btn>
        </section>

        <section class="nothing-here">
            <figure class="header">
                <b>{{locale(langKeys.REQUEST_UpdateVersion)[0]}}</b>
            </figure>
            <figure class="sub-header">
                <b>{{prompt.domain}} {{locale(langKeys.REQUEST_UpdateVersion)[1]}}</b>
                <br>
                {{locale(langKeys.REQUEST_UpdateVersion)[2]}}
                <br><br>
                {{locale(langKeys.REQUEST_UpdateVersion)[3]}}
            </figure>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import NotificationService from '../services/NotificationService'

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
                NotificationService.close();
            }
        }
    }
</script>

<style lang="scss">


    .prompt-body {
        padding:20px;
    }

</style>