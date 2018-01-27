<template>
    <section>

        <section>
            <section class="white-bg">
                <figure class="title">Mnemonic</figure>
                <figure class="breaker"></figure>
                <figure class="description">
                    Mnemonics are a set of words that
                    translate into a cryptographic seed.
                    <br>
                    <br>

                    Be sure to save yours somewhere safe.
                    It can be used to regain access to your
                    Scatter and decrypt your private information.
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
                'mnemonic'
            ])
        },
        methods: {
            mnemonicAsArray(){
                return this.mnemonic ? this.mnemonic.split(" ") : [];
            },
            goToFirstIdentity(){
                this[Actions.SET_MNEMONIC]('');
                this.$router.push({name:RouteNames.FIRST_TIME})
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
    .white-bg {
        text-align:center;
        width:100%;
        padding:40px;
        padding-top:20px;
        font-family:'Raleway', sans-serif;

        .title {
            font-size:24px;
            font-weight:300;
            color:#656565;
        }

        .description {
            font-size:12px;
            line-height:18px;
            font-weight:300;
            color:#b2b2b2;
            text-align: left;
        }

        .breaker {
            width:200px;
            display:inline-block;
            height:1px;
            background:#dbdbdb;
            margin:15px 0;
        }
    }

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