import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import Slides from '@/slides.vue'
import SlidesItem from '@/slides-item.vue'
import Vue from 'vue'
chai.use(sinonChai)

describe('Slides.vue', () => {
    it('存在.', () => {
        expect(Slides).to.be.exist
    })

    it('接受 GuluSlidesItem 默认展示第一个',(done)=>{
        Vue.component('GSlidesItem',SlidesItem)
        const wrapper = mount(Slides,{
            propsData:{
                autoPlay:false
            },
            slots:{
                default:`
                        <g-slides-item name="1">
                            <div class="box1">1</div>
                        </g-slides-item>
                        <g-slides-item name="2">
                            <div class="box2">2</div>
                        </g-slides-item>
                        <g-slides-item name="3">
                            <div class="box3">3</div>
                        </g-slides-item>
                `
            }
        })
        setTimeout(()=>{
            expect(wrapper.find('.box1').exists()).to.be.true
            done()
        },333)
    })

    it('selected 是几选中的就是几',(done)=>{
        Vue.component('GSlidesItem',SlidesItem)
        const wrapper = mount(Slides,{
            propsData:{
                autoPlay:false,
                selected:'2'
            },
            slots:{
                default:`
                        <g-slides-item name="1">
                            <div class="box1">1</div>
                        </g-slides-item>
                        <g-slides-item name="2">
                            <div class="box2">2</div>
                        </g-slides-item>
                        <g-slides-item name="3">
                            <div class="box3">3</div>
                        </g-slides-item>
                `
            }
        })
        setTimeout(()=>{
            expect(wrapper.find('.box2').exists()).to.be.true
            done()
        },333)
    })

    it('点击第二个就展示第二个',(done)=>{
        Vue.component('GSlidesItem',SlidesItem)
        const wrapper = mount(Slides,{
            propsData:{
                autoPlay:false,
                selected:'1'
            },
            slots:{
                default:`
                        <g-slides-item name="1">
                            <div class="box1">1</div>
                        </g-slides-item>
                        <g-slides-item name="2">
                            <div class="box2">2</div>
                        </g-slides-item>
                        <g-slides-item name="3">
                            <div class="box3">3</div>
                        </g-slides-item>
                `
            },
            listeners:{
                'update:selected':(x)=>{
                    expect(x).to.be.eq('2')
                    done()
                }
            }
        })
        setTimeout(()=>{
            wrapper.find('[data-index="1"]').trigger('click')
        },333)
    })

    it('测试 autoPlay',(done)=>{
        Vue.component('GSlidesItem',SlidesItem)
        const callback = sinon.fake()
        const wrapper = mount(Slides,{
            propsData:{
                autoPlay:true,
                selected:'1',
                autoPLayDelay:500
            },
            slots:{
                default:`
                        <g-slides-item name="1">
                            <div class="box1">1</div>
                        </g-slides-item>
                        <g-slides-item name="2">
                            <div class="box2">2</div>
                        </g-slides-item>
                        <g-slides-item name="3">
                            <div class="box3">3</div>
                        </g-slides-item>
                `
            },
            listeners:{
                'update:selected':callback
            }
        })
        setTimeout(()=>{
            expect(callback).to.have.been.calledWith('2')
            done()
        },500)
    })

    xit('可以点击上一张',()=>{})
    xit('可以点击下一张',()=>{})

})