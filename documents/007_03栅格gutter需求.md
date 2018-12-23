### gutter 

每个 col 之间有固定的距离

![](https://raw.githubusercontent.com/slTrust/note/master/gulu/g07_02.png)


> 细节

- 上次我们用offset实现了 偏移使用的 margin-left
- 所以这时 col 里 就不能用 margin 我们用 padidng

> #### 我们先拿一个 固定值 10px先实现基本逻辑

```
<template>
    <div class="col" :class="[`col-${span}`,offset && `offset-${offset}`]">
        <div style="border:1px solid green;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluCol",
        props:{
            span:{
                type:[Number,String]
            },
            offset:{
                type:[Number,String]
            }
        }
    }
</script>

<style scoped lang="scss">
    .col{
        height: 100px;
        background: grey;
        width:50%;
        border:1px solid red;
        padding:0 10px;
    }

    $class-prefix: col-;

    @for $n from 1 through 24 {

        &.#{$class-prefix}#{$n} {
            width:($n/24) * 100%;
        }
    }

    $class-prefix: offset-;

    @for $n from 1 through 24 {

        &.#{$class-prefix}#{$n} {
            margin-left:($n/24) * 100%;
        }
    }
</style>
```

这样每个 col 就有左右10px 的 padding 

- col 之间距离为 20px

> 此时有问题：
 
- 最左边的 col 多10px 
- 最右边的 col 多10px 

> 我们在 row 上 加上 margin:0 -10px; 

这样就中和掉了 边界多出的 padding


### 理清思路后 我们决定给 row 加一个属性 gutter

```
<g-row gutter="20">
    <g-col span="4">4</g-col>
    <g-col span="20">20</g-col>
</g-row>
```

row.vue

```
<template>
    <div class="row" :style="{marginLeft:gutter/2+'px',marginRight:gutter/2+'px'}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluRow",
        props:{
            gutter:{
                type:[Number,String]
            }
        }
    }
</script>

<style scoped lang="scss">
    .row{
        display: flex;
    }
</style>
```

> 但是如何让row 知道 gutter这个值呢

总不能这样挨个传递吧？

```
<g-row gutter="20">
    <g-col span="4" gutter="20">4</g-col>
    <g-col span="20" gutter="20">20</g-col>
</g-row>
```


> #### 通过 row 把 gutter 传递给 col

新的问题？ row 里使用的是 slot 根本不知道里面是啥？


#### Vue 的钩子函数

> 在 row.vue里 添加 钩子 ，打印它子节点

```
created() {
    console.log(this.$children)
}

// 很遗憾竟然是空的 ，但是点击后 里面是有 col组件的
```

添加 mounted 钩子

```
created() {
    console.log(this.$children)
}
mounted() {
    console.log(this.$children)
}

// mounted 里 打印出来了 row 里的children
```

> created 和 mounted的区别

- created 是创建这个对象，但是并没有把这个对象放到页面里
- mounted 把这个对象，放入到页面里

> 实验一下

```
// row.vue里
created() {
    console.log('row created')
}
mounted() {
    console.log('row mounted')
}

// col.vue里
created() {
    console.log('col created')
}
mounted() {
    console.log('col mounted')
}


结果如下
row created
col created
col mounted
row mounted
```

意思就是 如果 row mounted 说明 row 的子子孙孙都已经挂在 row身上了

结论就是

- 你可以在 row 的 mounted 里 操作它的 子子孙孙

> #### 修改我们的 row 和 col

row.vue

```
<template>
    <div class="row" :style="{marginLeft:-gutter/2+'px',marginRight:-gutter/2+'px'}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluRow",
        props:{
            gutter:{
                type:[Number,String]
            }
        },
        created() {
            console.log('row created')
        },
        mounted() {
            console.log('row mounted')
            console.log(this.$children)
            this.$children.forEach((vm) => {
                vm.gutter = this.gutter;
            })
        }
    }
</script>

<style scoped lang="scss">
    .row{
        display: flex;
    }
</style>
```

col.vue

```
<template>
    <div class="col" :class="[`col-${span}`,offset && `offset-${offset}`]"
        :style="{paddingLeft:-gutter/2+'px',paddingRight:-gutter/2+'px'}"
    >
        <div style="border:1px solid green;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluCol",
        props:{
            span:{
                type:[Number,String]
            },
            offset:{
                type:[Number,String]
            },
            gutter:{
                type:[Number,String]
            }
        },
        created() {
            console.log('col created')
        },
        mounted() {
            console.log('col mounted')
        }
    }
</script>
<style scoped lang="scss">
    .col{
        height: 50px;
        background: grey;
        width:50%;
        border:1px solid red;
    }

    $class-prefix: col-;

    @for $n from 1 through 24 {

        &.#{$class-prefix}#{$n} {
            width:($n/24) * 100%;
        }
    }

    $class-prefix: offset-;

    @for $n from 1 through 24 {

        &.#{$class-prefix}#{$n} {
            margin-left:($n/24) * 100%;
        }
    }
</style>
```

> 虽然实现了，但是这样会有一个警告出来

```
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "gutter"

// 意思是最好不要这样做，你应该用 data 而不是 props
this.$children.forEach((vm) => {
    vm.gutter = this.gutter;
})
```

> 改善 col.vue 将 props 里的gutter 修改到 data 里

```
export default {
    name: "GuluCol",
    props:{
        span:{
            type:[Number,String]
        },
        offset:{
            type:[Number,String]
        },
    },
    data(){
       return {
           gutter:0
       }
    },
}
```