<template>
  <div class="pagination-wrapper">
    <button
      @click="changePage(modelValue - 1)"
      :disabled="currentPage === 1"
    >
      Poprzednia
    </button>
    <button
      v-for="(_, index) in Array(totalPages)"
      :key="index"
      @click="changePage(index + 1)"
    >
      {{ index + 1 }}
    </button>
    <button
      @click="changePage(modelValue + 1)"
      :disabled="modelValue === totalPages"
    >
      Następna
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

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
