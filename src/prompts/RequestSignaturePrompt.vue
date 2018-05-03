<template>
    <section class="request-signature">

        <section class="floating-header">
            <figure class="identity-name">{{identity().name}}</figure>
            <figure class="account-authority" v-if="network !== null">{{formattedAccount()}}</figure>
            <figure class="switches">
                <figure class="switch"
                        v-for="displayType in displayTypes"
                        v-on:click="setDisplayType(displayType)"
                        :class="{'active':selectedDisplayType === displayType}">
                    {{displayType}}
                </figure>
            </figure>
        </section>

        <section class="prompt-body">

            <section class="partitioned"
                     v-if="selectedDisplayType === displayTypes.PROPS"
                     v-for="message in messages">
                <section class="partition">

                    <!-- Contract Name -->
                    <figure class="label">{{locale(langKeys.GENERIC_Contract)}}</figure>
                    <figure class="value big">{{message.code}}</figure>

                    <!-- Contract Action -->
                    <figure class="label">{{locale(langKeys.GENERIC_Action)}}</figure>
                    <figure class="value big">{{message.type}}</figure>

                    <section class="key-value" v-if="prompt.data.requiredFields.length">
                        <figure class="key">{{locale(langKeys.GENERIC_Requires)}}</figure>
                        <figure class="value">
                            {{prompt.data.requiredFields.join(', ')}}
                        </figure>

                        <section v-if="viableLocations.length && selectedLocation">
                            <sel :selected="selectedLocation"
                                 :options="viableLocations"
                                 :parser="location => location.name"
                                 v-on:changed="changed => bind(changed, 'selectedLocation')"></sel>

                            <section style="margin-top:10px;" v-for="(value, key) in selectedLocation" v-if="requiredFields.includes(key)">
                                <figure class="label">{{key}}</figure>
                                <figure class="value">{{typeof value === 'object' ? value.name : value}}</figure>
                            </section>
                        </section>
                    </section>

                </section>
                <section class="partition">

                    <section class="fields-row" v-for="(value, key) in sortedMessageData(message.data)">
                        <section class="fields">
                            <figure class="label">{{key}}</figure>
                            <figure class="value" :class="{'red':value !== '' && !isNaN(value)}">{{value}}</figure>
                        </section>
                        <figure class="mutable" v-if="whitelisted">
                            <input type="checkbox" @click="toggleMutableField(key)" />
                        </figure>
                    </section>
                </section>
            </section>

            <section class="json-display" v-else>
                <pre><code>{{messages}}</code></pre>
            </section>
        </section>

        <section class="prompt-footer">

            <section class="whitelist">
                <figure class="header">
                    {{locale(langKeys.REQUEST_SignatureWhitelist)[0]}}
                </figure>
                <figure class="sub-header">
                    <section class="checkbox">
                        <cin :tag="(whitelisted) ? 'fa-check' : ''" :checkbox="true" v-on:untagged="toggleWhitelist"></cin>
                    </section>
                    {{locale(langKeys.REQUEST_SignatureWhitelist)[1]}}
                    <br><br>
                    <b>{{locale(langKeys.REQUEST_SignatureWhitelist)[2]}}</b>
                    {{locale(langKeys.REQUEST_SignatureWhitelist)[3]}}
                </figure>
            </section>

            <section class="actions">
                <btn :text="locale(langKeys.BUTTON_Deny)" v-on:clicked="denied"></btn>
                <btn :text="locale(langKeys.BUTTON_Accept)" margined="true" is-blue="true" v-on:clicked="accepted"></btn>
            </section>

        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import AlertMsg from '../models/alerts/AlertMsg'
    import Network from '../models/Network'
    import IdentityService from '../services/IdentityService'
    import NotificationService from '../services/NotificationService'
    import Identity from '../models/Identity'
    import {LocationFields, PersonalFields} from '../models/Identity'
    import ObjectHelpers from '../util/ObjectHelpers'
    import PluginRepository from '../plugins/PluginRepository'

    const displayTypes = {
        JSON:'json',
        PROPS:'properties'
    };

    export default {
        data(){ return {
            selectedDisplayType:displayTypes.PROPS,
            displayTypes,
            whitelisted:false,

            viableLocations:[],
            selectedLocation:null,

            returnedFields:{},
            mutableFields:[],
            network:null,
        }},
        computed: {
            ...mapState([
                'scatter',
                'prompt'
            ]),
            ...mapGetters([
                'messages',
                'identities',
                'requiredFields'
            ])
        },
        mounted(){
            this.network = Network.fromJson(this.prompt.network);
            const hasAllRequiredFields = this.identity().hasRequiredFields(this.requiredFields);

            if(!hasAllRequiredFields){
                this[Actions.PUSH_ALERT](AlertMsg.NoIdentityWithProperties(this.requiredFields)).then(closed => {
                    this.prompt.responder(null);
                    NotificationService.close();
                });
            }

            if(this.requiresLocationDetails()){
                const requiredLocationFields = Object.keys(LocationFields).filter(field => this.requiredFields.includes(field));
                this.viableLocations = this.identity().locations.filter(location => location.findFields(requiredLocationFields).length === requiredLocationFields.length);
                this.selectedLocation = this.viableLocations.find(location => location.isDefault) || this.viableLocations[0];
                this.returnedFields = this.identity().clone();
                this.returnedFields.location = this.selectedLocation;
            }
        },
        methods: {
            setDisplayType(type){ this.selectedDisplayType = type; },
            formattedAccount(){
                const account = this.identity().networkedAccount(this.network);

                // TODO: EOS Hardcode
                return PluginRepository.plugin('eos').accountFormatter(account)
            },

            bind(changed, dotNotation) {
                let props = dotNotation.split(".");
                const lastKey = props.pop();
                props.reduce((obj,key)=> obj[key], this)[lastKey] = changed;
            },

            requiresLocationDetails(){
                return !!this.requiredFields.find(field => Object.keys(LocationFields).includes(field));
            },

            /***
             * Sorts the message by importance.
             * Numeric values come first
             * @param data
             * @returns {*|{}}
             */
            sortedMessageData(data){
                return Object.keys(data)
                    .sort((keyA,keyB) => {
                        const valueA = data[keyA];
                        const valueB = data[keyB];
                        if(!valueA || valueA === '' || !valueB || valueB === '') return -1;
                        if(isNaN(valueA) || isNaN(valueB)) return 1;
                        return 0;
                    })
                    .reduce((acc, key) => {
                        acc[key] = data[key];
                        return acc;
                    }, {})
            },
            identity(){
                return this.scatter.keychain.findIdentityFromDomain(this.prompt.data.domain);
            },
            accepted(){
                const returnedFields = Identity.asReturnedFields(this.requiredFields, this.returnedFields, this.selectedLocation);

                this.prompt.responder({accepted:true, whitelisted:this.whitelisted, returnedFields, mutableFields:this.mutableFields});
                NotificationService.close();
            },
            denied(){
                this.prompt.responder(null);
                NotificationService.close();
            },
            isCurrencyContract(){ return !!this.messages.find(message => message.code === 'eos') },
            toggleWhitelist(){
                const flip = () => this.whitelisted = !this.whitelisted;

                if(this.isCurrencyContract() && !this.whitelisted) {

                    this[Actions.PUSH_ALERT](AlertMsg.WhitelistingContractAction()).then(res => {
                        if(!res || !res.hasOwnProperty('accepted')) return false;
                        flip();
                    });
                }
                else flip();

            },
            toggleMutableField(selectedField){
                this.mutableFields.includes(selectedField)
                    ? this.mutableFields.splice(this.mutableFields.indexOf(selectedField),1)
                    : this.mutableFields.push(selectedField);
            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT
            ])
        }
    }
