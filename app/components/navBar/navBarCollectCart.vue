<template>
	<view class="top" :style="{'margin-top':margin_height+'rpx'}">
		<view class="back" >
			<image src="../../static/images/back.png" mode="" v-if="show_back" @tap="back" ></image>
		</view>
		<text>{{nav_text}}</text>
		<view class="right" @tap="change_cart">
			<text v-if="!useCollectCartStore.isShowOprate">{{right_text}}</text>
			<text v-else>取消</text>
			<image v-if="!useCollectCartStore.isShowOprate" src="@/static/images/publish.png" mode=""></image>
			<image v-else src="@/static/images/cancle.png" mode=""></image>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		collectCartStore
	} from "@/stores/collectCart.js"
	const useCollectCartStore = collectCartStore();
	const props = defineProps({
		margin_height: {
			type: Number,
			default: 50
		},
		nav_text: {
			type: String,
			default: "收藏夹"
		},
		right_text: {
			type: String,
			default: "管理"
		},
		show_back:{
			type: Boolean,
			default:true
		}
	})
	const back = () => {
		uni.navigateBack();
	}
	const change_cart = () => {
		useCollectCartStore.isShowOprate = !useCollectCartStore.isShowOprate;
		if (!useCollectCartStore.isShowOprate) {
			useCollectCartStore.clickList = {
				idList: [],
				payNameList: [],
				numList: [],
				prices: [],
			}
		}
	}
</script>

<style scoped lang="scss">
	.top {
		display: flex;
		height: 100rpx;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		font-size: 44rpx;

		.back {
			image {
				width: 100rpx;
				height: 80rpx;
			}
		}

		.right {
			image {
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
				margin-left: 10rpx;
			}
		}
	}
</style>
