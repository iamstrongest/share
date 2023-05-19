<template>
	<view class="equipment_container" :style="{height:+style_height+'rpx',width:+style_width+'%'}">
	<!-- <view class="equipment_container" :style="{height:+style_height+'rpx'}"> -->
		<view class="image">
			<image :src="equipment.imageUrl" mode=""></image>
		</view>
		<view class="information">
			<view class="name">
				名字:{{equipment.name}}
			</view>
			<view class="type">
				种类:{{equipment.type}}
			</view>
			<view class="price">
				单价:{{equipment.price}}
			</view>
			<view class="unit">
				计费方式:{{equipment.unit}}
			</view>
			<view class="rest_num">
				剩余:{{equipment.restNum}}
			</view>
		</view>
	</view>
</template>

<script setup>
	let imgUrl = "";
	const props = defineProps({
		equipment: {
			type: Object,
			require: true
		},
		style_width: {
			type: Number || String,
			default: 50
		},
		style_height: {
			type: Number || String,
			default: 250
		},
		url: String
	});
</script>

<style scoped lang='scss'>

	.equipment_container {
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		flex-direction: row;
		margin-bottom: 50rpx;
		align-items: center;
		box-shadow: 10rpx 10rpx 20rpx;
		.image {
			width: 150rpx;
			height: 150rpx;

			image {
				width: 100%;
				height: 100%;
			}

			margin-right: 10rpx;
		}

		.information {
			color: #fff;
			font-weight: 900;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}
</style>
