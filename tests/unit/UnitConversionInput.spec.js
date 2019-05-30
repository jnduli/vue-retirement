import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import VueRouter from 'vue-router'

import UnitConversionInput from '@/components/UnitConversionInput'
import router from '@/routes'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueRouter)

describe('UnitConversionInput', () => {
  it('successfully renders units and unit changes', () => {
    const wrapper = shallowMount(UnitConversionInput, {
      localVue,
      router,
      propsData: {
        label: 'Expenses',
        fractionalMoney: {
          currency: 1000,
          percent: 10,
          use_percent: true
        },
        mainMoney: 10000
      }
    })
    const button = wrapper.find('button')
    expect(button.text()).toBe('%')
    button.trigger('click')
    expect(button.text()).toBe('Ksh')
  })

  it('Successfully changes currency when percent is changed', () => {
    const wrapper = shallowMount(UnitConversionInput, {
      localVue,
      router,
      propsData: {
        label: 'Expenses',
        fractionalMoney: {
          currency: 1000,
          percent: 10,
          use_percent: true
        },
        mainMoney: 10000
      }
    })
    wrapper.vm.fractionalMoney.percent = 20
    expect(wrapper.vm.fractionalMoney.currency).toBe(2000)
  })

  it('successfully changes percent when currency is changed', () => {
    const wrapper = shallowMount(UnitConversionInput, {
      localVue,
      router,
      propsData: {
        label: 'Expenses',
        fractionalMoney: {
          currency: 1000,
          percent: 10,
          use_percent: false 
        },
        mainMoney: 10000
      }
    })
    wrapper.vm.fractionalMoney.currency = 2000
    expect(wrapper.vm.fractionalMoney.percent).toBe(20)
  })
})
