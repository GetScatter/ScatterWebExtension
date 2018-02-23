<template>
    <section class="prompt-body">

        <section class="prompt-actions">
            <btn text="Okay" v-on:clicked="accepted"></btn>
        </section>

        <section class="nothing-here">
            <figure class="header">
                <b>Your Scatter is out of date!</b>
            </figure>
            <figure class="sub-header">
                <b>{{prompt.domain}} is requiring you have a version of Scatter that is newer than the one installed.</b>
                <br>
                This usually means that new functionality was released and an application is trying to use it but it's not
                currently included in the build you have installed.
                <br>
                <br>
                <b>Please note</b>, we leave version checking up to the dapps themselves. They could be maliciously trying to
                get you to download something. Make sure you always download Scatter from the proper location.
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