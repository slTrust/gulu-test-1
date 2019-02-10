### 参考 

- https://ant.design/components/layout-cn/
- http://element-cn.eleme.io/#/zh-CN/component/container

> ant design 的layout里

```
<g-layout>
    <g-header></g-header>
    <g-content></g-content>
    <g-footer></g-footer>
</g-layout>
----------
|上       |
----------
|中       |
----------
|下       |
----------


<g-layout>
    <g-header></g-header>
    <g-layout>
        <g-sider></g-sider>
        <g-content></g-content>
    </g-layout>
    <g-footer></g-footer>
</g-layout>
------------
|上         |
------------
|侧|content |
------------
|下         |
-------------


<g-layout>
    <g-header></g-header>
    <g-layout>
        <g-content></g-content>
        <g-sider></g-sider>
    </g-layout>
    <g-footer></g-footer>
</g-layout>
------------
|上         |
------------
|contetn|侧 |
------------
|下         |
-------------


<g-layout>
    <g-sider></g-sider>
    <g-layout>
        <g-header></g-header>
        <g-content></g-content>
        <g-footer></g-footer>
    </g-layout>
</g-layout>

----|------------
----|上         |
----|------------
侧  |contetn    |
----|------------
----|下         |
----|-------------

```

> #### 创建四个组件


- layout.vue
- header.vue
- sider.vue
- content.vue
- footer.vue

```
// 其他vue组件 把 class修改为对应的 layout/header/sider/content/footer
<template>
    <div class="layout">
        <slot></slot>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
    .layout{
    }
</style>
```


> #### 实现第一个代码

```
indexa.html里

.demo{
    min-height:100px;
    border:1px solid #666;
}

// 细节 不推荐在组件内设置 高度 而是让使用者自己变高
// 所以在外层写上 style="100vh;"
<g-layout style="100vh;">
    <g-header class="demo"></g-header>
    <g-content class="demo"></g-content>
    <g-footer class="demo"></g-footer>
</g-layout>

----------------------------------
layout.vue里

.layout{
    display: flex;
    flex-direction: column;
    border:1px solid red;
} 
----------------------------------

content.vue里

.content{
    flex-grow: 1;
}
```

这样第一个例子就完成了

> #### 实现带侧边栏的上中下布局

```
<g-layout>
    <g-header></g-header>
    <g-layout>
        <g-sider></g-sider>
        <g-content></g-content>
    </g-layout>
    <g-footer></g-footer>
</g-layout>

// 我们之前 layout组件里是 纵向排列的。 
// 嵌套 layout时就要检测 是否组件内有 sider
```

> #### 组件内 name属性的作用

- 在vue-devtools里看组件名
- 在判断的时候 根据name来标识

精髓就是在子组件挂载的时候检测有没有 sider 如果有给父组件加一个样式

```
<template>
    <div class="layout" :class="layoutClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "layout",
        data(){
            return{
                layoutClass:{
                    hasSider:false
                }
            }
        },
        created() {

        },
        mounted() {
            // 如果子组件有sider 就添加一个 class hasSider
            this.$children.forEach((vm)=>{
                if(vm.$options.name ==='GuluSider'){
                    this.layoutClass.hasSider = true
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .layout{
        /* 自己本身权重是占满剩余的 */
        flex-grow:1;
        display: flex;
        flex-direction: column;
        border:1px solid red;
        &.hasSider{
            /* 有sider 就是按照 横向排布 */
            flex-direction: row;
        }
    }
</style>
```

> sider 在右边

```
<g-layout style="height:100vh;">
    <g-header class="demo">header</g-header>
    <g-layout>
        <g-content class="demo">content</g-content>
        <g-sider class="demo">sider</g-sider>
    </g-layout>
    <g-footer  class="demo">footer</g-footer>
</g-layout>
```

> sider 单独在左边，右边上中下

```
<g-layout style="height:100vh;">
    <g-sider class="demo">sider</g-sider>
    <g-layout>
        <g-header class="demo">header</g-header>
        <g-content class="demo">content</g-content>
        <g-footer  class="demo">footer</g-footer>
    </g-layout>
</g-layout>
```


### sider 可以关闭

- https://cn.vuejs.org/ 查看动画章节
- 给要动画的地方外面包一个 transition 标签 设置name="xxx" 
- 添加样式 .xxx-enter-active,.xxx-leave-active /.xxx-enter,.xxx-leave-to

```
<template>
    <transition name="slide">
        <div class="sider" v-if="visible">
            <slot></slot>
            <button @click="visible=false">close</button>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "GuluSider",
        data(){
            return{
                visible:true
            }
        },
        methods:{
        }
    }
</script>

<style scoped lang="scss">
    .sider{
        position:relative;
        > button{
            position: absolute;
            top:0;
            right:0;
        }
    }
    .slide-enter-active,.slide-leave-active{
        transition: all .5s;
    }
    .slide-enter,.slide-leave-to{
        margin-left:-200px
    }
</style>
```

- 有一个问题就是margin-left 不该是写死的(后期高级轮子解决这个问题)
- 现在唯一的办法就是用户自己添加一个类覆盖这个样式

index.html 里覆盖的写法

```
.sider{
    background: #333;
    width: 150px;
}
.sider.slide-enter,.sider.slide-leave-to{
    margin-left:-150px;
}

<g-layout style="height:100vh;">
    <g-sider>sider</g-sider>
    <g-layout>
        <g-header>header</g-header>
        <g-content>content</g-content>
        <g-footer>footer</g-footer>
    </g-layout>
</g-layout>
```

