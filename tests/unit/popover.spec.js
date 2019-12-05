import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import Vue from 'vue'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Popover from '../../src/popover'
chai.use(sinonChai)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {
    it('存在.', () => {
        expect(Popover).to.be.exist
    })
    it('可以设置position', () => {
        const wrapper = mount(Popover,{
            slots:{
                default:{template:`<button>点我</button>`},
                content:'弹出内容'
            },
            propsData:{
                position:'bottom'
            }
        })
        wrapper.find('button').trigger('click');
        let classes = wrapper.find('.gulu-popover-content-wrapper').classes()
        expect(classes).to.include('position-bottom')
    })

    /* 遗留问题 无法触发hover */
    it('可以设置 trigger', () => {
        const wrapper = mount(Popover,{
            slots:{
                default:{template:`<button>点我</button>`},
                content:'弹出内容'
            },
            propsData:{
                position:'bottom',
                trigger:'hover'
            }
        })
        expect(wrapper.find('.gulu-popover-content-wrapper').element).to.not.exist
        wrapper.find('.popover').trigger('mouseenter');
        expect(wrapper.find('.gulu-popover-content-wrapper').element).to.exist
    })

})