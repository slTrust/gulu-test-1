<template>
    <div class="xxx">
        <div style="padding-top:100px;padding-left:100px;display:-none;" >
            <g-popover>
                <template slot="content" slot-scope="{close}">
                    <div>popover内容1popover内容1popover内容1popover内容1popover内1popover内容1popover内容1popover内容1popover内容1
                        <button @click="close">关闭</button>
                    </div>
                </template>
                <template>
                    <g-button>点我</g-button>
                </template>
            </g-popover>
            <g-popover position="bottom">
                <template slot="content">
                    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddddddddd</div>
                </template>
                <template>
                    <g-button>点我</g-button>
                </template>
            </g-popover>
            <g-popover position="left">
                <template slot="content">
                    <div>bbbbb</div>
                </template>
                <template>
                    <g-button>点我</g-button>
                </template>
            </g-popover>
            <g-popover position="right">
                <template slot="content">
                    <div>cccccc</div>
                </template>
                <template>
                    <g-button>点我</g-button>
                </template>
            </g-popover>
        </div>

        <div style="padding-top:100px;padding-left:100px;padding-bottom:150px;display: -none;">
            <g-popover trigger="hover">
                <template slot="content">
                    <div>popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1</div>
                </template>
                <template>
                    <g-button>点我</g-button>
                </template>
            </g-popover>
            <g-popover position="bottom" trigger="hover">
                <template slot="content">
                    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddddddddd</div>
                </template>
                <template>
                    <g-button>点我</g-button>
                </template>
            </g-popover>
            <g-popover position="left" trigger="hover">
                <template slot="content">
                    <div>bbbbb</div>
                </template>
                <template>
                    <g-button>点我</g-button>
                </template>
            </g-popover>
            <g-popover position="right" trigger="hover">
                <template slot="content">
                    <div>cccccc</div>
                </template>
                <template>
                    <g-button>点我</g-button>
                </template>
            </g-popover>
        </div>

        <pre>
            <code>{{content}}</code>
        </pre>
    </div>
</template>

<script>
    import Popover from '../../../src/popover';
    import Button from '../../../src/button';
    export default {
        name:'sss',
        components:{
            'g-popover':Popover,
            'g-button':Button
        },
        data(){
            return {
                content:`
<div style="padding-top:100px;padding-left:100px;display:none;" >
    <g-popover>
        <template slot="content" slot-scope="{close}">
            <div>popover内容1popover内容1popover内容1popover内容1popover内1popover内容1popover内容1popover内容1popover内容1
                <g-button @click="close">关闭</g-button>
            </div>
        </template>
        <template>
            <g-button>点我</g-button>
        </template>
    </g-popover>
    <g-popover position="bottom">
        <template slot="content">
            <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddddddddd</div>
        </template>
        <template>
            <g-button>点我</g-button>
        </template>
    </g-popover>
    <g-popover position="left">
        <template slot="content">
            <div>bbbbb</div>
        </template>
        <template>
            <g-button>点我</g-button>
        </template>
    </g-popover>
    <g-popover position="right">
        <template slot="content">
            <div>cccccc</div>
        </template>
        <template>
            <g-button>点我</g-button>
        </template>
    </g-popover>
</div>

<div style="padding-top:100px;padding-left:100px;padding-bottom:150px;display: none;">
    <g-popover trigger="hover">
        <template slot="content">
            <div>popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1popover内容1</div>
        </template>
        <template>
            <g-button>点我</g-button>
        </template>
    </g-popover>
    <g-popover position="bottom" trigger="hover">
        <template slot="content">
            <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddddddddd</div>
        </template>
        <template>
            <g-button>点我</g-button>
        </template>
    </g-popover>
    <g-popover position="left" trigger="hover">
        <template slot="content">
            <div>bbbbb</div>
        </template>
        <template>
            <g-button>点我</g-button>
        </template>
    </g-popover>
    <g-popover position="right" trigger="hover">
        <template slot="content">
            <div>cccccc</div>
        </template>
        <template>
            <g-button>点我</g-button>
        </template>
    </g-popover>
</div>
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
