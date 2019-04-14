#### Stickey

> #### 需求分析

- 粘住————滚动

#### 距离顶部的距离

- 不能直接使用 getBoundingClientRect 获取的 top == top 是元素距离视口顶部的距离
- 还差一段滚动的距离 —— 这个距离刚好是scrollTop


#### 修改bug

> #### 如果可见区只能显示9行的高度,你有一个满足粘性条件的导航条

- 滚动一下刚好满足条件
- 但是正好显示9行就导致 滚动条没了
- 滚动条没了---》 导致 粘性导航恢复
- 闪动问题

```
就是让外层容器的高度保持

window.addEventListener('scroll',()=>{
    if(window.scrollY > top){
        console.log('滚过去了')
        let height = this.height()
        this.$refs.wrapper.style.height = `${height}px`
        this.sticky = true
    }else{
        console.log('没滚过去了')
        this.sticky = false
    }
})
```

> #### 另一个bug 导航条 如果一开始不是 width:100% 呢 单独是居中的宽度500

- 当满足条件时候 fixed 导致 width:100%;


#### debounce  

- 极致体验就不加(非常耗cpu)
- 不要求极致就加

```
if(this.timerId){ window.clearTimeout(this.timerId); }
this.timerId = setTimeout(x,200)
``` 

#### 知识提升

```
export default {
    data(){
        return {
            timerId:'1'                          
        }
    },
    mounted() {
        console.log(this.timerId) // 可以获取
    }
}

上面代码和下面的区别

export default {
    data(){
        return {
        }
    },
    timerId:'1',
     mounted() {
        console.log(this.timerId) // 不可以获取
     }                          
}
```

> 因为 export default 后面的内容是 options

- 所以第二个无法打印 this.timerId

```
new Vue({options})

它只会将 data里的数据 映射到 this 上
```

> #### 为什么组件的 data是一个函数呢？

- 因为如果这样
    ```
    export default {
        data:{
            a:1
        },
    }
    
    页面如果又两个A组件 都共享 a 属性
    一个改了 就都改了
    ```
