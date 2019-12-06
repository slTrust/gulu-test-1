<template>
    <div class="gulu-scroll-wrapper" ref="parent" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <div ref="child" class="gulu-scroll">
            <slot></slot>
        </div>
        <div class="gulu-scroll-track" v-show="scrollBarVisible">
            <div class="gulu-scroll-bar" ref="bar">
                <div class="gulu-scroll-bar-inner"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'GuluScroll',
        data(){
            return {
                scrollBarVisible: false,
                isScrolling: false,
            }
        },
        mounted(){
            let parent = this.$refs.parent;
            let child = this.$refs.child;
            
            let translateY = 0;
            let {height:childHeight} = child.getBoundingClientRect();
            let {height:parentHeight} = parent.getBoundingClientRect();
            let {borderTopWidth,borderBottomWidth,paddingTop,paddingBottom} = window.getComputedStyle(parent)
            borderTopWidth = parseInt(borderTopWidth);
            borderBottomWidth = parseInt(borderBottomWidth);
            paddingTop = parseInt(paddingTop);
            paddingBottom = parseInt(paddingBottom);
            let maxHeight = childHeight - parentHeight + (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom);
            // 注意这里 mac 和 win 是反的，我这里只考虑mac了
            parent.addEventListener('wheel',(e)=>{
                // 限速
                if(e.deltaY > 20){
                    translateY -= 20 * 3    
                }else if(e.deltaY < -20){
                    translateY -= -20 * 3    
                }else{
                    translateY -= e.deltaY * 3
                }
                if(translateY > 0){
                    translateY = 0;
                }else if(translateY < -maxHeight){
                    translateY = -maxHeight
                }else{
                    // 只有不在边界的时候 阻止
                    e.preventDefault();
                }
                child.style.transform = `translateY(${translateY}px)`;
                this.updateScrollBar(parentHeight,childHeight,translateY);
            })
        },
        methods:{
            updateScrollBar (p,c,t) {
                let parentHeight = p
                let childHeight = c
                /*
                等比数列
                    barHeight / parentHeight =  parentHeight / childHeight
                */
                this.barHeight = parentHeight * parentHeight / childHeight
                this.$refs.bar.style.height = this.barHeight + 'px'

                // 滚动距离
                /*
                    滚动条上滚动的距离 / parentHeight = 实际滚动的距离 / childHeight
                */
                let y = parentHeight * Math.abs(t) / childHeight
                this.$refs.bar.style.transform = `translateY(${y}px)`;
            },
            onMouseEnter () {
                this.scrollBarVisible = true
            },
            onMouseLeave () {
                this.scrollBarVisible = false;
            },
        }
    }
</script>

<style scoped lang="scss">
.gulu-scroll{
    transition: transform 0.05s ease;
    &-wrapper {
      overflow: hidden;
      position: relative;
    }
    &-track{
        position: absolute;
        width:14px;
        top:0;
        right:0;
        height:100%;
        background: #FAFAFA; 
        border-left: 1px solid #E8E7E8; 
        opacity: 0.9;
    }
    &-bar{
        position: absolute;
        top:-1px;
        left: 50%;
        height: 40px;
        width: 8px;
        margin-left:-4px;
        padding: 4px 0;
        &-inner {
            height: 100%; border-radius: 4px; background: #C2C2C2;
            &:hover {
                background: #7D7D7D;
            }
        }
    }
}
</style>