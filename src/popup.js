import VueInitializer from './vue/VueInitializer';
import {Routing} from './vue/Routing';
import * as Actions from './store/constants'
import {RouteNames} from './vue/Routing'

import NavbarComponent from './components/NavbarComponent.vue'
import InputComponent from './components/InputComponent.vue'
import ButtonComponent from './components/ButtonComponent.vue'
import SearchComponent from './components/SearchComponent.vue'
import SelectComponent from './components/SelectComponent.vue'
import NavActionsComponent from './components/NavActionsComponent.vue'
import ViewBase from './views/ViewBase.vue'
import Alert from './components/alerts/Alert.vue'

class Popup {

    constructor(){
        const components = [
            {tag:'navbar', vue:NavbarComponent},
            {tag:'nav-actions', vue:NavActionsComponent},
            {tag:'cin', vue:InputComponent},
            {tag:'btn', vue:ButtonComponent},
            {tag:'search', vue:SearchComponent},
            {tag:'sel', vue:SelectComponent},
            {tag:'alert', vue:Alert},
            {tag:'view-base', vue:ViewBase},
        ];

        const routes = Routing.routes();

        const middleware = (to, next, store) => {
            if(Routing.isRestricted(to.name))
                store.dispatch(Actions.IS_UNLOCKED)
                    .then(unlocked => (unlocked) ? next() : next({name:RouteNames.ENTRY}));
            else next();
        };

        new VueInitializer(routes, components, middleware, (router, store) => {
            store.dispatch(Actions.IS_UNLOCKED)
                .then(unlocked => {
                    // if(unlocked &&
                    //     (!store.state.scatter.keychain.identities.length ||
                    //         (store.state.scatter.keychain.identities.length === 1 &&
                    //             store.state.scatter.keychain.identities[0].account === null)))
                    //     router.push({name:RouteNames.FIRST_TIME});
                    // else if(unlocked)
                    //     router.push({name:RouteNames.MAIN_MENU});
                    router.push({name:RouteNames.MAIN_MENU});
                });
        });
    }

}

const popup = new Popup();
