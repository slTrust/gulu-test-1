<template>
    <div class="g-slides" @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave"
         @touchstart="onTouchStart"
         @touchmove="onTouchMove"
         @touchend="onTouchEnd"
    >
        <div class="g-slides-window" ref="window">
            <div class="g-slides-wrapper">
                <slot></slot>
            </div>
        </div>
        <div class="g-slides-dots">
            <span @click="select(selectedIndex - 1 )">
                <g-icon name="left"></g-icon>
            </span>
            <span v-for="n in childrenLength" :class="{active:selectedIndex === n - 1}"
                  :key="n" :data-index="n-1"
                  @click="select(n-1)"

            >
                {{n}}
            </span>
            <span @click="select(selectedIndex + 1 )">
                <g-icon name="right"></g-icon>
            </span>
        </div>
    </div>
</template>

<script>
    import GIcon from '../icon'
    export default {
        components:{GIcon},
        props:{
            selected:{
                type:String
            },
            autoPlay:{
                type:Boolean,
                default:true
            },
            autoPLayDelay:{
                type:Number,
                default:3000
            }
        },
        data(){
            return{
                childrenLength:0,
                lastSelectedIndex:undefined,
                timerId:undefined,
                startTouch:undefined
            }
        },
        mounted() {
            // 只能获取组件的 html
            // console.log(this.$children)
            // el可以获取所有html 我们就可以继续操作了  但是不推荐 因为这是原声 DOM API 用它就用不了 vue的红利
            // console.log(this.$el.children)

            //直接修改 props 会得到警告 迫不得已 将slide-item里的visible 由 props 换成 data

            this.updateChildren();
            if(this.autoPlay){
                this.playAutomatically();
            }
            this.childrenLength = this.items.length
        },
        updated() {
            // 更新的时候 告诉 item 选中的变了
            this.updateChildren()
        },
        computed:{
            selectedIndex(){
                let index = this.names.indexOf(this.selected)
                return index === -1 ? 0 : index
            },
            names(){
                return this.items.map(vm => vm.name);
            },
            items(){
                return this.$children.filter(vm=>vm.$options.name === 'GuluSlidesItem')
            }
        },
        methods:{
            onMouseEnter(){
                this.pause();
            },
            onMouseLeave(){
                this.playAutomatically()
            },
            onTouchStart(e){
                this.pause()
                console.log('开始摸')
                this.startTouch = e.touches[0];
            },
            onTouchMove(){
                console.log('边摸边动')
            },
            onTouchEnd(e){
                let endTouch = e.changedTouches[0]
                let {clientX:x1,clientY:y1} = this.startTouch;
                let {clientX:x2,clientY:y2} = endTouch;

                // 根据射影定理 直角三角形 边对应关系
                let distance = Math.sqrt( Math.pow(x2-x1,2) + Math.pow(y2-y1,2) )
                // y轴的差距
                let deltaY = Math.abs(y2-y1);
                let rate = distance / deltaY;
                if(rate > 2){
                    console.log('在滑我')
                    if(x2 > x1){
                        console.log('右')
                        this.select(this.selectedIndex - 1);
                    }else{
                        console.log('左')
                        this.select(this.selectedIndex + 1);
                    }
                }else{
                    console.log('在翻页')
                }

                this.$nextTick(()=>{
                    this.playAutomatically()
                })
            },
            playAutomatically(){

                // 老手不用setInterval
                // setInterval(()=>{
                //     if(index === names.length){
                //         index = 0
                //     }
                //     this.$emit('update:selected',names[index+1])
                //     index++;
                // },3000)
                if(this.timerId){ return }
                let run = ()=>{
                    let index = this.names.indexOf(this.getSelected())
                    let newIndex = index + 1
                    this.select(newIndex) // 告诉外界选中 newIndex
                    this.timerId = setTimeout(()=>{ run() },this.autoPLayDelay)
                }
                this.timerId = setTimeout(run,this.autoPLayDelay)
            },
            pause(){
                window.clearTimeout(this.timerId);
                this.timerId = undefined
            },
            select(newIndex){
                this.lastSelectedIndex = this.selectedIndex
                if(newIndex === -1){ newIndex = this.names.length - 1}
                if(newIndex === this.names.length){ newIndex = 0 }
                this.$emit('update:selected',this.names[newIndex]);
            },
            getSelected(){
                let first = this.items[0]
                return this.selected || first.name;
            },
            updateChildren(){
                let selected = this.getSelected();
                this.items.forEach((vm)=>{
                    let reverse = this.selectedIndex > this.lastSelectedIndex ? false : true
                    if(this.timerId){
                        if(this.lastSelectedIndex === this.items - 1 && this.selectedIndex ===0 ){
                            reverse = false
                        }
                        if(this.lastSelectedIndex === 0 && this.selectedIndex === this.items.length - 1 ){
                            reverse = true
                        }
                    }
                    vm.reverse = reverse
                    this.$nextTick(()=>{
                        vm.selected = selected
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.g-slides{
    /* 继承前缀 */
    &-window{ overflow: hidden; }
    &-wrapper{ position: relative; }
    &-dots{
        padding:8px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        > span{
            width:20px;
            height: 20px;
            border-radius: 50%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background: #ddd;
            margin:0 8px;
            font-size: 12px;
            &.hover{
                cursor: pointer;
            }
            &.active{
                background: black;
                color:white;
                &:hover{
                    cursor: default;
                }
            }
        }
    }
}
</style>