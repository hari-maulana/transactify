<template>
  <div id="app" class="bg-gray-100">
    <div>
      <LoginForm @login-success="handleLoginSuccess" />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import LoginForm from '../components/LoginForm.vue'

export default {
  components: {
    LoginForm,
  },
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  methods: {
    handleLoginSuccess(data) {
      this.authStore.handleLoginSuccess(data)
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
