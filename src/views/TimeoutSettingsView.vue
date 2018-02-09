<template>
    <section class="backup scroller">

        <!-- Verified -->
        <section class="panel">
            <figure class="header">Timeout Minutes</figure>
            <figure class="sub-header">
                By changing your timeout minutes, once you validate your password in Scatter popup, your session
                will be enabled and will not ask it anymore for the amount of time chosen.
            </figure>
            <sel :options="options" key=""
                 :selected="timeoutMinutes"
                 :parser="(obj) => obj.name"
                 v-on:changed="changed => bind(changed, 'timeoutMinutes')"></sel>
            <btn v-on:clicked="changeTimeout" text="Change Timeout" :margined="true"></btn>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing';
    import TimingHelpers from '../util/TimingHelpers';

    const minutesOptions = [
        {code: 1, name:'1 Minute'},
        {code: 3, name:'3 Minutes'},
        {code: 5, name:'5 Minutes'},
        {code: 10, name:'10 Minutes'},
        {code: 15, name:'15 Minutes'},
        {code: 30, name:'30 Minutes'},
        {code: 60, name:'1 Hour'},
        {code: 120, name:'2 Hours'},
        {code: 240, name:'4 Hours'},
    ];

    export default {
        data(){ return {
            options: minutesOptions,
            timeoutMinutes: minutesOptions.find(i => i.code ===
                TimingHelpers.minutesFromMillis(this.$store.state.scatter.settings.timeoutInactivityInterval))
        }},
        computed: {
            ...mapState([
                'scatter'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            changeTimeout(){
                this[Actions.SET_TIMEOUT](this.timeoutMinutes.code).then(() => {
                    this.$router.push({name:RouteNames.SETTINGS});
                });
            },
            ...mapActions([
                Actions.PUSH_ALERT,
                Actions.SET_TIMEOUT
            ])
        }
    }
</script>

<style lang="scss">
    .checkbox {
        width:56px;
        float:left;
        margin-right:15px;
    }
    .backup {
        font-family:'Open Sans', sans-serif;

        .panel {
            padding:20px;

            &:not(:last-child){
                border-bottom:1px solid #eaeaea;
            }

            .header {
                color:#cecece;
                font-size:11px;
                padding-bottom:5px;
                margin-top:-5px;
                margin-bottom:10px;
                border-bottom:1px solid #eaeaea;
            }

            .sub-header {
                color:#aeaeae;
                font-size:9px;
                margin-bottom:20px;
            }
        }
    }
</style>