import Vue from 'vue'
import App from './App.vue'
import router from './router'

import alert from '@/common/alert'

Vue.prototype.$alert = alert

//导入全局样式
import './assets/css/global.css'

//导入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'zico/css/zico.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
