import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'
// Estilos globales
import './assets/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.use(pinia)
app.use(head)

app.mount('#app')
