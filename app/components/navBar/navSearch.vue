<template>
	<view class="top" :style="{'margin-top':margin_height+'rpx'}">
		<view class="back">
			<image src="../../static/images/back.png" mode=""  @tap="back" v-if="show_back"></image>
		</view>
		<text>{{nav_text}}</text>
		<view class="right" @tap="goUrl">
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
		setup(props) {
			const useDatingCircleStore = datingCircleStore();
			const back = () => {
				uni.navigateBack();
			};
			const publish = () => {
				useDatingCircleStore.isShowPublish=true;
				useDatingCircleStore.type=1;
			}
			const goUrl=()=>{
				uni.navigateTo({
					url:`${props.url}`,
				})
			}
			return {
				back,
				publish,
				goUrl
			}
		},
		props: {
			margin_height: {
				type: Number,
				default: 50
			},
			nav_text: {
				type: String,
				default: "搜索界面"
			},
			right_text: {
				type: String,
				default: "搜索"
			},
			right_img:{
				type: String,
				default:"../../static/images/search.png"
			},
			url:{
				type: String,
				default:"/pages/search/search"
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
