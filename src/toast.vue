<template>
    <div class="toast">
        <slot></slot>
        <div class="line"></div>
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
            }
        },
        mounted(){
            if(this.autoClose){
                setTimeout(()=>{
                    this.close()
                }, this.autoCloseDelay*1000 )
            }
        },
        methods:{
            close(){
                this.$el.remove();
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
    .close{
        padding-left:16px;
    }
    .line{
        border-left:1px solid #666;
        height:100%;
        margin-left:16px;
    }
</style>