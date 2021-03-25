import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'

//导入全局样式
import './assets/css/global.css'
//导入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import request from '@/common/request'
request.baseUrl = "http://localhost:8888/";
Vue.prototype.$http = request;

import showToast from '@/common/showToast'
Vue.prototype.$toast = showToast;

import moment from 'moment'
Vue.prototype.$moment = moment;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
