import PluginRepository from '../../plugins/PluginRepository';
import {Blockchains} from '../../models/Blockchains'

export const m5_0_4 = async scatter => {
    const endorsedNetworks = [
        await PluginRepository.plugin(Blockchains.EOS).getEndorsedNetwork(),
        await PluginRepository.plugin(Blockchains.ETH).getEndorsedNetwork(),
        await PluginRepository.plugin(Blockchains.TLOS).getEndorsedNetwork()
    ];

    scatter.settings.networks.map(network => {
        const endorsedNetwork = endorsedNetworks.find(endorsed => endorsed.host === network.host);
        if(endorsedNetwork) {
            const endorsedNetwork = endorsedNetworks.find(endorsed => endorsed.host === network.host);
            network.name = endorsedNetwork.name;
            network.port = endorsedNetwork.port;
            network.protocol = endorsedNetwork.protocol;
        } else {
            network.protocol = network.port === 443 ? 'https' : 'http'
        }
    });
};