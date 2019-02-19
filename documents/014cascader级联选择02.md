### 开始我们的组件实现

```
<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable">
        </div>
        <div class="popover" v-if="popoverVisable">
            <div v-for="sourceItem in source" style="border:1px solid red;" class="level1">
                {{sourceItem.name}}
                <div v-for="item in sourceItem.children" style="border:1px solid black;" class="level2">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
    <!--
    <div class="cascader">
        <div class="trigger">
            <slot></slot>
        </div>
        <div class="popover">
            <div v-for="item in source">
                <cascader-item :source-item="item"></cascader-item>
            </div>
        </div>
    </div>
    -->
</template>

<script>
    import CascaderItem from './cascader-item'
    export default {
        name: "GuluCascader",
        components:{
            CascaderItem
        },
        props:{
            source:{
                type:Array
            }
        },
        data(){
            return{
                popoverVisable:false,

            }
        },
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader{
        .trigger{
            border:1px solid red;
            height: 32px;
            width: 100px;
        }
        .popover{
            border:1px solid red;
            height: 200px;
            width: 80px;
        }
        .level1{
            position: relative;
        }
        .level2{
            position: absolute;
            top:0;
            left:100%;
            width:100%;
        }
    }
</style>
```

- 这样写不好
- 有样式问题，第二级不会顶到头对其
- 除非把定位放在 popover 上
- 总之，不推荐

#### 最好的思路

- 假如三层
- 三个div 
    ```
    第1个div显示第1层的数据 
    第2个div显示第2层的数据 
    第3个div显示第3层的数据 
    ```
- 这样三个div就没有关系了

cascader.vue

```
<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable">
        </div>
        <div class="popover" v-if="popoverVisable">
            <div class="level1">
                <div class="label" v-for="sourceItem in source" style="border:1px solid red;">
                    {{sourceItem.name}}
                </div>
            </div>
            <div class="level2">
                <div class="label" v-for="item in source[0].children">
                    {{item.name}}
                </div>
            </div>
            <div class="level3">
                <div class="label" v-for="subItem in source[0].children[0].children">
                    {{subItem.name}}
                </div>
            </div>

        </div>
    </div>
    <!--
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable">
        </div>
        <div class="popover" v-if="popoverVisable">
            <div v-for="sourceItem in source" style="border:1px solid red;" class="level1">
                {{sourceItem.name}}
                <div v-for="item in sourceItem.children" style="border:1px solid black;" class="level2">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
    -->
    <!--
    <div class="cascader">
        <div class="trigger">
            <slot></slot>
        </div>
        <div class="popover">
            <div v-for="item in source">
                <cascader-item :source-item="item"></cascader-item>
            </div>
        </div>
    </div>
    -->
</template>

<script>
    import CascaderItem from './cascader-item'
    export default {
        name: "GuluCascader",
        components:{
            CascaderItem
        },
        props:{
            source:{
                type:Array
            }
        },
        data(){
            return{
                popoverVisable:false,

            }
        },
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader{
        .trigger{
            border:1px solid red;
            height: 32px;
            width: 100px;
        }
        .popover{
            border:2px solid green;
            height: 200px;
            display:flex;
            .label{
                white-space: nowrap;
            }
        }

    }
</style>
```

但是明显 div里的索引是不知道的，不该写死

```
<div class="label" v-for="sourceItem in source">
<div class="label" v-for="item in source[0].children">
<div class="label" v-for="subItem in source[0].children[0].children">
```

### 计算属性

cascader.vue

```
<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable">
        </div>
        <div class="popover" v-if="popoverVisable">
            <div class="level1">
                <div class="label" v-for="sourceItem in source" style="border:1px solid red;" @click="level1Selected=sourceItem">
                    {{sourceItem.name}}
                </div>
            </div>
            <div class="level2">
                <div class="label" v-for="item2 in level2Item" @click="level2Selected=item2">
                    {{item2.name}}
                </div>
            </div>
            <div class="level3">
                <div class="label" v-for="item3 in level3Item">
                    {{item3.name}}
                </div>
            </div>

        </div>
    </div>
    <!--
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable">
        </div>
        <div class="popover" v-if="popoverVisable">
            <div v-for="sourceItem in source" style="border:1px solid red;" class="level1">
                {{sourceItem.name}}
                <div v-for="item in sourceItem.children" style="border:1px solid black;" class="level2">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
    -->
    <!--
    <div class="cascader">
        <div class="trigger">
            <slot></slot>
        </div>
        <div class="popover">
            <div v-for="item in source">
                <cascader-item :source-item="item"></cascader-item>
            </div>
        </div>
    </div>
    -->
</template>

<script>
    import CascaderItem from './cascader-item'
    export default {
        name: "GuluCascader",
        components:{
            CascaderItem
        },
        props:{
            source:{
                type:Array
            }
        },
        data(){
            return{
                popoverVisable:false,
                level1Selected:null,
                level2Selected:null,
            }
        },
        computed:{
            level2Item(){
                if(this.level1Selected){
                    return this.level1Selected.children
                }else{
                    return []
                }
            },
            level3Item(){
                if(this.level2Selected){
                    return this.level2Selected.children
                }else{
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader{
        .trigger{
            border:1px solid red;
            height: 32px;
            width: 100px;
        }
        .popover{
            border:2px solid green;
            height: 200px;
            display:flex;
            .label{
                white-space: nowrap;
            }
        }

    }
</style>
```

- 但是这样有问题，因为我们无法确定数据的层数
- 而且也没法一直写那么多计算属性 

> #### 最终思路

- 始终分为左右两个div

cascader.vue

```
<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable">
        </div>
        <div class="popover" v-if="popoverVisable">
            <cascader-items :items="source"></cascader-items>
        </div>
    </div>
</template>

<script>
    import CascaderItems from './cascader-items'
    export default {
        name: "GuluCascader",
        components:{
            CascaderItems
        },
        props:{
            source:{
                type:Array
            }
        },
        data(){
            return{
                popoverVisable:false,
                level1Selected:null,
                level2Selected:null,
            }
        },
        computed:{
            level2Item(){
                if(this.level1Selected){
                    return this.level1Selected.children
                }else{
                    return []
                }
            },
            level3Item(){
                if(this.level2Selected){
                    return this.level2Selected.children
                }else{
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader{
        .trigger{
            border:1px solid red;
            height: 32px;
            width: 100px;
        }
        .popover{
            border:2px solid green;
            height: 200px;
            display:flex;
            .label{
                white-space: nowrap;
            }
        }

    }
</style>
```

cascader-items.vue

```
<template>
    <div class="cascaderItem">
        <div class="left">
            <div class="label" v-for="item in items" @click="leftSelected = item">
                {{item.name}}
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-item :items="rightItems"></gulu-cascader-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluCascaderItem",
        props:{
            items:{
                type:Array
            }
        },
        data(){
            return {
                leftSelected:null
            }
        },
        computed:{
            rightItems(){
                if(this.leftSelected && this.leftSelected.children){
                    return this.leftSelected.children;
                }else{
                    return null
                }
            }
        }
    }
</script>

<style scoped>
    .cascaderItem{
        display:flex;
        align-items: flex-start;
        justify-content: flex-start;
        .left{
            border:1px solid red;
        }
        .right{
            marign-top:-1px;
        }
    }
</style>
```