import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'
import RetirementBase from '@/components/RetirementBase.vue'

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/retirement', component: RetirementBase }
  ]
})
