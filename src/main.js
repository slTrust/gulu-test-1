import Vue from 'vue'
// import App from './demo2-slides.vue'
// import App from './demo-nav.vue'
// import App from './demo-table.vue'
// 升级版 table
import App from './demo-table-pro.vue'
// import App from './demo-upload.vue'
// import App from './demo-sticky.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
