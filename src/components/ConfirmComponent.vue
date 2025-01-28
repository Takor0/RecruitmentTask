<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div
      class="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative animate-fade-in"
      @click.stop
    >
      <button
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 h-7 cursor-pointer"
        @click="handleCancel"
      >
        <IconComponent icon="close" class="h-full w-full"/>
      </button>
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        {{ title }}
      </h2>
      <p class="text-gray-600">
        {{ message }}
      </p>
      <div class="mt-6 flex justify-end gap-2">
        <button
          class="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
          @click="handleCancel"
        >
          {{ cancelText }}
        </button>
        <button
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import IconComponent from '@/components/IconComponent.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Confirm',
  },
  message: {
    type: String,
    default: 'Are you sure?',
  },
  confirmText: {
    type: String,
    default: 'Yes',
  },
  cancelText: {
    type: String,
    default: 'No',
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<style>
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
</style>
