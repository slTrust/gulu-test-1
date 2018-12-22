import Vue from 'vue';
import Button from './button';
import Icon from './icon';
import ButtonGroup from './button-group';

Vue.component('g-button',Button);
Vue.component('g-icon',Icon);
Vue.component('g-button-group',ButtonGroup);


new Vue({
    el:'#app',
    data:{
        loading1:false,
        loading2:false,
        loading3:false,
    }
})

import chai from 'chai'
// 引入 间谍 spies
import spies from 'chai-spies'
chai.use(spies);

const expect = chai.expect;


try {
// 单元测试-测试  icon属性是否一致
    {
        // js动态生成一个按钮

        // 通过Vue.extend(Button) 返回一个构造函数
        const Constructor = Vue.extend(Button);
        // button实例 通过propsData传递v-bind属性
        const vm = new Constructor({
            propsData:{
                icon:'settings',
            }
        })


        /*
        也可以不 mount到元素里
        这样就不显示在页面里了
        button.$mount();

        button.$mount('#test');
        */
        vm.$mount();

        // 校验 icon是否设置了
        let useElement = vm.$el.querySelector('use');

        let href = useElement.getAttribute('xlink:href');

        expect(href).to.eq('#i-settings');

        //别忘了清理战场
        vm.$el.remove();
        vm.$destroy();

        // 不写e2e测试 据我所知国内只有 大型公司的 下单 才写这个e2e测试
        // 不写e2e测试 据我所知国内只有 大型公司的 下单 才写这个e2e测试
        // 不写e2e测试 据我所知国内只有 大型公司的 下单 才写这个e2e测试
    }

// 测试loading
    {
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData:{
                icon:'settings',
                loading:true
            }
        })

        vm.$mount();

        let useElement = vm.$el.querySelector('use');

        let href = useElement.getAttribute('xlink:href');

        expect(href).to.eq('#i-loading');

        //别忘了清理战场
        vm.$el.remove();
        vm.$destroy();
    }

// 测试 默认按钮里的 文字和 icon顺序
    {
        const div = document.createElement('div');
        document.body.appendChild(div);

        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData:{
                icon:'settings',
            }
        })

        vm.$mount(div);

        let svg = vm.$el.querySelector('svg');

        // let order = window.getComputedStyle(svg).order;
        // es6 析构语法
        let {order} = window.getComputedStyle(svg);

        //注意 必须元素渲染到页面里 才能知道它的样式
        //注意 getComputedStyle获取的样式值 都是字符串
        expect(order).to.eq('1');

        //别忘了清理战场
        vm.$el.remove();
        vm.$destroy();
    }

// 测试 icon在右侧时按钮里的 文字和 icon顺序
    {
        const div = document.createElement('div');
        document.body.appendChild(div);

        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData:{
                icon:'settings',
                iconPosition:'right'
            }
        })

        vm.$mount(div);

        let svg = vm.$el.querySelector('svg');

        let {order} = window.getComputedStyle(svg);

        expect(order).to.eq('2');

        //别忘了清理战场
        vm.$el.remove();
        vm.$destroy();
    }

// ??? 触发click ,但是期待的判断是错的
    {
        const div = document.createElement('div');
        document.body.appendChild(div);

        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData:{
                icon:'settings',
            }
        })

        vm.$mount();

        /*
        vm.$on('click',function(){
            //通过判断打印 来以为 button被点击 这是错的
            console.log(1);
        });
        */


        let spy = chai.spy(()=>{
            // 间谍里的函数被调用
            console.log(1222);
        });

        vm.$on('click',spy);

        let button = vm.$el;
        button.click();
        // 希望间谍里的函数被执行
        expect(spy).to.have.been.called();

        //别忘了清理战场
        vm.$el.remove();
        vm.$destroy();
    }
}catch(error){
    window.errors = error;
} finally {
    window.errors && window.errors.forEach((error)=>{
        console.log(error.message);
    })
}