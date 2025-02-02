<template>
  <div class="app">
    <div class="app-container">
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
  display: flex;
  padding-top: 33px;
  padding-bottom: 75px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: colors.$gray-100;
}

.app-container {
  width: 100%;
  max-width: 1150px;
}

@media (max-width: 1165px) {
  .app-container {
    max-width: 950px;
  }
}
@media (max-width: 950px) {
  .app-container {
    max-width: 750px;
  }
}
</style>
