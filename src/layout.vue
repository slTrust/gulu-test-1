<template>
    <div class="layout">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "layout"
    }
</script>

<style scoped lang="scss">
    .layout{
        display: flex;
        flex-direction: column;
        border:1px solid red;
    }
</style>