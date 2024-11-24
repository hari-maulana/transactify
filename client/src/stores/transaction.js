// stores/transactions.js
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

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
      try {
        this.loading = true
        this.error = null

        const response = await axios.get('/transactions')

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

    clearTransactions() {
      this.transactions = []
      this.error = null
    },
  },
})
