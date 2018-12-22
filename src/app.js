import Vue from 'vue';
import Button from './button';
import Icon from './icon';
import ButtonGroup from './button-group';
import Input from './input';

Vue.component('g-button',Button);
Vue.component('g-icon',Icon);
Vue.component('g-button-group',ButtonGroup);
Vue.component('g-input',Input);


new Vue({
    el:'#app',
    data:{
        loading1:false,
        loading2:false,
        loading3:false,
        msg:'hello'
    },
    created(){
        // 3秒后在我们自己的这个 input上触发 change 事件
        /*
        setTimeout(()=>{
            let event = new Event('change');
            let inputElement = this.$el.querySelector('#aaa input');
            inputElement.dispatchEvent(event);
            console.log('hi');
        },3000)
        */
    },
    methods:{
        inputChange(e){
            console.log(e);
            console.log(e.target.value);
        }
    }
})
