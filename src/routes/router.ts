import Home from '@/components/Home.vue'
import WaterFall from '@/components/WaterFall.vue'
import VirtualList from '@/components/VirtualList.vue'
import RequestAnimationFrame from '@/components/RequestAnimationFrame.vue'

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/watarFall',
		component: WaterFall
	},
	{
		path: '/virtualList',
		component: VirtualList
	},
	{
		path: '/requestAnimationFrame',
		component: RequestAnimationFrame
	}
]

export default routes
