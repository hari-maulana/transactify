<template>
  <div id="app">
    <h1>Transactify - Authentication</h1>
    <div v-if="!authStore.isLoggedIn">
      <LoginForm @login-success="handleLoginSuccess" />
      <RegisterForm />
    </div>
    <div v-else>
      <h2>Welcome, {{ authStore.getUserName }}</h2>
      <p>You are logged in!</p>
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import LoginForm from './../LoginForm.vue'
import RegisterForm from './../RegisterForm.vue'

export default {
  components: {
    LoginForm,
    RegisterForm,
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

<style>
#app {
  max-width: 400px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
