<template>
    <div class="xxx">
        <!--上中下布局-->
    
        <g-layout style="height:400px;">
            <g-header class="demo">header</g-header>
            <g-content class="demo">content</g-content>
            <g-footer  class="demo">footer</g-footer>
        </g-layout>
        <div class="temp"></div>

        <!--带侧边栏上中下布局 ，侧边栏在左边-->
        <g-layout style="height:400px;">
            <g-header class="demo">header</g-header>
            <g-layout>
                <g-sider class="demo">sider</g-sider>
                <g-content class="demo">content</g-content>
            </g-layout>
            <g-footer  class="demo">footer</g-footer>
        </g-layout>

        <div class="temp"></div>

        <!--带侧边栏上中下布局 ，侧边栏在右边-->

        <g-layout style="height:400px;">
            <g-header class="demo">header</g-header>
            <g-layout>
                <g-content class="demo">content</g-content>
                <g-sider class="demo">sider</g-sider>
            </g-layout>
            <g-footer  class="demo">footer</g-footer>
        </g-layout>

        <div class="temp"></div>

        <!-- 侧边栏单独在最左侧，右侧上中下-->
        <g-layout style="height:400px;">
            <g-sider>sider</g-sider>
            <g-layout>
                <g-header>header</g-header>
                <g-content>content</g-content>
                <g-footer>footer</g-footer>
            </g-layout>
        </g-layout>

        <pre>
            <code>{{content}}</code>
        </pre>
    </div>
</template>

<script>
    import Layout from '../../../src/layout/layout';
    import Header from '../../../src/layout/header';
    import Sider from '../../../src/layout/sider';
    import Content from '../../../src/layout/content';
    import Footer from '../../../src/layout/footer';
    export default {
        components:{
            'g-layout':Layout,
            'g-header':Header,
            'g-sider':Sider,
            'g-content':Content,
            'g-footer':Footer,
        },
        data(){
            return {
                msg:'hello',
                content:`
<!--上中下布局-->
    
<g-layout style="height:400px;">
    <g-header class="demo">header</g-header>
    <g-content class="demo">content</g-content>
    <g-footer  class="demo">footer</g-footer>
</g-layout>
<div class="temp"></div>

<!--带侧边栏上中下布局 ，侧边栏在左边-->
<g-layout style="height:400px;">
    <g-header class="demo">header</g-header>
    <g-layout>
        <g-sider class="demo">sider</g-sider>
        <g-content class="demo">content</g-content>
    </g-layout>
    <g-footer  class="demo">footer</g-footer>
</g-layout>

<div class="temp"></div>

<!--带侧边栏上中下布局 ，侧边栏在右边-->

<g-layout style="height:400px;">
    <g-header class="demo">header</g-header>
    <g-layout>
        <g-content class="demo">content</g-content>
        <g-sider class="demo">sider</g-sider>
    </g-layout>
    <g-footer  class="demo">footer</g-footer>
</g-layout>

<div class="temp"></div>

<!-- 侧边栏单独在最左侧，右侧上中下-->
<g-layout style="height:400px;">
    <g-sider>sider</g-sider>
    <g-layout>
        <g-header>header</g-header>
        <g-content>content</g-content>
        <g-footer>footer</g-footer>
    </g-layout>
</g-layout>
                `
            }
        }
    }
</script>
<style>
    .xxx .content{
        margin:0 !important;
        padding:0 !important;
    }
    .temp{
        /*站位div*/
        height: 20px;
    }
    .demo{
        border:1px solid #666;
        min-height: 100px;
    }

    .sider{
        background: #333;
        width: 150px;
    }
    .sider.slide-enter,.sider.slide-leave-to{
        margin-left:-150px;
    }
    .header{
        background: #999;
        height: 100px;
    }
    .footer{
        background: #999;
        height: 100px;
    }
</style>
