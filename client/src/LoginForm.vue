<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="loginForm.email" placeholder="Email" required />
      <input type="password" v-model="loginForm.password" placeholder="Password" required />
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'LoginForm',
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      isLoading: false,
    }
  },
  methods: {
    async handleLogin() {
      try {
        this.isLoading = true
        const response = await this.$axios.post('/login', this.loginForm)

        if (response.data.success) {
          // Update auth store with response data
          this.authStore.handleLoginSuccess(response.data)

          // Reset form
          this.loginForm.email = ''
          this.loginForm.password = ''

          // Emit the login-success event
          this.$emit('login-success', response.data)

          alert(response.data.message)
        }
      } catch (error) {
        alert(error.response?.data?.message || 'Login failed')
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
