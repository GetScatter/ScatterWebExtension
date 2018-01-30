import Vue from 'vue'
import Vuex from 'vuex';

import {mutations} from './mutations';
import {actions} from './actions';

Vue.use(Vuex);

const state = {
    scatter:null,
    mnemonic:null,

    alerts:[],
    alertResult:null,
};

const getters = {
    identities:state => state.scatter.keychain.identities,
    permissions:state => state.scatter.keychain.permissions,
    networks:state => state.scatter.settings.networks,
    backupToBlockchain:state => state.scatter.settings.backupToBlockchain,
};

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})