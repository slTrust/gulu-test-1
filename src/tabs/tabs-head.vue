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
        mounted(){
            this.eventBus.$on('update:selected',(item,vm)=>{
                let {width,height,top,left} = vm.$el.getBoundingClientRect();
                this.$refs.line.style.width = `${width}px`;
                // left 是无法做3d 加速的
                this.$refs.line.style.left = `${left}px`;
                // transform 是可以 3d加速的 ，但是由于我们改了宽度 所以加不加速都很慢
                // this.$refs.line.style.transform = `translateX(${left}px)`;
            })
        }
    }
</script>

<style scoped lang="scss">
    $tab-height:40px;
    $blue:blue;
    $border-color:#ddd;
    .tabs-head{
        display:flex;
        height:$tab-height;
        justify-content: flex-start;
        position:relative;
        border-bottom:1px solid $border-color;
        > .line{
            position:absolute;
            bottom:0;
            border-bottom:1px solid $blue;
            transition: all 350ms;
        }
        > .actions-wrapper{
            margin-left:auto;
            display: flex;
            align-items: center;
            justify-content: center;
            padding:0 1em;
        }
    }
</style>