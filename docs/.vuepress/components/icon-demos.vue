<template>
    <div class="xxx">
        <g-icon name="download"></g-icon>
        <g-icon name="loading"></g-icon>
        <g-icon name="left"></g-icon>
        <g-icon name="right"></g-icon>
        <g-icon name="down"></g-icon>
        <g-icon name="zan"></g-icon>

        <pre>
            <code>{{content}}</code>
        </pre>
    </div>
</template>

<script>
    import Icon from '../../../src/icon';
    export default {
        components:{
            'g-icon':Icon
        },
        data(){
            return {
                content:`
<g-icon name="download"></g-icon>
<g-icon name="loading"></g-icon>
<g-icon name="left"></g-icon>
<g-icon name="right"></g-icon>
<g-icon name="down"></g-icon>
<g-icon name="zan"></g-icon>
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
