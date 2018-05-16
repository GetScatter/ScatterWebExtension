<template>
    <section class="input" :class="{'has-icon':icon, 'half':half, 'second-half':secondHalf, 'seventy':seventy, 'thirty':thirty}">
        <figure class="icon"><i class="fa" :class="icon"></i></figure>
        <input v-if="!tag && !checkbox" :disabled="disabled || false" :placeholder="placeholder" :type="type || 'text'" v-model="input" />
        <figure class="checkbox" v-on:click="tagged" v-if="!tag && checkbox"></figure>
        <section v-if="tag" class="tag-container">
            <figure v-if="tag.indexOf('fa-') > -1" class="tag" v-on:click="untag">
                <i class="fa" :class="tag"></i>
            </figure>
            <figure v-else class="tag" v-on:click="untag">{{tag}}</figure>
        </section>
    </section>
</template>

<script>
    export default {
        data(){ return { input:this.text || '' }},
        methods: {
            emit(){ this.$emit('changed', this.input) },
            untag(){ this.$emit('untagged', false) },
            tagged(){ this.$emit('untagged', true) },
        },
        props:['icon', 'placeholder', 'type', 'text', 'half', 'secondHalf', 'seventy', 'thirty', 'disabled', 'tag', 'checkbox'],
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
        width:100%;

        &.half, &.second-half {
            width:calc(50% - 5px);
            display:inline-block;
            font-size:14px;
        }

        &.second-half {
            margin-left:6px;
        }

        &.seventy {
            width:calc(70% - 5px);
            display:inline-block;
            font-size:14px;
        }

        &.thirty {
            width:calc(30% - 5px);
            display:inline-block;
            font-size:14px;
            margin-left:6px;
            vertical-align: top;
        }

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

        input, .tag-container, .checkbox {
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

            &:disabled {
                cursor:not-allowed;
                background:rgba(0,0,0,0.03);
            }

            &:focus {
                border:1px solid rgba(0,0,0,0.15);
                background:rgba(255,255,255,0.9);
            }
        }

        .tag-container {
            .tag {
                cursor: pointer;
                height:44px;
                line-height:44px;
                margin-top:2px;
                margin-left:-13px;
                background:#f5f5f5;
                border:1px solid #ededed;
                border-radius: 4px;
                padding:0 15px;
                display:inline-block;
                transition:all 0.2s ease;
                transition-property: background, border, color;

                &:hover {
                    background:#ff0d0c;
                    border:1px solid #d50c0b;
                    color:#fff;
                }
            }
        }

        .checkbox {
            cursor: pointer;
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