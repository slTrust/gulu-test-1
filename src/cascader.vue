<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable">
        </div>
        <div class="popover" v-if="popoverVisable">
            <cascader-items :items="source"></cascader-items>
        </div>
    </div>
</template>

<script>
    import CascaderItems from './cascader-items'
    export default {
        name: "GuluCascader",
        components:{
            CascaderItems
        },
        props:{
            source:{
                type:Array
            }
        },
        data(){
            return{
                popoverVisable:false,
                level1Selected:null,
                level2Selected:null,
            }
        },
        computed:{
            level2Item(){
                if(this.level1Selected){
                    return this.level1Selected.children
                }else{
                    return []
                }
            },
            level3Item(){
                if(this.level2Selected){
                    return this.level2Selected.children
                }else{
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader{
        .trigger{
            border:1px solid red;
            height: 32px;
            width: 100px;
        }
        .popover{
            border:2px solid green;
            height: 200px;
            display:flex;
            .label{
                white-space: nowrap;
            }
        }

    }
</style>