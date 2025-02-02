<template>
  <div class="input-component flex flex-col">
    <label
      v-if="label"
      :class="{'skeleton': isLoading}"
      class="p2"
    >
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
import IconComponent from '@/components/common/IconComponent.vue'

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
@use "@/styles/colors" as colors;
@use "@/styles/typography";

.input-component {
  gap: 0.5rem;

  input:active, input:focus {
    outline: none;
  }


  .input-wrapper:has(input:hover) {
    outline: 1px solid colors.$gray-200;
  }


  .input-wrapper:has(input:focus) {
    outline: 1px solid colors.$gray-300;
  }

  .form-input {
    @extend .p2;
    border: 1px solid colors.$gray-200;
  }

  .filter {
    background-color: colors.$gray-100;
    font-weight: 500;

    .append-icon {
      color: colors.$gray-500;
    }
  }
}

</style>


