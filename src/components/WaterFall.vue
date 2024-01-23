<script setup lang="ts">
	import { debounce } from '@/utils/utils'
	import { onMounted, ref } from 'vue'
	interface iLowestInfo {
		index: number
		height: number
	}
	const waterFallWrapper = ref(null)
	// 窗口宽度对应瀑布流列数
	const screenWidthMap = new Map([
		[[0, 640], 2],
		[[640, 768], 3],
		[[768, 1024], 4],
		[[1024, 1280], 6],
		[[1280, 1536], 8],
		[[1536, Infinity], 8]
	])
	// 瀑布流属性
	const waterFallAttr = {
		containerWidth: 0, // 容器宽度
		colNum: 0, // 列数
		colGap: 10, // 列gap
		rowGap: 10 // 行gap
	}
	// 瀑布流高度 list
	let fallLineHeightList: number[] = new Array(waterFallAttr.colNum).fill(0)
	// 找到最低的瀑布流
	const findLowestFallLine = (): iLowestInfo => {
		const lowestInfo: iLowestInfo = { index: 0, height: Infinity }
		fallLineHeightList.forEach((fallLineHeight, index) => {
			if (fallLineHeight < lowestInfo.height) {
				lowestInfo.index = index
				lowestInfo.height = fallLineHeight
			}
		})
		return lowestInfo
	}
	// 生成 num 个瀑布流元素
	const createManyItem = (waterFallWrapperElement: HTMLDivElement, num: number) => {
		for (let i = 0; i < num; i++) {
			const divElem = document.createElement('div')
			divElem.className = 'absolute'
			divElem.style.height = `${Math.floor(300 * Math.random())}px`
			divElem.style.backgroundColor = `rgb(${Math.floor(256 * Math.random())}, ${Math.floor(
				256 * Math.random()
			)}, ${Math.floor(256 * Math.random())})`
			divElem.style.transition = 'all 1s'
			waterFallWrapperElement.appendChild(divElem)
		}
	}
	// 监听 容器宽度 的变化
	const viewObserver = (waterFallWrapperElement: HTMLDivElement) => {
		window.addEventListener(
			'resize',
			debounce(() => {
				if (waterFallWrapperElement.clientWidth !== waterFallAttr.containerWidth) {
					waterFallAttr.containerWidth = waterFallWrapperElement.clientWidth
					calcColNum(waterFallWrapperElement)
				}
			}, 0)
		)
	}
	// 计算合适的排布 并 排列瀑布流元素
	const calcColNum = (waterFallWrapperElement: HTMLDivElement) => {
		for (let v of screenWidthMap.entries()) {
			let beforeColNum = waterFallAttr.colNum
			if (
				waterFallAttr.containerWidth > v[0][0] &&
				waterFallAttr.containerWidth <= v[0][1] &&
				beforeColNum !== v[1]
			) {
				waterFallAttr.colNum = v[1]
				arrangeWaterFallElem(waterFallWrapperElement)
				break
			}
		}
	}
	// 排列瀑布流元素
	const arrangeWaterFallElem = (waterFallWrapperElement: HTMLDivElement) => {
		fallLineHeightList = new Array(waterFallAttr.colNum).fill(0)
		waterFallWrapperElement.childNodes.forEach(itemElement => {
			// 每个 water-fall 元素
			const divItemElem = itemElement as HTMLDivElement
			const lowestInfo = findLowestFallLine()
			const currentElemHeight = divItemElem.offsetHeight
			const currentElemWidth =
				waterFallWrapperElement.clientWidth / waterFallAttr.colNum -
				((waterFallAttr.colNum - 1) / waterFallAttr.colNum) * waterFallAttr.colGap
			divItemElem.style.width = `${currentElemWidth}px`
			divItemElem.style.top = `${lowestInfo.height}px`
			divItemElem.style.left = `${
				(currentElemWidth + waterFallAttr.colGap) * (lowestInfo.index % waterFallAttr.colNum)
			}px`
			fallLineHeightList[lowestInfo.index] += currentElemHeight + waterFallAttr.rowGap
		})
	}

	onMounted(() => {
		const waterFallWrapperElement = waterFallWrapper.value as unknown as HTMLDivElement
		waterFallAttr.containerWidth = waterFallWrapperElement.clientWidth
		createManyItem(waterFallWrapperElement, 200)
		viewObserver(waterFallWrapperElement)
		calcColNum(waterFallWrapperElement)
	})
</script>

<template>
	<div class="container flex mx-auto">
		<div class="relative w-full water-fall-wrapper" ref="waterFallWrapper"></div>
	</div>
</template>
