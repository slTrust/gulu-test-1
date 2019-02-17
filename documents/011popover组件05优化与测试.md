### 解决 popover弹出内容移动到小箭头 抖动问题

```
&.position-top{
    transform: translateY(-100%);
    margin-top:-10px;
    &::before,&::after{
        left:10px;
    }
    &::before{
        border-top-color:black;
        border-bottom:none;
        top:100%;
    }
    &::after{
        border-top-color:white;
        border-bottom:none;
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
        border-top:none;
        bottom:100%;
    }
    &::after{
        border-bottom-color:white;
        border-top:none;
        bottom:calc(100% - 1px);
    }
}
&.position-left{
    transform: translateX(-100%);
    margin-left:-10px;
    &::before,&::after{
        transform:translateY(-50%);
        border-right:none;
        top:50%;
    }
    &::before{
        border-left-color:black;
        border-right:none;
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
        border-left:none;
        right:100%;
    }
    &::after{
        border-right-color:white;
        border-left:none;
        right:calc(100% - 1px);
    }
}
```

### 如何在 popover弹出的内容里 调用 popover组件里的方法呢？

> #### slot-scope使用

```
<!-- 如何点击关闭的时候关闭 popover弹出内容呢？ -->
<g-popover>
    <template slot="content">
        <div>popover内容1popover内容1popover内容1popover内容1popover内1popover内容1popover内容1popover内容1popover内容1
            <g-button>关闭</g-button>
        </div>
    </template>
    <template>
        <g-button>点我</g-button>
    </template>
</g-popover>
```

- popover组件里 传递 close函数 在插槽里
    ```
    <template>
        <div class="popover" ref="popover">
            <div ref="contentWrapper" class="content-wrapper" v-if="visable"
                :class="{[`position-${position}`]:true}"
            >
                <slot name="content" :close="close"></slot>
            </div>
            <span ref="triggerWrapper" style="display:inline-block;">
                <slot></slot>
            </span>
        </div>
    </template>
    ```
- 调用的地方使用 slot-scope
    ```
    <g-popover>
       <template slot="content" slot-scope="{close}">
           <div>popover内容1popover内容1popover内容1popover内容1popover内1popover内容1popover内容1popover内容1popover内容1
               <g-button @click="close">关闭</g-button>
           </div>
       </template>
       <template>
           <g-button>点我</g-button>
       </template>
   </g-popover>
    ```