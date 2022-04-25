import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
import instance from '@/api/axios'
Vue.prototype.$axios = instance

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
