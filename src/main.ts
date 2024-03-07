import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from '@/App.vue'
import '@/App.scss'
import { Slider, Switch, Button } from 'ant-design-vue'
import routes from './routes/router'

const router = createRouter({
	// 使用的 hash 模式
	history: createWebHashHistory(),
	routes
})
createApp(App).use(router).use(Slider).use(Switch).use(Button).mount('#app')

console.log('%cRunning Environment：', 'color: red', process.env.NODE_ENV)
