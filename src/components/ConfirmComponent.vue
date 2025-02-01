<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div
      class="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative animate-fade-in"
      @click.stop
    >
      <button-component
        @click="handleCancel"
        class="absolute top-4 right-4"
        icon="close"
        iconClasses="w-8 h-8"
      />
      <h2 class="mb-4">
        {{ title }}
      </h2>
      <p class="message">
        {{ message }}
      </p>
      <div class="mt-6 flex justify-end gap-2">
        <button-component @click="handleCancel" rounded="lg" color="gray">
          {{ cancelText }}
        </button-component>
        <button-component @click="handleConfirm" rounded="lg">
          {{ confirmText }}
        </button-component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Confirm'
  },
  message: {
    type: String,
    default: 'Are you sure?'
  },
  confirmText: {
    type: String,
    default: 'Yes'
  },
  cancelText: {
    type: String,
    default: 'No'
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
.message {
  color: $gray-500;
}
</style>
