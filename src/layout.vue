<template>
    <div class="layout" :class="layoutClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "layout",
        data(){
            return{
                layoutClass:{
                    hasSider:false
                }
            }
        },
        created() {

        },
        mounted() {
            // 如果子组件有sider 就添加一个 class hasSider
            this.$children.forEach((vm)=>{
                if(vm.$options.name ==='GuluSider'){
                    this.layoutClass.hasSider = true
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .layout{
        /* 自己本身权重是占满剩余的，在嵌套的情况下 */
        flex-grow:1;
        display: flex;
        flex-direction: column;
        &.hasSider{
            /* 有sider 就是按照 横向排布 */
            flex-direction: row;
        }
    }
</style>