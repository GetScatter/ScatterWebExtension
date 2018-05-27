<template>
    <section class="identity scroller" v-if="identity">

        <nav-actions :actions="[
            {event:'submit', text:locale(langKeys.GENERIC_Save)}
        ]" v-if="!saving" v-on:submit="saveIdentity"></nav-actions>

        <!-- Disabling -->
        <section class="panel" style="background:#fff;" v-if="!isNew">
            <figure class="header">{{locale(langKeys.IDENTITY_DisablingHeader)}}</figure>
            <figure class="sub-header" style="margin-bottom:0;">{{locale(langKeys.IDENTITY_DisablingDescription)}}</figure>
        </section>

        <!-- Identity Name -->
        <section class="panel">
            <figure class="header">{{locale(langKeys.IDENTITY_NameHeader)}}</figure>
            <figure class="sub-header" style="margin-bottom:0;">{{locale(langKeys.IDENTITY_NameDescription)}}</figure>
            <cin v-if="identity.ridl > 0 || !registeringIdentity" :text="identity.name" v-on:changed="changed => bind(changed, 'identity.name')" :disabled="true"></cin>
            <cin v-else :placeholder="locale(langKeys.PLACEHOLDER_Name)" :text="newName" v-on:changed="changed => bind(changed, 'newName')"></cin>
            <section v-if="identity.ridl <= 0">
                <btn v-if="!isNew && !registeringIdentity"
                     :text="registeringIdentity ? locale(langKeys.BUTTON_RegisterIdentity) : locale(langKeys.BUTTON_ChangeName)"
                     v-on:clicked="registerIdentity" :is-blue="registeringIdentity" margined="true"></btn>

                <btn v-if="!isNew && registeringIdentity"
                     :text="locale(langKeys.BUTTON_ClaimIdentity)"
                     v-on:clicked="claimIdentity" is-blue="true" margined="true"></btn>

                <btn v-if="!isNew && registeringIdentity"
                     :text="locale(langKeys.BUTTON_Cancel)"
                     v-on:clicked="registeringIdentity = false" margined="true" :is-red="true"></btn>
            </section>
        </section>

        <!-- Account -->
        <section class="panel" v-if="keypairs.length">
            <figure class="header">{{locale(langKeys.IDENTITY_AccountHeader)}}</figure>
            <figure class="sub-header" style="margin-bottom:0;">{{locale(langKeys.IDENTITY_AccountDescription)}}</figure>

            <sel :disabled="importing" :selected="networks[0]" :options="networks" :parser="(network) => network.unique()" v-on:changed="selectNetwork"></sel>

            <cin :disabled="importing"
                 v-if="identity.networkedAccount(selectedNetwork)"
                 :tag="identity.networkedAccount(selectedNetwork).name"
                 :text="identity.networkedAccount(selectedNetwork).name"
                 v-on:untagged="removeAccount"></cin>

            <sel v-if="!identity.networkedAccount(selectedNetwork)"
                 :disabled="importing"
                 :selected="noKeypair"
                 :options="filteredKeypairs()"
                 :parser="keypair => keypair.name"
                 v-on:changed="selectKeypair"></sel>

            <btn :disabled="importing || !selectedKeypair || !selectedKeypair.publicKey.length"
                 :text="locale(langKeys.GENERIC_Import)"
                 v-on:clicked="importAccount" margined="true"></btn>
        </section>

        <!-- NO KEY PAIRS -->
        <section class="panel" v-else>
            <figure class="header">{{locale(langKeys.IDENTITY_NoKeyPairsHeader)}}</figure>
            <figure class="sub-header" style="margin-bottom:0;">{{locale(langKeys.IDENTITY_NoKeyPairsDescription)}}{{locale(langKeys.SETTINGSMENU_Keypairs)}}</figure>
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
            <figure class="sub-header">{{locale(langKeys.IDENTITY_LocationDescription)}}</figure>

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
    import KeyPair from '../models/KeyPair'
    import {LocationInformation} from '../models/Identity'
    import AlertMsg from '../models/alerts/AlertMsg'
    import IdentityService from '../services/IdentityService'
    import AccountService from '../services/AccountService'
    import EOSKeygen from '../util/EOSKeygen'
    import {Countries} from '../data/Countries'
    import PluginRepository from '../plugins/PluginRepository'
    import {Blockchains} from '../models/Blockchains'
    import RIDLService from '../services/RIDLService'

    export default {
        data(){ return {
            identity:null,
            accountNameOrPrivateKey:'',
            isNew:false,
            countries: Countries,
            selectedLocation:null,
            selectedNetwork:null,
            selectedKeypair:null,

            importing:false,
            noKeypair:KeyPair.fromJson({name:'None'}),
            registeringIdentity:false,
            newName:'',
            saving:false,
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'networks',
                'keypairs'
            ])
        },
        mounted(){
            this.selectNetwork(this.networks[0]);
            const existing = this.scatter.keychain.identities.find(x => x.publicKey === this.$route.query.publicKey);
            if(existing) this.identity = existing.clone();
            else {
                this.identity = Identity.placeholder();
                this.identity.initialize(this.scatter.hash).then(() => {
                    this.identity.name = `${this.locale(this.langKeys.GENERIC_New)} ${this.locale(this.langKeys.GENERIC_Identity)}`;
                })
            }

            this.selectedLocation = this.identity.defaultLocation();

            this.isNew = !existing;
        },
        methods: {
            registerIdentity(){
                if(!this.registeringIdentity) return this.registeringIdentity = true;
            },
            async claimIdentity(){
                const updatedIdentity = await RIDLService.claimIdentity(this.newName, this.identity.clone(), this).catch(() => null);
                if(updatedIdentity) {
                    const scatter = this.scatter.clone();
                    this.identity.name = updatedIdentity.name;
                    scatter.keychain.updateOrPushIdentity(updatedIdentity);
                    await this[Actions.UPDATE_STORED_SCATTER](scatter);
                    this.$router.back();
                }
            },
            filteredKeypairs(){
                return [this.noKeypair].concat(this.keypairs.filter(keypair => keypair.blockchain === this.selectedNetwork.blockchain));
            },
            // This is just a fix for vuejs reusing components and losing uniqueness
            locationKey(index){ return this.identity.locations.indexOf(this.selectedLocation)+index; },
            bind(changed, dotNotation) {
                let props = dotNotation.split(".");
                const lastKey = props.pop();
                props.reduce((obj,key)=> obj[key], this)[lastKey] = changed;
            },
            selectNetwork(network){
                this.selectedNetwork = network;
                this.selectedKeypair = null;
            },
            selectKeypair(keypair){
                this.selectedKeypair = !keypair.publicKey.length ? null : keypair;
            },
            removeAccount(){
                const account = this.identity.accounts[this.selectedNetwork.unique()];
                const formattedAccount = PluginRepository.plugin(this.selectedNetwork.blockchain).accountFormatter(account);

                this[Actions.PUSH_ALERT](AlertMsg.RemovingAccount(formattedAccount)).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    this.identity.removeAccount(this.selectedNetwork);
                    const refreshHelper = this.selectedNetwork;
                    this.selectedNetwork = null;
                    this.selectedNetwork = refreshHelper;
                })
            },
            importAccount(){
                if(!this.selectedKeypair || !this.selectedKeypair.publicKey.length) return false;
                this.importing = true;
                AccountService.importFromKey(this.selectedKeypair, this.selectedNetwork, this).then(imported => {
                    this.identity.setAccount(this.selectedNetwork, imported.account);
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
                this.selectedLocation = this.identity.locations[0];
            },
            async saveIdentity(){
                this.saving = true;
//                if(!Identity.nameIsValid(this.identity.name)){
//                    this[Actions.PUSH_ALERT](AlertMsg.BadIdentityName());
//                    return false;
//                }

                if(this.isNew) {
                    const identified = await RIDLService.identify(this.identity.publicKey);
                    if(!identified) return null;
                    this.identity.name = identified;
                }


                //TODO: More Error handling
                // -----
                // Location names must not be empty
                // * Email
                // * State ( if exists, only 2 characters )


                const scatter = this.scatter.clone();
                scatter.keychain.updateOrPushIdentity(this.identity);
                this[Actions.UPDATE_STORED_SCATTER](scatter).then(() => this.$router.back());

            },
            ...mapActions([
                Actions.SIGN_RIDL,
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