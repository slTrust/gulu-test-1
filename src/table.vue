<template>
    <div class="gulu-table-wrapper">
        <table class="gulu-table" :class="{borderd,compact,striped}">
            <thead>
                <tr>
                    <th><input type="checkbox" @change="onChangeAllItems" ref="allChecked"></th>
                    <th v-if="numberVisible">#</th>
                    <th v-for="column in columns">
                        {{column.text}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item,index in dataSource">
                    <td>
                        <input type="checkbox" @change="onChangeItem(item,index,$event)"
                            :checked="inSelectedItems(item)"
                        >
                    </td>
                    <td v-if="numberVisible">{{index}}</td>
                    <template v-for="column in columns">
                        <td>{{item[column.field]}}</td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "GuluTable",
        props:{
            // 斑马纹
            striped:{
                type:Boolean,
                default:true
            },
            selectedItems:{
                type:Array,
                default:()=>[]
            },
            // 紧凑
            compact:{
                type:Boolean,
                default:false
            },
            columns:{
                type:Array,
                required:true
            },
            dataSource:{
                type:Array,
                required:true,
                validator(array){
                    // 要求记录必须有 id 这是 selected 的判断条件
                    return array.filter(item=> item.id === undefined).length > 0 ? false : true
                }
            },
            numberVisible:{
                type:Boolean,
                default:false
            },
            borderd:{
                type:Boolean,
                default: false
            }
        },
        watch:{
            // 设置半选
            selectedItems(){
                if(this.selectedItems.length === this.dataSource.length){
                    this.$refs.allChecked.indeterminate = false
                }else if(this.selectedItems.length === 0){
                    this.$refs.allChecked.indeterminate = false
                }else{
                    this.$refs.allChecked.indeterminate = true
                }
            }
        },
        methods:{
            inSelectedItems(item){
                return this.selectedItems.filter((i) => i.id===item.id).length>0;
            },
            onChangeItem(item,index,e){
                let selected = e.target.checked;
                let copy = JSON.parse(JSON.stringify(this.selectedItems))
                if(selected){
                    copy.push(item)
                }else{
                    copy.splice(copy.indexOf(item),1)
                }
                this.$emit('update:selectedItems',copy)
            },
            onChangeAllItems(e){
                let selected = e.target.checked;
                this.$emit('update:selectedItems',selected ? this.dataSource : [])
            }
        }
    }
</script>

<style scoped lang="scss">
    @import 'var';
    $grey:darken($grey,20%);
    .gulu-table{
        /*不要写 display:block; 因为里面的td不会扩张 建议width:100%*/
        width:100%;
        border-collapse: collapse;
        border-spacing: 0;
        border-bottom:1px solid $grey;
        &.borderd{
            border:1px solid $grey;
            td,th{
                border:1px solid $grey
            }
        }
        &.compact{
            td,th{
                padding:4px;
            }
        }
        &.striped{
            tbody{
                > tr{
                    &:nth-child(odd){
                        background: white;
                    }
                    &:nth-child(even){
                        background: lighten($grey,22%);
                    }
                }
            }
        }
        th,td{
            border-bottom:1px solid $grey;
            text-align: left;
            padding:8px;
        }
    }
</style>