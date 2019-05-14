import { RouterLinkStub, mount, shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'
import RetirementBase from '@/components/RetirementBase.vue'

describe('Home Page', () => {
  it('renders explanation message', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.text()).toContain('help you')
  })

  it('contains button to retirement application', () => {
    const wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    console.log(wrapper.html())
    const button = wrapper.find('#retirement-button')
    expect(button.attributes().class).toBe('button')
  })
})
