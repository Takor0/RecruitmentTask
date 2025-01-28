<template>
  <div class="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.app {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  //background-color: #f9f9f9;
}

.container {
  width: 100%;
}
</style>
<script setup lang="ts">
</script>
