<template>
    <div class="g-slides">
        <div class="g-slides-window" ref="window">
            <div class="g-slides-wrapper">
                <slot></slot>
            </div>
        </div>
        <div class="g-slides-dots">
            <span v-for="n in childrenLength" :class="{active:selectedIndex === n - 1}"
                @click="select(n-1)"
            >
                {{n-1}}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            selected:{
                type:String
            },
            autoPlay:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return{
                childrenLength:0,
                lastSelectedIndex:undefined
            }
        },
        mounted() {
            // 只能获取组件的 html
            // console.log(this.$children)
            // el可以获取所有html 我们就可以继续操作了  但是不推荐 因为这是原声 DOM API 用它就用不了 vue的红利
            // console.log(this.$el.children)

            //直接修改 props 会得到警告 迫不得已 将slide-item里的visible 由 props 换成 data

            this.updateChildren();
            this.playAutomatically();
            this.childrenLength = this.$children.length
        },
        updated() {
            // 更新的时候 告诉 item 选中的变了
            this.updateChildren()
        },
        computed:{
            selectedIndex(){
                return this.names.indexOf(this.selected) || 0;
            },
            names(){
                return this.$children.map(vm => vm.name);
            }
        },
        methods:{
            playAutomatically(){
                let index = this.names.indexOf(this.getSelected())

                // 老手不用setInterval
                // setInterval(()=>{
                //     if(index === names.length){
                //         index = 0
                //     }
                //     this.$emit('update:selected',names[index+1])
                //     index++;
                // },3000)

                let run = ()=>{
                    let newIndex = index - 1
                    if(newIndex === -1){ newIndex = this.names.length - 1}
                    if(newIndex === this.names.length){ newIndex = 0 }
                    this.select(newIndex)
                    setTimeout(()=>{ run() },3000)
                }
                // setTimeout(run,3000)
            },
            select(index){
                this.lastSelectedIndex = this.selectedIndex
                this.$emit('update:selected',this.names[index]);
            },
            getSelected(){
                let first = this.$children[0]
                return this.selected || first.name;
            },
            updateChildren(){
                let selected = this.getSelected();
                this.$children.forEach((vm)=>{
                    vm.reverse = this.selectedIndex > this.lastSelectedIndex ? false : true
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
    border:1px solid black;
    /* 继承前缀 */
    &-window{
        overflow: hidden;
    }
    &-wrapper{
        position: relative;
    }
    &-dots{
        > span{
            &.active{
                background: red;
            }
        }
    }
}
</style>