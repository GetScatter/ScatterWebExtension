import EntryView from '../views/EntryView.vue'
import ShowMnemonicView from '../views/ShowMnemonicView.vue'
import FirstTimeView from '../views/FirstTimeView.vue'
import MainMenuView from '../views/MainMenuView.vue'
import SettingsView from '../views/SettingsView.vue'

export const RouteNames = {
    ENTRY:'entry',
    SHOW_MNEMONIC:'showMnemonic',
    FIRST_TIME:'firstTime',
    MAIN_MENU:'mainMenu',
    SETTINGS:'settings',

    TRANSFER:'transfer',
    IDENTITIES:'identities',
    PERMISSIONS:'permissions',
    HISTORY:'history',
};

const RouteViews = {
    [RouteNames.ENTRY]:EntryView,
    [RouteNames.SHOW_MNEMONIC]:ShowMnemonicView,
    [RouteNames.FIRST_TIME]:FirstTimeView,
    [RouteNames.MAIN_MENU]:MainMenuView,
    [RouteNames.SETTINGS]:SettingsView,

    [RouteNames.TRANSFER]:SettingsView,
    [RouteNames.IDENTITIES]:SettingsView,
    [RouteNames.PERMISSIONS]:SettingsView,
    [RouteNames.HISTORY]:SettingsView,
};

export class Routing {

    static builder(){
        const routeNames = Object.keys(RouteNames).map(key => RouteNames[key]);

        let routesBuilder = {};
        routeNames.map(routeName => {
            routesBuilder[routeName] = {
                path:routeName === RouteNames.ENTRY ? '' : '/'+routeName,
                name:routeName,
                component: RouteViews[routeName],
            }
        });

        return routesBuilder;
    }

    static routes(){
        return Object.keys(Routing.builder()).map(routeName => Routing.builder()[routeName]);
    }

    static isRestricted(routeName) {
        return routeName !== RouteNames.ENTRY
    }

}