### 我们在 tabs-head里添加一个跟随的线 line

- eventBus里传递的只有 selected 的 name
- 没法知道 tabs-item的宽度 位置信息
- 只能获取子元素
- 我们在两个地方 emit事件  tabs/tabs-item
    ```
    tabs-item 里可以直接传递 this
    this.eventBus.$emit('update:selected',this.name,this)    
    ```
- 但是 tabs里 不能直接传递只能遍历

    ```
    // emit 多传递一个 this，但是tabs里没有 只能遍历子元素
    this.$children.forEach((vm)=>{
        if(vm.$options.name === 'GuluTabsHead'){
            vm.$children.forEach((childVm)=>{
                if(childVm.$options.name==='GuluTabsItem' && childVm.name === this.selected ){
                    this.eventBus.$emit('update:selected',this.selected,childVm);
                }
            })
        }
    })
    ```
    
- tabs-head里 js控制 line的滑动和宽度

```
this.eventBus.$on('update:selected',(item,vm)=>{
    console.log(item,vm)
    let {width,height,top,left} = vm.$el.getBoundingClientRect();
    console.log(width,height,top,left);
    this.$refs.line.style.width = `${width}px`;
    // left 是无法做3d 加速的
    this.$refs.line.style.left = `${left}px`;
    // transform 是可以 3d加速的 ，但是由于我们改了宽度 所以加不加速都很慢
    // this.$refs.line.style.transform = `translateX(${left}px)`;
})
```