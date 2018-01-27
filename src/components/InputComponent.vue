<template>
    <section class="input" :class="{'has-icon':icon}">
        <figure class="icon"><i class="fa" :class="icon"></i></figure>
        <input :placeholder="placeholder" :type="type || 'text'" v-model="input" />
    </section>
</template>

<script>
    export default {
        data(){ return { input:this.text || '' }},
        methods: { emit(){ this.$emit('changed', this.input) } },
        props:['icon', 'placeholder', 'type', 'text'],
        watch:{
            input:function(){ this.emit(); },
            text:function(){ this.input = this.text; },
        }
    }
</script>

<style lang="scss">
    .input {
        height:50px;
        position: relative;

        &:not(:first-child){
            margin-top:10px;
        }

        .icon {
            position:absolute;
            left:10px;
            top:0;
            bottom:0;
            line-height:50px;
            color:#888;
            text-align:center;
            font-size:14px;
        }

        input {
            outline:0;
            height:50px;
            width:100%;
            padding:0 15px;
            font-family:'Raleway',sans-serif;
            font-size:18px;
            background:#fff;
            border:1px solid #eaeaea;
            border-radius:4px;
            transition:all 0.15s ease;
            transition-property: background, border, color;

            &:focus {
                border:1px solid rgba(0,0,0,0.15);
                background:rgba(255,255,255,0.9);
            }
        }

        &.has-icon {
            input {
                padding-left:45px;
            }

            .icon {
                width:30px;
                height:50px;
            }
        }
    }
</style>