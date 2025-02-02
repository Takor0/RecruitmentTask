<template>
  <div class="app">
    <div class="container">
      <ConfirmComponent
        v-if="confirmStore.isOpen"
        :title="confirmStore.title"
        :message="confirmStore.message"
        :confirmText="confirmStore.confirmText"
        :cancelText="confirmStore.cancelText"
        :isOpen="confirmStore.isOpen"
        @confirm="confirmStore.confirm"
        @cancel="confirmStore.cancel"
      />
      <router-view />
    </div>
  </div>
</template>

<script setup>

import { useConfirmStore } from '@/stores/confirm'
import ConfirmComponent from '@/components/form/ConfirmComponent.vue'

const confirmStore = useConfirmStore()
</script>

<style lang="scss">
@use "@/styles/colors" as colors;

.app {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: colors.$gray-100;
}

.container {
  width: 100%;
}
</style>
