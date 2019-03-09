export default function validate(data,rules) {
    let errors = {}
    rules.forEach((rule)=>{
        // 表单的值
        let value = data[rule.key]
        if(rule.required){
            // !0 实际是 true 所以要同时判断 0 的情况
            if(!value && value !== 0){
                errors[rule.key] = {required :'必填'}
                return
            }
        }
        if(rule.pattern){
            if(rule.pattern === 'email'){
                rule.pattern = /^.+@.+$/
            }
            // 正则验证邮箱
            if( rule.pattern.test(value) === false){
                ensureObject( errors,rule.key)
                errors[rule.key].pattern = '格式不正确'
            }
        }

        if(rule.minLength){
           if(value.length < rule.minLength){
               ensureObject( errors,rule.key)
               errors[rule.key].minLength = '太短'
           }
        }
    })
    return errors
}

function ensureObject(obj,key) {
    if(typeof  obj[key] !== "object"){
        obj[key] = {}
    }
}