import Vue from 'vue'
import Vuex from 'vuex';

import {mutations} from './mutations';
import {actions} from './actions';
import * as LANG_KEYS from '../localization/keys';

import {IdentityRequiredFields} from '../models/Identity'

Vue.use(Vuex);

const state = {
    scatter:null,
    mnemonic:null,

    alerts:[],
    alertResult:null,

    prompt:null,
};

const getters = {
    meta:state => state.scatter.meta,
    identities:state => state.scatter.keychain.identities,
    permissions:state => state.scatter.keychain.permissions,
    keypairs:state => state.scatter.keychain.keypairs,
    networks:state => state.scatter.settings.networks,
    histories:state => state.scatter.histories,
    autoLockInterval:state => state.scatter.settings.inactivityInterval,
    language:state => state.scatter.settings.language,

    // FOR PROMPTS ONLY
    identityFields:state => IdentityRequiredFields.fromJson(state.prompt.data),
    requiredFields:state => IdentityRequiredFields.fromJson(state.prompt.data.requiredFields || {}),
    messages:state => state.prompt.data.messages || [],
};

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})