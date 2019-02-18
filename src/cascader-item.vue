<template>
    <div class="cascaderItem">
        {{sourceItem.name}}
        <gulu-cascader-item v-for="item in sourceItem.children"
                    v-if="sourceItem.children"
                    :sourceItem="item"
        >
        </gulu-cascader-item>
    </div>
</template>

<script>
    export default {
        name: "GuluCascaderItem",
        props:{
            sourceItem:{
                type:Object
            }
        }
    }
</script>

<style scoped>
    .cascaderItem{
        border:1px solid red;
        margin:10px;
    }
</style>