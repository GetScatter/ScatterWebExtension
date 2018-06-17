import PluginRepository from '../../plugins/PluginRepository';
import {Blockchains} from '../../models/Blockchains'

export const m6_0_4 = async scatter => {
    const endorsedNetworks = [
        await PluginRepository.plugin(Blockchains.EOS).getEndorsedNetwork(),
        await PluginRepository.plugin(Blockchains.ETH).getEndorsedNetwork()
    ];

    scatter.settings.networks.map(network => {
        const endorsedNetwork = endorsedNetworks.find(endorsed => endorsed.host === network.host);
        if(endorsedNetwork) {
            const endorsedNetwork = endorsedNetworks.find(endorsed => endorsed.host === network.host);
            network.port = endorsedNetwork.port;
        }
    });

    scatter.keychain.identities.map(id => {
        const filtered = {};
        Object.keys(id.accounts).map(key => {
            if(scatter.settings.networks.find(net => net.unique() === key))
                filtered[key] = id.accounts[key];
        })

        id.accounts = filtered;
    });

    return true;
};