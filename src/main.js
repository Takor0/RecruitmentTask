import './assets/main.css'
import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

import { useConfirm } from '@/utils/confirm.js';

window.confirm = async function (content = {
  title: 'Confirmation',
  message: 'Are you sure?',
  confirmText: 'Yes',
  cancelText: 'No',
}) {
  try {
    await useConfirm({
      title: content.title,
      message: content.message,
      confirmText: content.confirmText,
      cancelText: content.cancelText,
    });
    return true;
  } catch {
    return false;
  }
};
