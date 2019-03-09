<template>
    <div class="g-nav" :class="{vertical}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNav",
        provide(){
            // 注入祖先
            return {
                root:this,
                vertical:this.vertical
            }
        },
        props:{
            selected:{
                type:String,
            },
            vertical:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                items:[],
                namePath:[]
            }
        },
        updated(){
            // 即使 外层 selected.sync 接收到数据 但是 vm.selected  没变
            this.updateChildren()
        },
        mounted() {
            this.updateChildren()
            this.listenToChildren()
        },
        computed:{
            // 改用 依赖注入
            // items(){
            //     return this.$children.filter(vm=> vm.$options.name==='GuluNavItem')
            // }
        },
        methods:{
            // 用于 subNav 的多重嵌套的条件
            addItem(vm){
                this.items.push(vm)
            },
            updateChildren(){
                this.items.forEach(vm=>{
                    if(this.selected === vm.name){
                        vm.selected = true
                    }else{
                        vm.selected = false
                    }
                })
            },
            listenToChildren(){
                this.items.forEach(vm=>{
                    vm.$on('update:selected',(name)=>{
                        this.$emit('update:selected',name);
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .g-nav{
        display: flex;
        border-bottom: 1px solid $grey;
        color:$color;
        cursor: default;
        user-select: none;
        &.vertical{
            flex-direction: column;
            border: 1px solid $grey;
        }
    }
</style>