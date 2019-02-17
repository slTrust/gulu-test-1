const expect = chai.expect;
import Vue from 'vue'
import Popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {
    it('存在.', () => {
        expect(Popover).to.be.exist
    })
    it('可以设置position', (done) => {
        Vue.component('g-popover',Popover);

        const div = document.createElement('div')
        document.body.appendChild(div);
        div.innerHTML = `
            <g-popover position="bottom" ref="a">
                <template slot="content">
                    <div>popover内容</div>
                </template>
                <template>
                    <button>点我</button>
                </template>
            </g-popover>
        `;
        const vm = new Vue({
            el:div
        })
        // 如何拿到 popover 里面的 refs呢
        // 在 上面给一个 ref="a" 这个就是popover组件
        vm.$nextTick(()=>{
            vm.$el.querySelector('button').click()
            vm.$nextTick(()=>{
                // console.log(vm.$refs.a.$refs.contentWrapper);
                expect(vm.$refs.a.$refs.contentWrapper.classList.contains('position-bottom')).to.be.true
                done()
            })
        })
    })

    /* 遗留问题 无法触发hover */
    xit('可以设置 trigger', (done) => {
        Vue.component('g-popover',Popover);

        const div = document.createElement('div')
        document.body.appendChild(div);
        div.innerHTML = `
            <g-popover trigger="hover" ref="a">
                <template slot="content">
                    <div>popover内容</div>
                </template>
                <template>
                    <button>点我</button>
                </template>
            </g-popover>
        `;
        const vm = new Vue({
            el:div
        })
        // 如何拿到 popover 的按钮触发hover呢？
        let event = new Event('mouseenter');
        vm.$el.dispatchEvent(event);
        vm.$nextTick(()=>{
            const {contentWrapper} = vm.$refs.a.$refs;
            expect(contentWrapper).to.be.exist
            done()
        })
    })

})