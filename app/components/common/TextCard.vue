<template>
<view class="text_container">
	<text class="">
		--
	</text>
	<text :style="{color:props.color}">
		{{props.text}}
	</text>
	<text class="">
		--
	</text>
</view>
</template>

<script setup>
	const props=defineProps({
		text:{
			type:String||Number,
			default:"猜你喜欢"
		},
		color:{
			type:String,
			default:"#ccc"
		}
	})
</script>

<style>
	.text_container{
		width: 100%;
		border: 4rpx solid #41a863;
		text-align: center;
		font-size: 38rpx;
		font-weight: 800;
		margin-bottom: 20rpx;
	}
</style>