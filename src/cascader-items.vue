<template>
    <div class="cascaderItem" :style="{height: height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="onClickLabel(item)">
                <span class="name">{{item.name}}</span>
                <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <icon class="loading" name="loading"></icon>
          </template>
          <template v-else>
            <!-- 判断是否是叶子节点  如果是动态加载就判断isLeaf 否则 判断children -->
            <icon class="next" v-if="rightArrowVisible(item)" name="right"></icon>
          </template>
        </span>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-item ref="right" :items="rightItems" :height="height"
                                 :loading-item="loadingItem"
                                 :load-data="loadData"
                                 :level="level+1" :selected="selected" @update:selected="onUpdateSelected"></gulu-cascader-item>
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
            },
            loadData:{
                type:Function
            },
            loadingItem:{
                type:Object,
                default:()=>({})
            }
        },
        computed:{
            rightItems(){
                if(this.selected && this.selected[this.level]){
                    let selected = this.items.filter((item)=>{
                        return item.name === this.selected[this.level].name
                    })
                    if(selected && selected[0].children && selected[0].children.length > 0){
                        return selected[0].children
                    }
                }
                // computed 依赖的 selected 和 level 没有变 那么就不会更新 即使数据是错的
                // let currentSelected = this.selected[this.level];
                // if(currentSelected && currentSelected.children){
                //     return currentSelected.children;
                // }else{
                //     return null
                // }
            },
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
            },
            rightArrowVisible(item){
                return this.loadData? !item.isLeaf : item.children

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
            overflow: auto;
            height: 100%;
        }
        .right{
            border-left:1px solid $border-color-light;
            height: 100%;
        }
        .label{
            padding: .5em 1em;
            display: flex;
            align-items: center;
            cursor:pointer;
            white-space: nowrap;
            &:hover{
                background: $grey;
            }
            > .name{
                margin-right: 1em;
                user-select:none;
            }
            .icons{
                margin-left:auto;
                .next{ transform: scale(0.9);}
                .loading{
                    animation: spin 2s infinite linear;
                }
            }
        }
    }
</style>