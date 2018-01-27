<template>
    <section>
        <section v-if="!scatter.settings.hasEncryptionKey">
            <section class="p20">
                <cin icon="fa-lock" placeholder="password" type="password" v-on:changed="changed => bind(changed, 'password')"></cin>
                <cin icon="fa-lock" placeholder="confirm password" type="password" v-on:changed="changed => bind(changed, 'passwordConfirmation')"></cin>
                <btn text="Create New Scatter" v-on:clicked="create" margined="true"></btn>
            </section>
            <figure class="line"></figure>
            <section class="p20">
                <btn text="Load From Backup" v-on:clicked="create"></btn>
            </section>
        </section>
        <section v-else>
            <section class="p20">
                <cin icon="fa-lock" placeholder="password" type="password" v-on:changed="changed => bind(changed, 'password')"></cin>
                <btn text="Unlock" v-on:clicked="unlock" margined="true"></btn>
            </section>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'
    import AlertMsg from '../models/alerts/AlertMsg'

    export default {
        data(){ return {
            password:'',
            passwordConfirmation:'',
            scat:this.scatter
        }},
        computed: {
            ...mapState([
                'scatter',
                'mnemonic'
            ])
        },
        methods: {
            bind(changed, original) { this[original] = changed },
            create(){
                // TODO: Enable for production
//                if(this.password.length < 8){
//                    this[Actions.PUSH_ERROR](AlertMsg.BadPassword());
//                    return false;
//                }

                if(this.password !== this.passwordConfirmation){
                    this[Actions.PUSH_ERROR](AlertMsg.PasswordsDoNotMatch());
                    return false;
                }

                this[Actions.CREATE_NEW_SCATTER](this.password).then(() => this.next());
            },
            unlock(){
                this[Actions.SET_SEED](this.password).then(() => {
                    this[Actions.IS_UNLOCKED]().then(unlocked => {
                        if(!unlocked) this[Actions.PUSH_ERROR](AlertMsg.WrongPassword());
                        else this[Actions.LOAD_SCATTER]().then(() => setTimeout(() => this.next(), 100));
                    });
                }).catch(() => this[Actions.PUSH_ERROR](AlertMsg.WrongPassword()));
            },
            next(){
                if(this.mnemonic) this.$router.push({name:RouteNames.SHOW_MNEMONIC});
                else if(!this.scatter.keychain.identities.length || !this.scatter.keychain.identities[0].account)
                    this.$router.push({name:RouteNames.FIRST_TIME});
                else this.$router.push({name:RouteNames.MAIN_MENU});
            },
            ...mapActions([
                Actions.CREATE_NEW_SCATTER,
                Actions.SET_SEED,
                Actions.IS_UNLOCKED,
                Actions.LOAD_SCATTER,
                Actions.PUSH_ERROR
            ])
        },
    }
</script>