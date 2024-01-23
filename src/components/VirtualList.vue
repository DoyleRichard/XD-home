<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	import { throttle } from '@/utils/utils'

	const options = {
		itemNumber: 1000000,
		viewHeight: 600,
		itemHeight: 20,
		bufferNumber: 50,
		lastScrollTop: Infinity,
		throttleDelay: 10,
		beenRender: new Set()
	}
	const vListWrapper = ref(null)
	const listData = new Array(options.itemNumber).fill(null).map((_, index) => {
		return { id: index }
	})

	onMounted(() => {
		const RootElement = vListWrapper.value as unknown as HTMLDivElement
		RootElement.style.width = '300px'
		RootElement.style.height = `${options.viewHeight}px`

		const listContainer = document.createElement('div')
		RootElement.addEventListener(
			'scroll',
			throttle(() => {
				initVisibleItems(listContainer, RootElement.scrollTop)
			}, options.throttleDelay)
		)
		listContainer.style.width = '100%'
		listContainer.style.height = `${listData.length * options.itemHeight}px`
		listContainer.style.position = 'relative'
		listContainer.style.top = '0'
		listContainer.style.left = '0'
		RootElement.appendChild(listContainer)

		initVisibleItems(listContainer, 0)
	})

	const initVisibleItems = (container: HTMLDivElement, scroolTop: number) => {
		if (Math.abs(options.lastScrollTop - scroolTop) < options.itemHeight) {
			return
		}

		options.lastScrollTop = scroolTop
		const viewNumber = Math.ceil(options.viewHeight / options.itemHeight)
		const _startIndex = Math.floor(scroolTop / options.itemHeight)
		const startIndex = _startIndex < options.bufferNumber ? 0 : _startIndex - options.bufferNumber
		const endIndex = _startIndex + viewNumber + options.bufferNumber
		const time1 = Date.now()
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
			itemElement.innerText = `${listData[index].id}`
			itemElement.style.position = 'absolute'
			itemElement.style.top = `${index * options.itemHeight}px`
			itemElement.style.left = '0'
			container.appendChild(itemElement)
		}
		console.log(Date.now() - time1)
	}
</script>

<template>
	<div class="flex items-center justify-center w-screen h-screen bg-gray-800">
		<div class="relative overflow-y-scroll bg-gray-300" ref="vListWrapper"></div>
	</div>
</template>
