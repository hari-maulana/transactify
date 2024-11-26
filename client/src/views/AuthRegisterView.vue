<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-bold text-green-700 text-center">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <input
            type="text"
            v-model="name"
            placeholder="Name"
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <input
            type="text"
            v-model="phoneNumber"
            placeholder="Phone Number"
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Create Password"
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            required
            class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          utton
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {{ loading ? 'Registering...' : 'Register' }}
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
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

export default {
  setup() {
    const authStore = useAuthStore()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const phoneNumber = ref('')
    const error = ref('') // Validation error message
    const loading = ref(false) // Loading state

    const handleRegister = async () => {
      // Reset error message
      error.value = ''

      // Check if passwords match
      if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match.'
        return
      }

      // Set loading state
      loading.value = true

      try {
        // Call the register action in the store
        await authStore.register({
          name: name.value,
          email: email.value,
          password: password.value,
          phoneNumber: phoneNumber.value,
        })

        // Reset form on successful registration
        name.value = ''
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
        phoneNumber.value = ''
      } catch (err) {
        // Handle registration error
        console.error('Registration error:', err)
        error.value = 'Registration failed. Please try again.'
      } finally {
        // Reset loading state
        loading.value = false
      }
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      phoneNumber,
      handleRegister,
      error,
      loading,
    }
  },
}
</script>
