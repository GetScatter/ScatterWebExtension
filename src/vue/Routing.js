import EntryView from '../views/EntryView.vue'
import ShowMnemonicView from '../views/ShowMnemonicView.vue'
import MainMenuView from '../views/MainMenuView.vue'
import SettingsView from '../views/SettingsView.vue'
import IdentitiesView from '../views/IdentitiesView.vue'
import IdentityView from '../views/IdentityView.vue'
import NetworksView from '../views/NetworksView.vue'
import NetworkView from '../views/NetworkView.vue'
import PermissionsView from '../views/PermissionsView.vue'
import DomainPermissionView from '../views/DomainPermissionView.vue'
import BackupView from '../views/BackupView.vue'
import ChangePasswordView from '../views/ChangePasswordView.vue'
import DestroyView from '../views/DestroyView.vue'
import AutoLockView from '../views/AutoLockView.vue'
import LanguageView from '../views/LanguageView.vue'
import HistoryView from '../views/HistoryView.vue'
import KeyPairView from '../views/KeyPairView.vue'
import LoadFromBackup from '../views/LoadFromBackup.vue'
import KeyPairsView from '../views/KeyPairsView.vue'

import * as PromptTypes from '../models/prompts/PromptTypes'
import RequestIdentityPrompt from '../prompts/RequestIdentityPrompt.vue'
import RequestSignaturePrompt from '../prompts/RequestSignaturePrompt.vue'
import RequestArbitrarySignaturePrompt from '../prompts/RequestArbitrarySignaturePrompt.vue'
import RequestAddNetwork from '../prompts/RequestAddNetwork.vue'
import RequestUnlock from '../prompts/RequestUnlock.vue'
import UpdateVersion from '../prompts/UpdateVersion.vue'

export const promptPrefix = 'prompt_';

export const RouteNames = {
    ENTRY:'entry',
    LOAD_FROM_BACKUP:'loadFromBackup',
    SHOW_MNEMONIC:'showMnemonic',
    MAIN_MENU:'mainMenu',
    SETTINGS:'settings',

    TRANSFER:'transfer',
    IDENTITIES:'identities',
    IDENTITY:'identity',
    KEYS:'keys',
    PERMISSIONS:'permissions',
    DOMAIN_PERMISSIONS:'domainPermissions',
    HISTORY:'history',

    NETWORKS:'networks',
    NETWORK:'network',
    CHANGE_PASSWORD:'changePassword',
    BACKUP:'backup',
    DESTROY:'destroy',
    AUTO_LOCK:'autoLock',
    LANGUAGE:'language',
    KEYPAIRS:'keypairs',

    PROMPT_REQUEST_IDENTITY:`${promptPrefix}${PromptTypes.REQUEST_IDENTITY}`,
    PROMPT_REQUEST_SIGNATURE:`${promptPrefix}${PromptTypes.REQUEST_SIGNATURE}`,
    PROMPT_REQUEST_ARBITRARY_SIGNATURE:`${promptPrefix}${PromptTypes.REQUEST_ARBITRARY_SIGNATURE}`,
    PROMPT_REQUEST_ADD_NETWORK:`${promptPrefix}${PromptTypes.REQUEST_ADD_NETWORK}`,
    PROMPT_REQUEST_UNLOCK:`${promptPrefix}${PromptTypes.REQUEST_UNLOCK}`,
    PROMPT_UPDATE_VERSION:`${promptPrefix}${PromptTypes.UPDATE_VERSION}`,
};

const RouteViews = {
    [RouteNames.ENTRY]:EntryView,
    [RouteNames.LOAD_FROM_BACKUP]:LoadFromBackup,
    [RouteNames.SHOW_MNEMONIC]:ShowMnemonicView,
    [RouteNames.MAIN_MENU]:MainMenuView,
    [RouteNames.SETTINGS]:SettingsView,

    [RouteNames.TRANSFER]:SettingsView,
    [RouteNames.IDENTITIES]:IdentitiesView,
    [RouteNames.IDENTITY]:IdentityView,
    [RouteNames.KEYS]:KeyPairsView,
    [RouteNames.PERMISSIONS]:PermissionsView,
    [RouteNames.DOMAIN_PERMISSIONS]:DomainPermissionView,
    [RouteNames.HISTORY]:HistoryView,

    [RouteNames.NETWORKS]:NetworksView,
    [RouteNames.NETWORK]:NetworkView,
    [RouteNames.CHANGE_PASSWORD]:ChangePasswordView,
    [RouteNames.BACKUP]:BackupView,
    [RouteNames.DESTROY]:DestroyView,
    [RouteNames.AUTO_LOCK]:AutoLockView,
    [RouteNames.LANGUAGE]:LanguageView,
    [RouteNames.KEYPAIRS]:KeyPairView,

    [RouteNames.PROMPT_REQUEST_IDENTITY]:RequestIdentityPrompt,
    [RouteNames.PROMPT_REQUEST_SIGNATURE]:RequestSignaturePrompt,
    [RouteNames.PROMPT_REQUEST_ARBITRARY_SIGNATURE]:RequestArbitrarySignaturePrompt,
    [RouteNames.PROMPT_REQUEST_ADD_NETWORK]:RequestAddNetwork,
    [RouteNames.PROMPT_REQUEST_UNLOCK]:RequestUnlock,
    [RouteNames.PROMPT_UPDATE_VERSION]:UpdateVersion,
};

export const RouteDepth = {
    [RouteNames.ENTRY]:-1,
    [RouteNames.LOAD_FROM_BACKUP]:1,
    [RouteNames.SHOW_MNEMONIC]:1,
    [RouteNames.MAIN_MENU]:0,
    [RouteNames.SETTINGS]:100,

    [RouteNames.TRANSFER]:1,
    [RouteNames.IDENTITIES]:1,
    [RouteNames.IDENTITY]:2,
    [RouteNames.KEYS]:2,
    [RouteNames.KEYPAIRS]:3,
    [RouteNames.PERMISSIONS]:1,
    [RouteNames.DOMAIN_PERMISSIONS]:2,
    [RouteNames.HISTORY]:1,

    [RouteNames.NETWORKS]:101,
    [RouteNames.NETWORK]:102,
    [RouteNames.CHANGE_PASSWORD]:101,
    [RouteNames.AUTO_LOCK]:101,
    [RouteNames.LANGUAGE]:101,
    [RouteNames.BACKUP]:101,
    [RouteNames.DESTROY]:101,
};

export class Routing {

    static builder(){
        const routeNames = Object.keys(RouteNames).map(key => RouteNames[key]);

        let routesBuilder = {};
        routeNames.map(routeName => {
            routesBuilder[routeName] = {
                path:routeName === RouteNames.ENTRY ? '' : '/'+routeName,
                name:routeName,
                component: RouteViews[routeName]
            }
        });

        return routesBuilder;
    }

    static routes(prompts = false){
        return Object.keys(Routing.builder())
            .filter(routeName => prompts && routeName.indexOf(promptPrefix) !== -1 ||
                                !prompts && routeName.indexOf(promptPrefix) === -1)
            .map(routeName => Routing.builder()[routeName]);
    }

    static isRestricted(routeName) {
        return ![
            RouteNames.ENTRY,
            RouteNames.LOAD_FROM_BACKUP
        ].includes(routeName)
    }

}