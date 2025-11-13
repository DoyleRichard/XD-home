<script setup lang="ts">
	import { useRouter } from 'vue-router'
	const router = useRouter()
	const goWaterFallPage = () => router.push({ path: '/waterFall' })
	const goVirtualListPage = () => router.push({ path: '/virtualList' })
	const goRequestAnimationFrame = () => router.push({ path: '/requestAnimationFrame' })
</script>

<template>
	<div class="container flex flex-wrap items-center h-screen mx-auto justify-evenly">
		<div class="helloBtn" @click="goWaterFallPage">瀑布流</div>
		<div class="helloBtn" @click="goVirtualListPage">虚拟列表</div>
		<div class="helloBtn" @click="goRequestAnimationFrame">分帧渲染</div>
	</div>
	<!-- <div class="helloAnimationBtn">Hello world!</div> -->
</template>

<style scoped lang="scss">
	$btn-width: 200px;
	$btn-height: 50px;
	$clip-length: 30px;
	$duration: 3s;
	.helloBtn {
		height: $btn-height;
		width: $btn-width;
		text-align: center;
		line-height: $btn-height;
		position: relative;
		cursor: pointer;

		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			border: 1px #000 solid;
			transition: all ease 0.3s;
		}

		&::before {
			clip-path: inset(0 ($btn-width - $clip-length) ($btn-height - $clip-length) 0);
		}

		&::after {
			clip-path: inset(($btn-height - $clip-length) 0 0 ($btn-width - $clip-length));
		}

		&:hover {
			&::before,
			&::after {
				clip-path: inset(0 0 0 0);
			}
		}
	}

	@keyframes border-animation {
		0%,
		100% {
			clip-path: inset(0 $btn-width 0 0);
		}
		25% {
			clip-path: inset(0 0 $btn-height 0);
		}
		50% {
			clip-path: inset(0 0 0 $btn-width);
		}
		75% {
			clip-path: inset($btn-height 0 0 0);
		}
	}

	.helloAnimationBtn {
		height: $btn-height;
		width: $btn-width;
		text-align: center;
		line-height: $btn-height;
		position: relative;
		margin-top: 30px;

		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			border: 1px #000 solid;
			animation: border-animation $duration linear infinite;
		}

		&::after {
			animation-delay: $duration * -0.5;
		}
	}
</style>
