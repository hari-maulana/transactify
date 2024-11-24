// stores/product.js
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),

  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((p) => p.id === id)
    },
  },

  actions: {
    async fetchProducts() {
      try {
        this.loading = true
        this.error = null

        const response = await axios.get('/products')

        if (response.data.success) {
          this.products = response.data.data
        } else {
          throw new Error(response.data.message)
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load products'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createProduct(productData) {
      try {
        this.loading = true
        this.error = null

        const response = await axios.post('/products', productData)

        if (response.data.success) {
          this.products.unshift(response.data.data)
          return response.data.data
        } else {
          throw new Error(response.data.message)
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create product'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearProducts() {
      this.products = []
      this.error = null
    },
  },
})
