// 使用动态导入实现路由懒加载，减少初始包体积
const routes = [
	{
		path: '/',
		component: () => import(/* webpackChunkName: "home" */ '@/components/Home.vue')
	},
	{
		path: '/waterFall',
		component: () => import(/* webpackChunkName: "waterfall" */ '@/components/WaterFall.vue')
	},
	{
		path: '/virtualList',
		component: () => import(/* webpackChunkName: "virtual-list" */ '@/components/VirtualList.vue')
	},
	{
		path: '/requestAnimationFrame',
		component: () => import(/* webpackChunkName: "request-animation" */ '@/components/RequestAnimationFrame.vue')
	}
]

export default routes
