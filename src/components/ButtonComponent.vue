<template>
  <button class="cursor-pointer" :class="buttonClasses">
    <template v-if="icon">
      <!-- Render the IconComponent if type is 'icon' and icon prop is provided -->
      <IconComponent :icon="icon" class="w-5 h-5" />
    </template>
    <template v-else>
      <!-- Render the default slot content for 'primary' type -->
      <slot />
    </template>
  </button>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import IconComponent from '@/components/IconComponent.vue' // Ensure this path is correct

// Define component props
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary'].includes(value)
  },
  icon: {
    type: String
  }
})

// Compute the button classes based on the 'type' prop
const buttonClasses = computed(() => {
  if (props.icon) {
    return `
      text-gray-400
      hover:text-gray-600
      transition
      duration-200
      ease-in-out
    `
  } else if (props.type === 'primary') {
    return `
      bg-green-500
      flex
      flex-row
      items-center
      px-3
      py-1
      gap-2
      text-white
      rounded-2xl
      hover:bg-green-600
      transition
      duration-200
      ease-in-out
    `
  }
})
</script>
