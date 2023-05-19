<template>
	<view class="registry_center">
		<view class="top">
			<view class="top_phone">
				<text>请输入手机号:</text>
				<input type="tel" :maxlength="11" class="tel" v-model="phone">
			</view>
			<view class="submit" @tap="getVerificationCode(1000)">
				{{btnMessage}}
			</view>
		</view>
		<Line class="margin_top"></Line>
		<view class="vertify">
			<text>请输入验证码:</text>
			<input class="code" type="number" v-model="verificationCode">
		</view>
		<Line class="margin_top" line_color="skyblue"></Line>
		<view class="">
			<view class="common">
				<text>请输入登录密码:</text>
				<input class="ipt" password type="text" placeholder="请输入登录密码" v-model="password">
			</view>
			<view class="common">
				<text>请确认登录密码:</text>
				<input class="ipt" password type="text" placeholder="请确认登录密码" v-model="re_password">
			</view>
			<Line class="margin_top" line_color="#ccc"></Line>
			<view class="submit" @tap="submitPhone">
				点击注册
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ref,
		watch,
		getCurrentInstance
	} from "vue"
	import Line from "@/components/common/Line.vue"
	import {
		personStore
	} from "@/stores/person.js"
	export default {
		setup() {
			const {
				proxy
			} = getCurrentInstance();
			const verificationCode = ref("");
			const phone = ref("");
			const password = ref("");
			const re_password = ref("");
			const btnMessage = ref("点击发送")
			const isConfirm = ref(false);
			const usePersonStore = personStore();
			const submitPhone = () => {
				if (isConfirm.value) {
					if (password.value == "" || re_password.value == "") {
						uni.showToast({
							title: "密码不能为空",
							icon: "error"
						})
						return;
					}
					if (password.value != re_password.value) {
						uni.showToast({
							title: "密码输入不正确",
							icon: "error"
						})
						return;
					} else {
						uni.request({
							method: "POST",
							url: `${proxy.baseUrl}/register/phone`,
							data: {
								verificationCode: verificationCode.value,
								phone: phone.value,
								password: password.value
							},
							success(res) {
								uni.showModal({
									title: '提示',
									content: '注册成功,点击确认前往登录界面',
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
				} else {
					uni.showModal({
						title: '提示',
						content: `请先发送验证码`,
						showCancel: false,
						success: function(res) {
							if (res.confirm) {

							}
						}
					});
				}

			}
			let timer = null;
			let time = ref(5);
			let timer1 = null;
			let flag = true;
			const getVerificationCode = (wait = 500) => {
				// 防抖
				clearTimeout(timer);
				timer = setTimeout(() => {
					// 只有flag为true，才可以重新发送请求
					if (flag) {
						flag = false;
						uni.request({
							method: "POST",
							url: `${proxy.baseUrl}/send/phone`,
							data: {
								phone: phone.value,
							},
							success(res) {
								uni.showModal({
									title: '提示',
									content: `${res.data.message}`,
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											isConfirm.value = true;
										}
									}
								});
							}
						})
						timer1 = setInterval(() => {
							time.value = time.value - 1;
							btnMessage.value = `${time.value}秒后重发`;
							if (time.value == 0) {
								clearInterval(timer1);
								btnMessage.value = `点击重发`;
								flag = true;
								time.value = 5;
							}
						}, 1000)
					}
				}, wait)
			}
			return {
				phone,
				password,
				re_password,
				btnMessage,
				verificationCode,
				usePersonStore,
				submitPhone,
				getVerificationCode
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
	.margin_top {
		margin-top: 50rpx;
	}

	.registry_center {
		background-image: url("@/static/images/R-C.jfif");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;

		// align-content: center;
		// justify-content: center;
		.top {
			margin-top: 200rpx;

			.top_phone {
				display: flex;
				font-size: 48rpx;
				font-weight: 800;

				.tel {
					border: 4rpx solid #000;
					height: 60rpx;
				}
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

		.vertify {
			margin-top: 50rpx;
			display: flex;
			font-size: 48rpx;
			font-weight: 800;

			.code {
				border: 4rpx solid #000;
				height: 60rpx;
			}
		}

		.common {
			margin-top: 50rpx;
			display: flex;
			font-size: 38rpx;
			font-weight: 800;

			.ipt {
				border: 4rpx solid #000;
				height: 60rpx;
			}
		}
	}

	.btn_registry {}
</style>
