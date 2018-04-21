<template>
    <section class="search">
        <figure class="icon">
            <i class="fa fa-search"></i>
        </figure>
        <input :placeholder="placeholder || locale(langKeys.GENERIC_Search)" v-model="input" />
    </section>
</template>

<script>
    export default {
        data(){ return { input:'' }},
        methods: { emit(){ this.$emit('changed', this.input) } },
        props:['placeholder'],
        watch:{ input:function(){ this.emit(); }, }
    }
</script>

<style lang="scss">

    .search {
        height:30px;
        line-height:30px;
        background:#fff;
        overflow:hidden;
        padding:0 20px;
        border-bottom:1px solid #f9f9f9;
        transition:transform 0.5s ease;
        transform:translateY(0px);
        margin-top:1px;

        .icon {
            font-size:11px;
            color:#e4e4e4;
            width:18px;
            float:left;
        }

        input {
            background:transparent;
            border:0;
            outline:0;
            float:left;
            width:calc(100% - 18px);
            font-size:9px;
            font-family:'Open Sans',sans-serif;
            color:#000;
            opacity:0.4;
            height:29px;
        }
    }

</style>