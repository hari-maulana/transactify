import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import DashboardLayout from '@/layout/DashboardLayout.vue'
import AuthLayout from '@/layout/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: HomeView,
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthLayout,
      meta: { requiresGuest: true }, // Add this meta field for auth pages
      // children: [
      //     {
      //         path: 'login',
      //         name: 'login',
      //         component: () => import('../views/auth/LoginView.vue')
      //     },
      //     {
      //         path: 'register',
      //         name: 'register',
      //         component: () => import('../views/auth/RegisterView.vue')
      //     }
      // ]
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Redirect to auth page if not authenticated
    next('/auth')
  }
  // Check if the route should only be accessible by guests (non-authenticated users)
  else if (to.meta.requiresGuest && authStore.isLoggedIn) {
    // Redirect to home if already authenticated
    next('/')
  } else {
    next()
  }
})

// Optional: Handle expired tokens
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isLoggedIn) {
    const token = authStore.accessToken
    if (token) {
      // Check if token is expired
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]))
        const expirationTime = tokenData.exp * 1000 // Convert to milliseconds

        if (Date.now() >= expirationTime) {
          // Token is expired
          authStore.clearAuth()
          if (to.meta.requiresAuth) {
            return next('/auth')
          }
        }
      } catch (error) {
        console.error('Error parsing token:', error)
        authStore.clearAuth()
        if (to.meta.requiresAuth) {
          return next('/auth')
        }
      }
    }
  }

  next()
})

export default router
