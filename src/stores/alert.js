import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  const isOpen = ref(false)
  const title = ref('Alert')
  const message = ref('')
  const duration = ref(5000)

  const open = (options = {}) => {
    title.value = options.title || 'Alert'
    message.value = options.message || ''
    duration.value = options.duration || 5000
    isOpen.value = true
  }

  const close = () => isOpen.value = false

  return { isOpen, title, message, duration, open, close }
})
