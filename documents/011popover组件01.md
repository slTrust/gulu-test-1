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
   

> #### 监听点击事件来控制 popover显示隐藏

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
                if(this.visable === true){
                    // 为什么有 $nextTick 不这样就会导致 popover出不来 因为点击后 visable = true 直接添加事件 然后 visable = false;
                    this.$nextTick(()=>{
                        document.body.addEventListener('click',()=>{
                            this.visable = false;
                        })
                    })

                }
            }
        }
    }
</script>
。。。
```

> #### 第二个问题 在 点我 下方的区域点击 popover 不消失

- 因为body的高度没有被撑开 自己加 border看看
- 监听 document

```
document.addEventListener('click',()=>{
    this.visable = false;
})
```

> #### 第三个问题 点击显示 popover 关闭后 再次点击按钮 popover 不出来了

- 因为此时你添加了两次事件
- 意思就是你每次点击都会给 document 添加一个点击事件
- removeEventListener('事件',函数名)


```
this.$nextTick(()=>{
    let eventHandler = ()=>{
        this.visable = false;
        document.removeEventListener('click',eventHandler)
    }
    document.addEventListener('click',eventHandler)
})
```

> #### 点击 popover 里的显示信息该不该消失?

- 不该
- 因为别人可能想复制里面的文本
- 还有一个问题事件冒泡  连续点击  点我 按钮
    ```
    会触发 按钮的事件
    还会冒泡 document 的事件
    所以事件监听要改
    <template>
        <div class="popover" @click.stop="xxx">
            <div class="content-wrapper" v-if="visable" @click.stop>
                <slot name="content" ></slot>
            </div>
            <slot></slot>
        </div>
    </template>
    ```
    
#### 最基础版本的 popover

```
<template>
    <div class="popover" @click.stop="xxx">
        <div class="content-wrapper" v-if="visable" @click.stop>
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
                if(this.visable === true){
                    // 为什么有 $nextTick 不这样就会导致 popover出不来 因为点击后 visable = true 直接添加事件 然后 visable = false;
                    this.$nextTick(()=>{
                        let eventHandler = ()=>{
                            this.visable = false;
                            console.log('document 隐藏 popover')
                            document.removeEventListener('click',eventHandler)
                        }

                        document.addEventListener('click',eventHandler)
                    })
                }else{
                    console.log('vm 隐藏 popover')
                }
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

> #### 遗留几个问题

- popover 应该是配置的事件  有可能是 hover /click/mouseover
- popover 里的 content内容 不该放在 组件结构里 如果组件外面容器设置了 overflow:hidden 就会导致看不到了
    ```
    <div id="app">
        <!-- popover -->
        <div style="padding:5px;overflow:hidden;">
            <g-popover>
                <template slot="content">
                    <div>popover内容1</div>
                </template>
                <template>
                    <button>点我</button>
                </template>
            </g-popover>
        </div>
    </body>
    ```


