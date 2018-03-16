import Hasher from './Hasher'

export default class ContractHelpers {

    /***
     * Created a insecureHash of the entire message
     * @param message
     * @param signingAccountName
     * @param domain
     * @param network
     * @param requiredFields
     * @returns {*}
     */
    static messageChecksum(message, signingAccountName, domain, network, requiredFields = []){
        return Hasher.insecureHash(JSON.stringify(Object.assign(message, {domain, network, requiredFields})))
    }

    /***
     * Checks if a previously checksummed message is still valid
     * This will require that every property is the same
     * //TODO: In the future we should allow users to select fields that can change, such as vector coordinates for games
     * @param checksum
     * @param message
     * @param signingAccountName
     * @param domain
     * @param network
     * @param requiredFields
     * @returns {boolean}
     */
    static validChecksum(checksum, message, signingAccountName, domain, network, requiredFields = []){
        return this.messageChecksum(message, signingAccountName, domain, network, requiredFields) === checksum;
    }

}