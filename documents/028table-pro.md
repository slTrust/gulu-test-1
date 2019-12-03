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

