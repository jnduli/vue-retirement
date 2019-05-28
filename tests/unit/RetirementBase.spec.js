import { mount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import VueRouter from 'vue-router'

import RetirementBase from '@/components/RetirementBase.vue'
import router from '@/routes'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueRouter)

describe('Retirement Base', () => {
  it('renders income section properly', () => {
    const wrapper = mount(RetirementBase, {
      localVue,
      router
    })
    expect(wrapper.text()).toContain('Income')
    expect(wrapper.text()).toContain('Expected Years')
    expect(wrapper.text()).toContain('Retirement Expenses')
    expect(wrapper.text()).toContain('Monthly Expenses')
  })

  it('shows add invesment form', () => {
    const wrapper = mount(RetirementBase, {
      localVue,
      router
    })
    const add = wrapper.find('#add-investment')
    add.trigger('click')
    expect(wrapper.vm.isAddInvestmentModalActive).toBe(true)
  })
})
