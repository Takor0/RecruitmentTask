<template>
  <component :is="computedComponent" />
</template>
<script setup>


import { defineProps, computed, defineAsyncComponent } from 'vue'

const computedComponent = computed(() => {
  return defineAsyncComponent(() =>
    import(`@/assets/icons/${props.icon}.svg`)
  )

})
const props = defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>
