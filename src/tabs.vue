<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluTabs",
        props:{
            selected:{
                type:String,
                required:true
            },
            direction:{
                type:String,
                default:'horizontal',
                validator(value){
                    return ['horizontal','vertical'].indexOf(value) >= 0;
                }
            }
        },
        created(){
            // 这个组件必须触发这个事件 才能让 sync 修饰符生效
            // this.$emit('undate:selected','xxx')
        }
    }
</script>

<style scoped>
    .tabs{

    }
</style>