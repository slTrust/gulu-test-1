const expect = chai.expect;
import Vue from 'vue'
import Toast from '../src/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {
    it('存在.', () => {
        expect(Toast).to.exist
    })

    describe('props',function(){
        // 设置超时时间
        // this.timeout(15000);
        it('接受 autoClose', (done) => {
            let div = document.createElement('div');
            document.body.appendChild(div)
            const Constructor = Vue.extend(Toast);

            // 生成 toast 1秒后消失
            let vm = new Constructor({
                propsData: {
                    autoClose: 1,
                }
            }).$mount(div);
            // 监听 close事件后 是否存在 toast
            vm.$on('close',()=>{
                expect(document.body.contains(vm.$el)).to.equal(false)
                done();
            })
        })

        it('接受 closeButton', () => {
            const callback = sinon.fake();
            const Constructor = Vue.extend(Toast);
            let vm = new Constructor({
                propsData: {
                    closeButton:{
                        text:'关闭吧',
                        callback,
                    },
                }
            }).$mount();
            // console.log(vm.$el.outerHTML) // 打印 toast 的结构
            let closeButton = vm.$el.querySelector('.close');
            expect(closeButton.textContent.trim()).to.eq('关闭吧')
            setTimeout(()=>{
                closeButton.click();
                // 期待 callback被调用
                expect(callback).to.have.been.called;
            },200)

        })

        it('接受 enableHtml', () => {
            const Constructor = Vue.extend(Toast);
            let vm = new Constructor({
                propsData:{
                    enableHtml:true
                }
            });
            vm.$slots.default = ['<strong id="test">hi</strong>']
            vm.$mount();

            // console.log(vm.$el.outerHTML); // 打印 toast 的结构
            let strong = vm.$el.querySelector('#test');

            expect(strong).to.exist;

        })

        it('接受 position', () => {
            const Constructor = Vue.extend(Toast);
            let vm = new Constructor({
                propsData:{
                    position:'bottom'
                }
            });
            vm.$mount();
            // console.log(vm.$el.outerHTML)
            expect(vm.$el.classList.contains('position-bottom')).to.eq(true)

        })
    })







})