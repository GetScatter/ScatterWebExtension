import Vue from 'vue'

import VueRouter from 'vue-router'
import {Routing, RouteNames} from './vue/Routing';
import {store} from './store/store'
import * as Actions from './store/constants'

import NavbarComponent from './components/NavbarComponent.vue'
import InputComponent from './components/InputComponent.vue'
import ButtonComponent from './components/ButtonComponent.vue'
import Alert from './components/alerts/Alert.vue'

import AlertMsg from './models/alerts/AlertMsg'
import * as AlertTypes from './models/alerts/AlertTypes'

class Popup {

    constructor(){
        this.setupVuePlugins();
        this.registerComponents();
        const router = this.setupRouting();

        store.dispatch(Actions.LOAD_SCATTER)
            .then(() => this.setupVue(router));
    }

    setupVuePlugins(){
        Vue.use(VueRouter);
    }

    registerComponents(){
        Vue.component('navbar', NavbarComponent);
        Vue.component('cin', InputComponent);
        Vue.component('btn', ButtonComponent);
        Vue.component('error', Alert);
    }

    setupRouting(){
        const router = new VueRouter({routes:Routing.routes()});
        router.beforeEach((to, from, next) => this.middleware(to, next));
        return router;
    }

    setupVue(router){
        this.app = new Vue({router, store});
        this.app.$mount('#scatter');
    }

    middleware(to, next){
        if(Routing.isRestricted(to.name))
            store.dispatch(Actions.IS_UNLOCKED)
                .then(unlocked => (unlocked) ? next() : next({name:'entry'}));
        else next();
    }

}

const popup = new Popup();









