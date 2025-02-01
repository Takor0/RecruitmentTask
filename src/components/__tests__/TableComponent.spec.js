// tests/unit/PaginationComponent.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PaginationComponent from '@/components/PaginationComponent.vue'
import IconComponent from '@/components/IconComponent.vue'

describe('PaginationComponent', () => {
  const totalPages = 5

  it('renders the correct number of page buttons', () => {
    const wrapper = mount(PaginationComponent, {
      props: { modelValue: 1, totalPages },
    })
    const pageButtons = wrapper.findAll('.pagination-page')
    expect(pageButtons.length).toBe(totalPages)
  })

  it('disables the left button when on the first page', () => {
    const wrapper = mount(PaginationComponent, {
      props: { modelValue: 1, totalPages },
    })
    const leftBtn = wrapper.find('button:first-of-type')
    expect(leftBtn.attributes('disabled')).toBeDefined()
  })

  it('disables the right button when on the last page', () => {
    const wrapper = mount(PaginationComponent, {
      props: { modelValue: totalPages, totalPages },
    })
    const rightBtn = wrapper.find('button:last-of-type')
    expect(rightBtn.attributes('disabled')).toBeDefined()
  })

  it('emits update:modelValue when a page is clicked', async () => {
    const wrapper = mount(PaginationComponent, {
      props: { modelValue: 2, totalPages },
    })
    const pageButtons = wrapper.findAll('.pagination-page')
    await pageButtons[3].trigger('click') // click page number 4
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([4])
  })

  it('emits update:modelValue when navigation arrows are clicked', async () => {
    // Test going to next page from page 2.
    const wrapper = mount(PaginationComponent, {
      props: { modelValue: 2, totalPages },
    })
    const rightBtn = wrapper.find('button:last-of-type')
    await rightBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([3])
  })
})
