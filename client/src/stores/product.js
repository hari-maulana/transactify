import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

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
      const authStore = useAuthStore() // Access the auth store
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

        const response = await instance.get('/products')

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

        const response = await instance.post('/products', productData)

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
