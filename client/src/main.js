import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

// Set Axios base URL for your API
axios.defaults.baseURL = 'http://localhost:3000'

// Create the Vue app instance
const app = createApp(App)

// Provide axios to the app globally
app.config.globalProperties.$axios = axios

// Mount the app
app.mount('#app')
