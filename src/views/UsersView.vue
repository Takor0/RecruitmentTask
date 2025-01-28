<template>
  <div>
    <h1>
      User list
    </h1>
    <div class="bg-white">
      <div class="flex flex-row justify-between h-5">
        <span class="flex flex-row gap-2">
          <input
            v-model="searchUser"
            type="text"
            id="input-field"
            placeholder="Search for users"
          />
          <IconComponent style="width: 10px;" icon="search" />
        </span>
        <ButtonComponent @click="router.push({name: 'user', params: {id:'new'}})">
          <IconComponent class="w-3" icon="plus" />
          Add User
        </ButtonComponent>
      </div>
      <button>Add User</button>
      <TableComponent
        :handle-delete="deleteUser"
        :handle-edit="editUser"
        v-bind="tableBind"
        :data=filteredUsers
      >
        <template #c__avatar="{row}">
          <img :src="row.avatar" alt="avatar" />
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


// Lifecycle Hook
onMounted(() => {
  fetchUsers()
})
</script>
