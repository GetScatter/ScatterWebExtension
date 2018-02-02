<template>
    <section class="main-menu">
        <section class="item" v-for="link in links">
            <router-link :to="{name:link.route}" v-if="link.name != 'Lock'">
                <figure class="icon"><i class="fa" :class="'fa-'+link.icon"></i></figure>
                <figure class="text">{{link.name}}</figure>
            </router-link>

            <section v-else v-on:click="lockScatter">
                <figure class="icon last"><i class="fa" :class="'fa-'+link.icon"></i></figure>
                <figure class="text">{{link.name}}</figure>
            </section>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'


    import Network from '../models/Network'
    import Identity from '../models/Identity'
    import Permission from '../models/Permission'

    export default {
        data(){ return {
            links:[
//                {route:RouteNames.TRANSFER, name:'Transfer', icon:'send'},
                {route:RouteNames.IDENTITIES, name:'Identities', icon:'address-book'},
                {route:RouteNames.PERMISSIONS, name:'Permissions', icon:'shield'},
                {route:RouteNames.HISTORY, name:'History', icon:'history'},
                {name:'Lock', icon:'lock'},
            ]
        }},
        computed: {
            ...mapState([
                'scatter'
            ])
        },
        mounted(){
            console.log(this.scatter);

            // TODO: Inserting test data
            if(this.scatter.keychain.identities.length === 1 && this.scatter.keychain.permissions.length === 0){
                const network = Network.fromJson({host:'test.eos.io', port:8080});

                const identity = Identity.fromJson({name:'helloworld', network});

                const permissions = [
                    Permission.fromJson({
                        domain:'tester.com',
                        network:this.scatter.settings.networks[0],
                        identityHash:this.scatter.keychain.identities[0].hash,
                        timestamp:+ new Date()
                    }),
                    Permission.fromJson({
                        domain:'cryptocrap.com',
                        network:this.scatter.settings.networks[0],
                        identityHash:this.scatter.keychain.identities[0].hash,
                        timestamp:+ new Date()
                    }),
                    Permission.fromJson({
                        domain:'cryptocrap.com',
                        network:this.scatter.settings.networks[0],
                        identityHash:this.scatter.keychain.identities[0].hash,
                        contractAddress:'0x1',
                        contract:'hello',
                        action:'world',
                        checksum:'abcd',
                        timestamp:+ new Date()
                    }),
                    Permission.fromJson({
                        domain:'cryptocrap.com',
                        network:this.scatter.settings.networks[0],
                        identityHash:this.scatter.keychain.identities[0].hash,
                        contractAddress:'0x1',
                        contract:'hello',
                        action:'free',
                        checksum:'abcde',
                        timestamp:+ new Date()
                    }),
                    Permission.fromJson({
                        domain:'cryptocrap.com',
                        network:network,
                        identityHash:identity.hash,
                        timestamp:+ new Date()
                    }),
                    Permission.fromJson({
                        domain:'cryptocrap.com',
                        network:network,
                        identityHash:identity.hash,
                        contractAddress:'0x1',
                        contract:'hello',
                        action:'world',
                        checksum:'abcd',
                        timestamp:+ new Date()
                    })
                ];

                const scatter = this.scatter.clone();
                scatter.settings.networks.push(network);
                scatter.keychain.identities.push(identity);
                scatter.keychain.permissions = permissions;

                this[Actions.UPDATE_STORED_SCATTER](scatter);

            }


        },
        methods: {
            bind(changed, original) { this[original] = changed },
            lockScatter(){
                this[Actions.LOCK]().then(() => {
                    this.$router.push({name:RouteNames.ENTRY});
                })
            },
            ...mapActions([
                Actions.LOCK,
                Actions.UPDATE_STORED_SCATTER
            ])
        }
    }
</script>

<style lang="scss">

    .main-menu {
        padding:40px 0;

        .item {
            cursor: pointer;
            padding:0 40px;
            transition:background 0.2s ease;

            &:hover {
                background:#f8f8f8;
            }

            .icon {
                padding:16px 0;
                display:inline-block;
                font-size:18px;
                color:#656565;
                width:30px;
                text-align:center;
                margin-right:10px;

                &:not(.last){
                    border-bottom:1px solid #e3e3e3;
                }
            }

            .text {
                padding:16px 0;
                display:inline-block;
                font-size:24px;
                color:#656565;
                font-family:'Raleway',sans-serif;
                font-weight:300;
            }
        }
    }

</style>