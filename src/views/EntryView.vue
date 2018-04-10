<template>
    <section>
        <section v-if="!scatter.settings.hasEncryptionKey">
            <section class="p20">
                <form v-on:submit.prevent="create">
                  <cin icon="fa-lock" placeholder="password" type="password" v-on:changed="changed => bind(changed, 'password')"></cin>
                  <cin icon="fa-lock" placeholder="confirm password" type="password" v-on:changed="changed => bind(changed, 'passwordConfirmation')"></cin>
                  <btn text="Create New Scatter" type="submit" margined="true"></btn>
                </form>
            </section>
            <figure class="line"></figure>
            <section class="p20">
                <btn text="Load From Backup" v-on:clicked="create"></btn>
            </section>
        </section>
        <section v-else>
            <section class="p20" style="overflow:hidden;">
                <section class="unlocker" :class="{'hiding':hiding}">
                    <form v-on:submit.prevent="unlock">
                      <cin icon="fa-lock" placeholder="password" type="password" v-on:changed="changed => bind(changed, 'password')"></cin>
                      <btn text="Unlock" type="submit" margined="true"></btn>
                    </form>
                </section>
            </section>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import AlertMsg from '../models/alerts/AlertMsg'
    import AuthenticationService from '../services/AuthenticationService'

    export default {
        data(){ return {
            password:'',
            passwordConfirmation:'',
            scat:this.scatter,
            hiding:true,
        }},
        computed: {
            ...mapState([
                'scatter',
                'mnemonic'
            ])
        },
        mounted(){
            setTimeout(() => {
                this.hiding = false;
            }, 200)
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            create(){
                if(AuthenticationService.validPassword(this.password, this.passwordConfirmation, this))
                    this[Actions.CREATE_NEW_SCATTER](this.password).then(() => this.next());
            },
            unlock(){
                this.hiding = true;
                setTimeout(() => {
                    AuthenticationService.verifyPassword(this.password, this).then(() => {
                        this[Actions.LOAD_SCATTER]().then(() => setTimeout(() => this.next(), 100));
                    }).catch(() => this.hiding = false);
                }, 200)
            },
            next(){
                if(this.mnemonic) this.$router.push({name:RouteNames.SHOW_MNEMONIC});
//                else if(!this.scatter.keychain.identities.length || (this.scatter.keychain.identities.length === 1 && this.scatter.keychain.identities[0].account === null))
//                    this.$router.push({name:RouteNames.FIRST_TIME});
                else this.$router.push({name:RouteNames.MAIN_MENU});
            },
            ...mapActions([
                Actions.CREATE_NEW_SCATTER,
                Actions.SET_SEED,
                Actions.IS_UNLOCKED,
                Actions.LOAD_SCATTER,
                Actions.PUSH_ALERT
            ])
        },
    }
</script>

<style lang="scss">
    .unlocker {
        opacity:1;
        transform:translateY(0px);
        transition:all 0.2s ease;
        transition-property: opacity, transform;

        &.hiding {
            opacity:0;
            /*transform:translateY(150px);*/
        }
    }
</style>
