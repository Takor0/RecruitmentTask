<template>
  <button
    class="cursor-pointer"
    :class="buttonClasses"
  >
    <template v-if="icon">
      <icon-component
        :icon="icon"
        class="w-4 h-4"
        :class="iconClasses"
      />
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
    validator: (value) => ['primary', 'gray'].includes(value)
  },
  icon: {
    type: String
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  iconClasses: {
    type: String,
    default: ''
  },
  rounded: {
    type: String,
    default: "full",
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'none', 'full'].includes(value)
  },
  isLoading: {
    type: Boolean,
    default: false
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
      ${props.isLoading ? 'skeleton' : ''}
    `
  } else {
    return `
      btn
      btn-${props.color}
      btn-${props.size}
      rounded-${props.rounded}
      ${props.isLoading ? 'skeleton' : ''}
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
.btn-gray {
  background-color: $gray-200;
  color: black !important;
}

.btn-gray:hover {
  background-color: color.adjust($gray-300, $lightness: -10%);
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
  transition: background-color 0.2s;
}
</style>
