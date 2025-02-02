<template>
  <div class="pagination-wrapper flex flex-row">
    <button
      class="flex justify-center items-center"
      @click="changePage(modelValue - 1)"
      :disabled="currentPage === 1"
    >
      <icon-component class="h-3" icon="double-arrow-left" />
    </button>
    <button
      class="pagination-page"
      :class="{'active': currentPage === index + 1}"
      v-for="(_, index) in Array(totalPages)"
      :key="index"
      @click="changePage(index + 1)"
    >
      {{ index + 1 }}
    </button>
    <button
      class="flex justify-center items-center"
      @click="changePage(modelValue + 1)"
      :disabled="modelValue === totalPages"
    >
      <icon-component class="h-3" icon="double-arrow-right" />
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import IconComponent from '@/components/common/IconComponent.vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const currentPage = computed(() => props.modelValue)

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:modelValue', page)
  }
}
</script>
<style lang="scss">
@use "sass:color";
@use "@/styles/colors" as colors;

.pagination-wrapper {
  button:first-child {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  button:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  button {
    height: 2rem;
    background-color: white;
    border-collapse: collapse;
    min-width: 30px;
    color: colors.$primary;
    border: 1px solid colors.$gray-200;
    margin-left: -1px;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }

  button:disabled {
    cursor: not-allowed;
    color: colors.$gray-500;
  }

  button.active {
    background-color: colors.$primary;
    border-color: colors.$primary;
    color: white;
  }

  button:hover {
    background-color: color.adjust(colors.$primary, $lightness: 40%);
    border-color: color.adjust(colors.$primary, $lightness: 40%);
  }
}
</style>
