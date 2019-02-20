<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable">
        </div>
        <div class="popover-wrapper" v-if="popoverVisable">
            <cascader-items :items="source" class="popover"
                            :height="popoverHeight"
                            :selected="selected"
                            @update:selected="onUpdateSelected"
            ></cascader-items>
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
            },
            popoverHeight:{
                type:String
            },
            selected:{
                type:Array,
                default:()=>{return []}
            }

        },
        data(){
            return{
                popoverVisable:false,
            }
        },
        methods:{
            onUpdateSelected(newSelected){
                // 传递给调用者
                this.$emit('update:selected',newSelected)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader{
        position: relative;
        .trigger{
            border:1px solid red;
            height: 32px;
            width: 100px;
        }
        .popover-wrapper{
            position: absolute;
            top:100%;
            left:0;
            background: white;
            display:flex;
            @extend .box-shadow;
            .label{
                white-space: nowrap;
            }
        }

    }
</style>