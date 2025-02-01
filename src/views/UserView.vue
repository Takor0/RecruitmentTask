<template>
  <div class="user-view">
    <h1 class="mb-4 view-title">
      Add user
    </h1>
    <div class="flex flex-row-reverse flex-wrap gap-7">
      <div
        class="flex flex-column flex-1 bg-white flex-wrap justify-around default-container right-content">
        <div v-if="avatar">
          <img :src="avatar" alt="User Avatar" class="rounded-full" />
        </div>
        <div v-else>
          <img src="@/assets/avatar.png">
        </div>
        <input-file-component
          class="mt-auto"
          type="file"
          @change="handleAvatarChange"
        >
          <icon-component class="h-3" icon="camera" />
          Change photo
        </input-file-component>
      </div>
      <div class="flex-2 bg-white default-container flex gap-5 flex-col">
        <div class="flex gap-5 mt-3 flex-row user-details">
          <input-component
            class="w-full"
            label="First Name"
            v-model="firstName"
          />
          <input-component
            class="w-full"
            label="Last Name"
            v-model="lastName"
          />
        </div>
        <button-component
          class="mt-auto mr-auto"
          @click="handleSave"
        >
          Update Details
        </button-component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UsersService from '@/services/users'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import InputFileComponent from '@/components/InputFileComponent.vue'
import IconComponent from '@/components/IconComponent.vue'

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
    router.push({ name: 'users' }) // Navigate back to list view
  } catch (error) {
    console.error('Error saving user:', error)
  }
}
</script>
<style lang="scss" scoped>
.user-view {
  .default-container {
    min-height: 20rem;
  }

  @media (max-width: 576px) {
    .right-content {
      flex-basis: 100%;
    }
    .user-details {
      flex-wrap: wrap;
    }
  }

}
</style>
