import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../views/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      // {
      //   path: 'settings', // 实际路径为 /settings
      //   component: () => import('@/views/Settings.vue'),
      // },
      {
        path: 'settings', // 实际路径为 /settings
        component: () => import('@/views/Settings.vue'),
      },
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
