import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '@/views/HomeView.vue'
import AuthLoginView from '@/views/AuthLoginView.vue'
import AuthRegisterView from '@/views/AuthRegisterView.vue'
import DashboardLayout from '@/layout/DashboardLayout.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/transaction',
        name: 'transaction',
        component: () => import('@/views/TransactionView.vue'),
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('@/views/ProductView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: AuthLoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: AuthRegisterView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const token = authStore.accessToken

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
