import PluginRepository from '../../plugins/PluginRepository';
import {Blockchains} from '../../models/Blockchains'

export const m5_0_4 = async scatter => {
    scatter.meta.acceptedTerms = false;
    return true;
};