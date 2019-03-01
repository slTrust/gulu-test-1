const expect = chai.expect;
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsHead from '../src/tabs-head';
import TabsBody from '../src/tabs-body';
import TabsItem from '../src/tabs-item';
import TabsPane from '../src/tabs-pane';

Vue.component('g-tabs',Tabs);
Vue.component('g-tabs-head',TabsHead);
Vue.component('g-tabs-body',TabsBody);
Vue.component('g-tabs-item',TabsItem);
Vue.component('g-tabs-pane',TabsPane);

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Tabs', () => {
    it('存在.', () => {
        expect(Tabs).to.be.exist
    })

    it('接受 selected prop',(done)=>{
        const div = document.createElement('div')
        document.body.appendChild(div);
        div.innerHTML = `
            <g-tabs selected="finance">
                <g-tabs-head>
                    <g-tabs-item name="woman">美女</g-tabs-item>
                    <g-tabs-item name="finance">财经</g-tabs-item>
                    <g-tabs-item name="sports">体育</g-tabs-item>
                </g-tabs-head>
                <g-tabs-body>
                    <g-tabs-pane name="woman">美女相关信息</g-tabs-pane>
                    <g-tabs-pane name="finance">财经相关信息</g-tabs-pane>
                    <g-tabs-pane name="sports">体育相关信息</g-tabs-pane>
                </g-tabs-body>
            </g-tabs>`;

        let vm = new Vue({
            el:div
        })
        // // 直接打印是没被选中的，因为是异步的
        // console.log(vm.$el.outerHTML)
        // 可能依然没法看到结果
        vm.$nextTick(()=>{
            // console.log(vm.$el.outerHTML)
            // let x = vm.$el.querySelector('.tabs-item:nth-child(2)');
            let x = vm.$el.querySelector('.tabs-item[data-name="finance"]');
            // console.log(x) //选中的item
            expect(x.classList.contains('active')).to.be.true
            done()
        })

    })

    it('可以接受 direction prop', () => {
        // 后期完善
    })


    /*
    // 放弃异步报错的方式测试
    it('子元素只能是 tabs-head 和 tabs-body', () => {

        const div = document.createElement('div')
        document.body.appendChild(div);
        div.innerHTML = `
            <g-tabs>
                <div>hi</div>
            </g-tabs>
        `;

        // 期待函数报错 ，但这样不报错， 因为是异步的

        // 同步会提示报错
        // expect(()=>{
        //     throw new Error('err')
        // }).to.throw();
        //
        //  // 异步不会提示报错
        // expect(()=>{
        //     setTimeout(()=>{
        //         throw new Error('err')
        //     },0)
        // }).to.throw();

        expect(()=>{
            const vm = new Vue({
                el:div
            })
        }).to.throw();
    })
    */

})