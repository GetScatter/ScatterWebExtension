<template>
    <section class="identity scroller" v-if="identity">

        <nav-actions :actions="[
            {event:'submit', icon:'check-square-o'}
        ]" v-on:submit="saveIdentity"></nav-actions>

        <!-- Disabling -->
        <section class="panel" style="background:#fff;" v-if="!isNew">
            <figure class="header">What does Disabling do?</figure>
            <figure class="sub-header" style="margin-bottom:0;">
                Disabling this Identity will stop it from being used in applications that have a reference to it.
                This can be used instead of permanently deleting this Identity or it's Permissions on an application,
                which would be harder to recover.
            </figure>
        </section>

        <!-- Identity Name -->
        <section class="panel">
            <figure class="header">Identity Name *</figure>
            <figure class="sub-header">
                This is the name that applications will refer to you by. Think of it like your
                username.
                <b style="color:rgba(0,0,0,0.6);">
                    It is unique, cannot be changed and even if you delete this Identity, it will never be
                    able to be used again.
                </b>
                <br><br>
                This is the only required field.
            </figure>
            <cin placeholder="Name" :text="identity.name" v-on:changed="changed => bind(changed, 'identity.name')" :disabled="!isNew"></cin>
        </section>

        <!-- Network -->
        <section class="panel">
            <figure class="header">Network</figure>
            <figure class="sub-header">
                The network this account is located on can not be changed. You can copy this Identity to another network
                but any changes made to either will not reflect on each other.
                <br><br>
                <b style="color:rgba(0,0,0,0.6);">
                    This is for your safety.
                </b>

            </figure>
            <cin v-if="!isNew" :text="`${identity.network.host}:${identity.network.port}`" disabled="true"></cin>
            <sel v-else :selected="identity.network" :options="networks" :parser="(network) => network.unique()" v-on:changed="changed => bind(changed, 'identity.network')"></sel>
        </section>

        <!-- Account -->
        <section class="panel">
            <figure class="header">Account</figure>
            <figure class="sub-header">
                Accounts are what hold your funds and allow you to interact with contracts
                on the Blockchain. In relation to Identities think of them like the bank
                accounts connected to your passport, except your Identity can only hold
                one account at a time per network.
            </figure>

            <cin :placeholder="'private key'"
                 :tag="(identity.account) ? `${identity.account.name}@${identity.account.authority}` : null"
                 :text="(identity.account) ? `${identity.account.name}@${identity.account.authority}` : ''"
                 v-on:untagged="removeAccount"
                 v-on:changed="changed => bind(changed, 'accountNameOrPrivateKey')"></cin>
            <btn :disabled="identity.account" text="Import Account" v-on:clicked="importAccount" margined="true"></btn>

        </section>

        <!-- Personal Information -->
        <section class="panel">
            <figure class="header">Personal Information</figure>
            <figure class="sub-header">
                Personal information can be added to an account for applications that
                require it. For instance a shopping website might need your full name
                in order to know who to send your purchased goods to.
            </figure>

            <cin placeholder="First Name" :text="identity.personal.firstname" v-on:changed="changed => bind(changed, 'identity.personal.firstname')"></cin>
            <cin placeholder="Last Name" :text="identity.personal.lastname" v-on:changed="changed => bind(changed, 'identity.personal.lastname')"></cin>
            <cin placeholder="Email" :text="identity.personal.email" v-on:changed="changed => bind(changed, 'identity.personal.email')"></cin>
            <cin placeholder="Birth Date" type="date" :text="identity.personal.birthdate" v-on:changed="changed => bind(changed, 'identity.personal.birthdate')"></cin>
        </section>

        <!-- Location Information -->
        <section class="panel">
            <figure class="header">Location Information</figure>
            <figure class="sub-header">
                Location information can be added to an account for applications that
                require it. For instance a shopping website might need your shipping address
                in order to know where to send your purchased goods to.
            </figure>

            <btn text="Add New Location" v-on:clicked="addNewLocation"></btn>
            <sel :selected="selectedLocation" :options="identity.locations" :parser="(location) => location.name.length ? location.name : 'Unnamed Location'" v-on:changed="changed => bind(changed, 'selectedLocation')"></sel>




        </section>

        <section class="panel" v-if="selectedLocation">
            <btn v-if="!selectedLocation.isDefault" is-blue="true" text="Set as Default" v-on:clicked="setAsDefaultLocation" :key="locationKey(1)"></btn>
            <cin placeholder="Location Name" :text="selectedLocation.name" v-on:changed="changed => bind(changed, 'selectedLocation.name')" :key="locationKey(2)"></cin>
            <cin placeholder="Phone" :text="selectedLocation.phone" v-on:changed="changed => bind(changed, 'selectedLocation.phone')" :key="locationKey(3)"></cin>
            <cin placeholder="Address" :text="selectedLocation.address" v-on:changed="changed => bind(changed, 'selectedLocation.address')" :key="locationKey(4)"></cin>
            <cin placeholder="City" half="true" :text="selectedLocation.city" v-on:changed="changed => bind(changed, 'selectedLocation.city')" :key="locationKey(5)"></cin>
            <cin placeholder="Postal" second-half="true" :text="selectedLocation.zipcode" v-on:changed="changed => bind(changed, 'selectedLocation.zipcode')" :key="locationKey(6)"></cin>
            <sel placeholder="Country" :seventy="selectedLocation.country.code === 'US'" :options="countries" :selected="selectedLocation.country" :parser="(obj) => obj.name" v-on:changed="changed => bind(changed, 'selectedLocation.country')" :key="locationKey(7)"></sel>
            <cin placeholder="State" v-if="selectedLocation.country.code === 'US'" thirty="true" :text="selectedLocation.state" v-on:changed="changed => bind(changed, 'selectedLocation.state')" :key="locationKey(8)"></cin>

            <btn v-if="identity.locations.length > 1" margined="true" is-red="true" text="Remove This Location" v-on:clicked="removeSelectedLocation"></btn>
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

    export default {
        data(){ return {
            identity:null,
            keypair:null,
            accountNameOrPrivateKey:'',
            isNew:false,
            countries:[
                {code:'US', name:'United States'},
                {code:'UK', name:'United Kingdom'},
                {code:'FR', name:'France'},
                {code:'GR', name:'Germany'},
            ],
            selectedLocation:null,
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
            const existing = this.scatter.keychain.identities.find(x => x.hash === this.$route.query.hash);
            if(existing) this.identity = existing.clone();
            else {
                const identity = Identity.placeholder();
                identity.network = this.networks[0];
                this.identity = identity;
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
            removeAccount(){
                const msg = [
                    'Removing Account',
                    ['Identity', 'Remove Account'],
                    `You are about to remove the ${this.identity.account.name}@${this.identity.account.authority} account
                    from this Identity.`
                ];

                this[Actions.PUSH_ALERT](AlertMsg.AreYouSure(...msg)).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    this.identity.account = null;
                })
            },
            importAccount(){
                AccountService.importFromKey(this.accountNameOrPrivateKey, this.identity.network, this).then(imported => {
                    this.identity.account = imported.account;
                    this.keypair = imported.keypair;
                });
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
                scatter.keychain.identities = scatter.keychain.identities.filter(x => x.hash !== this.identity.hash);
                scatter.keychain.identities.push(this.identity);

                // Adding possibly new keypair
                if(this.keypair && (this.identity.account && this.identity.account.publicKey === this.keypair.publicKey)){
                    scatter.keychain.keypairs = scatter.keychain.keypairs.filter(x => x.publicKey !== this.keypair.publicKey);
                    scatter.keychain.keypairs.push(this.keypair);
                }

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
                color:#aeaeae;
                font-size:9px;
                margin-bottom:20px;
            }
        }
    }
</style>