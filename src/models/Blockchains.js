
export const Blockchains = {
    EOS:'eos',
    ETH:'eth',
    ENU:'enu'
};

export const BlockchainsArray =
    Object.keys(Blockchains).map(key => ({key, value:Blockchains[key]}));
