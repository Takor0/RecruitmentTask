import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfirmStore = defineStore('confirm', () => {
  const isOpen = ref(false)
  const title = ref('Confirm')
  const message = ref('Are you sure?')
  const confirmText = ref('Yes')
  const cancelText = ref('No')

  let resolvePromise = null
  let rejectPromise = null

  const open = (options = {}) => {
    title.value = options.title
    message.value = options.message
    confirmText.value = options.confirmText
    cancelText.value = options.cancelText
    isOpen.value = true

    return new Promise((resolve, reject) => {
      resolvePromise = resolve
      rejectPromise = reject
    })
  }

  const confirm = () => {
    isOpen.value = false
    if (resolvePromise) {
      resolvePromise(true)
      resetCallbacks()
    }
  }

  const cancel = () => {
    isOpen.value = false
    if (rejectPromise) {
      rejectPromise(false)
      resetCallbacks()
    }
  }

  const resetCallbacks = () => {
    resolvePromise = null
    rejectPromise = null
  }

  return {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    open,
    confirm,
    cancel
  }
})
