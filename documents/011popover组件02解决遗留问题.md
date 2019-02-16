### 解决 popover外层元素 使用 overflow:hidden问题

- 点击的瞬间，把vue内部的refs 组件移动到body里

```
<template>
    <div class="popover" @click.stop="xxx">
        <div ref="contentWrapper" class="content-wrapper" v-if="visable" @click.stop>
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
                        // 点击的瞬间将它 移动到 body里
                        document.body.appendChild(this.$refs.contentWrapper);
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

> #### 如何将body里的 contentWrapper 定位到按钮附近呢？

- slot不支持 设置 refs 我们只能外层包一个 span

```
<template>
    <div class="popover" @click.stop="xxx">
        <div ref="contentWrapper" class="content-wrapper" v-if="visable" @click.stop>
            <slot name="content" ></slot>
        </div>
        <span ref="triggerWrapper">
            <slot></slot>
        </span>
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
                        // 点击的瞬间将它 移动到 body里
                        document.body.appendChild(this.$refs.contentWrapper);
                        // 获取 span的 位置信息
                        let {height,width,left,top} = this.$refs.triggerWrapper.getBoundingClientRect();
                        this.$refs.contentWrapper.style.left = `${left}px`;
                        this.$refs.contentWrapper.style.top = `${top}px`; // 此时位置还是不对

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

> 此时位置没变

- 因为 style里的 scoped的 而且用的 scss
    ```
      .popover{
            ...
            .content-wrapper{
            }
        }
    ```
- 不用选择器嵌套，因为 .content-wrapper 会移到body下
    ```
    <style scoped lang="scss">
        .popover{
            display: inline-block;
            vertical-align: top;
            position: relative;
        }
        .content-wrapper{
            position: absolute;
            border:1px solid red;
            box-shadow:0 0 3px rgba(0,0,0,0.5);
            /* 控制高度 */
            transform: translateY(-100%);
        }
    </style>
    ```

> #### 此时有一个css 的坑

- 就是 position:absolute(是脱离文档的) 定位是相对body元素的 (如果有滚动条出现就有问题)
- popover弹出按钮 是相对于窗口算距离的
- 存在差值
- scrollY 有兼容问题(我们以后解决这个问题)

![](https://raw.githubusercontent.com/slTrust/note/master/gulu/g11_01.png)

```
this.$nextTick(()=>{
    // 点击的瞬间将它 移动到 body里
    document.body.appendChild(this.$refs.contentWrapper);
    // 获取 span的 位置信息
    let {height,width,left,top} = this.$refs.triggerWrapper.getBoundingClientRect();
    this.$refs.contentWrapper.style.left = `${left + window.scrollX}px`;
    this.$refs.contentWrapper.style.top = `${top + window.scrollY}px`; // 此时位置还是不对

    let eventHandler = ()=>{
        this.visable = false;
        console.log('document 隐藏 popover')
        document.removeEventListener('click',eventHandler)
    }

    document.addEventListener('click',eventHandler)
})
```