<template>
    <section class="prompt-body">

        <section class="prompt-actions">
            <btn text="Okay" v-on:clicked="accepted"></btn>
        </section>

        <section class="nothing-here">
            <figure class="header">
                <b>Your Scatter is locked!</b>
            </figure>
            <figure class="sub-header">
                Before you can do anything with your Scatter you will need to unlock it.<br>
                <br>
                If this keeps happening and you don't know why, check your <b>Auto Lock</b> settings from the <i class="fa fa-gear"></i> button inside
                of the Scatter extension.
                <br>
                <br>
                As a precaution to prying eyes it's default is 15 minutes. You may set it higher, but never more than 4 hours. This does not mean that every
                4 hours it will lock your Scatter, it means that if you do not <u>use</u> Scatter for 4 hours it will lock it, but every action you make will reset
                the timer.
                <br><br>
                <b>We will purposely never show a prompt/popup which requires you to log in.</b><br>
                If you see a prompt/popup which is requesting your password, it is a malicious website trying to get your password.
                Always only unlock Scatter from the extension's popup by clicking on the icon in your browser tray.
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
                this.prompt.responder(null);
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