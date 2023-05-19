<template>
	<view class="top" :style="{'margin-top':margin_height+'rpx'}">
		<view class="back"  >
			<image src="../../static/images/back.png" mode="" @tap="back" v-if="show_back"></image>
		</view>
		<text>{{nav_text}}</text>
		<view class="right" @tap="publish">
			<text>{{right_text}}</text>
			<image :src="right_img" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		datingCircleStore
	} from "@/stores/datingCircle.js"
	export default {
		setup() {
			const useDatingCircleStore = datingCircleStore();
			const back = () => {
				uni.navigateBack();
			};
			const publish = () => {
				useDatingCircleStore.isShowPublish=true;
				useDatingCircleStore.type=1;
			}
			return {
				back,
				publish
			}
		},
		props: {
			margin_height: {
				type: Number,
				default: 50
			},
			nav_text: {
				type: String,
				default: "谈论圈"
			},
			right_text: {
				type: String,
				default: "选择"
			},
			right_img:{
				type: String,
				default:"../../static/images/publish.png"
			},
			show_back:{
				type: Boolean,
				default:true
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
