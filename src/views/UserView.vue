<template>
  <div>
    <h1>Add user</h1>

    <div>
      <label for="firstName">First Name</label>
      <input id="firstName" v-model="firstName" type="text" />
    </div>
    <div>
      <label for="lastName">Last Name</label>
      <input id="lastName" v-model="lastName" type="text" />
    </div>

    <div>
      <div v-if="avatar">
        <img :src="avatar" alt="User Avatar" />
      </div>
      <div v-else>
        <img src="@/assets/avatar.png">
      </div>
      <button type="button">
        <input type="file" @change="handleAvatarChange" />
        Change Photo
      </button>
    </div>
    <ButtonComponent @click="handleSave">
      Update Details
    </ButtonComponent>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UsersService from '@/services/users'
import ButtonComponent from '@/components/ButtonComponent.vue'

const route = useRoute()
const router = useRouter()

const isNewUser = route.params.id === 'new'
const userId = isNewUser ? null : route.params.id

const firstName = ref('')
const lastName = ref('')
const avatar = ref(null)

onMounted(async () => {
  if (userId) {
    try {
      const { responseData } = await UsersService.getUser(userId)
      firstName.value = responseData.data?.first_name || ''
      lastName.value = responseData.data?.last_name || ''
      avatar.value = responseData.data?.avatar || null
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
})


function handleAvatarChange(event) {
  const file = event.target.files[0]
  if (file) {
    avatar.value = URL.createObjectURL(file)
  }
}

async function handleSave() {
  const userData = {
    first_name: firstName.value,
    last_name: lastName.value
  }

  try {
    if (userId) {
      await UsersService.updateUser(userId, userData)
    } else {
      await UsersService.createUser(userData)
    }
    router.push({name:"users"}) // Navigate back to list view
  } catch (error) {
    console.error('Error saving user:', error)
  }
}
</script>
