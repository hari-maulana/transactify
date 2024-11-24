<!-- layouts/DashboardLayout.vue -->
<script setup>
import { RouterView } from 'vue-router'
import Navbar from '../components/BaseNavbar.vue'
</script>

<template>
  <div class="dashboard-layout">
    <Navbar />
    <div class="dashboard-container">
      <main class="dashboard-content">
        <RouterView />
        <!-- This is where child routes will render -->
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-container {
  display: flex;
  flex: 1;
}

.dashboard-content {
  flex: 1;
  padding: 20px;
}
</style>
