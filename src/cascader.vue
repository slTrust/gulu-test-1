<template>
    <div class="cascader">
        <div class="trigger">
            <slot></slot>
        </div>
        <div class="popover">
            <div v-for="item in source">
                <cascader-item :source-item="item"></cascader-item>
            </div>
            <!--
            <div v-for="item in source">
                <div> {{item.name}} </div>
                <div v-for="item2 in item.children">
                    {{item2.name}}
                    <div v-for="item3 in item2.children">
                        {{item3.name}}
                    </div>
                </div>
            </div>
            -->
        </div>
    </div>
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
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader{

    }
</style>