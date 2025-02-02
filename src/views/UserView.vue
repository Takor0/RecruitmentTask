<template>
  <div class="user-view">
    <h1 class="mb-4 view-title">
      Add user
    </h1>
    <div class="flex flex-row-reverse flex-wrap gap-7">
      <div
        class="flex flex-column flex-1 bg-white flex-wrap justify-around default-container right-content">
        <div v-if="avatar" :class="{skeleton: isLoading}">
          <img
            :src="avatar"
            alt="User Avatar"
            class="rounded-full"
            :class="{skeleton: isLoading || !avatar}"
          />
        </div>
        <div v-else>
          <img alt="missing avatar" src="@/assets/avatar.png">
        </div>
        <input-file-component
          :is-loading="isLoading"
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
          <template v-for="(values, key) in userDetails" :key="key">
            <input-component
              :is-loading="isLoading"
              class="w-full"
              :label="values.label"
              v-model="values.value"
            />
          </template>
        </div>
        <button-component
          :is-loading="isLoading"
          class="mt-auto mr-auto"
          rounded="md"
          @click="handleSave"
        >
          Update Details
        </button-component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UsersService from '@/services/users'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import InputComponent from '@/components/form/InputComponent.vue'
import InputFileComponent from '@/components/form/InputFileComponent.vue'
import IconComponent from '@/components/common/IconComponent.vue'

const route = useRoute()
const router = useRouter()

const isNewUser = route.params.id === 'new'
const userId = isNewUser ? null : route.params.id
const isLoading = ref(true)
const avatar = ref(null)


const userDetails = reactive({
  firstName: {
    label: 'First Name',
    value: ''
  },
  lastName: {
    label: 'Last Name',
    value: ''
  }
})

onMounted(async () => {
  if (userId) {
    try {
      const { responseData } = await UsersService.getUser(userId)
      userDetails.firstName.value = responseData.data?.first_name || ''
      userDetails.lastName.value = responseData.data?.last_name || ''
      avatar.value = responseData.data?.avatar || null

    } catch (error) {
      return alert({message: "Error fetching user"})
    }
  }
  isLoading.value = false
})

function handleAvatarChange(event) {
  const file = event.target.files[0]
  if (file) {
    avatar.value = URL.createObjectURL(file)
  }
}

async function handleSave() {
  const userData = {
    first_name: userDetails.firstName,
    last_name: userDetails.lastName
  }

  try {
    if (userId) {
      await UsersService.updateUser(userId, userData)
    } else {
      await UsersService.createUser(userData)
    }
    router.push({ name: 'users' }) // Navigate back to list view
  } catch (error) {
    return alert({message: "Error saving user"})
  }
}
</script>
<style lang="scss" scoped>
.user-view {
  img {
    width: 10rem;
    height: 10rem;
  }

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
