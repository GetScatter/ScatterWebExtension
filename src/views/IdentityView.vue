<template>
    <section class="identity scroller" v-if="identity">

        <nav-actions :actions="[
            {event:'submit', text:locale(langKeys.GENERIC_Save)}
        ]" v-on:submit="saveIdentity"></nav-actions>

        <!-- Disabling -->
        <section class="panel" style="background:#fff;" v-if="!isNew">
            <figure class="header">{{locale(langKeys.IDENTITY_DisablingHeader)}}</figure>
            <figure class="sub-header" style="margin-bottom:0;">{{locale(langKeys.IDENTITY_DisablingDescription)}}</figure>
        </section>

        <!-- Identity Name -->
        <section class="panel">
            <figure class="header">{{locale(langKeys.IDENTITY_NameHeader)}}</figure>
            <figure class="sub-header" style="margin-bottom:0;">{{locale(langKeys.IDENTITY_NameDescription)}}</figure>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_Name)" :text="identity.name" v-on:changed="changed => bind(changed, 'identity.name')" :disabled="true"></cin>
        </section>

        <!-- Account -->
        <section class="panel">
            <figure class="header">{{locale(langKeys.IDENTITY_AccountHeader)}}</figure>
            <figure class="sub-header" style="margin-bottom:0;">{{locale(langKeys.IDENTITY_AccountDescription)}}</figure>

            <sel :disabled="importing" :selected="networks[0]" :options="networks" :parser="(network) => network.unique()" v-on:changed="selectNetwork"></sel>

            <cin :disabled="importing"
                 :placeholder="locale(langKeys.PLACEHOLDER_PrivateKey)"
                 :tag="identity.hasAccount(selectedNetwork) ? `${identity.networkedAccount(selectedNetwork).name}@${identity.networkedAccount(selectedNetwork).authority}` : null"
                 :text="identity.hasAccount(selectedNetwork) ? `${identity.networkedAccount(selectedNetwork).name}@${identity.networkedAccount(selectedNetwork).authority}` : ''"
                 v-on:untagged="removeAccount"
                 v-on:changed="changed => bind(changed, 'accountNameOrPrivateKey')"></cin>

            <btn :disabled="importing" :text="locale(langKeys.BUTTON_ImportAccount)" v-on:clicked="importAccount" margined="true"></btn>

        </section>

        <!-- Personal Information -->
        <section class="panel">
            <figure class="header">{{locale(langKeys.IDENTITY_PersonalHeader)}}</figure>
            <figure class="sub-header" style="margin-bottom:0;">{{locale(langKeys.IDENTITY_PersonalDescription)}}</figure>

            <cin :placeholder="locale(langKeys.PLACEHOLDER_FirstName)" :text="identity.personal.firstname" v-on:changed="changed => bind(changed, 'identity.personal.firstname')"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_LastName)" :text="identity.personal.lastname" v-on:changed="changed => bind(changed, 'identity.personal.lastname')"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_Email)" :text="identity.personal.email" v-on:changed="changed => bind(changed, 'identity.personal.email')"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_BirthDate)" type="date" :text="identity.personal.birthdate" v-on:changed="changed => bind(changed, 'identity.personal.birthdate')"></cin>
        </section>

        <!-- Location Information -->
        <section class="panel">
            <figure class="header">{{locale(langKeys.IDENTITY_LocationHeader)}}</figure>
            <figure class="sub-header" style="margin-bottom:0;">{{locale(langKeys.IDENTITY_LocationDescription)}}</figure>

            <btn :text="locale(langKeys.BUTTON_AddNewLocation)" v-on:clicked="addNewLocation"></btn>
            <sel :selected="selectedLocation" :options="identity.locations" :parser="(location) => location.name.length ? location.name : langKeys.PLACEHOLDER_DefaultLocationName"
                 v-on:changed="changed => bind(changed, 'selectedLocation')"></sel>
        </section>

        <section class="panel" v-if="selectedLocation">
            <btn v-if="!selectedLocation.isDefault" is-blue="true" :text="locale(langKeys.BUTTON_SetAsDefaultLocation)"
                 v-on:clicked="setAsDefaultLocation" :key="locationKey(1)"></btn>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_LocationName)" :text="selectedLocation.name"
                 v-on:changed="changed => bind(changed, 'selectedLocation.name')" :key="locationKey(2)"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_Phone)" :text="selectedLocation.phone"
                 v-on:changed="changed => bind(changed, 'selectedLocation.phone')" :key="locationKey(3)"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_Address)" :text="selectedLocation.address"
                 v-on:changed="changed => bind(changed, 'selectedLocation.address')" :key="locationKey(4)"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_City)" half="true" :text="selectedLocation.city"
                 v-on:changed="changed => bind(changed, 'selectedLocation.city')" :key="locationKey(5)"></cin>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_Postal)" second-half="true" :text="selectedLocation.zipcode"
                 v-on:changed="changed => bind(changed, 'selectedLocation.zipcode')" :key="locationKey(6)"></cin>
            <sel :placeholder="locale(langKeys.PLACEHOLDER_Country)" :seventy="selectedLocation.country.code === 'US'" :options="countries"
                 :selected="selectedLocation.country" :parser="(obj) => obj.name"
                 v-on:changed="changed => bind(changed, 'selectedLocation.country')" :key="locationKey(7)"></sel>
            <cin :placeholder="locale(langKeys.PLACEHOLDER_State)" v-if="selectedLocation.country.code === 'US'"
                 thirty="true" :text="selectedLocation.state" v-on:changed="changed => bind(changed, 'selectedLocation.state')"
                 :key="locationKey(8)"></cin>

            <btn v-if="identity.locations.length > 1" margined="true" is-red="true"
                 :text="locale(langKeys.BUTTON_RemoveLocation)" v-on:clicked="removeSelectedLocation"></btn>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import Identity from '../models/Identity'
    import Scatter from '../models/Scatter'
    import Account from '../models/Account'
    import {LocationInformation} from '../models/Identity'
    import AlertMsg from '../models/alerts/AlertMsg'
    import IdentityService from '../services/IdentityService'
    import AccountService from '../services/AccountService'
    import EOSKeygen from '../util/EOSKeygen'
    import {Countries} from '../data/Countries'
    import RIDLService from '../services/RIDLService'
    import PluginRepository from '../plugins/PluginRepository'

    export default {
        data(){ return {
            identity:null,
            keypairs:[],
            accountNameOrPrivateKey:'',
            isNew:false,
            countries: Countries,
            selectedLocation:null,
            selectedNetwork:null,

            importing:false,
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'networks'
            ])
        },
        mounted(){
            this.selectedNetwork = this.networks[0];
            console.log(this.networks);
            const existing = this.scatter.keychain.identities.find(x => x.publicKey === this.$route.query.publicKey);
            if(existing) this.identity = existing.clone();
            else {
                const identity = Identity.placeholder();
                this.identity = identity;
                identity.initialize().then(() => {
                    RIDLService.randomName().then(name => {
                        identity.name = name;
                    });
                })
            }

            this.selectedLocation = this.identity.defaultLocation();

            this.isNew = !existing;
        },
        methods: {
            // This is just a fix for vuejs reusing components and losing uniqueness
            locationKey(index){ return this.identity.locations.indexOf(this.selectedLocation)+index; },
            bind(changed, dotNotation) {
                let props = dotNotation.split(".");
                const lastKey = props.pop();
                props.reduce((obj,key)=> obj[key], this)[lastKey] = changed;
            },
            selectNetwork(network){
                this.selectedNetwork = network;
            },
            removeAccount(){
                const account = this.identity.accounts[this.selectedNetwork.unique()];
                // TODO: EOS Hardcode
                const formattedAccount = PluginRepository.findPlugin('eos').accountFormatter(account);

                this[Actions.PUSH_ALERT](AlertMsg.RemovingAccount(formattedAccount)).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    this.identity.removeAccount(this.selectedNetwork);
                })
            },
            importAccount(){
                this.importing = true;
                AccountService.importFromKey(this.accountNameOrPrivateKey, this.selectedNetwork, this).then(imported => {
                    this.identity.setAccount(this.selectedNetwork, imported.account);
                    this.keypairs.push(imported.keypair);
                    this.importing = false;
                }).catch(() => this.importing = false);
            },
            setAsDefaultLocation(){
                this.identity.defaultLocation().isDefault = false;
                this.selectedLocation.isDefault = true;
            },
            addNewLocation(){
                if(!this.identity.locations.find(location => location.isDefault)){
                    this.identity.locations[0].isDefault = true;
                }

                const newLocation = LocationInformation.placeholder();
                this.identity.locations.push(newLocation);
                this.selectedLocation = newLocation;
            },
            removeSelectedLocation(){
                const wasDefault = this.selectedLocation.isDefault;
                const index = this.identity.locations.indexOf(this.selectedLocation);
                this.identity.locations.splice(index, 1);
                if(wasDefault) this.identity.locations[0].isDefault = true;
            },
            saveIdentity(){
                if(!Identity.nameIsValid(this.identity.name)){
                    this[Actions.PUSH_ALERT](AlertMsg.BadIdentityName());
                    return false;
                }

                //TODO: More Error handling
                // -----
                // Location names must not be empty
                // * Email
                // * State ( if exists, only 2 characters )


                const scatter = this.scatter.clone();

                this.keypairs.map(keypair => {
                    if(!scatter.keychain.keypairs.find(existingKeyPair => existingKeyPair.publicKey === keypair.publicKey))
                        scatter.keychain.keypairs.push(keypair);
                });

                scatter.keychain.updateOrPushIdentity(this.identity);


                this[Actions.UPDATE_STORED_SCATTER](scatter).then(() => this.$router.back());

            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT
            ])
        }
    }
</script>

<style lang="scss">
    .identity {
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
                color: #505050;
                font-size:11px;
                margin-bottom:20px;
            }
        }
    }
</style>