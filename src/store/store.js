import Vue from 'vue'
import Vuex from 'vuex';

import {mutations} from './mutations';
import {actions} from './actions';

Vue.use(Vuex);

const state = {
    scatter:null,
    mnemonic:null,

    errors:[],
    errorResult:null,
};

const getters = {
    // getScatter:state => state.scatter
};

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})