<template>
    <div class="g-nav">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNav",
        props:{
            selected:{
                type:Array,
                default:() => [] //默认返回空数组
            },
            multiple:{
                type:Boolean,
                default:false
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
            items(){
                return this.$children.filter(vm=> vm.$options.name==='GuluNavItem')
            }
        },
        methods:{
            updateChildren(){
                this.items.forEach(vm=>{
                    if(this.selected.indexOf(vm.name)>=0){
                        vm.selected = true
                    }else{
                        vm.selected = false
                    }
                })
            },
            listenToChildren(){
                this.items.forEach(vm=>{
                    vm.$on('add:selected',(name)=>{
                        if(this.multiple){
                            //多选
                            if(this.selected.indexOf(name)<0){
                                // 深拷贝
                                let copy = JSON.parse(JSON.stringify(this.selected))
                                copy.push(name);
                                this.$emit('update:selected',copy);
                            }
                        }else{
                            // 单选
                            this.$emit('update:selected',[name]);
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .g-nav{
        display: flex;
        border:1px solid red;
    }
</style>