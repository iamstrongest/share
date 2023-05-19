<template>
	<view class="findPwd_center">
		<view class="common">
			<text>请输入手机号码:</text>
			<input class="ipt" type="tel" placeholder="请输入手机号码" v-model="phone">
		</view>
		<view class="common">
			<text>请输入邮箱账号:</text>
			<input class="ipt" type="text" placeholder="请输入邮箱账号" v-model="email">
		</view>
		<Line class="margin_top" line_color="#cb2d01"></Line>
		<view class="submit" @tap="getPwd">
			点击发送
		</view>
	</view>
</template>

<script>
	import {
		ref,getCurrentInstance
	} from "vue"
	import Line from "@/components/common/Line.vue"
	import {
		personStore
	} from "@/stores/person.js"
	export default {
		setup() {
			const usePersonStore = personStore();
			const {
				proxy
			} = getCurrentInstance();
			const phone = ref("");
			const email = ref("");
			const getPwd = () => {
				if (phone.value == "" || email.value == "") {
					uni.showToast({
						title: "手机号码或者邮箱不能为空",
						icon: "error"
					})
					return;
				} else {
					uni.request({
						method: "POST",
						url: `${proxy.baseUrl}/find/pwd`,
						data: {
							phone: phone.value,
							email: email.value
						},
						success(res) {
							uni.showModal({
								title: '提示',
								content: `${res.data.message}，点击确认前往登录界面`,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: "/pages/login/login"
										})
									}
								}
							});
						}


					})
				}
			}
			return {
				phone,
				email,
				getPwd,
				usePersonStore,
			}

		},
		onLoad() {

		},
		components: {
			Line,

		}
	}
</script>

<style scoped lang="scss">
	.findPwd_center {
		width: 100%;
		height: 100vh;
		background-image: url("@/static/images/780.jfif");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-top: 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.common {
		display: flex;
		font-size: 38rpx;
		font-weight: 800;
		margin-bottom: 30rpx;

		.ipt {
			border: 4rpx solid #000;
			height: 60rpx;
		}
	}

	.submit {
		margin-top: 50rpx;
		width: 200rpx;
		height: 100rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 70%;
		background-color: deepskyblue;
		color: #fff;
	}
</style>
