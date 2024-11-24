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

    async createTransaction(transactionData) {
      try {
        this.loading = true
        this.error = null

        const response = await axios.post('/transactions', transactionData)

        if (response.data.success) {
          // Add the new transaction to the state
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
  },
})
