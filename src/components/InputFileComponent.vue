<template>
  <div
    class="relative w-full flex rounded input-file-component-wrapper">
    <label class="w-full gap-1 flex flex-row justify-center items-center w-full">
      <slot></slot>
    </label>
    <input class="absolute w-full left-0 h-full" v-bind="$attrs" type="file" />
  </div>
</template>
<script setup>


</script>
<style lang="scss" scoped>
@use "@/styles/variables" as *;

.input-file-component-wrapper {
  border: 1px solid $gray-300;
  cursor: pointer;
  height: 2rem;

  label {
    color: $gray-500;
  }

  input {
    color: transparent;
    cursor: pointer;
  }

}


</style>
