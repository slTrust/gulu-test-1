<template>
    <div class="xxx">
        <div>
            <g-input value="张三" disabled></g-input>
            <g-input value="李四" readonly></g-input>
            <g-input value="王五"></g-input>
        </div>
        <p class="temp"></p>
        <g-input value="赵" error="姓名不能少于两个字"></g-input>
        <p class="temp"></p>
        <!--触发自己的 change 事件 -->
        <g-input value="赵" @change="inputChange" id="aaa"></g-input>
        <p class="temp"></p>
        <g-input value="赵" v-model="msg"></g-input>

        <pre>
            <code>{{content}}</code>
        </pre>
    </div>
</template>

<script>
    import Input from '../../../src/input';
    export default {
        components:{
            'g-input':Input
        },
        data(){
            return {
                msg:'hello',
                content:`
<div>
    <g-input value="张三" disabled></g-input>
    <g-input value="李四" readonly></g-input>
    <g-input value="王五"></g-input>
</div>
<p class="temp"></p>
<g-input value="赵" error="姓名不能少于两个字"></g-input>
<p class="temp"></p>
<!--触发自己的 change 事件 -->
<g-input value="赵" @change="inputChange" id="aaa"></g-input>
<p class="temp"></p>
<g-input value="赵" v-model="msg"></g-input>
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
</style>
