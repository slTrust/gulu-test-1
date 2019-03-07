<template>
    <div class="xxx">
        <g-tabs :selected.sync="selectedTab">
        <g-tabs-head>
            <g-tabs-item name="woman" disabled>
                    美女
                </g-tabs-item>
                <g-tabs-item name="finance">
                    财经
                </g-tabs-item>
                <g-tabs-item name="sports">
                    体育
                </g-tabs-item>
            </g-tabs-head>
            <g-tabs-body>
                <g-tabs-pane name="woman">美女相关信息</g-tabs-pane>
                <g-tabs-pane name="finance">财经相关信息</g-tabs-pane>
                <g-tabs-pane name="sports">体育相关信息</g-tabs-pane>
            </g-tabs-body>
        </g-tabs>

        <pre>
            <code>{{content}}</code>
        </pre>
    </div>
</template>

<script>
    import Tabs from '../../../src/tabs/tabs';
    import TabsHead from '../../../src/tabs/tabs-head';
    import TabsBody from '../../../src/tabs/tabs-body';
    import TabsItem from '../../../src/tabs/tabs-item';
    import TabsPane from '../../../src/tabs/tabs-pane';
    export default {
        name:'sss',
        components:{
            'g-tabs':Tabs,
            'g-tabs-head':TabsHead,
            'g-tabs-body':TabsBody,
            'g-tabs-item':TabsItem,
            'g-tabs-pane':TabsPane,
        },
        data(){
            return {
                selectedTab:'finance',
                content:`
<g-tabs :selected.sync="selectedTab">
<g-tabs-head>
    <g-tabs-item name="woman" disabled>
        <g-icon name="settings"></g-icon>美女
        </g-tabs-item>
        <g-tabs-item name="finance">
        </g-tabs-item>
        <g-tabs-item name="sports">
        </g-tabs-item>
    </g-tabs-head>
    <g-tabs-body>
        <g-tabs-pane name="woman">美女相关信息</g-tabs-pane>
        <g-tabs-pane name="finance">财经相关信息</g-tabs-pane>
        <g-tabs-pane name="sports">体育相关信息</g-tabs-pane>
    </g-tabs-body>
</g-tabs>
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
