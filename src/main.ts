import { createApp } from 'vue'
import App from '@/App.vue'
import '@/App.scss'

createApp(App).mount('#app')

console.log( process.env.NODE_ENV )