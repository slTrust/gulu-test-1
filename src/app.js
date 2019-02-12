import Vue from 'vue';
import Button from './button';
import Icon from './icon';
import ButtonGroup from './button-group';
import Input from './input';
import Row from './row';
import Col from './col';
import Layout from './layout';
import Header from './header';
import Sider from './sider';
import Content from './content';
import Footer from './footer';

import plugin from './plugin'
Vue.use(plugin);

Vue.component('g-button',Button);
Vue.component('g-icon',Icon);
Vue.component('g-button-group',ButtonGroup);
Vue.component('g-input',Input);
Vue.component('g-row',Row);
Vue.component('g-col',Col);
Vue.component('g-layout',Layout);
Vue.component('g-header',Header);
Vue.component('g-sider',Sider);
Vue.component('g-content',Content);
Vue.component('g-footer',Footer);


new Vue({
    el:'#app',
    data:{
        loading1:false,
        loading2:false,
        loading3:false,
        msg:'hello'
    },
    created(){
        // 3秒后在我们自己的这个 input上触发 change 事件
        /*
        setTimeout(()=>{
            let event = new Event('change');
            let inputElement = this.$el.querySelector('#aaa input');
            inputElement.dispatchEvent(event);
            console.log('hi');
        },3000)
        */

    },
    methods:{
        showToast(){
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

            this.$toast('你的智商需要充值',{
                // position:'top',
                // position:'bottom',
                position:'middle',
                closeButton:{
                    text:'已充值',
                    callback(){
                        console.log('用户说已经充值了')
                    }
                }
            })

        },
        inputChange(e){
            console.log(e);
            console.log(e.target.value);
        }
    }
})
