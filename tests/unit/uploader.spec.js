import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import Uploader from '../../src/uploader'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import http from '../../src/http'

describe('Uploader.vue', () => {
    it('存在', () => {
        expect(Uploader).to.be.exist
    });

    it('可以上传一个文件', (done) => {
        // http.post = (url,options)=>{
        //     console.log('假的post')
        //     setTimeout(function(){
        //         options.success(JSON.stringify({id:'123123'}));
        //     },100)
        // }

        let stub = sinon.stub(http,'post').callsFake((url,options)=>{
            setTimeout(()=>{
                options.success(JSON.stringify({id:'123123'}));
            },100)
        })
        const wrapper = mount(Uploader,{
            propsData: {
                name:'file',
                action:'/upload',
                method:'post',
                parseResponse:(response)=>{
                    let object =JSON.parse(response)
                    return `/preview/${object.id}`
                },
                fileList:[],
            },
            slots:{
                default:`<button id="xxxx">上传</button>`,
            },
            listeners:{
                'update:fileList':(fileList)=>{
                    wrapper.setProps({fileList})
                },
                'updated':()=>{
                    // 成功之后不该有菊花 loading
                    expect(wrapper.find('use').exists()).to.eq(false)
                    expect(wrapper.find('img').exists()).to.eq(true) // 预览图存在
                    expect(wrapper.find('img').attributes('src')).to.eq(`/preview/123123`) // 预览图链接 等于 这个id

                    // 重置 http.post 因为你改写了 如果你下一个测试用例又用到 http.post 就有问题了
                    stub.restore();
                    done()
                }
            }
        });
        wrapper.find('#xxxx').trigger('click');

        let inputWrapper = wrapper.find('input[type="file"]');
        let input = inputWrapper.element;
        let file1 = new File(['xxxxxxxxx'], 'xxx.txt',{
            type:'image/png'
        });

        const data = new DataTransfer()
        data.items.add(file1)
        // data.items.add(file2);
        input.files = data.files;
        // 解决 input.files 设置后 死活不触发 change事件
        // google 搜索 input file trigger change
        // 答案参考 https://gist.github.com/Lochlan/ccbe22e7c5e80b6d7966
        var event = document.createEvent("UIEvents");
        event.initUIEvent("change", true, true);
        input.dispatchEvent(event);

        console.log(wrapper.html()) // 检查loading
        // 检查有没有 菊花 --- loading

        let use = wrapper.find('use').element;
        expect(use.getAttribute('xlink:href')).to.eq('#i-loading')



    });

    xit('test',()=>{
        // sinon.stub() 返回一个假函数
        // 如果你想让 stub 返回一些东西就 sinon.stub().returns(100)
        http.post = sinon.stub().returns(100);

        let result = http.post()
        console.log(result)
    })

    xit('test',(done)=>{
        // 如果你想让 stub 返回一个异步回调
        http.post = sinon.stub().callsFake(()=>{
            setTimeout(()=>{
                console.log('hi')
                done()
            },200)
        });

        let result = http.post()
        console.log(result)
    })

    it('test2',()=>{
        // 使用 stub 要记得重置 因为 改写了 http.post
        // http.post()

        /*
        let stub = sinon.stub(http,'post').callsFake((url,options)=>{
            setTimeout(()=>{
                options.success(JSON.stringify({id:'123123'}));
            },100)
        })

        stub.restore();
        */
    })






})