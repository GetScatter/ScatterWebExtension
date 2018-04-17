<template>
    <section class="network scroller" v-if="network">

        <nav-actions :actions="[
            {event:'submit', text:locale(langKeys.GENERIC_Save)}
        ]" v-on:submit="saveNetwork"></nav-actions>

        <section class="panel">
            <figure class="header">Network Host *</figure>
            <figure class="sub-header">
                Applications usually run on a specific network, but they might not all run on
                the same network. For instance an application can have a testing network
                that has new features which are not yet released. In order to interact with
                that network you will need to have an account there as well.
            </figure>
            <cin placeholder="domain or ip" :text="network.host" v-on:changed="changed => bind(changed, 'host')" :disabled="!isNew"></cin>
            <cin placeholder="port" :text="network.port" v-on:changed="changed => bind(changed, 'port')" :disabled="!isNew"></cin>
        </section>

    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import Network from '../models/Network'
    import Scatter from '../models/Scatter'
    import AlertMsg from '../models/alerts/AlertMsg'
    import IdentityService from '../services/IdentityService'

    export default {
        data(){ return {
            network:null,
            isNew:false,
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'networks',
                'langKeys'
            ])
        },
        mounted(){
            const existing = this.scatter.settings.networks.find(x => x.unique() === this.$route.query.networkunique);
            if(existing) this.network = existing.clone();
            else this.network = Network.placeholder();
            this.isNew = !existing;
        },
        methods: {
            bind(changed, dotNotation) {
                let props = dotNotation.split(".");
                const lastKey = props.pop();
                props.reduce((obj,key)=> obj[key], this.network)[lastKey] = changed;
            },
            saveNetwork(){
                const scatter = this.scatter.clone();

                console.log(this.network);

                if(!Network.hostIsValid(this.network.host)){
                    this[Actions.PUSH_ALERT](AlertMsg.NetworkHostInvalid());
                    return false;
                }

                if(this.networks.map(x => x.unique()).includes(this.network.unique())){
                    this[Actions.PUSH_ALERT](AlertMsg.NetworkExists());
                    return false;
                }

                scatter.settings.networks.unshift(this.network);

                this[Actions.UPDATE_STORED_SCATTER](scatter).then(() => {
                    this.$router.back();
                });

            },
            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT
            ])
        }
    }
</script>

<style lang="scss">
    .network {
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