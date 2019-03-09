class Validator{
    static add(name,fn){
        // 添加到原型上
        Validator.prototype[name] = fn
    }
    constructor() {}

    validate(data,rules){
        let errors = {}
        rules.forEach((rule)=>{
            // 表单的值
            let value = data[rule.key]
            if(rule.required){
                console.log('required')
                let error = this.required(value)
                if(error){
                    ensureObject(errors,rule.key)
                    errors[rule.key].required = error
                    return
                }
            }
            // 遍历 validators 并逐一调用对应的函数
            let validators = Object.keys(rule).filter(key => key !== 'key' && key !== 'required' )
            validators.forEach((validatorKey)=>{
                // validatorKey is minLength / maxLength / hasNumber
                if(this[validatorKey]){
                    let error =  this[validatorKey](value,rule[validatorKey])
                    if(error){
                        ensureObject(errors,rule.key)
                        errors[rule.key][validatorKey] = error
                    }
                }else{
                    // 规则不存在 报错
                    console.log(`不存在的校验器=>${validatorKey}`)
                    throw `不存在的校验器=>${validatorKey}`
                }

            })
        })
        return errors
    }

    required(value){
        if(!value && value !== 0){
            return '必填'
        }
    }

    pattern (value,pattern){
        if(pattern === 'email'){
            pattern = /^.+@.+$/
        }
        // 正则验证邮箱
        if( pattern.test(value) === false){
            return '格式不正确'
        }
    }

    minLength(value,minLength){
        if(value.length < minLength){
            return '太短'
        }
    }

    maxLength(value,maxLength){
        if(value.length > maxLength){
            return '太长'
        }
    }
}

export default Validator

function ensureObject(obj,key) {
    if(typeof  obj[key] !== "object"){
        obj[key] = {}
    }
}

