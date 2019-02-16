### popover组件

- [参考element ui调用方式](http://element-cn.eleme.io/#/zh-CN/component/popover)
   ```
   <template>
     <el-popover
       placement="top-start"
       title="标题"
       width="200"
       trigger="hover"
       content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
       <el-button slot="reference">hover 激活</el-button>
     </el-popover>
   
     <el-popover
       placement="bottom"
       title="标题"
       width="200"
       trigger="click"
       content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
       <el-button slot="reference">click 激活</el-button>
     </el-popover>
   
     <el-popover
       ref="popover"
       placement="right"
       title="标题"
       width="200"
       trigger="focus"
       content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
     </el-popover>
     <el-button v-popover:popover>focus 激活</el-button>
   
     <el-popover
       placement="bottom"
       title="标题"
       width="200"
       trigger="manual"
       content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
       v-model="visible">
       <el-button slot="reference" @click="visible = !visible">手动激活</el-button>
     </el-popover>
   </template>
   ```
   
- 我们的组件这样简单的实现
    ```
    <div v-if="x" class="xxx"></div>
    <button @click="x=true">点我</button>
    
    难点在于 div 如何出现在 button 上面
    ```
    
> #### 如何让我们的 div和 button关联呢？

- 第一种思路通过slot包起来

```
<g-popover>
    <template slot="content">
        <div>hello</div>
    </template>
    <template slot="trigger">
        <button>点我</button>
    </template>
</g-popover>
```

- 第二个思路通过——指令（不过我不打算用这种）

```
<div ref="xxx"></div>
<button v-popover="$refs.xxx">点我</button>
```

### 初始化我们的 popover

- popover.vue

```
<template>
    <div class="popover" @click="xxx">
        <div class="content-wrapper" v-if="visable">
            <slot name="content" ></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluPopover",
        data(){
            return{
                visable:false
            }
        },
        methods:{
            xxx(){
                this.visable = !this.visable;
            }
        }
    }
</script>

<style scoped lang="scss">
    .popover{
        display: inline-block;
        vertical-align: top;
        position: relative;
        .content-wrapper{
            position: absolute;
            bottom:100%;
            left:0;
            border:1px solid red;
            box-shadow:0 0 3px rgba(0,0,0,0.5);
        }
    }
</style>
```

- index.html

```
<g-popover>
    <template slot="content">
        <div>popover内容1</div>
    </template>
    <template>
        <button>点我</button>
    </template>
</g-popover>
```
   
