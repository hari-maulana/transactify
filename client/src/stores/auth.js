import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  }),
  actions: {
    saveTokens(data) {
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    },
    async register(payload) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, payload)

        // Check for success in the API response
        if (response.data.success) {
          alert(response.data.message)
          router.push('/login')
        } else {
          throw new Error(response.data.message || 'Registration failed')
        }
      } catch (error) {
        // Handle errors and show appropriate messages
        alert(error.response?.data?.message || error.message || 'Registration failed')
      }
    },

    async login(payload) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, payload)
        this.saveTokens(response.data.data)
        this.user = response.data.data.user
        router.push('/')
      } catch (error) {
        console.error(error)
        alert('Login failed')
      }
    },
    logout() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      router.push('/login')
    },
  },
})
