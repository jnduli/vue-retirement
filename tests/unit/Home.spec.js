import { RouterLinkStub, mount, shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'

describe('Home Page', () => {
  it('renders explanation message', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.text()).toContain('STAAFU')
    expect(wrapper.text()).toContain('help you')
  })

  it('contains button to retirement application', () => {
    const wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    const button = wrapper.find('#retirement-button')
    expect(button.attributes().class).toBe('button')
  })
})
