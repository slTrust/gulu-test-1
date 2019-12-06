### Scroll组件

```
<template>
    <div style="margin:20px;">
        
        <div class="parent">
            <div class="child">
                p{$}*100
                <p>1</p>
                ...
                <p>100</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style>
    *{margin:0;padding:0;box-sizing:border-box;}
    .parent{
        height: 400px;
        overflow: auto;
        width:480px;
        border:1px solid red;
    }
    .child{
        border:1px solid green;
    }
</style>
```

overflow:auto 里面的 `.child 会滚动` 但是有难看的滚动条

> 不想看见滚动条怎么办

```
overflow: hidden; // 但是这样要改为监听用户的滚动事件
```

> 监听用户的滚动事件

```
<template>
    <div style="margin:20px;">
        
        <div class="parent" ref="parent">
            <div class="child" ref="child">
                <p>1</p>
                ...
                <p>100</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            let parent = this.$refs.parent;
            let child = this.$refs.child;
            parent.addEventListener('scroll',()=>{
                console.log(1)
            })
            
        },
    }
</script>

<style>
    *{margin:0;padding:0;box-sizing:border-box;}
    .parent{
        height: 400px;
        overflow: hidden;
        width:480px;
        border:1px solid red;
    }
    .child{
        border:1px solid green;
    }
</style>
```

我试图监听 parent的滚动事件，但是没有生效

这是因为你把滚动条禁用了，所有监听不到 **scroll**

**一旦禁用了滚动条就没有了scroll事件**

#### 监听 滚轮事件，如果是手机就监听 touchmove 事件

- 监听滚轮事件 wheel,注意在手机上没有滚轮事件
- 在手机上要监听 touchmove

```
mounted(){
    let parent = this.$refs.parent;
    let child = this.$refs.child;
    parent.addEventListener('touchmove',()=>{
        console.log('touchmove')
    })

    parent.addEventListener('wheel',()=>{
        console.log('wheel')
    })
    
},
```

> 我们暂时只处理 PC端

```
// 通过打印信息
parent.addEventListener('wheel',(e)=>{
    console.log('wheel')
    console.log(e) // wheelEvent 对象 里面有个 deltaY 就是 纵方向的滚动距离
})
```

- **注意 mac和 window 的滚动是相反的**
- 我这里只考虑 mac了就

#### 简陋版 scroll

```
<template>
    <div style="margin:20px;">
        
        <div class="parent" ref="parent">
            <div class="child" ref="child">
                <p>1</p>
                ...
                <p>100</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            let parent = this.$refs.parent;
            let child = this.$refs.child;
            
            let translateY = 0;
            child.style.transition = `transform 1s`;
            
            // 注意这里 mac 和 win 是反的，我这里只考虑mac了
            parent.addEventListener('wheel',(e)=>{
                // 上滚
                if(e.deltaY > 0){
                    console.log('上')
                    translateY -= 10
                    child.style.transform = `translateY(${translateY}px)`;
                }else if(e.deltaY === 0 ){
                    console.log('没动')
                    
                }else{
                // 下滚
                    console.log('下')
                    translateY += 10
                    child.style.transform = `translateY(${translateY}px)`;
                }
            })
        },
    }
</script>

<style>
    *{margin:0;padding:0;box-sizing:border-box;}
    .parent{
        height: 400px;
        overflow: hidden;
        width:480px;
        border:1px solid red;
    }
    .child{
        border:1px solid green;
    }
</style>
```