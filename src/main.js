import './styles/main.css'
import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

import { useConfirm } from '@/composables/useConfirm.js'
import { useAlert } from '@/composables/useAlert.js'

window.confirm = async content => {
  try {
    await useConfirm({
      title: content.title || 'Confirm',
      message: content.message || 'Are you sure?',
      confirmText: content.confirmText || 'Yes',
      cancelText: content.cancelText || 'No'
    })
    return true
  } catch {
    return false
  }
}

window.alert = content => {
  useAlert({
    title: content.title || 'Alert',
    message: content.message || '',
    color: content.color || 'primary',
    duration: content.duration || 0
  })
}
