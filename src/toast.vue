<template>
    <div class="toast" ref="wrapper" :class="toastClasses">
        <div class="message">
            <slot v-if="!enableHtml"></slot>
            <div v-else v-html="$slots.default[0]"></div>
        </div>
        <div class="line" ref="line"></div>
        <span class="close" v-if="closeButton" @click="onClickClose">
            {{ closeButton.text }}
        </span>
    </div>
</template>

<script>
    export default {
        name: "GuluToast",
        props:{
            autoClose:{
                type:Boolean,
                default:true
            },
            autoCloseDelay:{
                type:Number,
                default:5
            },
            closeButton:{
                type:Object,
                default:()=>{
                    return {
                        text:'关闭',
                        callback:undefined
                    }
                }
            },
            enableHtml:{
                type:Boolean,
                default:false
            },
            position:{
                type:String,
                default:'top',
                validator(value){
                    return ['top','bottom','middle'].indexOf(value)>=0;
                }
            }
        },
        computed:{
            toastClasses(){
                return {
                    [`position-${this.position}`]:true
                }
            }
        },
        mounted(){
            this.execAutoClose();
            this.updateStyles();
        },
        methods:{
            execAutoClose(){
                if(this.autoClose){
                    setTimeout(()=>{
                        this.close()
                    }, this.autoCloseDelay*1000 )
                }
            },
            updateStyles(){
                // 为什么是0 呢？
                // 因为这个时候 style 只获取内联元素 不获取 css 元素
                // this.$refs.line.style.height = this.$refs.wrapper.style.height

                // 你应该用 getBoundingClientRect() 来获取 高度，但还是不行 要结合 vue 提供的 nextTick
                // this.$refs.line.style.height = this.$refs.wrapper.getBoundingClientRect().height
                this.$nextTick(()=>{
                    this.$refs.line.style.height = `${this.$refs.wrapper.getBoundingClientRect().height}px`;
                })
            },
            close(){
                this.$el.remove();
                // 一定要在 $destroy 之前
                this.$emit('close');
                this.$destroy();
            },
            log(){
                console.log(1);
            },
            onClickClose(){
                this.close();
                if(this.closeButton && typeof this.closeButton.callback === 'function'){
                    // 如果用户想调用 toast 组件里的 log 函数 就把this回传  this === toast 实例
                    this.closeButton.callback(this);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $font-size:14px;
    $toast-min-height:40px;
    $toast-bg:rgba(0,0,0,0.75);
    .toast{
        font-size: $font-size;
        min-height:$toast-min-height;
        background: $toast-bg;
        box-shadow: 0 0 3px 0 rgba(0,0,0,0.50);
        color:white;
        padding:0 16px;
        border-radius: 4px;
        position: fixed;
        left:50%;
        line-height: 1.8;
        /* 文字居中最好就是 flex */
        display:flex;
        align-items: center;

        .message{
            padding:8px 0;
        }
        .close{
            padding-left:16px;
            flex-shrink:0;
        }
        .line{
            border-left:1px solid #666;
            height:100%;
            margin-left:16px;
        }
        &.position-top{
            top:0;
            transform:translateX(-50%);
        }
        &.position-bottom{
            bottom:0;
            transform:translateX(-50%);
        }
        &.position-middle{
            top:50%;
            transform:translate(-50%,-50%);
        }
    }


</style>