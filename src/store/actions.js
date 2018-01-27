import * as Actions from './constants'
import PasswordHasher from '../util/PasswordHasher'
import Mnemonic from '../util/Mnemonic'
import Scatter from '../models/Scatter'
import InternalMessage from '../messages/InternalMessage'
import InternalMessageTypes from '../messages/InternalMessageTypes'

export const actions = {
    [Actions.SET_SCATTER]:({commit}, scatter) => commit(Actions.SET_SCATTER, scatter),

    [Actions.LOAD_SCATTER]:({dispatch}) => {
        return new Promise((resolve, reject) => {
            InternalMessage.signal(InternalMessageTypes.LOAD).send().then(_scatter => {
                dispatch(Actions.SET_SCATTER, Scatter.fromJson(_scatter));
                resolve();
            })
        })
    },

    [Actions.IS_UNLOCKED]:() => {
        return InternalMessage.signal(InternalMessageTypes.IS_UNLOCKED).send();
    },

    [Actions.LOCK]:() => {
        return InternalMessage.payload(InternalMessageTypes.SEED, '').send()
    },

    [Actions.SET_MNEMONIC]:({commit}, mnemonic) => commit(Actions.SET_MNEMONIC, mnemonic),

    [Actions.SET_SEED]:({commit}, password) => {
        return new Promise((resolve, reject) => {
            const [mnemonic, seed] = Mnemonic.generateMnemonic(password);
            InternalMessage.payload(InternalMessageTypes.SEED, seed).send().then(() => {
                resolve(mnemonic)
            })
        })
    },

    [Actions.UPDATE_STORED_SCATTER]:({dispatch}, scatter) => {
        return new Promise((resolve, reject) => {
            InternalMessage.payload(InternalMessageTypes.UPDATE, scatter).send().then(_scatter => {
                dispatch(Actions.SET_SCATTER, Scatter.fromJson(_scatter));
                resolve(_scatter)
            })
        })
    },

    [Actions.CREATE_NEW_SCATTER]:({state, commit, dispatch}, password) => {
        return new Promise((resolve, reject) => {
            const scatter = Scatter.fromJson(state.scatter);
            scatter.settings.hasEncryptionKey = true;

            dispatch(Actions.SET_SEED, password).then(mnemonic => {
                dispatch(Actions.UPDATE_STORED_SCATTER, scatter).then(_scatter => {
                    dispatch(Actions.SET_MNEMONIC, mnemonic);
                    dispatch(Actions.SET_SCATTER, Scatter.fromJson(_scatter));
                    resolve();
                })
            })
        })
    },




    [Actions.PUSH_ERROR]:({state, commit}, error) => {
        function waitForErrorResult(resolve){
            if(state.errorResult) {
                const errorResult = Object.assign({}, state.errorResult);
                commit(Actions.CLEAR_ERROR_RESULT);
                resolve(errorResult)
            } else setTimeout(() => {
                waitForErrorResult(resolve);
            }, 100)
        }

        return new Promise((resolve, reject) => {
            commit(Actions.PUSH_ERROR, error);
            waitForErrorResult(resolve);
        })
    },
    [Actions.PULL_ERROR]:({commit}) => commit(Actions.PULL_ERROR),
    [Actions.PUSH_ERROR_RESULT]:({commit}, errorResult) => commit(Actions.PUSH_ERROR_RESULT, errorResult),
    [Actions.CLEAR_ERROR_RESULT]:({commit}) => commit(Actions.CLEAR_ERROR_RESULT),
};