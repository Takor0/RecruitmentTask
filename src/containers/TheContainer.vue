<template>
  <div class="app">
    <div class="container">
      <confirm-alert />
      <confirm-modal />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import ConfirmAlert from '@/modals/AlertModal.vue'
import ConfirmModal from '@/modals/ConfirmModal.vue'
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
