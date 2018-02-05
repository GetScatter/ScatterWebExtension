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

// TODO: Find naming scheme that doesnt overwrite models
class PromptWindow {

    constructor(){
        let prompt = window.data || null;

        console.log(prompt);

        // TODO: Pair prompt with a checksum from the state store so that
        // even if an attacker manages to open a clickjack/malicious prompt
        // we will be able to identify and reject it.

        // TODO: Error handling for prompt messages

        // TODO: Mock for testing only
        if(!prompt) {
            const payload = {"transaction":{"ref_block_num":24400,"ref_block_prefix":2411545604,"expiration":"2018-02-04T23:04:35","scope":["feasdf1","inita"],"read_scope":[],"messages":[{"code":"eos","type":"transfer","authorization":[{"account":"feasdf1","permission":"active"}],"data":{"from":"feasdf1","to":"inita","amount":"10","memo":""}}]},"buf":{"type":"Buffer","data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,95,4,68,189,143,131,145,119,90,2,0,0,0,32,172,132,141,90,0,0,0,0,0,147,221,116,0,1,0,0,0,0,0,0,48,85,0,0,0,87,45,60,205,205,1,0,0,0,32,172,132,141,90,0,0,0,0,168,237,50,50,25,0,0,0,32,172,132,141,90,0,0,0,0,0,147,221,116,10,0,0,0,0,0,0,0,0]},"domain":"scatter.devx","network":{"host":"192.168.56.101","port":8888}}
            prompt = {
                data:payload,
                type:PromptTypes.REQUEST_SIGNATURE,
                domain:'cryptocraps.com',
                network:Network.fromJson({host:'mainnet.eos.io', port:8888}),
                responder:() => {}
            }
        }

        prompt = Prompt.fromJson(prompt);

        const components = [
            {tag:'prompt-base', vue:PromptBase},
            {tag:'btn', vue:ButtonComponent},
            {tag:'search', vue:SearchComponent},
            {tag:'cin', vue:InputComponent},
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









