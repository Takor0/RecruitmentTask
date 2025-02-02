<template>
  <div v-if="isOpen" class="toast" @mouseenter="clearTimer" @mouseleave="setTimer">
    <div class="toast-content" @click.stop>
      <div class="flex items-center justify-between">
        <h3 class="toast-title">{{ title }}</h3>
        <button-component
          @click="onClose"
          icon="close"
          iconClasses="w-6 h-6"
        />
      </div>
      <p class="toast-message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, onBeforeUnmount, watch, ref } from 'vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

const props = defineProps({
  isOpen: Boolean,
  title: String,
  message: String,
  duration: {
    type: Number,
    default: 5000
  }
})

const emit = defineEmits(['close'])
const timer = ref(null)

const onClose = () => emit('close')

const setTimer = () => {
  if (props.duration > 0) {
    timer.value = setTimeout(() => onClose(), props.duration)
  }
}

const clearTimer = () => {
  if (timer.value) clearTimeout(timer.value)
}

watch(() => props.isOpen, (newVal) => {
  clearTimer()
  if (newVal && props.duration > 0) setTimer()
})

onMounted(() => {
  if (props.isOpen && props.duration > 0) setTimer()
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<style lang="scss" scoped>
@use "@/styles/colors" as colors;

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  min-width: 300px;
}

.toast-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 16px;
  animation: fade-in 0.3s ease-out;
}

.toast-title {
  margin: 0;
  font-size: 1.125rem;
  color: colors.$primary;
}

.toast-message {
  margin: 12px 0;
}

.toast-footer {
  text-align: right;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
