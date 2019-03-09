import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Validator from '../../src/validate'

describe('Validator', () => {
    it('存在', () => {
        expect(Validator).to.be.exist
    })

    it('required(必填项) true 不通过报错 ',()=>{
        let data = {
            email:''
        }

        let rules = [
            {key:'email',required:true}
        ]
        let validator = new Validator()
        let errors = validator.validate(data,rules)
        expect(errors.email.required).to.eq('必填')
    })

    it('required(必填项) true 不通过报错 考虑 email is number 0的情况',()=>{
        let data = {
            email:0
        }

        let rules = [
            {key:'email',required:true}
        ]
        let validator = new Validator()
        let errors = validator.validate(data,rules)
        expect(errors.email).to.not.exist
    })

    it('pattern  用户自己的 email 正则 验证错误的邮箱',()=>{
        let data = {
            email:'@hjx.com'
        }

        let rules = [
            {key:'email',pattern: /^.+@.+$/}
        ]
        let validator = new Validator()
        let errors = validator.validate(data,rules)
        expect(errors.email.pattern).to.eq('格式不正确')
    })

    it('pattern  用户自己的 email 正则 验证正确的邮箱',()=>{
        let data = {
            email:'abc@hjx.com'
        }

        let rules = [
            {key:'email',pattern: /^.+@.+$/}
        ]
        let validator = new Validator()
        let errors = validator.validate(data,rules)
        expect(errors.email).to.not.exist
    })

    it('pattern:"email" 默认给我校验邮箱  ，输入邮箱为错误的邮箱格式',()=>{
        let data = {
            email:'@hjx.com'
        }

        let rules = [
            {key:'email',pattern:'email'}
        ]
        let validator = new Validator()
        let errors = validator.validate(data,rules)
        expect(errors.email.pattern).to.eq('格式不正确')
    })

    it('email 写pattern:"email" 默认给我校验邮箱  ，输入邮箱为正确的邮箱格式',()=>{
        let data = {
            email:'123@hjx.com'
        }

        let rules = [
            {key:'email',pattern:'email'}
        ]
        let validator = new Validator()
        let errors = validator.validate(data,rules)
        expect(errors.email).to.not.exist
    })

    it('required & pattern ',()=>{
        let data = {
            email:''
        }

        let rules = [
            {key:'email',pattern:'email',required:true}
        ]
        let validator = new Validator()
        let errors = validator.validate(data,rules)
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
        let validator = new Validator()
        let errors = validator.validate(data,rules)
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
        let validator = new Validator()
        let errors = validator.validate(data,rules)
        expect(errors.email.maxLength).to.exist
    })

    it(' many keys  ',()=>{
        let data = {
            email:'1234567890111111'
        }

        let rules = [
            {key:'email',required:true,pattern:'email',maxLength:10,minLength: 5,
                hasNumber:true,hasLowerCaseAndUpperCase:true,hasDot:true,hasUnderscore:true,
                hasFrank:true
            }
        ]
        // let errors = Validator(data,rules)
        // expect(errors.email.required).to.exist
        // expect(errors.email.maxLength).to.not.exist
        // expect(errors.email.minLength).to.exist
        let errors
        let validator = new Validator()
        let fn = ()=>{
            errors = validator.validate(data,rules)
        }
        // 如果规则不存在 期待报错
        expect(fn).to.throw()

    })

    it(' 用户自定义校验规则',()=>{
        let data = {
            email:'abc'
        }

        let rules = [
            { key:'email',required:true, hasNumber:true }
        ]
        let errors
        let validator = new Validator()
        // 在自己的实例上操作 避免影响其他实例
        validator.hasNumber = (value)=>{
            if(!/\d/.test(value)){
                return '必须含有数字'
            }
        }
        let fn = ()=>{
            errors = validator.validate(data,rules)
        }
        // 如果规则不存在 期待报错
        expect(fn).to.not.throw()
        expect(errors.email.hasNumber).to.eq('必须含有数字')

    })

    it('两个 validator 互不影响',()=>{
        let data = {
            email:'abc'
        }

        let rules = [
            { key:'email',required:true, hasNumber:true }
        ]

        let validator1 = new Validator()
        let validator2 = new Validator()
        // 在自己的实例上操作 避免影响其他实例
        validator1.hasNumber = (value)=>{
            if(!/\d/.test(value)){
                return '必须含有数字'
            }
        }
        expect(()=>{
            validator1.validate(data,rules)
        }).to.not.throw()
        expect(()=>{
            validator2.validate(data,rules)
        }).to.throw()

    })

    it(' validator 添加 自定义校验器',()=>{
        let data = {
            email:'abc'
        }

        let rules = [
            { key:'email',required:true, hasNumber:true }
        ]

        let validator1 = new Validator()
        let validator2 = new Validator()
        // 在自己的实例上操作 避免影响其他实例
        Validator.add('hasNumber',  (value)=>{
            if(!/\d/.test(value)){
                return '必须含有数字'
            }
        })
        expect(()=>{
            validator1.validate(data,rules)
        }).to.not.throw()
        expect(()=>{
            validator2.validate(data,rules)
        }).to.not.throw()

    })

})