<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import logo from './../assets/logo.svg'
import { useAuthStore } from '@/stores/auth' // Assuming you have an auth store

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout() // Clear any auth-related data from the store
  router.push('/login') // Redirect to the login page after logout
}
</script>

<template>
  <nav class="bg-green-600 border-b border-green-500">
    <div class="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2">Transactify</span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Home</RouterLink
              >
              <RouterLink
                to="/product"
                :class="[
                  isActiveLink('/product') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Product</RouterLink
              >
              <RouterLink
                to="/transaction"
                :class="[
                  isActiveLink('/transaction')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Transaction</RouterLink
              >
              <!-- Logout Button -->
              <button
                @click="logout"
                class="bg-transparent border border-white-500 text-white px-3 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
