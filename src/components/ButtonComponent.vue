<template>
    <button v-on:click="emit" :class="{'margined':margined, 'blue':isBlue, 'red':isRed, 'half':half}">
        {{text}}
    </button>
</template>

<script>
    export default {
        methods: { emit(){ this.$emit('clicked') } },
        props:['icon', 'text', 'margined', 'isBlue', 'isRed', 'half']
    }
</script>

<style lang="scss">
    button {
        cursor: pointer;
        width:100%;
        height:50px;
        border:1px solid #eaeaea;
        border-radius:4px;
        background:transparent;
        text-align:center;
        font-family:'Raleway', sans-serif;
        font-size:18px;
        color:#656565;
        text-shadow:0 1px 0 rgba(255,255,255,1);
        outline:0;
        box-shadow:inset 0 0 0 rgba(0,0,0,0);
        transition:all 0.2s ease;
        transition-property: border, background, color, box-shadow;

        &.half {
            width:calc(50% - 5px);
            display:inline-block;
            font-size:14px;

            &:last-child {
                margin-left:6px;
            }
        }

        &:hover {
            /*box-shadow:inset 0 0 50px rgba(0,0,0,0.05);*/
            background:#fff;
            border:1px solid rgba(0,0,0,0.1);
        }

        &:active {
            box-shadow:inset 0 1px 3px rgba(0,0,0,0.2), inset 0 0 55px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,1);
            background:rgba(0,0,0,0.03);
            color:rgba(0,0,0,0.5);
            border:0 solid rgba(0,0,0,0.1);
        }

        &.margined {
            margin-top:10px;
        }

        &.blue {
            border:1px solid #54a7fc;
            color:#54a7fc;
            text-shadow:0 !important;

            &:hover {
                background:#54a7fc;
                color:#fff;
                border:0 solid #54a7fc;
                text-shadow:0 !important;
            }

            &:active {
                text-shadow:0 !important;
            }
        }

        &.red {
            border:1px solid #ff0d0c;
            color:#ff0d0c;

            &:hover {
                background:#ff0d0c;
                color:#fff;
                border:0 solid #ff0d0c;
            }
        }
    }
</style>