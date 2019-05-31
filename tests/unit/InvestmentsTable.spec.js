import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import VueRouter from 'vue-router'

import InvestmentsTable from '@/components/InvestmentsTable'
import router from '@/routes'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueRouter)

describe('InvestmentsTable', () => {
  it('successfully shows investments', () => {
    const investments = [{
      type: 'fixed',
      interest_type: 'simple',
      interest: 20,
      percentage: 10,
      distribution: '',
      contribution: 10,
      starting_amount: 1000
    }, {
      type: 'savings',
      interest_type: 'compound',
      interest: 20,
      percentage: 10,
      distribution: '',
      contribution: 10,
      starting_amount: 0
    }
    ]
    const wrapper = shallowMount(InvestmentsTable, {
      localVue,
      router,
      propsData: {
        investments: investments
      }
    })
    const columns = wrapper.findAll('tbody tr')
    expect(columns.length).toBe(2)
  })
  it('successfully removes investments', () => {
    const investments = [{
      type: 'fixed',
      interest_type: 'simple',
      interest: 20,
      percentage: 10,
      distribution: '',
      contribution: 10,
      starting_amount: 1000
    }]
    const wrapper = shallowMount(InvestmentsTable, {
      localVue,
      router,
      propsData: {
        investments: investments
      }
    })
    const buttons = wrapper.findAll('button')
    // There should only be two buttons, edit and delete
    buttons.at(1).trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()['remove-investment']).toBeTruthy()
  })
})
