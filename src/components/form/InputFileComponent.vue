<template>
  <div
    class="relative w-full flex rounded input-file-component-wrapper"
    :class="{skeleton: isLoading}"
  >
    <label class="w-full gap-1 flex flex-row justify-center items-center w-full p2">
      <slot></slot>
    </label>
    <input class="absolute w-full left-0 h-full" v-bind="$attrs" type="file" />
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

</script>
<style lang="scss" scoped>
@use "@/styles/colors" as colors;


.input-file-component-wrapper:hover {
  background-color: colors.$gray-100
}

.input-file-component-wrapper {
  border: 1px solid colors.$gray-300;
  cursor: pointer;
  height: 2rem;

  label {
    color: colors.$gray-500;
  }

  input {
    color: transparent;
    cursor: pointer;
  }

}


</style>
