import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../containers/TheContainer.vue'),
      children: [
        {
          alias: '',
          path: 'users',
          name: 'users',
          component: () => import('../views/UsersView.vue')
        },
        {
          path: 'users/:id',
          name: 'user',
          component: () => import('../views/UserView.vue')
        }
      ]
    }
  ]
})

export default router
