<template>
    <section>
        <section class="fields-row" v-for="(value, key) in keyValues">
            <section class="fields">
                <figure class="label">
                    {{key}}
                    <i class="fa fa-square" style="font-size:14px;" v-if="typeof value === 'object'"></i>
                </figure>
                <figure class="value" v-if="typeof value !== 'object'">{{value}}</figure>
                <figure class="value" v-else>
                    <key-value class="shifted" :key-values="value"></key-value>
                </figure>
            </section>
            <figure class="mutable" v-if="whitelisted">
                <input type="checkbox" @click="emitToggledMutable(key)" />
            </figure>
        </section>
    </section>
</template>
<script>
    export default {
        data(){ return {

        }},
        props:['keyValues', 'whitelisted'],
        methods: {
            emitToggledMutable(key){ this.$emit('toggled', key) },
        }
    }
</script>
<style>
    .shifted {
        margin-top:20px;
        padding-right:10px;
        border-right:10px solid rgba(0,0,0,0.01);
    }
</style>