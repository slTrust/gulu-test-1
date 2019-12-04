<template>
    <div class="gulu-table-wrapper"  ref="wrapper">
        <div :style="{height,overflow:'auto'}" ref="tableWrapper">
            <table class="gulu-table" :class="{borderd,compact,striped}" ref="table">
                <thead>
                    <tr>
                        <th v-if="expendField" :style="{width:'50px'}" class="gulu-table-center">
                            <!-- 展开-->
                        </th>
                        <th v-if="checkable" :style="{width:'50px'}" class="gulu-table-center">
                            <input type="checkbox" @change="onChangeAllItems" ref="allChecked" :checked="areAllItemsSelected">
                        </th>
                        <th :style="{width:'50px'}" v-if="numberVisible" class="gulu-table-center">#</th>
                        <th :style="{width:column.width+'px'}" v-for="column in columns" :key="column.field">
                            <div class="gulu-table-header">
                                {{column.text}}
                                <span v-if="column.field in orderBy" class="gulu-table-sorter" @click="changeOrderBy(column.field,'asc')">
                                    <g-icon name="asc" :class="{active:orderBy[column.field] === 'asc'}"></g-icon>
                                    <g-icon name="desc" :class="{active:orderBy[column.field] === 'desc'}"></g-icon>
                                </span>
                            </div>
                        </th>
                        <th v-if="$scopedSlots.default" ref="actionsHeader"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item,index in dataSource" >

                        <tr :key="item.id">
                            <td v-if="expendField" :style="{width:'50px'}" class="gulu-table-center">
                                <!-- 展开-->
                                <g-icon class="gulu-table-expendIcon" name="right"
                                        @click="expendItem(item.id)"
                                />
                            </td>
                            <td v-if="checkable" :style="{width:'50px'}" class="gulu-table-center">
                                <input type="checkbox" @change="onChangeItem(item,index,$event)"
                                       :checked="inSelectedItems(item)"
                                >
                            </td>
                            <td :style="{width:'50px'}" v-if="numberVisible" class="gulu-table-center">{{index}}</td>
                            <template v-for="column in columns" >
                                <td :style="{width:column.width+'px'}" :key="column.field">
                                    <template v-if="column.render">
                                        <vnodes :vnodes="column.render({value: item[column.field]})"></vnodes>
                                    </template>
                                    <template v-else>
                                        {{item[column.field]}}
                                    </template>
                                </td>
                            </template>
                            <td v-if="$scopedSlots.default">
                                <!-- 代属性的插槽，用于传递值 -->
                                <div ref="actions" style="display:inline-block;">
                                    <slot :item="item"></slot>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="inExpendedIds(item.id)" :key="`${item.id}-expend`">
                            <td :colspan="columns.length + expendedCellColSpan">
                                {{item[expendField]||'--'}}
                            </td>
                        </tr>

                    </template>
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
        name: "GuluTablePro",
        components:{
            GIcon,
            Vnodes: {
                functional: true,
                render: (h, ctx) => ctx.props.vnodes
            }
        },
        data(){
            return{
                expendedIds:[], // 记录可展开列的id
                columns: []
            }
        },
        props:{
            expendField:{
                type:String,
            },
            height:{
                type:Number
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
            // columns:{
            //     type:Array,
            //     required:true
            // },
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
            },
            checkable:{
                type:Boolean,
                default:false
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
            },
            expendedCellColSpan(){
                let result = 0
                if(this.checkable){result += 1}
                if(this.expendField){result += 1}
                if(this.$scopedSlots.default){result += 1}
                return result
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
            this.columns = this.$slots.default.map(node => {
                // 遍历每个slot 找到它传递的 props数据
                let {text, field, width} = node.componentOptions.propsData
                let render = node.data.scopedSlots && node.data.scopedSlots.default
                return {text, field, width, render}
            });

            // 只复制 table 不复制table里的元素
            let table2 = this.$refs.table.cloneNode(false);
            this.table2 = table2
            table2.classList.add('gulu-table-copy')
            let tHead = this.$refs.table.children[0];
            // 拿到 thead的高度，设置到 原table的 margin-top
            let {height} = tHead.getBoundingClientRect()
            // 处理滚动条 让 实际的容器高度 根表格一致
            this.$refs.tableWrapper.style.marginTop = height + 'px'
            this.$refs.tableWrapper.style.height = this.height - height + 'px'
            table2.appendChild(tHead)
            this.$refs.wrapper.appendChild(table2)


            // 根据 slot 来控制是否显示 操作列
            /*
            console.log(this.$scopedSlots) // 含有scoped 的slot
            console.log(this.$slots) // 没有 scoped的 slot
            */
            if(this.$scopedSlots.default){
                let div = this.$refs.actions[0];
                let {width} = div.getBoundingClientRect();
                let parent = div.parentNode
                let styles = getComputedStyle(parent);
                let paddingLeft = styles.getPropertyValue('padding-left');
                let paddingRight = styles.getPropertyValue('padding-right');
                let borderLeft = styles.getPropertyValue('border-left-width');
                let borderRight = styles.getPropertyValue('border-right-width');
                console.log(styles.getPropertyValue('padding-left'))
                let width2 = parseInt(width) + parseInt(paddingLeft) + parseInt(paddingRight) + parseInt(borderLeft) + parseInt(borderRight)+'px'
                this.$refs.actionsHeader.style.width = width2
                this.$refs.actions.map(div=>{
                    div.parentNode.style.width = width2
                })
            }
        },
        beforeDestroy(){
            this.table2.remove()
        },
        methods:{
            expendItem(id){
                if(this.inExpendedIds(id)){
                    this.expendedIds.splice(this.expendedIds.indexOf(id),1)

                }else{
                    this.expendedIds.push(id)
                }
            },
            inExpendedIds(id){
                return this.expendedIds.indexOf(id)>=0
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
            background: white;
        }
        &-expendIcon{
            width: 10px;
            height: 10px;
        }
        /*
         & &-center 意思是 .gulu-table .gulu-table-center
        */
        & &-center{
            text-align: center;
        }
    }
</style>