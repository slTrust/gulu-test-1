<template>
    <div class="gulu-sticky-wrapper" ref="wrapper" :style="{height}">
        <div class="gulu-sticky" :class="classes" :style="{height,left,width,top}">
            <slot></slot>
        </div>
    </div>

</template>

<script>
    export default {
        name: "GuluSticky",
        props:{
            distance:{
                type:Number,
                default:0
            }
        },
        data(){
            return {
                sticky:false,
                left:undefined,
                width:undefined,
                height:undefined,// 注意这里要是 undefined 而不是 0 因为是0就一开始生效了 ， style里 如果是 undefined 就不设置
                top:undefined,
                timerId:null
            }
        },
        created(){


        },
        mounted() {
            this.windowScrollHandler = this._windowScrollHandler.bind(this);
            window.addEventListener('scroll',this.windowScrollHandler)
        },
        beforeDestroy(){
            window.removeEventListener('scroll',this.windowScrollHandler);
        },
        computed:{
            classes(){
                return {
                    sticky:this.sticky
                }
            }
        },
        methods:{
            offsetTop(){
                let {top} = this.$refs.wrapper.getBoundingClientRect()
                return top + window.scrollY
            },
            _windowScrollHandler(){
                let top = this.offsetTop()
                if(window.scrollY > top - this.distance){
                    // 滚过去了
                    let {height,left,width} =  this.$refs.wrapper.getBoundingClientRect()
                    this.height = height + 'px';
                    this.left = left + 'px';
                    this.width = width + 'px';
                    this.top = this.distance + 'px';
                    this.sticky = true
                }else{
                    // 没滚过去了
                    this.height = undefined;
                    this.left = undefined;
                    this.width = undefined;
                    this.top = undefined;
                    this.sticky = false
                }
            }
        }

    }
</script>

<style scoped lang="scss">
    .gulu-sticky{
        &.sticky{
            background: red;
            position: fixed;
            /*left:0;*/
            /*top:0;*/
            /*width:100%;*/
        }
    }
</style>