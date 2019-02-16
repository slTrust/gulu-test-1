### 写代码的一些理论

```
bad: 写代码------>>不写测试---->>有问题
                                此时你敢该代码重写吗？不敢
                                加代码---->出问题
                                            |
                                          加代码<----> 出问题
                                          
good: 写代码----->> 写测试---->> 出问题----->直接重新写代码，因为写了之后可以直接运行之前的测试代码
                无论怎么改 都有测试来保证是好的代码  是一个好的循环==》不需要加代码                                      
                                
```

> 小公司经常会出现 bad 的方式改代码，最后导致一直在 bug的基础上改 bug

- [代码屎山](https://www.zhihu.com/question/272065178/answer/569792400)



### 添加默认样式

- 给popover 弹出位置下方加一个小三角 用 伪元素
    ```
    /* popover箭头 */
     &::before,&::after{
         content:'';
         display:block;
         border:10px solid transparent;
         width: 0px;
         height: 0px;
         position: absolute;
         left:10px;
     }
     &::before{
         border-top-color:black;
         top:100%;
     }
     &::after{
         border-top-color:white;
         top:calc(100% - 1px);
     }
    ```
- 解决文本超长撑开宽度问题 和 连续的英文字母不换行问题
    ```
    /* 设置最大宽度防止一直撑开宽度 */
    max-width: 20em;
    /* 处理英文不换行问题 */
    word-break: break-all;
    ```
- 处理小箭头没有阴影的问题
    ```
    /* 用box-shadow 小三角就没阴影 */
    /*box-shadow:0 0 3px rgba(0,0,0,0.5);*/
    /* filter:drop-shadow()  但你要加背景色*/
    background: white;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,0.5));
    ```
- 解决点击 popover弹出内容消失的问题
    ```
    // 因为 我们把 contentWrapper 移到 body里了 所以不再组件结构里
    onClickDocument(e){
        // 再次做判断 判断是点击的内容还是 点击的其他地方
        // 点击的 是 popover 里的内容区域就不管它
        if(this.$refs.popover &&
            (this.$refs.popover === e.target ||
                this.$refs.popover.contains(e.target))
        ){return }
        if(this.$refs.contentWrapper &&
            (this.$refs.contentWrapper === e.target ||
                this.$refs.contentWrapper.contains(e.target))
        ){return}
        this.close();
    },
    ```
- 完整代码

```
<template>
    <div class="popover" @click="onCLick" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visable">
            <slot name="content" ></slot>
        </div>
        <span ref="triggerWrapper" style="display:inline-block;">
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
            positionContent(){
                document.body.appendChild(this.$refs.contentWrapper);
                // 获取 span的 位置信息
                let {height, width, left, top} = this.$refs.triggerWrapper.getBoundingClientRect();
                this.$refs.contentWrapper.style.left = `${left + window.scrollX}px`;
                this.$refs.contentWrapper.style.top = `${top + window.scrollY}px`; // 此时位置还是不对
            },
            onClickDocument(e){
                console.log('onCLick document')
                // 再次做判断 判断是点击的内容还是 点击的其他地方
                // 点击的 是 popover 里的内容区域就不管它
                console.log(this.$refs.popover)
                console.log(e.target)
                console.log(this.$refs.popover.contains(e.target))
                if(this.$refs.popover &&
                    (this.$refs.popover === e.target ||
                        this.$refs.popover.contains(e.target))
                ){return }
                if(this.$refs.contentWrapper &&
                    (this.$refs.contentWrapper === e.target ||
                        this.$refs.contentWrapper.contains(e.target))
                ){return}
                this.close();
            },
            open(){
                this.visable = true;
                // 为什么有 $nextTick 不这样就会导致 popover出不来 因为点击后 visable = true 直接添加事件 然后 visable = false;
                this.$nextTick(() => {
                    this.positionContent();
                    document.addEventListener('click',this.onClickDocument)
                })
            },
            close(){
                this.visable = false;
                document.removeEventListener('click', this.onClickDocument)
            },
            onCLick(event){
                // 点击的 按钮
                if(this.$refs.triggerWrapper.contains(event.target)){
                    if(this.visable === true) {
                        console.log('close')
                        this.close();
                    }else{
                        console.log('open')
                        this.open();
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $border-color:#333;
    $border-radius:4px;
    .popover{
        display: inline-block;
        vertical-align: top;
        position: relative;
    }
    .content-wrapper{
        position: absolute;
        border:1px solid $border-color;
        border-radius: $border-radius;
        /* 用box-shadow 小三角就没阴影 */
        /*box-shadow:0 0 3px rgba(0,0,0,0.5);*/
        /* filter:drop-shadow()  但你要加背景色*/
        background: white;
        filter:drop-shadow(0 1px 1px rgba(0,0,0,0.5));
        transform: translateY(-100%);
        margin-top:-10px;
        padding:.5em 1em;
        /* 设置最大宽度防止一直撑开宽度 */
        max-width: 20em;
        /* 处理英文不换行问题 */
        word-break: break-all;
        /* popover箭头 */
        &::before,&::after{
            content:'';
            display:block;
            border:10px solid transparent;
            width: 0px;
            height: 0px;
            position: absolute;
            left:10px;
        }
        &::before{
            border-top-color:black;
            top:100%;
        }
        &::after{
            border-top-color:white;
            top:calc(100% - 1px);
        }
    }
</style>
```

### 四个方向的位置

```
<template>
    <div class="popover" @click="onCLick" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visable"
            :class="{[`position-${position}`]:true}"
        >
            <slot name="content" ></slot>
        </div>
        <span ref="triggerWrapper" style="display:inline-block;">
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
        props:{
            position:{
                type:String,
                default:'top',
                validator(value){
                    return ['top','bottom','left','right'].indexOf(value) >= 0
                }
            }
        },
        methods:{
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
            onClickDocument(e){
                console.log('onCLick document')
                // 再次做判断 判断是点击的内容还是 点击的其他地方
                // 点击的 是 popover 里的内容区域就不管它
                if(this.$refs.popover &&
                    (this.$refs.popover === e.target ||
                        this.$refs.popover.contains(e.target))
                ){return }
                if(this.$refs.contentWrapper &&
                    (this.$refs.contentWrapper === e.target ||
                        this.$refs.contentWrapper.contains(e.target))
                ){return}
                this.close();
            },
            open(){
                this.visable = true;
                // 为什么有 $nextTick 不这样就会导致 popover出不来 因为点击后 visable = true 直接添加事件 然后 visable = false;
                this.$nextTick(() => {
                    this.positionContent();
                    document.addEventListener('click',this.onClickDocument)
                })
            },
            close(){
                this.visable = false;
                document.removeEventListener('click', this.onClickDocument)
            },
            onCLick(event){
                // 点击的 按钮
                if(this.$refs.triggerWrapper.contains(event.target)){
                    if(this.visable === true) {
                        this.close();
                    }else{
                        this.open();
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $border-color:#333;
    $border-radius:4px;
    .popover{
        display: inline-block;
        vertical-align: top;
        position: relative;
    }
    .content-wrapper{
        position: absolute;
        border:1px solid $border-color;
        border-radius: $border-radius;
        /* 用box-shadow 小三角就没阴影 */
        /*box-shadow:0 0 3px rgba(0,0,0,0.5);*/
        /* filter:drop-shadow()  但你要加背景色*/
        background: white;
        filter:drop-shadow(0 1px 1px rgba(0,0,0,0.5));
        padding:.5em 1em;
        /* 设置最大宽度防止一直撑开宽度 */
        max-width: 20em;
        /* 处理英文不换行问题 */
        word-break: break-all;
        /* popover箭头 */
        &::before,&::after{
            content:'';
            display:block;
            border:10px solid transparent;
            width: 0px;
            height: 0px;
            position: absolute;
        }
        &.position-top{
            transform: translateY(-100%);
            margin-top:-10px;
            &::before,&::after{
                left:10px;
            }
            &::before{
                border-top-color:black;
                top:100%;
            }
            &::after{
                border-top-color:white;
                top:calc(100% - 1px);
            }
        }
        &.position-bottom{
            margin-top:10px;
            &::before,&::after{
                left:10px;
            }
            &::before{
                border-bottom-color:black;
                bottom:100%;
            }
            &::after{
                border-bottom-color:white;
                bottom:calc(100% - 1px);
            }
        }
        &.position-left{
            transform: translateX(-100%);
            margin-left:-10px;
            &::before,&::after{
                transform:translateY(-50%);
                top:50%;
            }
            &::before{
                border-left-color:black;
                left:100%;
            }
            &::after{
                border-left-color:white;
                left:calc(100% - 1px);
            }
        }
        &.position-right{
            margin-left:10px;
            &::before,&::after{
                transform:translateY(-50%);
                top:50%;
            }
            &::before{
                border-right-color:black;
                right:100%;
            }
            &::after{
                border-right-color:white;
                right:calc(100% - 1px);
            }
        }
    }
</style>
```