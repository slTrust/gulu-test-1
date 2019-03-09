<template>
    <div class="g-nav-item" :class="{selected,vertical}" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNavItem",
        inject:['root','vertical'], //注入 祖先 这样就可以调用 root提供的方法
        props:{
            name:{
                type:String,
                required:true
            }
        },
        created(){
            this.root.addItem(this);
        },
        data(){
            return {
                selected:false
            }
        },
        methods:{
            onClick(){
                // 先清空 namePath 然后在更新它
                this.root.namePath = []
                // 点击时 主动调用父级的一个函数
                this.$parent.updateNamePath && this.$parent.updateNamePath();

                // 放到最后是为了保证数据是最新
                this.$emit('update:selected',this.name)

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .g-nav-item{
        padding: 10px 20px;
        position: relative;
        &:not(.vertical){
            &.selected{
                &::after{
                    content:'';
                    position: absolute;
                    bottom:0px;
                    left:0;
                    border-bottom:2px solid $blue;
                    width:100%;
                }
            }
        }
        &.vertical{
            &.selected{
                color:$blue;
            }
        }
    }
    a{
        color:inherit;
        text-decoration: none;
    }

    .g-sub-nav .g-nav-item{
        &:not(.vertical){
            &.selected{
                color:$color;
                background: $grey;
                &::after{
                    display: none;
                }
            }
        }

    }
</style>