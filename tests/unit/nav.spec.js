import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Nav from '../../src/nav/nav'
import NavItem from '../../src/nav/nav-item'
import SubNav from '../../src/nav/sub-nav'
import Vue from "vue";


describe('Nav.vue', () => {
    it('存在', () => {
        expect(Nav).to.be.exist
    })

    it('支持 selected 属性', (done) => {
        Vue.component('g-nav-item',NavItem)
        Vue.component('g-sub-nav',SubNav)
        const wrapper = mount(Nav,{
            propsData:{
                selected:'home'
            },
            slots:{
                default:`
                    <g-nav-item name="home">
                        首页
                    </g-nav-item>
                    <g-sub-nav name="learn">
                        <template slot="title">学习</template>
                        <g-nav-item name="java">后端学习</g-nav-item>
                        <g-nav-item name="linux">运维学习</g-nav-item>
                    </g-sub-nav>
                    <g-nav-item name="about">关于</g-nav-item>
                `
            }
        })

        setTimeout(()=>{
            // console.log( wrapper.html())
            expect(wrapper.find('[data-name="home"].selected').exists()).to.be.true
            done()
        })
    })

    it('会触发 update:selected事件', (done) => {
        Vue.component('g-nav-item',NavItem)
        Vue.component('g-sub-nav',SubNav)
        const callback = sinon.fake()
        const wrapper = mount(Nav,{
            propsData:{
                selected:'home'
            },
            slots:{
                default:`
                     <g-nav-item name="home">
                        首页
                    </g-nav-item>
                    <g-sub-nav name="learn">
                        <template slot="title">学习</template>
                        <g-nav-item name="java">后端学习</g-nav-item>
                        <g-nav-item name="linux">运维学习</g-nav-item>
                    </g-sub-nav>
                    <g-nav-item name="about">关于</g-nav-item>
                `
            },
            listeners:{
                'update:selected':callback
            }
        })
        wrapper.find('[data-name="java"]').trigger('click');
        // console.log( wrapper.html())
        expect(callback).to.have.been.calledWith('java');
        done()
    })



})