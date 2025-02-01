<template>
  <div class="input-component flex flex-col">
    <label v-if="label" :class="{'skeleton': isLoading}">
      {{ label }}
    </label>
    <div
      class="relative input-wrapper rounded px-3 flex items-center flex-row h-8"
      :class="computedClasses"
    >
      <input
        class="w-full"
        v-bind="$attrs"
        :value="modelValue"
        @input="updateValue"
      />
      <div v-if="appendIcon">
        <icon-component class="append-icon h-3" :icon="appendIcon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, toRefs } from 'vue'
import IconComponent from '@/components/IconComponent.vue'

const props = defineProps({
  modelValue: [String, Number],
  appendIcon: String,
  isFilter: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const computedClasses = computed(() => {
  return {
    skeleton: props.isLoading,
    filter: props.isFilter,
    'form-input': !props.isFilter
  }
})

</script>
<style lang="scss">
@use "@/styles/variables" as *;

.input-component {
  gap: 1rem;

  input:active, input:focus {
    outline: none;
  }


  .input-wrapper:has(input:focus) {
    outline: 1px solid $gray-300;
  }

  .form-input {
    border: 1px solid $gray-200;
  }

  .filter {
    background-color: $gray-100;
    font-weight: 400;

    .append-icon {
      color: $gray-500;
    }
  }
}

</style>


