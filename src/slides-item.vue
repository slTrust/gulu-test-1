<template>
    <transition name="slide">
        <div class="g-slides-item" v-if="visible" :class="{reverse}">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        props:{
            name:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                selected:undefined,
                reverse:false // 是否倒叙
            }
        },
        computed:{
            visible(){
                return this.selected === this.name
            }
        }
    }
</script>

<style scoped lang="scss">
    .g-slides-item {
    }
    .slide-leave-active{
        position: absolute;
        left:0;
        top:0;
        height: 100%;
        width: 100%;
    }
    .slide-enter-active, .slide-leave-active{
        transition: all 0.5s;
    }
    /* 进来在右边 100% */
    .slide-enter{
        transform: translateX(100%);
    }
    /* 出去在左边 -100% */
    .slide-leave-to{
        transform: translateX(-100%);
    }

    .slide-enter.reverse{
        transform: translateX(-100%);
    }
    .slide-leave-to.reverse{
        transform: translateX(100%);
    }


</style>