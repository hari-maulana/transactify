import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    expiredIn: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    getUserId: (state) => state.user?.id,
    getUserEmail: (state) => state.user?.email,
    getUserName: (state) => state.user?.name,
  },

  actions: {
    setAuthData(authData) {
      const { accessToken, refreshToken, expiredIn, user } = authData

      // Set state
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.expiredIn = expiredIn
      this.user = user

      // Store in localStorage
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
    },

    clearAuth() {
      // Clear state
      this.accessToken = null
      this.refreshToken = null
      this.expiredIn = null
      this.user = null

      // Clear localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    },

    handleLoginSuccess(response) {
      const authData = response.data
      this.setAuthData(authData)
    },
  },
})
