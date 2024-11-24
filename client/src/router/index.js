import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import DashboardLayout from '@/layout/DashboardLayout.vue'
import AuthLoginView from '@/views/AuthLoginView.vue'
import AuthRegisterView from '@/views/AuthRegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: HomeView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: AuthLoginView,
      meta: { requiresGuest: true }, // Add this meta field for auth pages
    },
    {
      path: '/register',
      name: 'register',
      component: AuthRegisterView,
      meta: { requiresGuest: true }, // Add this meta field for auth pages
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Redirect to auth page if not authenticated
    next('/login')
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
            return next('/login')
          }
        }
      } catch (error) {
        console.error('Error parsing token:', error)
        authStore.clearAuth()
        if (to.meta.requiresAuth) {
          return next('/login')
        }
      }
    }
  }

  next()
})

export default router
