<template>
    <div class="popover" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visable"
            :class="{[`position-${position}`]:true}"
        >
            <slot name="content" :close="close"></slot>
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
        props:{
            position:{
                type:String,
                default:'top',
                validator(value){
                    return ['top','bottom','left','right'].indexOf(value) >= 0
                }
            },
            trigger:{
                type:String,
                default:'click',
                validator(value){
                    return ['click','hover'].indexOf(value) >= 0
                }
            }
        },
        computed:{
            openEvent(){
                if(this.trigger==='click'){
                    return 'click'
                }else{
                    return 'mouseenter'
                }
            },
            closeEvent(){
                if(this.trigger==='click'){
                    return 'click'
                }else{
                    return 'mouseleave'
                }
            }

        },
        mounted(){
            if(this.trigger === 'click'){
                this.$refs.popover.addEventListener('click',this.onClick)
            }else{
                this.$refs.popover.addEventListener('mouseenter',this.open)
                this.$refs.popover.addEventListener('mouseleave',this.close)
            }
        },
        destroyed(){
            if(this.trigger === 'click'){
                this.$refs.popover.removeEventListener('click',this.onClick)
            }else{
                this.$refs.popover.removeEventListener('mouseenter',this.open)
                this.$refs.popover.removeEventListener('mouseleave',this.close)
            }
        },
        methods:{
            positionContent(){
                const {contentWrapper,triggerWrapper} = this.$refs;
                document.body.appendChild(this.$refs.contentWrapper);
                // 获取 span的 位置信息
                let {height, width, left, top} = triggerWrapper.getBoundingClientRect();
                let {height:height2} = contentWrapper.getBoundingClientRect();
                let positions = {
                    top :{
                        left : left + window.scrollX,
                        top : top + window.scrollY
                    },
                    bottom :{
                        left : left + window.scrollX,
                        top : top + height + window.scrollY
                    },
                    left :{
                        left:left + window.scrollX,
                        top:top  + window.scrollY + (height - height2) / 2
                    },
                    right :{
                        left:left + width + window.scrollX,
                        top:top  + window.scrollY + (height - height2) / 2
                    }
                }

                contentWrapper.style.left = positions[this.position].left + 'px';
                contentWrapper.style.top = positions[this.position].top + 'px';

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
            onClick(event){
                // 点击的 按钮
                if(this.$refs.triggerWrapper.contains(event.target)){
                    if(this.visable === true) {
                        this.close();
                    }else{
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
        }
        &.position-top{
            transform: translateY(-100%);
            margin-top:-10px;
            &::before,&::after{
                left:10px;
            }
            &::before{
                border-top-color:black;
                border-bottom:none;
                top:100%;
            }
            &::after{
                border-top-color:white;
                border-bottom:none;
                top:calc(100% - 1px);
            }
        }
        &.position-bottom{
            margin-top:10px;
            &::before,&::after{
                left:10px;
            }
            &::before{
                border-bottom-color:black;
                border-top:none;
                bottom:100%;
            }
            &::after{
                border-bottom-color:white;
                border-top:none;
                bottom:calc(100% - 1px);
            }
        }
        &.position-left{
            transform: translateX(-100%);
            margin-left:-10px;
            &::before,&::after{
                transform:translateY(-50%);
                border-right:none;
                top:50%;
            }
            &::before{
                border-left-color:black;
                border-right:none;
                left:100%;
            }
            &::after{
                border-left-color:white;
                left:calc(100% - 1px);
            }
        }
        &.position-right{
            margin-left:10px;
            &::before,&::after{
                transform:translateY(-50%);
                top:50%;
            }
            &::before{
                border-right-color:black;
                border-left:none;
                right:100%;
            }
            &::after{
                border-right-color:white;
                border-left:none;
                right:calc(100% - 1px);
            }
        }


    }
</style>