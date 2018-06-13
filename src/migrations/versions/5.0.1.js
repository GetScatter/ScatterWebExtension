import PluginRepository from '../../plugins/PluginRepository';
import {Blockchains} from '../../models/Blockchains'

export const m5_0_1 = async scatter => {
    const eos = PluginRepository.plugin(Blockchains.EOS);
    const endorsedNetwork = await eos.getEndorsedNetwork();
    scatter.settings.networks.push(endorsedNetwork);
};