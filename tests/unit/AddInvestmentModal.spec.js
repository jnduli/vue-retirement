import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import VueRouter from 'vue-router'

import AddInvestmentModal from '@/components/AddInvestmentModal'
import router from '@/routes'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueRouter)

describe('Retirement Base', () => {
  it('successfully adds investment', () => {
    const wrapper = shallowMount(AddInvestmentModal, {
      localVue,
      router
    })
    wrapper.vm.$parent = {
      close: jest.fn()
    }
    wrapper.setData({
      name: 'money banks',
      contribution: 10
    })
    wrapper.find('#add').trigger('click')
    expect(wrapper.emitted().addInvestment).toBeTruthy()
    expect(wrapper.vm.$parent.close.mock.calls.length).toBe(1)
  })

  it('Successfully cances investment modal', () => {
    const wrapper = shallowMount(AddInvestmentModal, {
      localVue,
      router
    })
    wrapper.vm.$parent = {
      close: jest.fn()
    }
    wrapper.find('#cancel').trigger('click')
    expect(wrapper.vm.$parent.close.mock.calls.length).toBe(1)
  })

  it('Cannot add incomplete investment', () => {
    const wrapper = shallowMount(AddInvestmentModal, {
      localVue,
      router
    })
    wrapper.vm.$parent = {
      close: jest.fn()
    }
    wrapper.find('#add').trigger('click')
    expect(wrapper.vm.$parent.close.mock.calls.length).toBe(0)
  })

  it('Successfully opens editted investment modal', () => {
    const wrapper = shallowMount(AddInvestmentModal, {
      localVue,
      router,
      propsData: {
        investment: {
          type: 'fixed',
          interest_type: 'simple',
          interest: 20,
          percentage: 10,
          distribution: '',
          contribution: 10,
          starting_amount: 1000
        },
        investments: []
      }
    })
    wrapper.vm.$parent = {
      close: jest.fn()
    }
    expect(wrapper.vm.name).toBe('fixed')
    wrapper.find('#edit').trigger('click')
    expect(wrapper.vm.$parent.close.mock.calls.length).toBe(1)
  })
})
