<template>
    <div class="sider" v-if="visible">
        <slot></slot>
        <button @click="visible=false">close</button>
    </div>
</template>

<script>
    export default {
        name: "GuluSider",
        data(){
            return{
                visible:true
            }
        },
        methods:{
        }
    }
</script>

<style scoped lang="scss">
    .sider{
        position:relative;
        > button{
            position: absolute;
            top:0;
            right:0;
        }
    }
</style>