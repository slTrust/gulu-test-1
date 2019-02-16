<template>
    <div class="popover" @click="onCLick" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visable">
            <slot name="content" ></slot>
        </div>
        <span ref="triggerWrapper" style="display:inline-block;">
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
                if(this.$refs.popover &&
                    (this.$refs.popover === e.target ||
                        this.$refs.popover.contains(e.target))
                ){return }
                if(this.$refs.contentWrapper &&
                    (this.$refs.contentWrapper === e.target ||
                        this.$refs.contentWrapper.contains(e.target))
                ){return}
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
    $border-color:#333;
    $border-radius:4px;
    .popover{
        display: inline-block;
        vertical-align: top;
        position: relative;
    }
    .content-wrapper{
        position: absolute;
        border:1px solid $border-color;
        border-radius: $border-radius;
        /* 用box-shadow 小三角就没阴影 */
        /*box-shadow:0 0 3px rgba(0,0,0,0.5);*/
        /* filter:drop-shadow()  但你要加背景色*/
        background: white;
        filter:drop-shadow(0 1px 1px rgba(0,0,0,0.5));
        transform: translateY(-100%);
        margin-top:-10px;
        padding:.5em 1em;
        /* 设置最大宽度防止一直撑开宽度 */
        max-width: 20em;
        /* 处理英文不换行问题 */
        word-break: break-all;
        /* popover箭头 */
        &::before,&::after{
            content:'';
            display:block;
            border:10px solid transparent;
            width: 0px;
            height: 0px;
            position: absolute;
            left:10px;
        }
        &::before{
            border-top-color:black;
            top:100%;
        }
        &::after{
            border-top-color:white;
            top:calc(100% - 1px);
        }
    }
</style>