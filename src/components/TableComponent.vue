<template>
  <div class="table-wrapper w-full">
    <table class="w-full">
      <thead>
      <tr>
        <th
          v-for="column in tableColumns"
          :class="{ 'cursor-pointer': isSortableColumn(column) }"
          class="capitalize py-4 text-left pl-3"
          @click="setSort(column)"
          :key="column"
        >
          {{ getHeading(column) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in tableData" :key="row.id">
        <td
          class="pl-3"
          v-for="column in tableColumns"
          :key="column"
        >
          <div class="flex flex-row h-12 my-2 items-center">
            <slot :name="`c__${column}`" v-bind="{row, index}">
              <div
                v-if="column === 'action' && shouldDisplayActions"
                class="flex flex-row content-center gap-4"
              >
                <button-component
                  v-if="handleEdit"
                  @click="handleEdit(row.id)"
                  icon="edit"
                />
                <button-component
                  v-if="handleDelete"
                  @click="deleteRow(row.id)"
                  icon="trash" />
              </div>
              <div v-else>
                {{ getCellValue(row, column) }}
              </div>
            </slot>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <pagination-component
      :total-pages="totalPages"
      v-model="currentPage"
    />
  </div>
</template>
<script setup>
import PaginationComponent from '@/components/PaginationComponent.vue'
import { defineProps, computed, ref } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { compareValues } from '@/utils/common.js'

const props = defineProps({
  handleDelete: Function,
  handleEdit: Function,
  perPage: {
    type: Number,
    default: 8
  },
  columns: {
    type: Array,
    default: () => []
  },
  headings: {
    type: Object,
    default: () => {
    }
  },
  data: {
    type: Array,
    default: () => []
  },
  cellProcessors: {
    type: Object,
    default: () => {
    }
  },
  sortExcludeColumns: {
    type: Array,
    default: () => []
  }
})

const sortColumns = ref({})
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(props.data.length / props.perPage))

const sortedData = computed(() => {
  if (Object.keys(sortColumns.value).length === 0) {
    return props.data
  }
  return [...props.data].sort((a, b) => {
    for (const column in sortColumns.value) {
      const sort = sortColumns.value[column]
      return compareValues(
        getCellValue(a, column),
        getCellValue(b, column),
        sort
      )
    }
    return 0
  })
})

const tableData = computed(() => {
  const start = (currentPage.value - 1) * props.perPage
  const end = start + props.perPage
  return sortedData.value.slice(start, end)
})

const shouldDisplayActions = computed(() => {
  const actionHandlers = [props.handleDelete, props.handleEdit]
  return actionHandlers.some((handler) => handler !== undefined)
})

const tableColumns = computed(() => {
  const columns = props.columns
  if (!columns.includes('action') && shouldDisplayActions.value) {
    columns.push('action')
  }
  return columns
})

const getHeading = (column) => {
  const heading = props.headings[column]
  return heading || heading === '' ? heading : column
}

const getCellValue = (row, column) => {
  const processor = props.cellProcessors?.[column]
  const value = processor ? processor(row) : row[column]
  return value || ''
}

const isSortableColumn = (column) => {
  return !props.sortExcludeColumns.includes(column) && column !== 'action'
}

const setSort = (column) => {
  if (!isSortableColumn(column)) {
    return
  }
  const currentSort = sortColumns.value?.[column]
  sortColumns.value[column] = currentSort === 'asc' ? 'desc' : 'asc'
}

const deleteRow = async (id) => {
  const shouldDeleteRow = await confirm({
    message: 'Are you sure you want to delete this row?'
  })
  if (shouldDeleteRow) {
    props.handleDelete(id)
  }
}

</script>
<style scoped lang="scss">
@use "@/styles/colors" as colors;

table {
  thead tr {
    color: colors.$gray-500;
  }

  tbody {
    tr:nth-child(odd) {
      background-color: colors.$gray-100;
    }
  }
}

</style>


