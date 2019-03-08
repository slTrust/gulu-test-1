<template>
    <div class="g-sub-nav">
        <span @click="onClick">
            <slot name="title"></slot>
        </span>
        <!-- 此处不能用 v-if -->
        <div class="g-sub-nav-popover" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluSubNav",
        data(){
            return {
                open:false
            }
        },
        methods:{
            onClick(){
                this.open = !this.open;
            }
        }
    }
</script>

<style scoped lang="scss">
    .g-sub-nav{
        position: relative;
        > span{
            padding: 10px 20px;
            display: inline-block;
            vertical-align: top;
        }
        &-popover{
            position: absolute;
            top:100%;
            left:0;
            border:1px solid red;
            white-space: nowrap;
        }

    }
</style>