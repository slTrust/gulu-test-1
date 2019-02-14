<template>
    <div class="tabs-head">
        <slot></slot>
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
        }
    }
</script>

<style scoped lang="scss">
    $tab-height:40px;
    .tabs-head{
        display:flex;
        height:$tab-height;
        justify-content: flex-start;
        align-items: center;
        border:1px solid red;
        > .actions-wrapper{
            margin-left:auto;
        }
    }
</style>