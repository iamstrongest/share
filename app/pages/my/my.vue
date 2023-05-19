<template>
	<view class="my_container" :class="{bck:isBck}">
		<view id="icon">
			<view class="icon_left" @tap="goSet" :class="{icon_left_active:isBck}"></view>
			<view class="icon_right" @tap="changeBck" :class="{icon_right_active:isBck}"></view>
		</view>
		<view class="top">
			<image class="image" :src="usePersonStore.personData.imageUrl" mode=""></image>
		</view>
		<view class="userinfo">
			<view class="userinfo_top">
				<view class="username">
					<text class="font_style_common">昵称:{{usePersonStore.personData.username}}</text>
				</view>
				<view class="possession">
					<text class="font_style_common">金额:</text>{{usePersonStore.personData.money}}
				</view>
				<view class="credit">
					<text class="font_style_common">信用分:</text>{{usePersonStore.personData.credit}}
				</view>
				<view class="signature">
					<text class="font_style_common">签名:</text>{{usePersonStore.personData.description}}
				</view>
			</view>
			<view class="userinfo_dating_circle">
				<view class="public_num">
					<!-- 发表谈论数量 -->
					<view class="userinfo_dating_circle_common">
						{{usePersonStore.anotherData.publishLength}}
					</view>
					<view class="">
						发帖数
					</view>
				</view>
				<view class="public_num">
					<!-- 被回复数量 -->
					<view class="userinfo_dating_circle_common">
						{{usePersonStore.anotherData.replyLength}}
					</view>
					<view class="">
						回复数
					</view>
				</view>
				<view class="reply_num">
					<!-- 被点赞数 -->
					<view class="userinfo_dating_circle_common">
						{{usePersonStore.anotherData.thumbsLength}}
					</view>
					<view class="">
						被赞数
					</view>
				</view>
			</view>
		</view>
		<view class="login_out_btn" @tap="loginOut" :class="{
			deepskyblue:usePersonStore.personData.id!==undefined,
			skyblue:usePersonStore.personData.id==undefined
			}">
			退出登录
		</view>
		<view>
			<tabBar :propsIndex="2"></tabBar>
		</view>
	</view>

</template>

<script>
	import {
		personStore
	} from "@/stores/person.js"
	import {
		ref,getCurrentInstance
	} from "vue";
	export default {
		setup() {
			const usePersonStore = personStore();
			const {
				proxy
			} = getCurrentInstance();
			const isBck = ref(false);
			uni.request({
				method: "POST",
				url: `${proxy.baseUrl}/validate`,
				header: {
					authorization: usePersonStore.authorization
				},
				data: {
					phone: usePersonStore.personData.phone
				},
				success(res) {
					if (res.data.code == 401) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					} else if (res.data.code == 200) {
						usePersonStore.authorization = res.data.token;
					}
				}
			})
			// uni.request({
			// 	method: "POST",
			// 	url: `${proxy.baseUrl}/validate`,
			// 	// uni.setStorageSync('authorization', res.data.token);
			// 	header: {
			// 		authorization: uni.getStorageSync('authorization')
			// 	},
			// 	data: {
			// 		phone:  uni.getStorageSync('phone')
			// 	},
			// 	success(res) {
			// 		if (res.data.code == 401) {
			// 			uni.navigateTo({
			// 				url: "/pages/login/login"
			// 			})
			// 		} else if (res.data.code == 200) {
			// 			usePersonStore.authorization = res.data.token;
			// 			uni.setStorageSync('authorization', res.data.token);
			// 			usePersonStore.personData=res.data.data;
			// 		}
			// 	}
			// })
			const loginOut = () => {
				if (usePersonStore.personData.id !== undefined) {
					usePersonStore.personData = {};
					uni.navigateTo({
						url: "/pages/login/login"
					})
				} else {
					uni.showToast({
						title: "用户未登录"
					})
				}
			}
			const changeBck = () => {
				isBck.value = !isBck.value;
			}
			const goSet = () => {
				uni.navigateTo({
					url: "/pages/set/set"
				})
			}
			return {
				usePersonStore,
				loginOut,
				changeBck,
				isBck,
				goSet
			}
		},
		data() {
			return {
				index: ""
			}
		},
		onLoad(e) {
			this.index = e.index;
		},
		methods: {
			goConsumeHistory() {
				this.index = 3;
				uni.navigateTo({
					url: `/pages/consumeHistory/consumeHistory?index=${this.index}`
				})
			},
			goDatingCircles() {
				this.index = 4;
				uni.navigateTo({
					url: `/pages/datingCircles/datingCircles?index=${this.index}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.bck {
		background-color: #000;
		color: #fff;
	}

	.deepskyblue {
		background-color: deepskyblue;
	}

	.skyblue {
		background-color: skyblue;
	}

	.my_container {
		width: 100%;
		height: 100vh;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	#icon {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.icon_left {
		width: 60rpx;
		height: 60rpx;
		background-image: url("../../static/images/set_my.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.icon_left_active {
		background-image: url("../../static/images/set_my_active.png");
	}

	.icon_right {
		width: 60rpx;
		height: 60rpx;
		background-image: url("../../static/images/sun_active.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.icon_right_active {
		background-image: url("../../static/images/monlight_active.png");
	}

	.black_color {
		background-color: #fff;
		color: #000;
	}

	.white_color {
		background-color: #000;
		color: #fff;
	}

	.top {
		// padding-top: 100rpx;
		width: 100%;

		.image {
			margin-top: 20rpx;
			margin-left: 50%;
			transform: translateX(-50%);
			width: 400rpx;
			height: 400rpx;
			margin-bottom: 100rpx;
			border-radius: 50%;
		}
	}

	.userinfo {
		width: 100%;
		text-align: center;

		.userinfo_top {
			display: flex;
			flex-direction: column;
			height: 300rpx;
			margin-bottom: 100rpx;
			justify-content: space-around;

			.font_style_common {
				font-weight: 800;
				font-style: italic;
			}
		}

		.userinfo_dating_circle {
			display: flex;
			flex-direction: row;
			width: 100%;

			view {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				.userinfo_dating_circle_common {
					font-weight: 1000;
					font-size: 4-6rpx;
					font-style: italic;
				}

			}
		}
	}

	.login_out_btn {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 10%;
		width: 400rpx;
		height: 100rpx;
		// background-color: skyblue;
		border-radius: 30rpx;
		color: #fff;
		font-size: 50rpx;
	}
</style>
