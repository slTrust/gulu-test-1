import Vue from 'vue';
import Button from './button/button';
import Icon from './icon';
import ButtonGroup from './button/button-group';
import Input from './input';
import Row from './grid/row';
import Col from './grid/col';
import Layout from './layout/layout';
import Header from './layout/header';
import Sider from './layout/sider';
import Content from './layout/content';
import Footer from './layout/footer';
import plugin from './plugin'
import Tabs from './tabs/tabs';
import TabsHead from './tabs/tabs-head';
import TabsBody from './tabs/tabs-body';
import TabsItem from './tabs/tabs-item';
import TabsPane from './tabs/tabs-pane';
import Popover from './popover';
import Collapse from './collapse/collapse';
import CollapseItem from './collapse/collapse-item';
import Cascader from './cascader'


Vue.component('g-button',Button);
Vue.component('g-button-group',ButtonGroup);
Vue.component('g-cascader',Cascader);
Vue.component('g-col',Col);
Vue.component('g-collapse',Collapse);
Vue.component('g-collapse-item',CollapseItem);
Vue.component('g-content',Content);
Vue.component('g-footer',Footer);
Vue.component('g-header',Header);
Vue.component('g-icon',Icon);
Vue.component('g-input',Input);
Vue.component('g-layout',Layout);
Vue.component('g-popover',Popover);
Vue.component('g-row',Row);
Vue.component('g-sider',Sider);
Vue.component('g-tabs',Tabs);
Vue.component('g-tabs-body',TabsBody);
Vue.component('g-tabs-head',TabsHead);
Vue.component('g-tabs-item',TabsItem);
Vue.component('g-tabs-pane',TabsPane);
Vue.use(plugin);



new Vue({
    el:'#app',
    data:{
        loading1:false,
        loading2:false,
        loading3:false,
        msg:'hello',
        selectedTab:['1','2'],
        source:[
            {name:"浙江",children:[
                    {name:"杭州",
                     children:[
                         {name:"上城"},
                         {name:"下城"},
                         {name:"江干"}
                     ]},
                    {name:"嘉兴",
                        children:[
                            {name:"南湖"},
                            {name:"秀洲"},
                            {name:"嘉善"}
                        ]},
                   ]},
            {name:"福建",children:[
                    {name:"福州",
                        children:[
                            {name:"鼓楼"},
                            {name:"台江"},
                            {name:"仓山"}
                        ]},
                    ]},
            {name:"安徽",children:[
                    {name:"合肥",
                        children:[
                            {name:"瑶海"},
                            {name:"庐阳"}
                        ]}
                ]},

        ]
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

            this.$toast('你的智商需要充值',{
                position:position,
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
