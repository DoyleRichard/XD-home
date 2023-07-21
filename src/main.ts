import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from '@/App.vue'
import '@/App.scss'
import routes from './routes/router'

const router = createRouter({
    // 使用的 hash 模式
    history: createWebHashHistory(),
    routes,
})
createApp(App)
    .use(router)
    .mount('#app')

console.log('%cRunning Environment：', 'color: red', process.env.NODE_ENV);