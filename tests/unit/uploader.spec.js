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

    it('可以上传一个文件', () => {
        http.post = (url,options)=>{
            console.log('假的post')
            setTimeout(function(){
                options.success({id:'21332131'});
                // done();
            },1000)
        }
        const wrapper = mount(Uploader,{
            propsData: {
                name:'file',
                action:'/upload',
                method:'post',
                parseResponse:()=>{},
                fileList:[],
            },
            slots:{
                default:`<button id="xxxx">上传</button>`,
            },
            listeners:{
                'update:fileList':(fileList)=>{
                    wrapper.setProps({fileList})
                }
            }
        });
        console.log(wrapper.html())
        wrapper.find('#xxxx').trigger('click');
        console.log(wrapper.html())

        let inputWrapper = wrapper.find('input[type="file"]');
        let input = inputWrapper.element;
        let file1 = new File(['xxxxxxxxx'], 'xxx.txt');
        let file2 = new File(['yyyyyyyyy'], 'yyy.txt');

        const data = new DataTransfer()
        data.items.add(file1)
        data.items.add(file2);
        input.files = data.files;
        console.log('hi');


    });






})