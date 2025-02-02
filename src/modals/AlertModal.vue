<template>
  <AlertComponent
    :isOpen="alertStore.isOpen"
    :title="alertStore.title"
    :message="alertStore.message"
    :duration="alertStore.duration"
    @close="handleClose"
  />
</template>

<script setup>
import AlertComponent from '@/components/common/AlertComponent.vue'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()
const handleClose = () => alertStore.close()
</script>
