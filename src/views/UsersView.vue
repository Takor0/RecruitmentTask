<template>
  <div class="users-view relative">
    <h1 class="mb-5 view-title">
      User list
    </h1>
    <div class="bg-white default-container">
      <div class="flex flex-row justify-between items-center gap-3">
        <input-component
          is-filter
          class="search-input"
          v-model="searchUser"
          type="text"
          placeholder="Search for users..."
          append-icon="search"
        />
        <button-component @click="router.push({name: 'user', params: {id:'new'}})">
          <icon-component class="h-3" icon="plus" />
          Add User
        </button-component>
      </div>
      <table-component
        :sort-exclude-columns="['avatar']"
        :handle-delete="deleteUser"
        :handle-edit="editUser"
        v-bind="tableBind"
        :data=filteredUsers
        :cell-processors="{
          full_name: (row) => getName(row.first_name, row.last_name)
        }"
      >
        <template #c__avatar="{row}">
          <img class="rounded-full w-12" :src="row.avatar" alt="avatar" />
        </template>
      </table-component>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TableComponent from '@/components/table/TableComponent.vue'
import IconComponent from '@/components/common/IconComponent.vue'
import UsersService from '@/services/users'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import InputComponent from '@/components/form/InputComponent.vue'
import { useSearchParams } from '@/composables/useSearchParams'

const route = useRoute()
const router = useRouter()

const searchUser = ref(route.query.search || '')
const users = ref([])

const { setSearchParam } = useSearchParams()

const tableBind = {
  columns: ['avatar', 'full_name'],
  headings: {
    avatar: '',
    full_name: 'Full Name'
  }
}


watch(searchUser, (newValue) => {
  setSearchParam('search', newValue)
})


const filteredUsers = computed(() => {
  if (searchUser.value.trim()) {
    return users.value.filter((user) =>
      getName(user.first_name, user.last_name)
        .toLowerCase()
        .includes(searchUser.value.trim().toLowerCase())
    )
  }
  return users.value
})

const getName = (firstName = '', lastName = '') => {
  return `${firstName} ${lastName}`
}

const editUser = (id) => {
  router.push({ name: 'user', params: { id: id } })
}

const fetchUsers = async () => {
  try {
    const { responseData } = await UsersService.listUsers()
    users.value = responseData.data || []
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const deleteUser = async (id) => {
  try {
    await UsersService.deleteUser(id)
    await fetchUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
<style lang="scss">
.users-view {
  .table-wrapper tr {
    td:nth-child(2) {
      width: 80%;
    }

    td:first-child {
      min-width: 40px;
    }
  }

  .search-input {
    width: 100%;
    max-width: 30rem;
  }

  .pagination-wrapper {
    position: absolute;
    left: 0;
    margin-top: 35px;
  }
}
</style>
