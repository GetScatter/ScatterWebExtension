<template>
    <section class="domain-permissions">

        <search v-on:changed="changed => bind(changed, 'searchText')" :placeholder="'Search: ' + domain"></search>

        <section class="p20 scroller with-search">
            <section v-for="(domainPermissions, hash) in filterBySearch()" class="panel-box">

                <!-- Account Information -->
                <section class="panel">
                    <figure class="header big identity-header">{{domainPermissions.find(perm => perm.isIdentityOnly()).getIdentity(scatter.keychain).name}}</figure>
                    <figure class="revoke-identity" v-on:click="revoke({type:'identity', perm:domainPermissions.find(perm => perm.isIdentityOnly())})">
                        {{locale(langKeys.PERMISSION_RevokeIdentity)}}
                    </figure>
                    <figure class="header small margin" style="overflow:hidden;">
                        <figure style="float:left;">
                            <i class="fa fa-globe"></i>
                            {{domainPermissions.find(perm => perm.isIdentityOnly()).network.host}}
                        </figure>
                        <figure style="float:right">
                            {{domainPermissions.find(perm => perm.isIdentityOnly()).timestamp/1000 | moment('from', 'now')}}
                        </figure>
                    </figure>
                </section>

                <!-- Contract Permissions -->
                <section class="panel" v-for="(actions, contract) in groupByContract(domainPermissions)">
                    <figure class="header contract-header">{{actions[0].contract}}</figure>
                    <figure class="revoke-contract-actions" v-on:click="revoke({type:'contract', contract, network:actions[0].network})">
                        {{locale(langKeys.PERMISSION_RevokeContract)}}
                    </figure>
                    <section class="items">
                        <section class="item" v-for="action in actions">
                            <span><u><b>{{action.action}}</b></u> <i>( {{action.timestamp/1000 | moment('from', 'now')}} )</i></span>
                            <span class="revoke-text" v-on:click="revoke({type:'action', perm:action})">
                                {{locale(langKeys.PERMISSION_RevokeAction)}}
                            </span>

                            <section class="item" v-for="field in action.mutableFields">
                                <span>{{locale(langKeys.GENERIC_Ignored)}}</span>
                                <span><b>{{field}}</b></span>
                            </section>
                        </section>
                    </section>
                </section>

            </section>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import Scatter from '../models/Scatter'
    import Permission from '../models/Permission'
    import AlertMsg from '../models/alerts/AlertMsg'
    import ObjectHelpers from '../util/ObjectHelpers'

    export default {
        data(){ return {
            searchText:'',
            domain:this.$route.query.domain.toLowerCase() || '',
        }},
        computed: {
            ...mapState([
                'scatter'
            ]),
            ...mapGetters([
                'permissions'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            groupByIdentity(permissions){ return ObjectHelpers.groupBy(permissions.filter(x => x.domain.toLowerCase() === this.domain), 'publicKey'); },
            groupByContract(permissions){ return ObjectHelpers.groupBy(permissions.filter(perm => perm.isContractAction()), 'contract'); },

            filterBySearch(){
                return Object.keys(this.groupByIdentity(this.permissions))
                    .filter(x => JSON.stringify(x).indexOf(this.searchText) > -1)
                    .reduce((acc,key) => {
                        acc[key] = this.groupByIdentity(this.permissions)[key];
                        return acc;
                    }, {})
            },

            /***
             * Revokes an Identity, contract or action
             * @param revokeObject
             */
            revoke(revokeObject){
                switch(revokeObject.type){
                    case 'identity':this.removeIdentityPermissions(revokeObject.perm); break;
                    case 'contract': this.removeContractPermissions(revokeObject.contract, revokeObject.network); break;
                    case 'action': this.removeActionPermissions(revokeObject.perm); break;
                }
            },

            /***
             * Removes an Identity's permissions from a Domain and Network
             * @param permission
             */
            removeIdentityPermissions(permission){
                const scatter = this.scatter.clone();
                this[Actions.PUSH_ALERT](AlertMsg.RevokingIdentity(this.domain)).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    scatter.keychain.permissions = scatter.keychain.permissions.filter(perm =>
                        perm.network.unique() !== permission.network.unique() ||
                        perm.domain !== permission.domain ||
                        perm.identity !== permission.identity);
                    this[Actions.UPDATE_STORED_SCATTER](scatter).then(() => this.goBackIfEmpty());
                });
            },

            /***
             * Removes a contract's permissions by removing all actions associated with it under an Identity and Network
             * @param contract
             * @param network
             */
            removeContractPermissions(contract, network){
                const scatter = this.scatter.clone();
                this[Actions.PUSH_ALERT](AlertMsg.RevokingContract(this.domain)).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    scatter.keychain.permissions = scatter.keychain.permissions.filter(perm =>
                        perm.network.unique() !== network.unique() ||
                        perm.domain !== this.domain ||
                        perm.contract !== contract);
                    this[Actions.UPDATE_STORED_SCATTER](scatter);
                });
            },

            /***
             * Removes only a single action from a contract under an Identity and Network
             * @param permission
             */
            removeActionPermissions(permission){
                const scatter = this.scatter.clone();
                this[Actions.PUSH_ALERT](AlertMsg.RevokingContractAction(this.domain)).then(res => {
                    if(!res || !res.hasOwnProperty('accepted')) return false;
                    scatter.keychain.permissions = scatter.keychain.permissions
                        .filter(perm => JSON.stringify(perm) !== JSON.stringify(permission));
                    this[Actions.UPDATE_STORED_SCATTER](scatter);
                });
            },

            goBackIfEmpty(){
                if(!Object.keys(this.groupByIdentity(this.permissions)).length) this.$router.back();
            },

            ...mapActions([
                Actions.UPDATE_STORED_SCATTER,
                Actions.PUSH_ALERT,
            ])
        }
    }
</script>

<style lang="scss">

    .domain-permissions {

        .identity-header {
            width:calc(100% - 104px);
            display:inline-block;
        }

        .revoke-identity {
            cursor: pointer;
            padding:0 10px;
            height:24px;
            line-height:21px;
            display:inline-block;
            color:#bebebe;
            font-family: 'Open Sans', sans-serif;
            font-size: 11px;
            border:1px solid #dfdfdf;
            border-radius: 4px;
            transition:all 0.2s ease;
            transition-property: background, border, color;

            &:hover {
                background:#ff0d0c;
                border:1px solid #ff0d0c;
                color:#fff;
            }
        }

        .contract-header {
            width:calc(100% - 91px);
            display:inline-block;
        }

        .revoke-contract-actions {
            cursor: pointer;
            padding:0 10px;
            height:15px;
            line-height:11px;
            display:inline-block;
            color:#bebebe;
            font-family: 'Open Sans', sans-serif;
            font-size: 9px;
            border:1px solid #dfdfdf;
            border-radius: 4px;
            transition:all 0.2s ease;
            transition-property: background, border, color;

            &:hover {
                background:#ff0d0c;
                border:1px solid #ff0d0c;
                color:#fff;
            }
        }

        .revoke-text {
            cursor: pointer;
            transition:all 0.2s ease;
            transition-property: color;
            text-decoration: underline;

            &:hover {
                color:#ff0d0c;
            }
        }
    }

</style>