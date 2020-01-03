import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'
import IncomeQuery from '@/components/IncomeQuery.vue'
import InvestmentQuery from '@/components/InvestmentQuery.vue'
import RetirementBase from '@/components/RetirementBase.vue'
import RetirementResults from '@/components/RetirementResults.vue'

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/income', component: IncomeQuery },
    { path: '/invest', component: InvestmentQuery },
    { path: '/results', component: RetirementResults },
    { path: '/retirement', component: RetirementBase }
  ]
})
