import { createApp } from 'vue'
import App from '@/App.vue'
import '@/App.scss'

createApp(App).mount('#app')

console.log('%cRunning Environment：', 'color: red', process.env.NODE_ENV);