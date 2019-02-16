### 先看之前判断popover 四个方向的代码

```
positionContent(){
    const {contentWrapper,triggerWrapper} = this.$refs;
    document.body.appendChild(this.$refs.contentWrapper);
    // 获取 span的 位置信息
    let {height, width, left, top} = triggerWrapper.getBoundingClientRect();
    if(this.position === 'top'){
        contentWrapper.style.left = `${left + window.scrollX}px`;
        contentWrapper.style.top = `${top + window.scrollY}px`;
    }else if(this.position === 'bottom'){
        contentWrapper.style.left = `${left + window.scrollX}px`;
        contentWrapper.style.top = `${top + height + window.scrollY}px`;
    }else if(this.position === 'left'){
        contentWrapper.style.left = `${left + window.scrollX}px`;
        let {height:height2} = contentWrapper.getBoundingClientRect();
        contentWrapper.style.top = `${top  + window.scrollY +
        (height - height2) / 2
        }px`;
    }else if(this.position === 'right'){
        contentWrapper.style.left = `${left + width + window.scrollX}px`;
        let {height:height2} = contentWrapper.getBoundingClientRect();
        contentWrapper.style.top = `${top  + window.scrollY +
        (height - height2) / 2
            }px`;
    }
},
```

- 有很多重复代码

### 表驱动编程

|   |left|right|top|bottom|
|---|---|---|---|---|
|position:left/right|xx|yy|zz|cc|
| |-|-|-|-|
| |-|-|-|-|
| |-|-|-|-|


```
positionContent(){
    const {contentWrapper,triggerWrapper} = this.$refs;
    document.body.appendChild(this.$refs.contentWrapper);
    // 获取 span的 位置信息
    let {height, width, left, top} = triggerWrapper.getBoundingClientRect();
    let {height:height2} = contentWrapper.getBoundingClientRect();
    let positions = {
        top :{
            left : left + window.scrollX,
            top : top + window.scrollY
        },
        bottom :{
            left : left + window.scrollX,
            top : top + height + window.scrollY
        },
        left :{
            left:left + window.scrollX,
            top:top  + window.scrollY + (height - height2) / 2
        },
        right :{
            left:left + width + window.scrollX,
            top:top  + window.scrollY + (height - height2) / 2
        }
    }
    contentWrapper.style.left = positions[this.position].left + 'px';
    contentWrapper.style.top = positions[this.position].top + 'px';
},
```

- 有木有很清晰