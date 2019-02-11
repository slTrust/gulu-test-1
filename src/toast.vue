<template>
    <div class="toast">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluToast"
    }
</script>

<style scoped lang="scss">
    $font-size:14px;
    $toast-height:40px;
    $toast-bg:rgba(0,0,0,0.75);
    .toast{
        font-size: $font-size;
        height:$toast-height;
        background: $toast-bg;
        box-shadow: 0 0 3px 0 rgba(0,0,0,0.50);
        color:white;
        padding:0 16px;
        border-radius: 4px;
        position: fixed;
        top:0;
        left:50%;
        transform:translateX(-50%);

        line-height: 1.8;
        /* 文字居中最好就是 flex */
        display:flex;
        align-items: center;
    }
</style>