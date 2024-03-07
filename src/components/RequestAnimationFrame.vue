<script setup lang="ts">
	import { nextTick, onMounted, reactive, ref } from 'vue'
	const listWrapper = ref(null)
	let RootElement = null as unknown as HTMLDivElement
	const options = reactive({
		itemNumber: 100000,
		batchRenderItems: 1000, // 每帧渲染的数据量
		currentRenderItems: 0,
		isOptimize: true,
		hasRender: false,
		isLoading: false,
		isPause: false
	})

	const initList = () => {
		if (options.hasRender || options.isLoading) {
			return
		}
		if (!options.isOptimize) {
			unOpimizeRender()
		}
		// 分帧渲染
		else {
			options.isPause = false
			opimizeRender()
		}
	}

	/**
	 * 常规渲染
	 */
	const unOpimizeRender = () => {
		options.isLoading = true
		for (let i = 0; i < options.itemNumber; i++) {
			const _div = document.createElement('div') as HTMLDivElement
			_div.innerText = `${i}`
			RootElement.appendChild(_div)
		}
		options.hasRender = true
		options.isLoading = false
	}

	/**
	 * 分帧渲染
	 */
	const opimizeRender = () => {
		// 中途暂停
		if (options.isPause) {
			options.isLoading = false
			return
		}
		options.isLoading = true
		const fragment = document.createDocumentFragment()
		const endIndex = Math.min(options.itemNumber, options.currentRenderItems + options.batchRenderItems)
		while (options.currentRenderItems <= endIndex) {
			const _div = document.createElement('div') as HTMLDivElement
			_div.innerText = `${options.currentRenderItems}`
			fragment.appendChild(_div)
			options.currentRenderItems++
		}
		RootElement.appendChild(fragment)
		requestAnimationFrame(opimizeRender)
		if (endIndex === options.itemNumber) {
			options.hasRender = true
			options.isLoading = false
		}
	}

	const onPause = () => {
		options.isPause = true
	}

	const reset = () => {
		options.isPause = true
		options.hasRender = false
		options.currentRenderItems = 0
		RootElement.innerHTML = ''
	}

	const initByItemNumber = () => {
		options.hasRender = false
	}

	onMounted(() => {
		RootElement = listWrapper.value as unknown as HTMLDivElement
	})
</script>

<template>
	<div class="flex items-center justify-center w-screen h-screen bg-gray-800">
		<div class="relative overflow-y-scroll bg-gray-300 w-52 h-96" ref="listWrapper"></div>
		<div class="ml-6 w-60">
			<div class="text-white">元素个数: {{ options.itemNumber }}</div>
			<a-slider
				v-model:value="options.itemNumber"
				:max="500000"
				@afterChange="initByItemNumber"
				:disabled="!options.isOptimize"
			/>
			<div class="text-white">每帧渲染个数: {{ options.batchRenderItems }}</div>
			<a-slider v-model:value="options.batchRenderItems" :max="10000" :disabled="!options.isOptimize" />
			<div class="text-white">
				是否开启分帧渲染：<a-switch v-model:checked="options.isOptimize" @change="reset" />
			</div>
			<div class="mt-6" v-if="!options.hasRender">
				<a-button class="bg-gray-300" @click="initList" :loading="options.isLoading">开始渲染</a-button>
				<a-button class="bg-gray-300" v-if="options.isLoading" @click="onPause">暂停</a-button>
			</div>
			<div class="mt-6" v-else>
				<a-button class="bg-gray-300" v-if="options.hasRender" @click="reset">清除</a-button>
			</div>
		</div>
	</div>
</template>
