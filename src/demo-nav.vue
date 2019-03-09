<template>
    <div>
        <h2>垂直导航</h2>
        <g-nav :selected.sync="selected2" vertical style="width:200px;margin: 20px;">
            <g-nav-item name="home">首页</g-nav-item>
            <g-sub-nav name="learn">
                <template slot="title">学习</template>
                <g-nav-item name="java">后端学习</g-nav-item>
                <g-nav-item name="linux">运维学习</g-nav-item>
                <g-sub-nav name="front">
                    <template slot="title">前端学习(继续嵌套)</template>
                    <g-nav-item name="react">React</g-nav-item>
                    <g-nav-item name="ng">Angular</g-nav-item>
                    <g-sub-nav name="vue">
                        <template slot="title">vue(继续嵌套)</template>
                        <g-nav-item name="cli">vue-cli</g-nav-item>
                        <g-nav-item name="ssr">vue ssr</g-nav-item>
                        <g-nav-item name="press">vue press</g-nav-item>
                    </g-sub-nav>
                </g-sub-nav>
            </g-sub-nav>
            <g-nav-item name="about">关于</g-nav-item>
        </g-nav>

        <h2>水平导航</h2>
        <g-nav :selected.sync="selected">
            <g-nav-item name="home">
                <a href="https://www.baidu.com" target="_blank">首页</a>
            </g-nav-item>
            <g-sub-nav name="learn">
                <template slot="title">学习</template>
                <g-nav-item name="java">后端学习</g-nav-item>
                <g-nav-item name="linux">运维学习</g-nav-item>
                <g-sub-nav name="front">
                    <template slot="title">前端学习(继续嵌套)</template>
                    <g-nav-item name="react">React</g-nav-item>
                    <g-nav-item name="ng">Angular</g-nav-item>
                    <g-sub-nav name="vue">
                        <template slot="title">vue(继续嵌套)</template>
                        <g-nav-item name="cli">vue-cli</g-nav-item>
                        <g-nav-item name="ssr">vue ssr</g-nav-item>
                        <g-nav-item name="press">vue press</g-nav-item>
                    </g-sub-nav>
                </g-sub-nav>
            </g-sub-nav>
            <g-nav-item name="about">关于</g-nav-item>
        </g-nav>
        测试测试测试测试测试测试

    </div>
</template>

<script>
    import GNav from './nav/nav';
    import GNavItem from './nav/nav-item';
    import GSubNav from './nav/sub-nav';

    export default {
        name: "demo2",
        components:{
            GNav,
            GNavItem,
            GSubNav
        },
        data(){
            return {
                selected:['home'],
                selected2:['home']
            }
        },
        created(){

        }
    }
</script>

<style scoped>
    *{margin:0;padding:0;box-sizing: border-box;}

</style>