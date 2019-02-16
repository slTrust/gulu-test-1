<template>
    <div class="popover" @click.stop="xxx">
        <div class="content-wrapper" v-if="visable" @click.stop>
            <slot name="content" ></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluPopover",
        data(){
            return{
                visable:false
            }
        },
        methods:{
            xxx(){
                this.visable = !this.visable;
                if(this.visable === true){
                    // 为什么有 $nextTick 不这样就会导致 popover出不来 因为点击后 visable = true 直接添加事件 然后 visable = false;
                    this.$nextTick(()=>{
                        let eventHandler = ()=>{
                            this.visable = false;
                            console.log('document 隐藏 popover')
                            document.removeEventListener('click',eventHandler)
                        }

                        document.addEventListener('click',eventHandler)
                    })
                }else{
                    console.log('vm 隐藏 popover')
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .popover{
        display: inline-block;
        vertical-align: top;
        position: relative;
        .content-wrapper{
            position: absolute;
            bottom:100%;
            left:0;
            border:1px solid red;
            box-shadow:0 0 3px rgba(0,0,0,0.5);
        }
    }
</style>