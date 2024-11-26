import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactions: [],
    loading: false,
    error: null,
  }),

  getters: {
    getTransactionById: (state) => (id) => {
      return state.transactions.find((t) => t.id === id)
    },
  },

  actions: {
    async fetchTransactions() {
      const authStore = useAuthStore()
      const instance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        timeout: 10000,
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      })

      try {
        this.loading = true
        this.error = null

        const response = await instance.get('/transactions')

        if (response.data.success) {
          this.transactions = response.data.data
        } else {
          throw new Error(response.data.message)
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load transactions'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createTransaction(transactionData) {
      const authStore = useAuthStore()
      const instance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        timeout: 10000,
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      })

      try {
        this.loading = true
        this.error = null

        const response = await instance.post('/transactions', transactionData)

        if (response.data.success) {
          this.transactions.unshift(response.data.data)
          return response.data.data
        } else {
          throw new Error(response.data.message)
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create transaction'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearTransactions() {
      this.transactions = []
      this.error = null
    },
  },
})