</script>

<style lang="scss">
    .request-signature {
        font-family: 'Open Sans', sans-serif;

        .floating-header {
            position:absolute;
            top:40px;
            right:50px;
            text-align:right;

            .identity-name {
                font-family: 'Raleway', sans-serif;
                font-size:14px;
                font-weight:bold;
                color:#4f4f4f;
                margin-bottom:2px;
            }

            .account-authority {
                color:#54a7fc;
                font-size:9px;
                margin-bottom:5px;
                font-weight: bold;
            }

            .switches {

                .switch {
                    cursor: pointer;
                    height:15px;
                    line-height:13px;
                    font-size:9px;
                    float:right;
                    padding:0 5px;
                    background:transparent;
                    border:1px solid #4f4f4f;
                    border-radius:4px;
                    color:#4f4f4f;
                    margin-left:5px;

                    &:hover, &.active {
                        background:#4f4f4f;
                        color:#fff;
                    }
                }
            }
        }


        .prompt-body {
            height:287px;
            overflow:hidden;

            .fields-row {
                .fields {
                    display: inline-block;
                }

                .mutable {
                    width:30px;
                    height:30px;
                    display:inline-block;
                    padding-left:10px;
                    border-left:1px solid rgba(0,0,0,0.05);
                    margin-left:10px;

                    input {
                        height:20px;
                        width:20px;
                    }
                }

                &:not(:last-child){
                    border-bottom:1px solid rgba(0,0,0,0.05);
                    margin-bottom:10px;
                }
            }


            .key-value {
                padding:20px;
                border:2px dashed rgba(0,0,0,0.05);
                border-radius: 4px;
                margin-bottom:20px;
                margin-top:20px;

                .key {
                    font-size:9px;
                    color:#bbbbbb;
                }

                .value {
                    font-size:12px;
                    color:#707070;
                    font-weight:900;
                    font-style: italic;
                }
            }

            .description {
                margin-top:5px;
                font-size:9px;
                color:#b8b8b8;

                b { color:#707070; }
            }

            .partitioned {
                overflow:hidden;
                height:287px;
                width:100%;

                .partition {
                    width:50%;
                    float:left;
                    height:287px;
                    overflow-y:auto;
                    position: relative;
                    display:block;
                    padding:40px 50px;

                    &:first-child { text-align: left; }
                    &:last-child { text-align: right; border-left:1px solid rgba(0,0,0,0.02); }
                }
            }

            .label {
                font-size:9px;
                color:#bbbbbb;
            }

            .value {
                color:#707070;
                font-size:12px;
                line-height:12px;
                font-style: italic;
                font-weight: 600;
                margin-bottom:15px;

                &.big {
                    font-size:22px;
                    line-height:22px;
                    font-weight:200;
                }

                &.red {
                    font-size:16px;
                    line-height:16px;
                    color:#ff0d0c;
                }
            }

            .json-display {
                padding:20px;
                font-size:14px;
                height:287px;
                overflow-y:auto;
            }
        }

        .prompt-footer {
            height:150px;
            padding:20px;
            background:#fff;
            overflow:hidden;

            .whitelist {
                width:calc(100% - 150px);
                padding-right:20px;
                float:left;

                .checkbox {
                    width:56px;
                    float:left;
                    margin-right:15px;
                }

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

            .actions {
                width:150px;
                float:left;
            }
        }
    }

</style>