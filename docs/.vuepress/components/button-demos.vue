<template>
    <div class="xxx">
        <g-button>默认按钮</g-button>
        <g-button icon="settings">默认按钮</g-button>
        <g-button :loading="true">默认按钮</g-button>
        <g-button disabled>默认按钮</g-button>

        <pre>
            <code>{{content}}</code>
        </pre>

        <g-button-group>
            <g-button icon="left">上一个</g-button>
            <g-button>更多</g-button>
            <g-button icon="right" icon-position="right">下一个</g-button>
        </g-button-group>

        <pre>
            <code>{{content2}}</code>
        </pre>
    </div>
</template>

<script>
    import Button from '../../../src/button/button';
    import ButtonGroup from '../../../src/button/button-group';
    export default {
        components:{
            'g-button':Button,
            'g-button-group':ButtonGroup
        },
        data(){
            return {
                content:`
<g-button>默认按钮</g-button>
<g-button icon="settings">默认按钮</g-button>
<g-button :loading="true">默认按钮</g-button>
<g-button disabled>默认按钮</g-button>
                `,
                content2:`
<g-button-group>
    <g-button icon="left">上一个</g-button>
    <g-button>更多</g-button>
    <g-button icon="right" icon-position="right">下一个</g-button>
</g-button-group>`

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
