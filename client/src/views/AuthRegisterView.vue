<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-bold text-green-700 text-center">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <input
            type="text"
            v-model="registerForm.name"
            placeholder="Name"
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <input
            type="email"
            v-model="registerForm.email"
            placeholder="Email"
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <input
            type="password"
            v-model="registerForm.password"
            placeholder="Create Password"
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <input
            type="password"
            v-model="registerForm.confirmPassword"
            placeholder="Confirm "
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading || !isFormValid"
          class="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {{ isLoading ? 'Registering...' : 'Register' }}
        </button>
      </form>
      <p class="mt-4 text-sm text-center text-green-600">
        Already have an account?
        <router-link to="/login" class="font-bold text-green-700 hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',

  data() {
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      isLoading: false,
    }
  },
  computed: {
    isFormValid() {
      return (
        this.registerForm.password === this.registerForm.confirmPassword &&
        this.registerForm.password !== '' &&
        this.registerForm.confirmPassword !== ''
      )
    },
  },
  methods: {
    async handleRegister() {
      try {
        this.isLoading = true
        const response = await this.$axios.post('/register', this.registerForm)
        alert(response.data.message || 'Registration successful! Please login.')
        this.registerForm = { name: '', email: '', password: '', confirmPassword: '' }
        this.isLoading = false
        this.$router.push({ name: 'login' })
      } catch (error) {
        alert(error.response?.data?.message || 'Registration failed')
      }
    },
  },
}
</script>
