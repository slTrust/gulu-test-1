<template>
    <div class="gulu-scroll-wrapper" ref="parent">
        <div ref="child" class="gulu-scroll">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:'GuluScroll',
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
                    // 只有不在边界的时候 组织
                    e.preventDefault();
                }
                child.style.transform = `translateY(${translateY}px)`;
            })
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
}
</style>