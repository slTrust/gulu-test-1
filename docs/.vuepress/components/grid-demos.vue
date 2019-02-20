<template>
    <div class="xxx">
        <g-row>
            <g-col span="4">
                <p class="box1"></p>
            </g-col>
            <g-col span="20">
                <p class="box2"></p>
            </g-col>
        </g-row>
         <p class="temp"></p>
        <g-row>
            <g-col span="6">
                <p class="box2"></p>
            </g-col>
            <g-col span="6">
                <p class="box1"></p>
            </g-col>
            <g-col span="6">
                <p class="box2"></p>
            </g-col>
            <g-col span="6">
                <p class="box1"></p>
            </g-col>
        </g-row>

         <p class="temp"></p>

        <g-row>
            <g-col span="8">
                <p class="box1"></p>
            </g-col>
            <g-col span="8">
                <p class="box2"></p>
            </g-col>
            <g-col span="8">
                <p class="box1"></p>
            </g-col>
        </g-row>

         <p class="temp"></p>

        <pre>
            <code>{{content}}</code>
        </pre>
    </div>
</template>

<script>
    import Row from '../../../src/row';
    import Col from '../../../src/col';
    export default {
        components:{
            'g-row':Row,
            'g-col':Col
        },
        data(){
            return {
                content:`
<g-row>
    <g-col span="4">
        <p class="box1"></p>
    </g-col>
    <g-col span="20">
        <p class="box2"></p>
    </g-col>
</g-row>
<g-row>
    <g-col span="6">
        <p class="box2"></p>
    </g-col>
    <g-col span="6">
        <p class="box1"></p>
    </g-col>
    <g-col span="6">
        <p class="box2"></p>
    </g-col>
    <g-col span="6">
        <p class="box1"></p>
    </g-col>
</g-row>

<g-row>
    <g-col span="8">
        <p class="box1"></p>
    </g-col>
    <g-col span="8">
        <p class="box2"></p>
    </g-col>
    <g-col span="8">
        <p class="box1"></p>
    </g-col>
</g-row>
                `,


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
    .box1{background: rgba(0, 153, 229, 0.7);
        height: 50px;}
    .box2{background: rgba(0, 153, 229, 0.9);
        height: 50px;}
</style>
