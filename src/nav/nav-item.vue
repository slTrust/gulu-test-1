<template>
    <div class="g-nav-item" :class="{selected}" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNavItem",
        inject:['root'], //注入 祖先 这样就可以调用 root提供的方法
        props:{
            name:{
                type:String,
                required:true
            }
        },
        created(){
            console.log(this.root)
            this.root.addItem(this);
        },
        data(){
            return {
                selected:false
            }
        },
        methods:{
            onClick(){
                this.$emit('add:selected',this.name)
            }
        }
    }
</script>

<style scoped lang="scss">
    .g-nav-item{
        padding: 10px 20px;
        &.selected{
            background: red;
        }
    }
</style>