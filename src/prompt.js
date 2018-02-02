import VueInitializer from './vue/VueInitializer';
import {Routing} from './vue/Routing';
import * as Actions from './store/constants'
import {RouteNames} from './vue/Routing'
import Prompt from './models/prompts/Prompt'
import PromptBase from './prompts/PromptBase.vue'

import * as PromptTypes from './models/prompts/PromptTypes'
import Alert from './components/alerts/Alert.vue'

// TODO: Find naming scheme that doesnt overwrite models
class PromptWindow {

    constructor(){
        let {prompt, responder} = window.data || {prompt:null, responder:null};

        // TODO: Pair prompt with a checksum from the state store so that
        // even if an attacker manages to open a clickjack/malicious prompt
        // we will be able to identify and reject it.

        // TODO: Error handling for prompt messages

        // TODO: Mock for testing only
        if(!prompt) {
            prompt = {
                data:{},
                type:PromptTypes.REQUEST_IDENTITY
            }
        }

        prompt = Prompt.fromJson(prompt);

        const components = [
            {tag:'prompt-base', vue:PromptBase},
            {tag:'alert', vue:Alert},
        ];
        const routes = Routing.routes(true);

        // TODO: Request unlock for prompt
        const middleware = (to, next, store) => {
            store.dispatch(Actions.IS_UNLOCKED)
                .then(unlocked => (unlocked) ? next() : next({name:RouteNames.ENTRY}));
        };

        new VueInitializer(routes, components, middleware, router => {
            router.push({name:prompt.routeName()});
        });
    }

}

const popup = new PromptWindow();









