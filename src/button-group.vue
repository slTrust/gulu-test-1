<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
    .g-button-group{
        display:inline-flex;
        vertical-align: middle;
        > .g-button{
            border-radius: 0;
            /*
             如果不是第一个元素，左边框就没
             此时导致了一个bug 就是 hover的时候 会导致只剩下三个方向的边框
            */

            &:not(:first-child){border-left:none;}

            &:first-child{
                border-top-left-radius: var(--border-radius);
                border-bottom-left-radius: var(--border-radius);
            }
            &:last-child{
                border-top-right-radius: var(--border-radius);
                border-bottom-right-radius: var(--border-radius);
            }
        }
    }
</style>