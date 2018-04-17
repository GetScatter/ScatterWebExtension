<template>
    <section class="backup scroller">

        <!-- Verified -->
        <section class="panel">
            <figure class="header">Auto Lock Timer</figure>
            <figure class="sub-header">
                Auto Lock handles Scatter's locking for you so that you don't have to remember to lock your Scatter
                when you step away.
            </figure>
            <sel v-if="selectedTimeout" :options="options"
                 :selected="selectedTimeout"
                 :parser="(obj) => obj.name"
                 v-on:changed="changed => bind(changed, 'selectedTimeout')"></sel>
            <btn v-on:clicked="changeTimeout" text="Change Timeout" :margined="true"></btn>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing';
    import TimingHelpers from '../util/TimingHelpers';

    const timeoutOptions = [
        {minutes: 0, name:'Never Lock'},
        {minutes: 1, name:'1 Minute'},
        {minutes: 3, name:'3 Minutes'},
        {minutes: 5, name:'5 Minutes'},
        {minutes: 10, name:'10 Minutes'},
        {minutes: 15, name:'15 Minutes'},
        {minutes: 30, name:'30 Minutes'},
        {minutes: 60, name:'1 Hour'},
        {minutes: 120, name:'2 Hours'},
        {minutes: 240, name:'4 Hours'},
    ];

    export default {
        data(){ return {
            options: timeoutOptions,
            selectedTimeout: null,
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'autoLockInterval'
            ])
        },
        mounted(){
            this.selectedTimeout = timeoutOptions.find(option => option.minutes ===
                TimingHelpers.minutesFromMillis(this.autoLockInterval))
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            changeTimeout(){
                this[Actions.SET_AUTO_LOCK](this.selectedTimeout.minutes).then(() => {
                    this.$router.back();
                });
            },
            ...mapActions([
                Actions.PUSH_ALERT,
                Actions.SET_AUTO_LOCK
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