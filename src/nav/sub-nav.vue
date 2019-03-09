<template>
    <div class="g-sub-nav" :class="{active}">
        <span @click="onClick">
            <slot name="title"></slot>
        </span>
        <!-- 此处不能用 v-if -->
        <div class="g-sub-nav-popover" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluSubNav",
        props:{
          name:{
              type:String,
              required:true
          }
        },
        data(){
            return {
                open:false,
                active:false
            }
        },
        methods:{
            onClick(){
                this.open = !this.open;
            },
            x(){
                console.log('x');
                this.active = true; //激活一下
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .g-sub-nav{
        position: relative;
        &.active{
            position: relative;
            &::after{
                content:'';
                position: absolute;
                bottom:0px;
                left:0;
                border-bottom:2px solid $blue;
                width:100%;
            }
        }
        > span{
            padding: 10px 20px;
            display: block;
        }
        &-popover{
            background: white;
            position: absolute;
            top:100%;
            left:0;
            margin-top:4px;
            white-space: nowrap;
            box-shadow: 0 0 3px fade_out(black,0.8);
            border-radius: $border-radius;
            color:$light-color;
            font-size: $font-size;
            min-width: 8em;
        }
    }
    .g-sub-nav .g-sub-nav .g-sub-nav-popover{
        top:0;
        left:100%;
        margin-left:8px;
    }
</style>