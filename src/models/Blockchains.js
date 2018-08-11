
export const Blockchains = {
    EOS:'eos',
    ETH:'eth',
    TLOS:'tlos'
};

export const BlockchainsArray =
    Object.keys(Blockchains).map(key => ({key, value:Blockchains[key]}));