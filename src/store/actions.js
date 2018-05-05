import * as Actions from './constants'
import Hasher from '../util/Hasher'
import Mnemonic from '../util/Mnemonic'
import Scatter from '../models/Scatter'
import Meta from '../models/Meta'
import Network from '../models/Network'
import InternalMessage from '../messages/InternalMessage'
import * as InternalMessageTypes from '../messages/InternalMessageTypes'
import PluginRepository from '../plugins/PluginRepository'

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

    [Actions.SET_AUTO_LOCK]:({commit}, timeoutMinutes) => {
        return new Promise((resolve, reject) => {
            commit(Actions.SET_AUTO_LOCK, timeoutMinutes);
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

    [Actions.IMPORT_SCATTER]:({dispatch}, {imported, seed}) => {
        return new Promise(async (resolve, reject) => {
            const scatter = Scatter.fromJson(imported);
            scatter.settings.hasEncryptionKey = true;
            await Promise.all(PluginRepository.signatureProviders().map(async plugin => {
                const network = await plugin.getEndorsedNetwork();
                scatter.settings.networks.push(network);
            }));
            scatter.meta = new Meta();

            InternalMessage.payload(InternalMessageTypes.SET_SEED, seed).send().then(() => {
                dispatch(Actions.UPDATE_STORED_SCATTER, scatter).then(_scatter => {
                    resolve();
                })
            });
        })
    },

    [Actions.CREATE_NEW_SCATTER]:({state, commit, dispatch}, password) => {
        return new Promise(async (resolve, reject) => {
            const scatter = Scatter.fromJson(state.scatter);
            scatter.settings.hasEncryptionKey = true;
            await Promise.all(PluginRepository.signatureProviders().map(async plugin => {
                const network = await plugin.getEndorsedNetwork();
                scatter.settings.networks.push(network);
            }));

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