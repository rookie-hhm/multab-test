import Vue from 'vue'
import App from './App.vue'
// import mulUI from '../../dist/es/index'

import { Test } from '../../dist/es/index'
// console.log(MultiTabItem, MultiTab, 'mulUI')
console.log(Test, 'te1231213st')
Vue.config.productionTip = false
// Vue.use(mulUI)
// Vue.use(MultiTab).use(MultiTabItem)
new Vue({
  render: h => h(App)
}).$mount('#app')
