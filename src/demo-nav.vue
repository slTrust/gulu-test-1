<template>
    <div>
        {{selected}}
        <g-nav :selected.sync="selected">
            <g-nav-item name="home">首页</g-nav-item>
            <g-sub-nav>
                <template slot="title">学习</template>
                <g-nav-item name="java">后端学习</g-nav-item>
                <g-nav-item name="linux">运维学习</g-nav-item>
                <g-nav-item name="front">前端学习</g-nav-item>
            </g-sub-nav>
            <g-nav-item name="about">关于</g-nav-item>

        </g-nav>
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
                selected:['home']
            }
        },
        created(){

        }
    }
</script>

<style scoped>
    *{margin:0;padding:0;box-sizing: border-box;}

</style>