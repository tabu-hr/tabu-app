import '@/assets/fonts.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(router)
app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID
})

app.mount('#app')
