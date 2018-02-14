import VueInitializer from './vue/VueInitializer';
import {Routing} from './vue/Routing';
import * as Actions from './store/constants'
import {RouteNames} from './vue/Routing'
import Prompt from './models/prompts/Prompt'
import PromptBase from './prompts/PromptBase.vue'
import Network from './models/Network'

import * as PromptTypes from './models/prompts/PromptTypes'
import Alert from './components/alerts/Alert.vue'
import ButtonComponent from './components/ButtonComponent.vue'
import SearchComponent from './components/SearchComponent.vue'
import InputComponent from './components/InputComponent.vue'
import SelectComponent from './components/SelectComponent.vue'

// TODO: Find naming scheme that doesnt overwrite models
class PromptWindow {

    constructor(){
        let prompt = window.data || null;

        // TODO: Pair prompt with a checksum from the state store so that
        // even if an attacker manages to open a clickjack/malicious prompt
        // we will be able to identify and reject it.

        // TODO: Error handling for prompt messages

        prompt = Prompt.fromJson(prompt);

        const components = [
            {tag:'prompt-base', vue:PromptBase},
            {tag:'btn', vue:ButtonComponent},
            {tag:'search', vue:SearchComponent},
            {tag:'cin', vue:InputComponent},
            {tag:'sel', vue:SelectComponent},
            {tag:'alert', vue:Alert},
        ];
        const routes = Routing.routes(true);

        // TODO: Request unlock for prompt
        const middleware = (to, next, store) => {
            store.dispatch(Actions.IS_UNLOCKED)
                .then(unlocked => (unlocked) ? next() : next({name:RouteNames.ENTRY}));
        };

        new VueInitializer(routes, components, middleware, (router, store) => {
            store.dispatch(Actions.PUSH_PROMPT, prompt);
            router.push({name:prompt.routeName()});
        });
    }

}

const popup = new PromptWindow();









