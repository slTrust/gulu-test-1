<template>
    <div class="xxx">
        <g-collapse :selected.sync="selectedTab" :single="true">
            <g-collapse-item title="标题1" name="1">标题1的内容</g-collapse-item>
            <g-collapse-item title="标题2" name="2">标题2的内容</g-collapse-item>
            <g-collapse-item title="标题3" name="3">标题3的内容</g-collapse-item>
        </g-collapse>
        {{selectedTab}}

        <pre>
            <code>{{content}}</code>
        </pre>
    </div>
</template>

<script>
    import Collapse from '../../../src/collapse/collapse';
    import CollapseItem from '../../../src/collapse/collapse-item';
    export default {
        name:'sss',
        components:{
            'g-collapse':Collapse,
            'g-collapse-item':CollapseItem,
            
        },
        data(){
            return {
                selectedTab:['1','2'],
                content:`
<g-collapse :selected.sync="selectedTab" :single="true">
    <g-collapse-item title="标题1" name="1">标题1的内容</g-collapse-item>
    <g-collapse-item title="标题2" name="2">标题2的内容</g-collapse-item>
    <g-collapse-item title="标题3" name="3">标题3的内容</g-collapse-item>
</g-collapse>
                `
            }
        },
        methods:{
            
        }
}
</script>
<style>
    .xxx .content{
        margin:0 !important;
        padding:0 !important;
    }
</style>
