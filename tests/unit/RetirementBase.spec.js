import { mount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import RetirementBase from '@/components/RetirementBase.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('Retirement Base', () => {
  it('renders income section properly', () => {
    const wrapper = mount(RetirementBase, {
      localVue
    })
    expect(wrapper.text()).toContain('Choose between % or Ksh')
    expect(wrapper.text()).toContain('Income')
    expect(wrapper.text()).toContain('Expected Years')
    expect(wrapper.text()).toContain('Retirement Expenses')
    expect(wrapper.text()).toContain('Monthly Expenses')
  })

  it('can display added investment', () => {
    const investments = [
      {
        type: 'Bank Savings Account',
        interest_type: 'simple',
        interest: 10.00,
        distribution: '',
        percentage: 57
      }
    ]
    const wrapper = mount(RetirementBase, {
      localVue
    })
    // console.log(wrapper.vm.$data)
    // wrapper.setData({ investments: investments })
    expect(wrapper.text()).toContain('57')
  })
})
