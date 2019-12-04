### 升级的table组件 table-pro

- 让 table 每一格都可以自定义
- 如果 table 有10000条数据怎么办？

#### 需求:如果做到 td里渲染的是一个 标签 / button 而不是单纯的文本

我们之前的写法是这样渲染内容的

```
<template v-for="column in columns" >
    <td :style="{width:column.width+'px'}" :key="column.field">{{item[column.field]}}</td>
</template>
```

无法做到跟 react一样 传递一个组件

> 另辟蹊径：[vue jsx](https://cn.vuejs.org/v2/guide/render-function.html)

官网里有一部分是说 jsx 的 其中有一个是通过 render 函数来自定义渲染内容

废话少说：抄它代码试一下

demo-jsx.vue

```
<script>
    export default {
        name:'demo-jsx',
        render(createElement) {
            return createElement(
                'h1',   // 标签名称
                '标题' , // text
            )
        }
    }
</script>
```

但是这样写非常痛苦！！！

如果是这样的内容

```
<h1>
    你好<span>hello</span>
</h1>

// 你就要这样写

createElement(
                'h1',   // 标签名称
                 [
                 '你好',
                 createElement('span','hello')
                 ],
            )
```

> [JSX 使用文档](https://github.com/vuejs/jsx#installation)

- 基本看完文档，jsx的所有语法就都会了

demo-jsx.vue

```
// 注意这样要写成 lang="jsx" 否则语法会飙红
<script lang="jsx">
    export default {
        name:'demo-jsx',
        // 这样的参数要写成 h 否则也报错
        render(h) {
            return (
                <h1>
                    你好
                    <span>hello</span>
                </h1>
            );
        }
    }
</script>
```

- 你还可以定义样式

```
<script lang="jsx">
    export default {
        name:'demo-jsx',
        data(){
            return {
                n:123,
                items:[1,2,3,4,5]
            }
        },
        render( h ){
            return (
                // 注意这里是 class 如果是 react就是 className
                <div class="xxx">
                    {this.n > 10 ?<h1>大</h1>:<h6>小</h6>}
                    <ul>
                        {this.items.map(i =>{
                            return <li>{i}</li>
                        })}
                    </ul>
                </div>
            )
        }
    }
</script>
<style scoped lang="scss">
    .xxx{
        color:red;
    }
</style>
```

#### 想用 jsx 改写我们的 table 但是并不现实

- 因为只要用了 jsx那么之前的许多 `v-if / ref /:style 属性绑定`等都不能使用了
- 这意味着：我们要整个重写我们的table才可以。

> 为什么要研究这个写法呢？刚好可以说一下 react 和 vue 的区别

**用vue就是难写一点**

- 去看下 [ant-design](https://ant.design) 的table组件
    ```
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
    ```
    - react一开始就是 jsx
    - 它直接给你个 render 函数 你可以自己定义渲染的内容
        - 可以做到在 tags 里参杂子标签
        - 你用 vue 就不行
        - 这就是它**表达能力**胜于 vue 写组件的原因
- 再去看下 [element-ui](https://element.eleme.cn) 的table组件
    ```
    <el-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
    ```
    - 这也是很多人说 element-ui 不好的原因
        - 其实 element-ui 不好,而是vue表达能力不够
    - 不是说 vue 做不到，
        - 可以做到 但是会要求使用你库的人必须使用 jsx 语法表达想要的东西
        - 其次，我们要把我们的table都重写才行！！！
    - 而 vue 的主流是不用 jsx

#### slots的一些问题

我们想学习element-ui的方式 写一个插槽传递进入 table里

```
<g-table
    ... >
    <!-- 我们以插槽的方式写入到标签上 -->
    <g-table-column text="姓名" field="name" :width=100></g-table-column>
    <g-table-column text="分数" field="score"></g-table-column>
</g-table>
```

> 如何在 table.vue里使用这个插槽呢？

table.vue里

```
<template>
    <div class="gulu-table-wrapper"  ref="wrapper">
        <slot/>
    </div>
</template>


在 mounted 函数里

如果写了 slot
console.log(this.$slots.default) // 就是我们写的两个 table-column
console.log(this.$children) // 就是我们写的两个 table-column


如果不写 slot
<template>
    <div class="gulu-table-wrapper"  ref="wrapper">

    </div>
</template>
console.log(this.$slots.default) // 就是我们写的两个 table-column
console.log(this.$children) // 就是 [] 空数组
```

**插槽和子组件的关系就是看你有没有在父组件里写<slot/>**


> 试图渲染我们传递的slot

```
<g-table
         :data-source="dataSource"
         :order-by.sync="orderBy"
         borderd
         @update:orderBy="x"
         :loading="loading"
         :height="400"
         expend-field="description"
         checkable
         :selected-items.sync="selected">
    <g-table-column text="姓名" field="name" :width=100>
        <template slot-scope="props">
            <a href="">{{props.value}}</a>
        </template>
    </g-table-column>
    <g-table-column text="分数" field="score">
        <template slot-scope="props">
            <a href="">{{props.value}}</a>
        </template>
    </g-table-column>
</g-table>
```

table.vue里

```
<template>
<table class="gulu-table">
    ...
    <tbody>
        <template v-for="item,index in dataSource" >
        <!--  我们试图这样渲染传递进来的 column template -->
            <tr :key="item.id">
                <template v-for="column in columns" >
                    <td :style="{width:column.width+'px'}" :key="column.field">
                        {{column.render?column.render({value:item[column.field]}):item[column.field]}}
                    </td>
                </template>
                ...
            </tr>
        </template>
    </tbody>
</table>
</template>

<script>
    import GIcon from './icon'
    export default {
        name: "GuluTablePro",
        components:{GIcon},
        data(){
            return{
                expendedIds:[], // 记录可展开列的id
                columns: []
            }
        },
        props:{
            // 注释掉以前的 props的 columns
            // columns:{
            //     type:Array,
            //     required:true
            // },
        },
        mounted(){
            this.columns = this.$slots.default.map(node => {
                // 遍历每个slot 找到它传递的 props数据
                let {text, field, width} = node.componentOptions.propsData
                // table-column 里的  <template slot-scope="props"> 不传递就是 undefined
                let render = node.data.scopedSlots && node.data.scopedSlots.default
                return {text, field, width, render}
            })
            console.log(this.columns)

            // 这是模拟的数据 可以看到有标签但是无法渲染
            let result = this.columns[0].render({value: 'aaa'})
            console.log(result)
            return;
            ...
        },
    }
</script>
```

> #### google 搜索[vue show vnode in template](https://stackoverflow.com/questions/49352525/can-you-render-vnodes-in-a-vue-template)

得到答案

```
<some-component>
  <div slot-scope="{ vnodes }">
    <vnodes :vnodes="vnodes"/>
  </div>
</some-component>


components: {
  Vnodes: {
    functional: true,
    render: (h, ctx) => ctx.props.vnodes
  }
}
```

最后成功搞定 代码 table-pro.vue

```
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
                // table-column 里的  <template slot-scope="props"> 不传递就是 undefined
                let render = node.data.scopedSlots && node.data.scopedSlots.default
                return {text, field, width, render}
            })
            console.log(this.columns)

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
```

demo-table.vue

```
<template>
    <div style="margin:20px;">
        {{selected}}
        <g-table
                 :data-source="dataSource"
                 :order-by.sync="orderBy"
                 borderd
                 @update:orderBy="x"
                 :loading="loading"
                 :height="400"
                 expend-field="description"
                 checkable
                 :selected-items.sync="selected">
            <template slot-scope="xxx">
                <!--
                slot-scope="xxx"
                就是 slot里传递的属性 xxx.item
                -->
                <button @click="edit(xxx.item)">编辑</button>
                <button @click="view(xxx.item)">查看</button>
            </template>
            <g-table-column text="姓名" field="name" :width=100>
                <template slot-scope="props">
                    <a href="">{{props.value}}</a>
                </template>
            </g-table-column>
            <g-table-column text="分数" field="score">
                <template slot-scope="props">
                    <a href="">{{props.value}}</a>
                </template>
            </g-table-column>
        </g-table>

    </div>
</template>

<script>
    import DJsx from './demo-jsx'
    import GTable from './table-pro';
    import GTableColumn from './table-column'

    export default {
        components:{
            GTable,DJsx,GTableColumn
        },
        data(){
            return {
                loading:false,
                selected:[],
                columns:[
                    // {text:'姓名',field:'name',sort:'asc',width:100},
                    // {text:'分数',field:'score',sort:'desc'},
                ],
                orderBy:{ // true 开启排序， 但是不确定 asc desc
                    name:true,
                    score:'desc'
                },
                dataSource:[
                    {id:1,name:'张三',score:100,description:'xxxx xxxx'},
                    {id:2,name:'李四',score:99,description:'xxxx xxxx'},
                    {id:3,name:'王五',score:100,description:'xxxx xxxx'},
                    {id:4,name:'赵六',score:99,description:'xxxx xxxx'},
                    {id:5,name:'张三',score:100,description:'xxxx xxxx'},
                    {id:6,name:'李四',score:99,description:'xxxx xxxx'},
                    {id:7,name:'王五',score:100,description:'xxxx xxxx'},
                    {id:8,name:'赵六',score:99,description:'xxxx xxxx'},
                    {id:9,name:'张三',score:100,description:'xxxx xxxx'},
                    {id:10,name:'李四',score:99,description:'xxxx xxxx'},
                    {id:11,name:'王五',score:100,description:'xxxx xxxx'},
                    {id:12,name:'赵六',score:99,description:'xxxx xxxx'},
                    {id:13,name:'张三',score:100,description:'xxxx xxxx'},
                    {id:14,name:'李四',score:99,description:'xxxx xxxx'},
                    {id:15,name:'王五',score:100,description:'xxxx xxxx'},
                    {id:16,name:'赵六',score:99,description:'xxxx xxxx'},
                    {id:17,name:'张三',score:100,description:'xxxx xxxx'},
                    {id:18,name:'李四',score:99,description:'xxxx xxxx'},
                ]
            }
        },
        methods:{
            x(value){
                // 监听排序事件
                // api/users?score='desc'
                // ajax(url,orderBy).then(
                //     (res)=>{
                //         this.dataSource = res.data
                //     }
                // )

                console.log(value);
                this.loading = true
                setTimeout(()=>{
                    this.dataSource = this.dataSource.sort((a,b)=> a.score - b.score)
                    this.loading = false;
                },500)
                // 我们模拟一下
            },
            edit(item){
                alert(`开始编辑${item.id}`)
            },
            view(item){
                alert(`开始查看${item.id}`)
            }
        }
    }
</script>

<style>
    *{margin:0;padding:0;box-sizing:border-box;}
</style>
```

### 总结

一开始我们想要把 name 从文本变成 a 标签

> table.vue代码 以前第一版我们通过 props 传递一个 columns JS对象来去渲染

- 导致我们无法渲染我们想要的 标签，不然你就要定义各种奇奇怪怪的方法 形如最上面的 render函数 那样很麻烦
- 因为这不是 react 无法直接传递 标签

> table-pro.vue 是我们的升级版

- 学习 element-ui ,把原来的 props 里的 columns JS对象移除了，变成 vue的插槽
- 最重要的一点是：在 table-pro.vue 的 mounted 里 我们需要自己把 传递进来的 slot 做转化
    ```
    this.columns = this.$slots.default.map(node => {
        // 遍历每个slot 找到它传递的 props 数据
        let {text, field, width} = node.componentOptions.propsData
        // table-column 里的  <template slot-scope="props"> 不传递就是 undefined
        let render = node.data.scopedSlots && node.data.scopedSlots.default
        return {text, field, width, render}
    })
    ```
    - render是什么？就是看你想不想 自定义显示，如果是：需要你这样定义
        ```
        <g-table-column text="姓名" field="name" :width=100>
            <template slot-scope="props">
                <a href="">{{props.value}}</a>
            </template>
        </g-table-column>
        ```
    - 然后我们的 render无法正常渲染，通过google 搜索 解决了 渲染问题

> 瞬间羡慕 react 的规定

- 通过 render 一行代码来渲染子标签
- 而 vue 要做如此复杂的处理,因为 vue的主流就是 template


