<template>
  <div id="app" class="bg-gray-100">
    <div>
      <LoginForm @login-success="handleLoginSuccess" />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import LoginForm from './../LoginForm.vue'
// import RegisterForm from './../RegisterForm.vue'

export default {
  components: {
    LoginForm,
    // RegisterForm,
  },
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  methods: {
    handleLoginSuccess(response) {
      this.authStore.handleLoginSuccess(response)
      alert('Hail to spagetti mosnter')
      this.$router.push('/')
    },
    handleLogout() {
      this.authStore.clearAuth()
      alert('Logged out successfully.')
    },
  },
}
</script>

<style></style>
