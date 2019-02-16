<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="line" ref="line"></div>
        <!-- 添加tabs功能按钮在这个插槽里 -->
        <div class="actions-wrapper">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluTabsHead",
        inject:['eventBus'],
        created(){
            this.eventBus.$on('update:selected',(item,vm)=>{
                console.log(item,vm)
                // console.log(vm.$el.getBoundingClientRect())
            })
        }
    }
</script>

<style scoped lang="scss">
    $tab-height:40px;
    $blue:blue;
    .tabs-head{
        display:flex;
        height:$tab-height;
        justify-content: flex-start;
        border:1px solid red;
        position:relative;
        > .line{
            position:absolute;
            bottom:0;
            border-bottom:1px solid $blue;
            width:100px;
        }
        > .actions-wrapper{
            margin-left:auto;
        }
    }
</style>