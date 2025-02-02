<template>
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
</template>
<script setup>
import ConfirmComponent from '@/components/form/ConfirmComponent.vue'
import { useConfirmStore } from '@/stores/confirm'

const confirmStore = useConfirmStore()

</script>
