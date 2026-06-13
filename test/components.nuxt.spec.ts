// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'

describe('SiteHeader', () => {
  it('renders all primary nav links', async () => {
    const wrapper = await mountSuspended(SiteHeader)
    const text = wrapper.text()
    for (const label of ['About', 'Programs', 'Coaches', 'Facility', 'Contact']) {
      expect(text).toContain(label)
    }
  })

  it('toggles the mobile menu aria-expanded state on click', async () => {
    const wrapper = await mountSuspended(SiteHeader)
    const toggle = wrapper.get('button[aria-controls="mobile-menu"]')
    expect(toggle.attributes('aria-expanded')).toBe('false')

    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
  })

  it('matches the snapshot', async () => {
    const wrapper = await mountSuspended(SiteHeader)
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('SiteFooter', () => {
  it('matches the snapshot', async () => {
    const wrapper = await mountSuspended(SiteFooter)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
