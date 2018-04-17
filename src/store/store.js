import Vue from 'vue'
import Vuex from 'vuex';

import {mutations} from './mutations';
import {actions} from './actions';
import * as LANG_KEYS from '../localization/keys';

Vue.use(Vuex);

const state = {
    scatter:null,
    mnemonic:null,

    alerts:[],
    alertResult:null,

    prompt:null,
};

const getters = {
    identities:state => state.scatter.keychain.identities,
    permissions:state => state.scatter.keychain.permissions,
    networks:state => state.scatter.settings.networks,
    backupToBlockchain:state => state.scatter.settings.backupToBlockchain,
    histories:state => state.scatter.histories,
    autoLockInterval:state => state.scatter.settings.inactivityInterval,
    language:state => state.scatter.settings.language,
    langKeys:state => LANG_KEYS,

    // FOR PROMPTS ONLY
    identityFields:state => state.prompt.data || [],
    messages:state => state.prompt.data.transaction.messages || [],
    requiredFields:state => state.prompt.data.requiredFields || [],
};

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})