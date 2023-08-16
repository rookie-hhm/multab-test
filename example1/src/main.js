import Vue from 'vue'
import App from './App.vue'
// import mulUI from '../../dist/es/index'

// import { MultiTabItem, MultiTab } from '../../dist/es/index'
import { filter } from 'lodash-es'
import { Test } from '../../dist/es/index'
console.log(filter, 'filter')
// console.log(MultiTabItem, MultiTab, 'mulUI')
console.log(Test, 'te1231213st')
Vue.config.productionTip = false
Vue.use(Test)
// Vue.use(mulUI)
// Vue.use(MultiTab).use(MultiTabItem)
new Vue({
  render: h => h(App)
}).$mount('#app')
