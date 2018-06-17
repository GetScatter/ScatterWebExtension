<template>
    <section>

        <section>
            <section class="white-bg">
                <figure class="title">{{locale(langKeys.MNEMONIC_Header)}}</figure>
                <figure class="breaker"></figure>
                <figure class="description">
                    {{locale(langKeys.MNEMONIC_Description)}}
                    <br>
                    <br>
                    {{locale(langKeys.MNEMONIC_Note)}}
                </figure>
            </section>
            <section class="p20">
                <section class="mnemonic">
                    <figure class="word" v-for="word in mnemonicAsArray()">{{word}}</figure>
                </section>
                <btn text="I wrote it down" v-on:clicked="goToFirstIdentity" margined="true"></btn>
            </section>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'

    export default {
        computed: {
            ...mapState([
                'mnemonic',
                'scatter'
            ])
        },
        methods: {
            mnemonicAsArray(){
                return this.mnemonic ? this.mnemonic.split(" ") : [];
            },
            goToFirstIdentity(){
                this[Actions.SET_MNEMONIC]('');
                if(!this.scatter.meta.hasOwnProperty('acceptedTerms') || !this.scatter.meta.acceptedTerms)
                    this.$router.push({name:RouteNames.ONBOARDING})
                else this.$router.push({name:RouteNames.MAIN_MENU});
            },
            ...mapActions([
                Actions.SET_MNEMONIC,
            ])
        },
        mounted(){
            if(!this.mnemonic || !this.mnemonic.length) this.goToFirstIdentity();
        }
    }
</script>

<style lang="scss">

    .mnemonic {
        border-radius: 4px;
        border: 1px solid #eaeaea;
        padding: 15px;
        font-family: 'Raleway', sans-serif;
        font-size: 13px;
        font-weight: 300;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        text-align: center;

        .word {
            flex-basis: 33%;
        }
    }
</style>