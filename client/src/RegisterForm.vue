<!-- components/RegisterForm.vue -->
<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input type="text" v-model="registerForm.name" placeholder="Name" required />
      <input type="email" v-model="registerForm.email" placeholder="Email" required />
      <input type="password" v-model="registerForm.password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
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
      },
    }
  },
  methods: {
    async handleRegister() {
      try {
        const response = await this.$axios.post('/register', this.registerForm)
        alert(response.data.message || 'Registration successful! Please login.')
        this.registerForm = { name: '', email: '', password: '' }
      } catch (error) {
        alert(error.response?.data?.message || 'Registration failed')
      }
    },
  },
}
</script>

<style scoped>
.register-form {
  margin: 15px 0;
}
form {
  margin: 15px 0;
}
input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
button {
  padding: 8px 15px;
  cursor: pointer;
}
</style>
