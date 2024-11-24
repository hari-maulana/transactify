import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axiosInstance from './plugins/axios'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$axios = axiosInstance

app.use(pinia)
app.use(router)

app.mount('#app')
