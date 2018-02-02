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

        new VueInitializer(routes, components, middleware);
    }

}

const popup = new Popup();









