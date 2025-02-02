import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import TableComponent from '@/components/table/TableComponent.vue'

vi.mock('@/utils/common.js', () => ({
  compareValues: (a, b, order = 'asc') => {
    if (a === b) return 0
    if (order === 'asc') return a > b ? 1 : -1
    return a < b ? 1 : -1
  }
}))

const ButtonComponentStub = {
  name: 'ButtonComponent',
  template: '<button @click="$emit(\'click\')"><slot /></button>',
  props: ['icon']
}

const PaginationComponentStub = {
  name: 'PaginationComponent',
  template: '<div class="pagination-stub"></div>',
  props: ['totalPages', 'modelValue']
}

const globalStubs = {
  ButtonComponent: ButtonComponentStub,
  PaginationComponent: PaginationComponentStub
}

describe('TableComponent.vue', () => {
  const columns = ['name', 'age']
  const headings = { name: 'Full Name', age: 'Age' }
  const data = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 }
  ]

  it('renders table rows with correct cell values and applies cellProcessors', () => {
    const cellProcessors = {
      age: (row) => `${row.age} years old`
    }

    const wrapper = mount(TableComponent, {
      props: {
        columns,
        headings,
        data,
        perPage: 2,
        cellProcessors
      },
      global: { stubs: globalStubs }
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)
    const firstRowCells = rows[0].findAll('td')
    expect(firstRowCells[0].text()).toContain('Alice')
    expect(firstRowCells[1].text()).toContain('30 years old')
  })


  it('sorts the data when a sortable column header is clicked', async () => {
    const wrapper = mount(TableComponent, {
      props: {
        columns,
        headings,
        data
      },
      global: { stubs: globalStubs }
    })

    let firstRow = wrapper.find('tbody tr')
    expect(firstRow.text()).toContain('Alice')

    const ageHeader = wrapper.findAll('thead th').filter(th => th.text() === 'Age')[0]
    await ageHeader.trigger('click')
    await nextTick()

    firstRow = wrapper.find('tbody tr')
    expect(firstRow.text()).toContain('Bob')

    await ageHeader.trigger('click')
    await nextTick()
    firstRow = wrapper.find('tbody tr')
    expect(firstRow.text()).toContain('Charlie')
  })
})
