<template>
    <div class="xxx">
        <g-button @click="showToast('top')">top</g-button>
        <g-button @click="showToast('middle')">middle</g-button>
        <g-button @click="showToast('bottom')">bottom</g-button>

        <pre>
            <code>{{content}}</code>
        </pre>
    </div>
</template>

<script>
    import Vue from 'vue';
    import plugin from '../../../src/plugin.js';
    import Button from '../../../src/button/button';
    Vue.use(plugin);
    export default {
        components:{
            'g-button':Button
        },
        data(){
            return {
                msg:'hello',
                content:`
this.$toast('你的智商需要充值',{
    position:position,
    closeButton:{
        text:'已充值',
        callback(){
            console.log('用户说已经充值了')
        }
    }
})
                `
            }
        },
        methods:{
            showToast(position){
            // this.$toast('我是 message',{
            //     closeButton:{
            //         text:'知道了',
            //         callback(){
            //             console.log('用户点击知道了')
            //         }
            //     }
            // })
            // 因为 toast 里 用的 slot 所以导致按字符串原样输出 而不是 html
            // this.$toast('我是 <strong>加粗文字</strong>',{})

            // 改用 enableHtml 来决定是否开启html渲染

            // 这样导致一个问题，就是屏幕小的时候  关闭 两个子就折行了
            // this.$toast('<p>段落<strong>hi</strong><br/><a href="http://qq.com">qq</a></p>',{ enableHtml:!true })

            // 文本过多的折行显示问题
            // this.$toast('我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字')
            console.log(this.$toast)
            this.$toast('你的智商需要充值',{
                position:position,
                closeButton:{
                    text:'已充值',
                    callback(){
                        console.log('用户说已经充值了')
                    }
                }
            })
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
