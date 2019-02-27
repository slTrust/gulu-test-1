let onClickDocument = (e)=>{
    let {target} = e;
    callbacks.forEach((item)=>{
        // item.el item.callback
        if(target === item.el || item.el.contains(target)){
            console.log('inside')
            return
        }else{
            console.log('outside')
            // 调用传递的函数
            item.callback()
        }

    });

}

document.addEventListener('click',onClickDocument)

let callbacks =[] ; // [{el:el,callback:cb}]
export default {
    // 当被绑定的元素插入到 DOM 中时……
    bind: function (el,binding,vnode) {
        callbacks.push({el,callback:binding.value})
    }
}

let removeListener = ()=>{
    document.removeEventListener('click',onClickDocument)
}

export {removeListener}

/*
<div class="cascader" ref="cascader" v-click-outside="close">
import ClickOutside from './click-outside'

export default{

    directives:{
        ClickOutside
    },
    methods:{
        close(){

        }
    }
}
*/