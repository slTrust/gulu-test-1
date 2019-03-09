<template>
    <div class="g-sub-nav" :class="{active}" v-click-outsite="close">
        <span class="g-sub-nav-label" @click="onClick">
            <slot name="title"></slot>
            <span class="g-sub-nav-icon" :class="{open}">
                <g-icon name="right"></g-icon>
            </span>
        </span>

        <!-- 此处不能用 v-if -->
        <div class="g-sub-nav-popover" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import ClickOutsite from '../click-outside'
    import GIcon from '../icon'
    export default {
        name: "GuluSubNav",
        directives:{ClickOutsite},
        components:{GIcon},
        inject:['root'],
        props:{
          name:{
              type:String,
              required:true
          }
        },
        data(){
            return {
                open:false,
            }
        },
        computed:{
            active(){
                return this.root.namePath.indexOf(this.name) >= 0 ? true : false
            }
        },
        methods:{
            onClick(){
                this.open = !this.open;
            },
            updateNamePath(){
                // 不管父亲有木有 x 都要存name
                this.root.namePath.unshift(this.name);
                // 继续去找父级
                if(this.$parent.updateNamePath){
                    this.$parent.updateNamePath()
                }else{

                }
            },
            close(){
                this.open = false;
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
        &-label{
            padding: 10px 20px;
            display: block;
        }
        &-icon{
            display: none;
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
    .g-sub-nav .g-sub-nav {
        &.active{
            &::after{
               display: none;
            }
        }
        .g-sub-nav-popover{
            top:0;
            left:100%;
            margin-left:8px;
        }
        /* 二级菜单才可见 展开收起 */
        .g-sub-nav-label{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .g-sub-nav-icon {
            display: inline-flex;
            margin-left: 1em;
            svg{fill:$light-color;}
            transition: transform 250ms;
            &.open{
                transform:rotate(180deg);
            }
        }
    }
</style>