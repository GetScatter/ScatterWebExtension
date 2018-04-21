<template>
    <section class="backup scroller">

        <!-- Verified -->
        <section class="panel">
            <figure class="header">{{locale(langKeys.LOCK_Header)}}</figure>
            <figure class="sub-header">{{locale(langKeys.LOCK_Description)}}</figure>
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

    const minutesArr = [ 0,1,3,5,10,15,30,60,120,240 ];

    export default {
        data(){ return {
            options: [],
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
            this.selectedTimeout = this.timeoutOptions().find(option => option.minutes ===
                TimingHelpers.minutesFromMillis(this.autoLockInterval))

            this.options = this.timeoutOptions();
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            changeTimeout(){
                this[Actions.SET_AUTO_LOCK](this.selectedTimeout.minutes).then(() => {
                    this.$router.back();
                });
            },
            timeoutOptions(){
                return minutesArr.map(minutes => {
                    let name = null;
                    if(minutes === 0) name = this.locale(this.langKeys.LOCK_NeverLock);
                    else if(minutes === 1) name = `1 ${this.locale(this.langKeys.LOCK_Minute)}`;
                    else if(minutes > 1 && minutes < 60) name = `${minutes} ${this.locale(this.langKeys.LOCK_Minutes)}`;
                    else if (minutes === 60) name = `${minutes/60} ${this.locale(this.langKeys.LOCK_Hour)}`;
                    else name = `${minutes/60} ${this.locale(this.langKeys.LOCK_Hours)}`;
                    return {minutes, name};
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