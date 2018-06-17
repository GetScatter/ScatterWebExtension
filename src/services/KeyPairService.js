import {BlockchainsArray, Blockchains} from '../models/Blockchains';
import PluginRepository from '../plugins/PluginRepository'
import AlertMsg from '../models/alerts/AlertMsg'
import * as Actions from '../store/constants';

export default class KeyPairService {

    /***
     * Tries to make a keypair in place from a private key
     * @param keypair
     * @returns {Promise.<void>}
     */
    static async makePublicKey(keypair){
        return new Promise((resolve) => {
            setTimeout(() => {
                if(keypair.privateKey.length < 50) {
                    resolve(false);
                    return false;
                }

                let publicKey = '';

                BlockchainsArray.map(blockchainKV => {
                    try {
                        if(!publicKey.length) {
                            const blockchain = blockchainKV.value;

                            const plugin = PluginRepository.plugin(blockchain);
                            if (plugin && plugin.validPrivateKey(keypair.privateKey)) {
                                publicKey = plugin.privateToPublic(keypair.privateKey);
                                keypair.blockchain = blockchain;
                            }
                        }
                    } catch(e){}
                });

                if(publicKey) keypair.publicKey = publicKey;
                resolve(true);
            },100)
        })
    }

    static async generateKeyPair(keypair){
        const plugin = PluginRepository.plugin(keypair.blockchain);
        if(!plugin) return false;

        plugin.randomPrivateKey().then(privateKey => {
            const publicKey = plugin.privateToPublic(privateKey);
            if(plugin.validPublicKey(publicKey) && plugin.validPrivateKey(privateKey)){
                keypair.publicKey = publicKey;
                keypair.privateKey = privateKey;
            }
        });

        return true;
    }

    static saveKeyPair(keypair, context, callback){
        if(!keypair.name.length) return context[Actions.PUSH_ALERT](AlertMsg.BadKeyPairName());

        const scatter = context.scatter.clone();
        if(scatter.keychain.getKeyPair(keypair))
            return context[Actions.PUSH_ALERT](AlertMsg.KeyPairExists());
        if(scatter.keychain.getKeyPairByName(keypair.name))
            return context[Actions.PUSH_ALERT](AlertMsg.KeyPairExists());

        scatter.keychain.keypairs.push(keypair);
        context[Actions.UPDATE_STORED_SCATTER](scatter).then(() => callback());
    }
    
}