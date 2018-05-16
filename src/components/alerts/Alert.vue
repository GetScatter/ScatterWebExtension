<template>
    <section class="error" :class="{'show':alerts.length}">
        <section class="box" v-if="alerts.length">
            <section class="head">
                <figure class="header">{{alerts[0].header}}</figure>
                <figure class="sub-header">
                    {{locale(langKeys.ALERT_Type)(alerts[0].type)}}
                </figure>
            </section>
            <section class="body">
                <section class="description">{{alerts[0].description}}</section>
            </section>




            <!-- Error -->
            <section class="actions" v-if="alerts[0].type === alertTypes.Error">
                <btn :text="locale(langKeys.BUTTON_Yes)" is-blue="true" v-on:clicked="accept"></btn>
            </section>

            <!-- Prompt -->
            <section class="actions" v-if="alerts[0].type === alertTypes.Prompt">
                <btn :text="locale(langKeys.BUTTON_Cancel)" v-on:clicked="cancel"></btn>
                <btn :text="locale(langKeys.BUTTON_Yes)" is-red="true" v-on:clicked="accept"></btn>
            </section>

            <figure v-if="selectionError" class="selection-error">
                {{locale(langKeys.ERROR_MustSelectItem)}}
            </figure>

            <!-- Select Account -->
            <section class="list" v-if="alerts[0].type === alertTypes.SelectAccount">
                <figure class="item" v-for="account in alerts[0].list"
                        :class="{'selected':account === selectedItem}"
                        v-on:click="selectedItem = account">
                    {{`${account.name}@${account.authority}`}}
                </figure>
            </section>
            <section class="actions" v-if="alerts[0].type === alertTypes.SelectAccount">
                <btn :text="locale(langKeys.BUTTON_Cancel)" v-on:clicked="cancel"></btn>
                <btn :text="locale(langKeys.BUTTON_UseSelectedAccount)" is-blue="true" v-on:clicked="returnSelectedItem"></btn>
            </section>

            <!-- Named Account -->
            <section style="padding:10px;" v-if="alerts[0].type === alertTypes.NamedAccount">
                <cin :placeholder="`${locale(langKeys.GENERIC_Account)} ${locale(langKeys.GENERIC_Name)}`" v-on:changed="changed => bind(changed, 'returnedText')"></cin>
            </section>

            <!-- Claim Identity -->
            <section style="padding:10px;" v-if="alerts[0].type === alertTypes.ClaimIdentity">
                <cin :placeholder="locale(langKeys.PLACEHOLDER_PrivateKey)" v-on:changed="changed => bind(changed, 'returnedText')"></cin>
            </section>


            <!-- Returned Text -->
            <section class="actions" v-if="returnsText()">
                <btn :text="locale(langKeys.BUTTON_Cancel)" v-on:clicked="cancel"></btn>
                <btn :text="locale(langKeys.BUTTON_Accept)" is-blue="true" v-on:clicked="returnText"></btn>
            </section>

        </section>

    </section>
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../../store/constants';
    import * as AlertTypes from '../../models/alerts/AlertTypes'

    export default {
        data() { return {
            alertTypes:AlertTypes,
            selectedItem:null,
            selectionError:null,
            returnedText:'',
            returnedTextError:null,
        }},
        computed: {
            ...mapState([
                'alerts'
            ])
        },
        methods: {
            bind(changed, item) { this[item] = changed; },
            accept(){
                this[Actions.PULL_ALERT]();
                this[Actions.PUSH_ALERT_RESULT]({accepted:true});
            },
            cancel(){
                this[Actions.PULL_ALERT]();
                this[Actions.PUSH_ALERT_RESULT]({cancelled:true});
            },
            returnSelectedItem(){
                this.selectionError = false;
                if(!this.selectedItem) {
                    this.selectionError = true;
                    return false;
                }

                this[Actions.PULL_ALERT]();
                this[Actions.PUSH_ALERT_RESULT]({selected:this.selectedItem});
            },
            returnsText(){
                console.log('this.alerts[0].type', this.alerts[0].type);
                return this.alerts[0].type === AlertTypes.ClaimIdentity
                    || this.alerts[0].type === AlertTypes.NamedAccount
            },
            returnText(){
                if(!this.returnedText.length) return false;
                this[Actions.PULL_ALERT]();
                this[Actions.PUSH_ALERT_RESULT]({text:this.returnedText});
            },
            ...mapActions([
                Actions.PULL_ALERT,
                Actions.PUSH_ALERT_RESULT,
            ])
        },
    };
</script>

<style lang="scss">
    .error {
        position:fixed;
        top:0; bottom:0;
        left:0; right:0;
        background:rgba(73, 73, 73, 0);
        opacity:0;
        visibility: hidden;
        font-family:'Open Sans', sans-serif;
        padding:20px;
        transition:all 0.2s ease;
        transition-property: background, opacity, visibility;
        z-index:9999;

        &.show {
            visibility:visible;
            opacity:1;
            background:rgba(73, 73, 73, 0.8);
        }

        .box {
            max-width: 500px;
            margin: 0 auto;
            background:#fff;
            border-radius:4px;
            right:20px;
            left:20px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            box-shadow:0 10px 20px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1);

            .head {
                display:flex;
                flex-direction: column;
                justify-content: center;
                text-align:center;
                height:160px;
                padding:50px;

                .header {
                    font-size:14px;
                    color:#717171;
                    margin-bottom:20px;
                }

                .sub-header {
                    font-size:9px;
                    color:#a0a0a0;
                }
            }

            .body {
                border-top:1px solid #f6f6f6;
                border-bottom:1px solid #f6f6f6;
                padding:15px;

                .description {
                    font-size:12px;
                    color:#a0a0a0;
                }
            }

            .selection-error {
                border-bottom:1px solid #f6f6f6;
                font-size:9px;
                padding:15px;
                color:red;
            }

            .list {
                border-bottom:1px solid #f6f6f6;
                font-size:9px;
                padding:15px 0;
                max-height:70px;
                overflow-y:auto;

                .item {
                    cursor: pointer;
                    padding:3px 15px;
                    color:#a1a1a1;

                    &:hover, &.selected {
                        background:#55a7fd;
                        color:#fff;
                    }
                }
            }

            .actions {
                padding:15px;

                button {
                    &:not(:first-child){
                        margin-top:10px;
                    }
                }
            }
        }
    }
</style>
