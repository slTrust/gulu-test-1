### 如何tabs切换呢？

![](https://raw.githubusercontent.com/slTrust/note/master/gulu/g10_01.png)

```
我们的结构是树状的

数据是从上下的传递的，而vue父子组件通信 props 和 @event来监听传递

如果两层的树就导致 传播通过两次。太恶心了

如果通信有上有下——必然恶心。——而且如果最底层的兄弟要相互通信也是异常的繁琐
```

![](https://raw.githubusercontent.com/slTrust/note/master/gulu/g10_02.png)

> #### 改用 eventHub 来管理所有的事件

- 如果你在爷爷的组件身上加上一个属性 provide,那么它的所有子子孙孙后代就都可以访问到这个属性

tabs.vue

```
...

data(){
  return {
      eventBus: new Vue()
  }
},
provide(){
    return {
        eventBus: this.eventBus
    }
},

...
```

> 在后代中访问 要通过 inject 注入

在tabs.vue 的所有子组件里注入 provide 里提供的数据

```
<script>
    export default {
        inject:['eventBus'],
        created(){
            console.log(this.eventBus)
        }
    }
</script>
```

tabs-item.vue / tabs-pane.vue 里 监听事件 因为它们是有共同对应关系的

```
inject:['eventBus'],
created(){
    this.eventBus.$on('update:selected',( name )=>{
        console.log(name)
    })
},
```

tabs-item.vue 里 点击的时候触发 update:selected 事件

```
<template>
    <div class="tabs-item" @click="xxx">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluTabsItem",
        props:{
            disabled:{
                type:Boolean,
                default:false
            },
            name:{
                type:String|Number,
                default:true
            }
        },
        inject:['eventBus'],
        created(){
            this.eventBus.$on('update:selected',( name )=>{
                console.log(name)
            })
        },
        methods:{
            xxx(){
                this.eventBus.$emit('update:selected',this.name)
            }
        }
    }
</script>
```

> #### 问 此时如果 g-tabs 监听一个事件 @update:selected="yyy" yyy会触发吗？

- 不会
- vue的事件是不会冒泡的

- 因为点击 tabs-item 触发的 tabs.vue里 provide 里的 eventBus 的事件
    ```
    data(){
      return {
          eventBus: new Vue()
      }
    },
    provide(){
        return {
            eventBus: this.eventBus
        }
    },
    ```

> tabs 的 @update:selected="yyy" 应该由自己触发 就是 this.$emit('update:selected')

```
 <g-tabs :selected.sync="selectedTab" @update:selected="yyy">
    <!-- :selected.sync="selectedTab"是一个语法糖， 相当于下面这一行的效果 -->
    <!-- <g-tabs :selected="selectedTab" @update:selected="selectTab = $event" > -->
    <g-tabs-head>
        <template slot="actions">
            <button>设置</button>
        </template>
        <g-tabs-item name="woman">
            <g-icon name="settings"></g-icon>美女
        </g-tabs-item>
        <g-tabs-item name="finance" disabled>
            财经
        </g-tabs-item>
    </g-tabs-head>
    <g-tabs-body>
        <g-tabs-pane name="woman">美女相关信息</g-tabs-pane>
        <g-tabs-pane name="finance">财经相关信息</g-tabs-pane>
    </g-tabs-body>
</g-tabs>
```

### 框架的目的是什么

- 框住你的东西
- 让框架的 xx 写不出 垃圾代码
- 保证代码的平均质量

> #### angular 是真正的框架

- vue还在成为框架的途中
- angular花了很大的篇幅介绍 测试，意思就是不写测试就别写代码。测试没通过你就不该发布
    - [angular testing](https://angular.io/guide/testing)


> 为什么不推荐 改 props里的数据呢？

```
function fn(obj,n){
    obj.a = 1 // bad
    n = 2
    var number = n // good
    return obj
}
```
