<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        mounted() {
            /*
                解决智障用户  非往 group里 放 非 g-button元素
            */
            for( let node of this.$el.children ){
                let name = node.nodeName.toLowerCase();
                if( name !== 'button'){
                    console.warn(`g-button-group 的子元素 应该是g-button ,但是你写的是${name}`);
                }
            }

        }
    }
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
             &:not(:first-child){border-left:none;}
             使用 margin负值
             在hover的瞬间 z-index增加权重
            */
            &:not(:first-child){
                /* 不是第一个元素才有margin负值 */
                margin-left:-1px;
            }
            &:first-child{
                border-top-left-radius: var(--border-radius);
                border-bottom-left-radius: var(--border-radius);
            }
            &:last-child{
                border-top-right-radius: var(--border-radius);
                border-bottom-right-radius: var(--border-radius);
            }

            &:hover{
                position: relative;
                z-index: 1;
            }
        }
    }
</style>