const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {
    it('存在.', () => {
        expect(Input).to.exist
    })

    // 可以嵌套  describe 来实现 分组
    describe('接受 props',()=>{
        it('接受 value', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
                propsData: {
                    value: '1234'
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.value).to.equal('1234')
            vm.$destroy()
        })

        it('接受 disabled', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.disabled).to.equal(true)
            vm.$destroy()
        })

        it('接受 readonly', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            // 注意此时 readonly 竟然是 驼峰标识
            expect(inputElement.readOnly).to.equal(true)
            vm.$destroy()
        })

        it('接受 error', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
                propsData: {
                    error: '你错了'
                }
            }).$mount()

            const iconElement = vm.$el.querySelector('use')
            expect(iconElement.getAttribute('xlink:href')).to.equal('#i-error')

            const errorElement = vm.$el.querySelector('.errorMessage')
            expect(errorElement.innerText).to.equal('你错了')
            vm.$destroy()
        })
    })

    describe('事件',()=>{

    })

})