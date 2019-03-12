<template>
    <div class="gulu-table-wrapper"  ref="wrapper">
        <div :style="{height,overflow:'auto'}">
            <table class="gulu-table" :class="{borderd,compact,striped}" ref="table">
                <thead>
                <tr>
                    <th><input type="checkbox" @change="onChangeAllItems" ref="allChecked" :checked="areAllItemsSelected"></th>
                    <th v-if="numberVisible">#</th>
                    <th v-for="column in columns" :key="column.field">
                        <div class="gulu-table-header">
                            {{column.text}}
                            <span v-if="column.field in orderBy" class="gulu-table-sorter" @click="changeOrderBy(column.field,'asc')">
                                <g-icon name="asc" :class="{active:orderBy[column.field] === 'asc'}"></g-icon>
                                <g-icon name="desc" :class="{active:orderBy[column.field] === 'desc'}"></g-icon>
                            </span>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item,index in dataSource" :key="item.id">
                    <td>
                        <input type="checkbox" @change="onChangeItem(item,index,$event)"
                               :checked="inSelectedItems(item)"
                        >
                    </td>
                    <td v-if="numberVisible">{{index}}</td>
                    <template v-for="column in columns" >
                        <td :key="column.field">{{item[column.field]}}</td>
                    </template>
                </tr>
                </tbody>
            </table>
        </div>
        <div  v-if="loading" class="gulu-table-loading">
            <g-icon name="loading"></g-icon>
        </div>
    </div>
</template>

<script>
    import GIcon from './icon'
    export default {
        name: "GuluTable",
        components:{GIcon},
        props:{
            height:{
                type:[Number,String]
            },
            orderBy:{
                type:Object,
                default:()=>{return {}},
            },
            loading:{
                type:Boolean,
                default:false
            },
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
        computed:{
            areAllItemsSelected(){
                const a = this.dataSource.map(item=>item.id).sort() // js 默认排序 字典序
                const b = this.selectedItems.map(item=>item.id).sort()
                let equal = true;
                if(a.length === b.length){
                    for(let i=0;i<a.length;i++){
                        if(a[i] !== b[i]){
                            equal = false
                            break
                        }
                    }
                    return equal

                }else{
                    return false
                }
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
        mounted(){
            let table2 = this.$refs.table.cloneNode(true);
            this.table2 = table2
            table2.classList.add('gulu-table-copy')
            this.$refs.wrapper.appendChild(table2)
            this.updateHeadersWidth()

            this.onWindowResize = ()=>{ this.updateHeadersWidth()}
            window.addEventListener('resize',this.onWindowResize)
        },
        beforeDestroy(){
            this.table2.remove()
            window.removeEventListener('resize',this.onWindowResize)
        },
        methods:{
            updateHeadersWidth(){
                let table2 = this.table2
                let tableHeader = Array.from(this.$refs.table.children).filter(node=>node.tagName.toLowerCase()==='thead')[0]
                let tableHeader2
                Array.from(table2.children).map(node=>{
                    if(node.tagName.toLowerCase() !== 'thead'){
                        node.remove()
                    }else{
                        tableHeader2 = node;
                    }
                })
                Array.from(tableHeader.children[0].children).map((th,i)=>{
                    const {width} = th.getBoundingClientRect()
                    tableHeader2.children[0].children[i].style.width = width + 'px'
                })
            },
            changeOrderBy(key){
                const copy = JSON.parse(JSON.stringify(this.orderBy))
                let oldValue = copy[key]
                if(oldValue === 'asc'){
                    copy[key] = 'desc'
                }else if (oldValue === 'desc'){
                    copy[key] = true
                }else{
                    copy[key] = 'asc'
                }
                this.$emit('update:orderBy',copy)
            },
            inSelectedItems(item){
                return this.selectedItems.filter((i) => i.id===item.id).length>0;
            },
            onChangeItem(item,index,e){
                let selected = e.target.checked;
                let copy = JSON.parse(JSON.stringify(this.selectedItems))
                if(selected){
                    copy.push(item)
                }else{
                    copy = copy.filter(i => i.id !==item.id)
                }
                this.$emit('update:selectedItems',copy)
            },
            onChangeAllItems(e){
                let selected = e.target.checked;
                this.$emit('update:selectedItems',selected ? this.dataSource : [])
            },

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
        &-sorter{
            display: inline-flex;
            flex-direction: column;
            margin:0 4px;
            svg{
                width: 10px;
                height: 10px;
                fill:$grey;
                cursor: pointer;
                &.active{
                    fill:red;
                }
                &:first-child{
                    position: relative;
                    bottom:-1px;
                }
                &:last-child{
                    position: relative;
                    top:-1px;
                }
            }
        }
        &-header{
            display: flex;
            align-items: center;
        }
        &-wrapper{
            position:relative;
            overflow: auto;
        }
        &-loading{
            position: absolute;
            top:0;
            left:0;
            width:100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255,255,255,0.8);
            svg{
                width:50px;
                height: 50px;
                @include spin
            }
        }
        &-copy{
            position: absolute;
            top:0px;
            left:0;
            width:100%;
            background: red;
        }
    }
</style>