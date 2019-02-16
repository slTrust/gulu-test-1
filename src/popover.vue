<template>
    <div class="popover" @click.stop="xxx">
        <div ref="contentWrapper" class="content-wrapper" v-if="visable" @click.stop>
            <slot name="content" ></slot>
        </div>
        <span ref="triggerWrapper">
            <slot></slot>
        </span>
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
                        // 点击的瞬间将它 移动到 body里
                        document.body.appendChild(this.$refs.contentWrapper);
                        // 获取 span的 位置信息
                        let {height,width,left,top} = this.$refs.triggerWrapper.getBoundingClientRect();
                        this.$refs.contentWrapper.style.left = `${left + window.scrollX}px`;
                        this.$refs.contentWrapper.style.top = `${top + window.scrollY}px`; // 此时位置还是不对

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
    }
    .content-wrapper{
        position: absolute;
        border:1px solid red;
        box-shadow:0 0 3px rgba(0,0,0,0.5);
        transform: translateY(-100%);
    }
</style>