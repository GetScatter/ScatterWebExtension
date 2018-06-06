
export const Protocols = {
    HTTP: 'http',
    HTTPS:'https'
};

export const ProtocolsArray =
    Object.keys(Protocols).map(key => ({key, value:Protocols[key]}));
