// plugins/axios.js
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Create axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()

    // Handle 401 errors
    if (error.response?.status === 401) {
      authStore.clearAuth()
      window.location.href = '/auth' // Force a full page refresh
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
