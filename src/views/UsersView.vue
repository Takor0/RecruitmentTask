<template>
  <div class="users-view relative">
    <h1 class="mb-4 view-title">
      User list
    </h1>
    <div class="bg-white default-container">
      <div class="flex flex-row justify-between">
        <InputComponent
          is-filter
          class="search-input"
          v-model="searchUser"
          type="text"
          placeholder="Search for users..."
          append-icon="search"
        />
        <ButtonComponent @click="router.push({name: 'user', params: {id:'new'}})">
          <IconComponent class="h-3" icon="plus" />
          Add User
        </ButtonComponent>
      </div>
      <TableComponent
        :handle-delete="deleteUser"
        :handle-edit="editUser"
        v-bind="tableBind"
        :data=filteredUsers
      >
        <template #c__avatar="{row}">
          <img class="rounded-full w-12" :src="row.avatar" alt="avatar" />
        </template>
        <template #c__full_name="{row}">
          {{ getName(row.first_name, row.last_name) }}
        </template>
      </TableComponent>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TableComponent from '@/components/TableComponent.vue'
import IconComponent from '@/components/IconComponent.vue'
import UsersService from '@/services/users'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'


const searchUser = ref('')
const users = ref([])
const router = useRouter()

const tableBind = reactive({
  columns: ['avatar', 'full_name'],
  headings: {
    avatar: '',
    full_name: 'Full Name'
  }
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

const editUser = (index) => {
  router.push({ name: 'user', params: { id: index } })
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
@use "@/styles/variables" as *;

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
