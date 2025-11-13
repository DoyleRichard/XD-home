import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from '@/App.vue'
import '@/App.scss'
// 按需引入 Ant Design Vue 组件
import Slider from 'ant-design-vue/es/slider'
import Switch from 'ant-design-vue/es/switch'
import Button from 'ant-design-vue/es/button'
// 按需引入样式
import 'ant-design-vue/es/slider/style'
import 'ant-design-vue/es/switch/style'
import 'ant-design-vue/es/button/style'
import routes from './routes/router'

const router = createRouter({
	// 使用的 hash 模式
	history: createWebHashHistory(),
	routes
})
createApp(App).use(router).use(Slider).use(Switch).use(Button).mount('#app')

console.log('%cRunning Environment：', 'color: red', process.env.NODE_ENV)
