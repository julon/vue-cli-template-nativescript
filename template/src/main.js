import Vue from 'nativescript-vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  render: h => h('app'),
  template: '<App/>'
}).$start()