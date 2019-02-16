<template>
    <div class="popover" @click="onCLick" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visable">
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
            positionContent(){
                document.body.appendChild(this.$refs.contentWrapper);
                // 获取 span的 位置信息
                let {height, width, left, top} = this.$refs.triggerWrapper.getBoundingClientRect();
                this.$refs.contentWrapper.style.left = `${left + window.scrollX}px`;
                this.$refs.contentWrapper.style.top = `${top + window.scrollY}px`; // 此时位置还是不对
            },
            onClickDocument(e){
                console.log('onCLick document')
                // 再次做判断 判断是点击的内容还是 点击的其他地方
                // 点击的 是 popover 里的内容区域就不管它
                console.log(this.$refs.popover)
                console.log(e.target)
                console.log(this.$refs.popover.contains(e.target))
                if(this.$refs.popover &&
                    (this.$refs.popover === e.target ||
                        this.$refs.popover.contains(e.target))
                ){return }
                this.close();
            },
            open(){
                this.visable = true;
                // 为什么有 $nextTick 不这样就会导致 popover出不来 因为点击后 visable = true 直接添加事件 然后 visable = false;
                this.$nextTick(() => {
                    this.positionContent();
                    document.addEventListener('click',this.onClickDocument)
                })
            },
            close(){
                this.visable = false;
                document.removeEventListener('click', this.onClickDocument)
            },
            onCLick(event){
                // 点击的 按钮
                if(this.$refs.triggerWrapper.contains(event.target)){
                    if(this.visable === true) {
                        console.log('close')
                        this.close();
                    }else{
                        console.log('open')
                        this.open();
                    }
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