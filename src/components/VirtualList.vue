<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue'
	import { throttle } from '@/utils/utils'

	const options = reactive({
		itemNumber: 1000000,
		viewHeight: 600,
		itemHeight: 20,
		bufferNumber: 50,
		lastScrollTop: Infinity,
		throttleDelay: 10,
		beenRender: new Set(),
		data: <any[]>[]
	})
	const vListWrapper = ref(null)
	let RootElement = null as unknown as HTMLDivElement
	let listContainer = null as unknown as HTMLDivElement

	onMounted(() => {
		RootElement = vListWrapper.value as unknown as HTMLDivElement
		RootElement.style.width = '300px'
		RootElement.style.height = `${options.viewHeight}px`

		listContainer = document.createElement('div')
		listContainer.style.width = '100%'
		listContainer.style.position = 'relative'
		listContainer.style.top = '0'
		listContainer.style.left = '0'
		listContainer.style.overflow = 'hidden'

		RootElement.appendChild(listContainer)
		addScrollListener()
		initByItemNumber()
		initVisibleItems(listContainer, 0)
	})

	const addScrollListener = () => {
		RootElement.addEventListener(
			'scroll',
			throttle(() => {
				initVisibleItems(listContainer, RootElement.scrollTop)
			}, options.throttleDelay)
		)
	}

	const initByItemNumber = () => {
		listContainer.style.height = `${options.itemNumber * options.itemHeight}px`
		options.data = new Array(options.itemNumber).fill(null).map((_, index) => {
			return { id: index }
		})
	}

	const initVisibleItems = (container: HTMLDivElement, scroolTop: number) => {
		if (Math.abs(options.lastScrollTop - scroolTop) < options.itemHeight) {
			return
		}

		options.lastScrollTop = scroolTop
		const viewNumber = Math.ceil(options.viewHeight / options.itemHeight)
		const _startIndex = Math.floor(scroolTop / options.itemHeight)
		const startIndex = _startIndex < options.bufferNumber ? 0 : _startIndex - options.bufferNumber
		const endIndex = _startIndex + viewNumber + options.bufferNumber
		for (let index = startIndex; index < endIndex && index < options.itemNumber; index++) {
			if (options.beenRender.has(index)) {
				continue
			}
			options.beenRender.add(index)
			const itemElement = document.createElement('div')
			itemElement.style.width = '100%'
			itemElement.style.height = `${options.itemHeight}px`
			itemElement.style.boxSizing = 'border-box'
			itemElement.style.padding = '0 20px'
			itemElement.style.lineHeight = '20px'
			itemElement.innerText = `${options.data[index].id}`
			itemElement.style.position = 'absolute'
			itemElement.style.top = `${index * options.itemHeight}px`
			itemElement.style.left = '0'
			container.appendChild(itemElement)
		}
	}
</script>

<template>
	<div class="flex items-center justify-center w-screen h-screen bg-gray-800">
		<div class="relative overflow-y-scroll bg-gray-300" ref="vListWrapper"></div>
		<div class="ml-6 w-60">
			<div class="text-white">视窗高度: {{ options.viewHeight }}px</div>
			<a-slider v-model:value="options.viewHeight" :max="options.viewHeight" disabled />
			<div class="text-white">每个元素高度: {{ options.itemHeight }}px</div>
			<a-slider v-model:value="options.itemHeight" :max="options.itemHeight" disabled />
			<div class="text-white">元素个数: {{ options.itemNumber }}</div>
			<a-slider v-model:value="options.itemNumber" :max="1677720" @afterChange="initByItemNumber" />
			<div class="text-white">视窗外缓冲元素个数: {{ options.bufferNumber }}</div>
			<a-slider v-model:value="options.bufferNumber" :max="1000" />
			<div class="text-white">滑动界面节流时间: {{ options.throttleDelay }}ms</div>
			<a-slider v-model:value="options.throttleDelay" :max="1000" />
		</div>
	</div>
</template>
