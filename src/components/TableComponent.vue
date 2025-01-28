<template>
  <div class="table w-full">
    <div class="table__content-wrapper">
      <div class="table__wrapper">
        <table class="w-full">
          <thead>
          <tr>
            <th class="capitalize text-left" v-for="column in tableColumns" :key="column">
              {{ getHeading(column) }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, index) in tableData" :key="row.id">
            <td v-for="column in tableColumns" :key="column">
              <div class="flex flex-row h-6 my-3">
                <slot :name="`c__${column}`" v-bind="{row, index}">
                  <div
                    v-if="column === 'action' && shouldDisplayActions"
                    class="flex flex-row content-center"
                  >
                    <ButtonComponent
                      v-if="handleDelete"
                      @click="deleteRow(row.id)"
                      icon="trash" />
                    <ButtonComponent
                      v-if="handleEdit"
                      @click="handleEdit(row.id)"
                      icon="edit"
                    />
                  </div>
                  <div v-else>
                    {{ row[column] }}
                  </div>
                </slot>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <PaginationComponent
        :total-pages="totalPages"
        v-model="currentPage"
      />
    </div>
  </div>
</template>
<script setup>
import PaginationComponent from '@/components/PaginationComponent.vue'
import { defineProps, computed, ref } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const currentPage = ref(1)
const props = defineProps({
  handleDelete: Function,
  handleEdit: Function,
  perPage: {
    type: Number,
    default: 10
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
  }
})

const totalPages = computed(() => Math.ceil(props.data.length / props.perPage))
const tableData = computed(() => {
  const start = (currentPage.value - 1) * props.perPage
  const end = start + props.perPage
  return props.data.slice(start, end)
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

const deleteRow = async (id) => {
  const shouldDeleteRow = await confirm({
    message: 'Are you sure you want to delete this row?'
  })
  if (shouldDeleteRow) {
    props.handleDelete(id)
  }
}

</script>
<style lang="scss">
.table {
  $paginator-height: 25px;
  $table-paginator-gap: 10px;
  margin-bottom: $paginator-height + $table-paginator-gap;

  &__content-wrapper {
    position: relative;

    tbody tr:nth-child(odd) {
      background-color: #f9f9f9;
    }

    &__wrapper {
      width: 100%;
    }
  }


  .pagination-wrapper {
    height: $paginator-height;
    background-color: white;
    margin-top: $table-paginator-gap;
    position: absolute;
  }
}
</style>


