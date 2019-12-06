### drag

- [drag mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/drag_event)
    - [按照文档在 codesandbox里实验一下](https://codesandbox.io/s/icy-feather-reqwd)

```
<template>
    <div style="margin:20px;position:relative;">
        <div id="test" draggable="true" style="height:100px;width:100px;border:1px solid red;position:absolute;left:0;top:0;">test</div>
    </div>
</template>

<script>
    export default {
        mounted(){
            let test = document.querySelector('#test');
            let startPosition
            let endPosition 
            test.addEventListener('dragstart',(e)=>{
                test.classList.add('hide');
                let {clientX:x,clientY:y} = e
                startPosition = [x,y];
            })
            test.addEventListener('dragend',(e)=>{
                test.classList.remove('hide');
                let {clientX:x,clientY:y} = e
                endPosition = [x,y];
                let deltaX = endPosition[0] - startPosition[0];
                let deltaY = endPosition[1] - startPosition[1];
                test.style.left = parseInt(test.style.left) +  deltaX + 'px';
                test.style.top = parseInt(test.style.top) + deltaY + 'px';
            })
        }
    }
</script>

<style lang="scss">
    .hide{ opacity: 0.2;}
    *{margin:0;padding:0;box-sizing:border-box;}
</style>
```

> 但是，drag 有个非常大的缺陷

- 我拖动的时候，我之前的那个元素是无法消掉的
- 兼容性不是特别好

#### 解决这个缺陷：拖动的时候隐藏原始元素

> 在解决它的过程中遇到了一个bug 就是 内联样式 和 CSS样式问题

如果这样

```
<div id="test" draggable="true" style="height:100px;width:100px;border:1px solid red;position:absolute;left:0;top:0;">test</div>

test.style.left 是可以获取到的

还有一个隐藏问题
你只设置了 left 如果你想要 right 得到的是 空字符
// test.style.right = ''
```

**如果你把内联样式写到css内部了**

```
<div id="test" draggable="true">test</div>

<style lang="scss">
 #test{height:100px;width:100px;border:1px solid red;position:absolute;left:0;top:0;}
</style>

此时
test.style.left  获取的是 空字符串
```

**解决方案就是无论何时都用`window.getComputedStyle`**

得到指点就是在拖动的时候添加样式 让元素隐藏

```
test.addEventListener('dragstart',(e)=>{
    ...
    setTimeout(()=>{
        test.classList.add('hide');
    })
})
test.addEventListener('dragend',(e)=>{
    ...
    setTimeout(()=>{
        test.classList.remove('hide')
    })
})


// 样式
.hide{ transform:translateY( -9999px)}
```

#### 尝试把 Drag API 应用到 我们的 ScrollBar上

**于是发现必须放弃它**

- 因为无法控制它在一个方向上拖动
