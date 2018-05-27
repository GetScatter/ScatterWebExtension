<template>
    <section class="backup scroller">

        <!-- Verified -->
        <section class="panel">
            <figure class="header">{{locale(langKeys.LANGUAGE_Header)}}</figure>
            <sel v-if="selectedLanguage" :options="options"
                 :selected="options[selectedLanguage]"
                 :parser="(obj) => obj"
                 v-on:changed="changed => bind(changed, 'selectedLanguage')"></sel>
            <btn v-on:clicked="changeLanguage" :text="locale(langKeys.BUTTON_ChangeLanguage)" :margined="true"></btn>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing';
    import {LANG, getLangKey} from '../localization/locales';

    export default {
        data(){ return {
            options: LANG,
            selectedLanguage: null,
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'language'
            ])
        },
        mounted(){
            console.log('lang', this.language)
            this.selectedLanguage = this.language;
        },
        methods: {
            bind(changed, property) {
                console.log('changed', changed, property);

                this[property] = getLangKey(changed) },
            changeLanguage(){
                const scatter = this.scatter.clone();
                scatter.settings.language = this.selectedLanguage.toUpperCase() === this.selectedLanguage
                    ? this.selectedLanguage
                    : getLangKey(this.selectedLanguage);

                this[Actions.UPDATE_STORED_SCATTER](scatter).then(() => {
                    this.$router.back();
                });
            },
            ...mapActions([
                Actions.PUSH_ALERT,
                Actions.UPDATE_STORED_SCATTER,
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