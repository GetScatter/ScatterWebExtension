import * as Actions from './constants'
import Hasher from '../util/Hasher'
import Mnemonic from '../util/Mnemonic'
import Scatter from '../models/Scatter'
import Network from '../models/Network'
import InternalMessage from '../messages/InternalMessage'
import * as InternalMessageTypes from '../messages/InternalMessageTypes'

export const actions = {
    [Actions.SET_SCATTER]:({commit}, scatter) => commit(Actions.SET_SCATTER, scatter),
    [Actions.SET_MNEMONIC]:({commit}, mnemonic) => commit(Actions.SET_MNEMONIC, mnemonic),
    [Actions.IS_UNLOCKED]:() => InternalMessage.signal(InternalMessageTypes.IS_UNLOCKED).send(),
    [Actions.LOCK]:() => InternalMessage.payload(InternalMessageTypes.SET_SEED, '').send(),
    [Actions.DESTROY]:({dispatch}) => InternalMessage.signal(InternalMessageTypes.DESTROY).send(),

    [Actions.SET_SEED]:({commit}, password) => {
        return new Promise(async (resolve, reject) => {
            const [mnemonic, seed] = await Mnemonic.generateMnemonic(password);
            InternalMessage.payload(InternalMessageTypes.SET_SEED, seed).send().then(() => {
                resolve(mnemonic)
            })
        })
    },

    [Actions.SET_TIMEOUT]:({commit}, timeoutMinutes) => {
        return new Promise((resolve, reject) => {
            commit(Actions.SET_TIMEOUT, timeoutMinutes);
            InternalMessage.payload(InternalMessageTypes.SET_TIMEOUT, timeoutMinutes).send().then(() => {
                resolve(timeoutMinutes)
            })
        })
    },

    [Actions.LOAD_SCATTER]:({dispatch}) => {
        return new Promise((resolve, reject) => {
            InternalMessage.signal(InternalMessageTypes.LOAD).send().then(_scatter => {
                dispatch(Actions.SET_SCATTER, Scatter.fromJson(_scatter));
                resolve();
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


    [Actions.BACKUP_SCATTER_ON_BLOCKCHAIN]:({state, commit, dispatch}, scatter) => {
        return new Promise((resolve, reject) => {
            // Do this from the Background script
            resolve(true);
        })
    },

    [Actions.CREATE_NEW_SCATTER]:({state, commit, dispatch}, password) => {
        return new Promise((resolve, reject) => {
            const scatter = Scatter.fromJson(state.scatter);
            scatter.settings.hasEncryptionKey = true;
            scatter.settings.networks = [Network.endorsedNetwork()];

            dispatch(Actions.SET_SEED, password).then(mnemonic => {
                dispatch(Actions.UPDATE_STORED_SCATTER, scatter).then(_scatter => {
                    dispatch(Actions.SET_MNEMONIC, mnemonic);
                    dispatch(Actions.SET_SCATTER, Scatter.fromJson(_scatter));
                    resolve();
                })
            })
        })
    },




    [Actions.PUSH_ALERT]:({state, commit}, error) => {
        function waitForErrorResult(resolve){
            if(state.alertResult) {
                const alertResult = Object.assign({}, state.alertResult);
                commit(Actions.CLEAR_ALERT_RESULT);
                resolve(alertResult)
            } else setTimeout(() => {
                waitForErrorResult(resolve);
            }, 100)
        }

        return new Promise((resolve, reject) => {
            commit(Actions.PUSH_ALERT, error);
            waitForErrorResult(resolve);
        })
    },
    [Actions.PULL_ALERT]:({commit}) => commit(Actions.PULL_ALERT),
    [Actions.PUSH_ALERT_RESULT]:({commit}, alertResult) => commit(Actions.PUSH_ALERT_RESULT, alertResult),
    [Actions.CLEAR_ALERT_RESULT]:({commit}) => commit(Actions.CLEAR_ALERT_RESULT),


    [Actions.PUSH_PROMPT]:({state, commit}, prompt) => {
        if(state.prompt) state.prompt.responder(null);
        commit(Actions.PUSH_PROMPT, prompt);
    },
};