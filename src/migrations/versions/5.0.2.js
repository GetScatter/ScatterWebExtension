import PluginRepository from '../../plugins/PluginRepository';
import {Blockchains} from '../../models/Blockchains'

export const m5_0_2 = async scatter => {
    const eos = PluginRepository.plugin(Blockchains.EOS);
    const endorsedNetwork = await eos.getEndorsedNetwork();
    if(!scatter.settings.networks.find(network => network.host === endorsedNetwork.host))
        scatter.settings.networks.push(endorsedNetwork);
};