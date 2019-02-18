### Cascader级联选择

- [参考ant-design](https://ant.design/components/cascader-cn/)

- [数据源](https://github.com/airyland/china-area-data)


data数据如下

```
data:{
    source:[
        {name:"浙江",children:[
                {name:"杭州",
                 children:[
                     {name:"上城"},
                     {name:"下城"},
                     {name:"江干"}
                 ]},
                {name:"嘉兴",
                    children:[
                        {name:"南湖"},
                        {name:"秀洲"},
                        {name:"嘉善"}
                    ]},
               ]},
        {name:"福建",children:[
                {name:"福州",
                    children:[
                        {name:"鼓楼"},
                        {name:"台江"},
                        {name:"仓山"}
                    ]},
                ]},

    ]
},
```

index.html

```
<g-cascader :source="source"></g-cascader>
```

cascader.vue 

```
<template>
    <div class="cascader">
        <div class="trigger">
            <slot></slot>
        </div>
        <div class="popover">
            <div v-for="item in source">
                <div> {{item.name}} </div>
                <div v-for="item2 in item.children">
                    {{item2.name}}
                    <div v-for="item3 in item2.children">
                        {{item3.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluCascader",
        props:{
            source:{
                type:Array
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader{

    }
</style>
```

> #### 问题来了 

- 你怎么知道数据一定是三层

> #### 递归组件

cascader-item.vue

```
<template>
    <div class="cascaderItem">
        {{sourceItem.name}}
        <cascader-item v-for="item in sourceItem.children"
                    v-if="sourceItem.children"
                    :sourceItem="item"
        >
        </cascader-item>
    </div>
</template>

<script>
    const cascaderItem = {
        name: "cascaderItem",
        components:{
            cascaderItem:cascaderItem
        },
        props:{
            sourceItem:{
                type:Object
            }
        }
    }
    export default cascaderItem;
</script>

<style scoped>
    .cascaderItem{
        border:1px solid red;
        margin:10px;
    }
</style>
```

cascader.vue


```
<template>
    <div class="cascader">
        <div class="trigger">
            <slot></slot>
        </div>
        <div class="popover">
            <div v-for="item in source">
                <cascader-item :source-item="item"></cascader-item>
            </div>
        </div>
    </div>
</template>

<script>
    import CascaderItem from './cascader-item'
    export default {
        name: "GuluCascader",
        components:{
            CascaderItem
        },
        props:{
            source:{
                type:Array
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader{

    }
</style>
```

> name属性有个问题 如果你命名为 GuluCascaderItem 那么会报错

- 意思是如果你提供了名字 就可以按这个当作组件调用的名字
- 如果你在你的 template 里使用了跟你 name相同的标签那这个标签就是你自己

cascader-item.vue 改写后如下

```
<template>
    <div class="cascaderItem">
        {{sourceItem.name}}
        <gulu-cascader-item v-for="item in sourceItem.children"
                    v-if="sourceItem.children"
                    :sourceItem="item"
        >
        </gulu-cascader-item>
    </div>
</template>
<script>
    export default {
        name: "GuluCascaderItem",
        props:{
            sourceItem:{
                type:Object
            }
        }
    }
</script>
<style scoped>
    .cascaderItem{
        border:1px solid red;
        margin:10px;
    }
</style>
```