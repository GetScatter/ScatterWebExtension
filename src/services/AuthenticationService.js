import * as Actions from '../store/constants';
import {RouteNames} from '../vue/Routing'
import AlertMsg from '../models/alerts/AlertMsg'
import Mnemonic from '../util/Mnemonic'
import Hasher from '../util/Hasher';
import IdGenerator from '../util/IdGenerator'
import StorageService from './StorageService';

export default class AuthenticationService {

    /***
     * Verifies if the password provided matches the decryption seed
     * @param password
     * @param context
     */
    static verifyPassword(password, context){
        return new Promise((resolve, reject) => {
            const sendToEntry = () => {
                // context[Actions.PUSH_ALERT](AlertMsg.WrongPassword());
                context[Actions.PUSH_ALERT](AlertMsg.WrongPassword());
                context.$router.push({name:RouteNames.ENTRY});
                reject();
            };

            // We're going to immediately take a wrong password here as a sign
            // of hostility and lock Scatter by overwriting the seed.
            context[Actions.SET_SEED](password).then(() => {
                context[Actions.IS_UNLOCKED]().then(unlocked => {
                    if(!unlocked) { sendToEntry(); return false; }
                    resolve();
                }).catch(() => sendToEntry())
            }).catch(() => sendToEntry());
        })
    }

    /***
     * Changes a user's password.
     * --------------------------
     * !!IMPORTANT!!
     * Should only be done after verification of the
     * old password or it will corrupt all private keys.
     * --------------------------
     * @param oldPassword
     * @param newPassword
     * @param context
     */
    static async changePassword(oldPassword, newPassword, context){
        const [oldMnemonic, oldSeed] = await Mnemonic.generateMnemonic(oldPassword);

        // Setting a new salt every time the password is changed.
        await StorageService.setSalt(Hasher.insecureHash(IdGenerator.text(32)));

        const [newMnemonic, newSeed] = await Mnemonic.generateMnemonic(newPassword);

        const scatter = context.scatter.clone();
        context[Actions.SET_MNEMONIC](newMnemonic);
        context[Actions.SET_SEED](newPassword).then(() => {
            // Replacing private key encryption
            scatter.keychain.keypairs.map(keypair => keypair.decrypt(oldSeed));

            context[Actions.UPDATE_STORED_SCATTER](scatter).then(() => {
                context.$router.push({name:RouteNames.SHOW_MNEMONIC});
            })
        });
    }

    /***
     * Checks if a password is valid
     * @param password
     * @param confirmation
     * @param context
     * @returns {boolean}
     */
    static validPassword(password, confirmation, context){
        if(password.length < 8){
            context[Actions.PUSH_ALERT](AlertMsg.BadPassword());
            return false;
        }

        if(password !== confirmation){
            context[Actions.PUSH_ALERT](AlertMsg.PasswordsDoNotMatch());
            return false;
        }

        return true;
    }

}