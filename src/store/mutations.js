import * as Mutations from './constants'

export const mutations = {
    [Mutations.SET_SCATTER]:(state, scatter) => state.scatter = scatter,
    [Mutations.SET_MNEMONIC]:(state, mnemonic) => state.mnemonic = mnemonic,
    [Mutations.PUSH_ERROR]:(state, error) => state.errors.push(error),
    [Mutations.PULL_ERROR]:(state, error) => state.errors.shift(),
    [Mutations.PUSH_ERROR_RESULT]:(state, errorResult) => state.errorResult = errorResult,
    [Mutations.CLEAR_ERROR_RESULT]:(state) => state.errorResult = null,
};