import { mount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import VueRouter from 'vue-router'

import AddInvestmentModal from '@/components/AddInvestmentModal'
import router from '@/routes'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueRouter)

const mockParent = {
  close: jest.fn()
}

describe('Retirement Base', () => {
  it('successfully adds investment', () => {
    const wrapper = mount(AddInvestmentModal, {
      localVue,
      router
    })
    wrapper.vm.$parent = mockParent
    wrapper.setData({
      name: 'money banks',
      contribution: 10
    })
    wrapper.find('#add').trigger('click')
    expect(wrapper.emitted().addInvestment).toBeTruthy()
    expect(wrapper.vm.$parent.close.mock.calls.length).toBe(1)
  })
})
