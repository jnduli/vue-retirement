import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import router from '@/routes'

import App from './App.vue'

Vue.use(VueRouter)
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
