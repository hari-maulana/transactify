<!-- App.vue -->
<template>
  <div id="app">
    <h1>Transactify - Authentication</h1>
    <div v-if="!isLoggedIn">
      <LoginForm @login-success="handleLoginSuccess" />
      <RegisterForm />
    </div>
    <div v-else>
      <h2>Welcome, {{ user.name }}</h2>
      <p>You are logged in!</p>
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      isLoggedIn: false,
      user: null,
    }
  },
  methods: {
    handleLoginSuccess(userData) {
      this.user = userData
      this.isLoggedIn = true
    },
    handleLogout() {
      localStorage.removeItem('accessToken')
      this.isLoggedIn = false
      this.user = null
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
