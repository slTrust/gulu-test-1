<template>
    <div class="cascaderItem" :style="{height:height}">
        <div>
            level:{{level}}
        </div>
        <div class="left">
            <div class="label" v-for="item in items" @click="onClickLabel(item)">
                {{item.name}}
                <icon class="icon" v-if="item.children" name="right"></icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-item :items="rightItems"
                                :height="height"
                                :level="level+1"
                                :selected="selected"
                                @update:selected="onUpdateSelected"
            ></gulu-cascader-item>
        </div>
    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        name: "GuluCascaderItem",
        components:{Icon},
        props:{
            items:{
                type:Array
            },
            height:{
                type:String
            },
            selected:{
                type:Array,
                default:()=>{return []}
            },
            level:{
                type:Number,
                default:0
            }
        },
        computed:{
            rightItems(){
                let currentSelected = this.selected[this.level];
                if(currentSelected && currentSelected.children){
                    return currentSelected.children;
                }else{
                    return null
                }
            }
        },
        methods:{
            onClickLabel(item){
                // this.selected = []
                // 直接这样赋值 是不生效的 this.selected[0]
                // this.selected[this.level] = item

                // 精髓
                // this.$set(this.selected,this.level,item)

                // 但是我们不能改 props 的数据 改props就是 垃圾
                // 要用 eventBus
                let copy = JSON.parse(JSON.stringify(this.selected));
                copy[this.level] = item;
                // 返回不包含后面层级的值
                /*
                var a = [1,2,3,4,5]
                    a.splice(3);
                    a <==> [1,2,3]

                */

                copy.splice(this.level + 1);
                this.$emit('update:selected',copy);
            },
            onUpdateSelected(newSelected){
                this.$emit('update:selected',newSelected)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascaderItem{
        display:flex;
        align-items: flex-start;
        justify-content: flex-start;
        height:100px;
        .left{
            padding:.3em 0;
        }
        .right{
            border-left:1px solid $border-color-light;
        }
        .label{
            padding: .3em 1em;
            display: flex;
            align-items: center;
            .icon{
                margin-left:1em;
                transform: scale(0.9);
            }
        }
    }
</style>