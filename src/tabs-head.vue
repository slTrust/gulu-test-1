<template>
    <div class="tabs-head">
        <slot></slot>
        <!-- 添加tabs功能按钮在这个插槽里 -->
        <slot name="actions"></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluTabsHead"
    }
</script>

<style scoped>
    .tabs-head{

    }
</style>