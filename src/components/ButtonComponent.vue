<template>
  <button class="cursor-pointer" :class="buttonClasses">
    <template v-if="icon">
      <IconComponent :icon="icon" class="w-4 h-4" />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import IconComponent from '@/components/IconComponent.vue'

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary'].includes(value)
  },
  icon: {
    type: String
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const buttonClasses = computed(() => {
  if (props.icon) {
    return `
      text-gray-400
      hover:text-gray-600
      transition
      duration-200
      ease-in-out
    `
  } else if (props.color === 'primary') {
    return `
      btn
      btn-${props.color}
      btn-${props.size}
    `
  }
})
</script>
<style scoped lang="scss">
@use "sass:color";
@use "@/styles/variables" as *;

.btn-md {
  padding: 0.25rem 0.75rem;
  height: 2.5rem;
}

.btn-primary {
  background-color: $primary;
}

.btn-primary:hover {
  background-color: color.adjust($primary, $lightness: -10%);
}

.btn {
  text-wrap: nowrap;
  cursor: pointer;
  align-items: center;
  display: flex;
  flex-direction: row;
  color: white;
  gap: 1rem;
  border-radius: 1.2rem;
  transition: background-color 0.2s;
}
</style>
