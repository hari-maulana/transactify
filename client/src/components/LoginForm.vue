<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-bold text-green-700 text-center">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
            type="email"
            v-model="loginForm.email"
            placeholder="Email"
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <input
            type="password"
            v-model="loginForm.password"
            placeholder="Password"
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <p class="mt-4 text-sm text-center text-green-600">
        Don't have an account?
        <router-link to="/register" class="font-bold text-green-700 hover:underline">
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
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
        this.$emit('login-success', response.data)
      } catch (error) {
        console.error('Login error:', error)
        alert(error.response?.data?.message || 'Login failed')

        return false
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
