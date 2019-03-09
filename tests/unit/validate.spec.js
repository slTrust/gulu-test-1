import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import validate from '../../src/validate'

describe('validate', () => {
    it('存在', () => {
        expect(validate).to.be.exist
    })

    it('required(必填项) true 不通过报错 ',()=>{
        let data = {
            email:''
        }

        let rules = [
            {key:'email',required:true}
        ]
        let errors = validate(data,rules)
        expect(errors.email.required).to.eq('必填')
    })

    it('required(必填项) true 不通过报错 考虑 email is number 0的情况',()=>{
        let data = {
            email:0
        }

        let rules = [
            {key:'email',required:true}
        ]
        let errors = validate(data,rules)
        expect(errors.email).to.not.exist
    })

    it('pattern  用户自己的 email 正则 验证错误的邮箱',()=>{
        let data = {
            email:'@hjx.com'
        }

        let rules = [
            {key:'email',pattern: /^.+@.+$/}
        ]
        let errors = validate(data,rules)
        expect(errors.email.pattern).to.eq('格式不正确')
    })

    it('pattern  用户自己的 email 正则 验证正确的邮箱',()=>{
        let data = {
            email:'abc@hjx.com'
        }

        let rules = [
            {key:'email',pattern: /^.+@.+$/}
        ]
        let errors = validate(data,rules)
        expect(errors.email).to.not.exist
    })

    it('pattern:"email" 默认给我校验邮箱  ，输入邮箱为错误的邮箱格式',()=>{
        let data = {
            email:'@hjx.com'
        }

        let rules = [
            {key:'email',pattern:'email'}
        ]
        let errors = validate(data,rules)
        expect(errors.email.pattern).to.eq('格式不正确')
    })

    it('email 写pattern:"email" 默认给我校验邮箱  ，输入邮箱为正确的邮箱格式',()=>{
        let data = {
            email:'123@hjx.com'
        }

        let rules = [
            {key:'email',pattern:'email'}
        ]
        let errors = validate(data,rules)
        expect(errors.email).to.not.exist
    })

    it('required & pattern ',()=>{
        let data = {
            email:''
        }

        let rules = [
            {key:'email',pattern:'email',required:true}
        ]
        let errors = validate(data,rules)
        // A 期待报两个错 errors = { email: { pattern:'格式不正确' , required:'必填'}}
        // B required errors = { email: { required:'必填'}}
        // C pattern errors = { email: { pattern:'格式不正确'}}
        // D 其他

        // 应该是 B required 优先级高
        expect(errors.email.required).to.exist
        expect(errors.email.pattern).to.not.exist
    })

    it('pattern & minLength  ',()=>{
        let data = {
            email:''
        }

        let rules = [
            {key:'email',pattern:'email',minLength:6}
        ]
        let errors = validate(data,rules)
        expect(errors.email.minLength).to.exist
        expect(errors.email.pattern).to.exist
    })

    it(' maxLength  ',()=>{
        let data = {
            email:'1234567890111111'
        }

        let rules = [
            {key:'email',pattern:'email',maxLength:10}
        ]
        let errors = validate(data,rules)
        expect(errors.email.maxLength).to.exist
    })

})