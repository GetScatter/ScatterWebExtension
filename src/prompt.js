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
import KeyValue from './components/KeyValue.vue'
import InternalMessage from './messages/InternalMessage'
import * as InternalMessageTypes from './messages/InternalMessageTypes'
import {apis} from './util/BrowserApis';

class PromptWindow {

    constructor(){
        let prompt = window.data || apis.extension.getBackgroundPage().notification || null;

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
            {tag:'key-value', vue:KeyValue},
        ];

        const routes = Routing.routes(true);
        const middleware = (to, next, store) => next();

        new VueInitializer(routes, components, middleware, (router, store) => {
            store.dispatch(Actions.PUSH_PROMPT, prompt);
            router.push({name:prompt.routeName()});
        });
    }

}

const popup = new PromptWindow();









