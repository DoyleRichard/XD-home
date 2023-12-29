/**
 * *.vue文件不是一个常规的文件类型
 * 定义 *.vue 是 defineComponent 类型
 * 没有这个文件，import 导入的所有.vue类型的文件都会报错
 */
declare module '*.vue' {
	import { defineComponent } from 'vue'
	const component: ReturnType<typeof defineComponent>
	export default component
}
