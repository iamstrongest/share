<template>
	<view class="mask">
		<view class="container">
			<slot name="default">
				<text>暂无内容</text>
			</slot>
		</view>
	</view>
</template>

<script setup>

</script>

<style scoped lang="scss">
	.mask{
	    position: fixed;
	    left: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    margin: auto;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(0, 0, 0, 0.7);
	    z-index: 3;
		.container {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			width:100%;
			height: 400rpx;
		}
	}
	
</style>
