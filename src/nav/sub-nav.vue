<template>
    <div class="g-sub-nav" :class="{active}" v-click-outsite="close">
        <span class="g-sub-nav-label" @click="onClick">
            <slot name="title"></slot>
            <span class="g-sub-nav-icon" :class="{open}">
                <g-icon name="right"></g-icon>
            </span>
        </span>
        <template v-if="vertical">
            <transition @enter="enter" @leave="leave" @after-leave="afterLeave" @after-enter="afterEnter">
                <!-- 此处不能用 v-if -->
                <div class="g-sub-nav-popover" v-show="open" :class="{vertical}">
                    <slot></slot>
                </div>
            </transition>
        </template>
        <template v-else>
            <div class="g-sub-nav-popover" v-show="open">
                <slot></slot>
            </div>
        </template>


    </div>
</template>

<script>
    import ClickOutsite from '../click-outside'
    import GIcon from '../icon'
    export default {
        name: "GuluSubNav",
        directives:{ClickOutsite},
        components:{GIcon},
        inject:['root','vertical'],
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
            },
            enter(el,done){
                let {height} = el.getBoundingClientRect() // 此时不是0
                el.style.height = 0; // 还原为0
                el.getBoundingClientRect()
                el.style.height = `${height}px`
                // 如果你用同步的方式对一个css进行设置 那么不管你中间使用了多少次，浏览器会把所有的结果只记下最后一次
                // 这样就没有动画了

                // done() 立刻调用 done导致动画瞬间完成
                el.addEventListener('transitionend',()=>{
                    done()
                })
            },
            leave(el,done){
                let {height} = el.getBoundingClientRect() // 此时不是0
                el.style.height = `${height}px`
                el.getBoundingClientRect()
                el.style.height = 0;
                // done() 立刻调用 done导致收缩动画瞬间完成
                el.addEventListener('transitionend',()=>{
                    done()
                })
            },
            afterLeave(el){
                // 必须要有这个动画 因为 sub-nav可能还有子菜单 因为上面高度写死了 120 导致 子菜单显示不了
                el.style.height = 'auto';
            },
            afterEnter(el){
                // 必须要有这个动画 因为 sub-nav可能还有子菜单 因为上面高度写死了 120 导致 子菜单显示不了
                el.style.height = 'auto';
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .x-enter-active, .x-leave-active {
    }
    .x-enter, .x-leave-to /* .fade-leave-active below version 2.1.8 */ {
    }
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
            &.vertical{
                position: static;
                border-radius: 0;
                border:none;
                box-shadow: none;
                transition: height 250ms;
                overflow: hidden;
            }
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