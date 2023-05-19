<template>
	<view class="login_container">
		<view class="title">
			轻量级共享健身
		</view>
		<!-- :v-model="localPhone!=undefined ?localPhone:phone" -->
		<view class="common">
			<text>手机号:</text><input type="tel" name="tel" id="tel" placeholder="请输入11位手机号" v-model="phone"
				placeholder-style="color:grey">
		</view>
		<!-- :v-model="localPassword!=undefined ?localPassword:password" -->
		<view class="common">
			<text>密&nbsp;&nbsp;&nbsp;&nbsp;码:</text><input type="password" name="pwd" id="pwd" placeholder="请输入登录密码"
				v-model="password" placeholder-style="color:grey">
		</view>
		<LineLine></LineLine>
		<view class="user_another">
			<!-- 两个链接，跳转界面 -->
			<view class="" @tap="goRegistry"><text>没有账号?立即注册</text></view>
			<view class="" @tap="goFindPwd"><text>忘记密码?立即找回</text></view>
		</view>
		<LineLine line_color="blue"></LineLine>
		<view>
			<h2 id="h2">其它方式登录</h2>
			<image id="vx_login" src="../../static/images/vxLogin.png" @tap="vxLogin"></image>
		</view>
		<button type="primary" @tap="login">登录</button>
	</view>

</template>

<script>
	import {
		ref,getCurrentInstance
	} from "vue"
	import LineLine from "@/components/common/Line.vue"
	import {
		personStore
	} from "@/stores/person.js"
	import {
		collectCartStore
	} from "@/stores/collectCart.js"
	export default {
		setup() {
			const {
				proxy
			} = getCurrentInstance();
			const phone = ref("");
			const password = ref("");
			const localPhone = uni.getStorageSync('phone');
			const localPassword = uni.getStorageSync('password');
			if (localPhone != undefined) {
				phone.value = localPhone;
			}
			if (localPassword != undefined) {
				password.value = localPassword;
			}
			const usePersonStore = personStore();
			const useCollectCartStore = collectCartStore();
			const goRegistry = () => {
				uni.navigateTo({
					url: "/pages/registry/registry"
				})
			}
			const goFindPwd = () => {
				uni.navigateTo({
					url: "/pages/findPwd/findPwd"
				})
			}
			const login = () => {
				uni.request({
					method: "POST",
					url: `${proxy.baseUrl}/login`,
					data: {
						phone: phone.value,
						password: password.value
					},
					success(res) {
						if (res.data.code == 0) {
							uni.navigateBack({
								delta: 1,
								animationType: "pop-in",
								animationDuration: 1000,
								success() {
									usePersonStore.personData = res.data.data;
									usePersonStore.authorization = res.data.token;
									uni.setStorageSync('phone', phone.value);
									uni.setStorageSync('password', password.value);
									uni.showToast({
										title: `${res.data.message}`,
									})
									uni.request({
										method: "GET",
										url: `${proxy.baseUrl}/order`,
										data: {
											user_id: usePersonStore.personData.id
										},
										success(res) {
											usePersonStore.fullPayList = res.data.fullPayList;
											usePersonStore.partPayList = res.data.partPayList;
										}
									})
									uni.request({
										method: 'GET',
										url: `${proxy.baseUrl}/getCart`,
										data: {
											id: usePersonStore.personData.id
										},
										success(res) {
											useCollectCartStore.selectIdList = res.data
												.selectId;
											useCollectCartStore.selectEquipmentList = res.data
												.data;
										}
									})
									uni.request({
										method: "GET",
										url: `${proxy.baseUrl}/user/another`,
										data: {
											id: usePersonStore.personData.id
										},
										success(res) {
											usePersonStore.anotherData = res.data.data;
										}
									})
								}
							});


						} else {
							uni.showModal({
								title: "温馨提示,请联系管理员",
								content: `${res.data.message}`,
							})
						}

					}
				})
			}
			const vxLogin = () => {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes)
						console.log(loginRes.authResult);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log(infoRes)
								console.log('用户昵称为：' + infoRes.userInfo.nickName);
							}
						});
					}
				});

			}
			return {
				phone,
				password,
				goRegistry,
				goFindPwd,
				localPhone,
				localPassword,
				login,
				usePersonStore,
				vxLogin,
			}
		},
		components: {
			LineLine,
		},
		onLoad() {

		}
	}
</script>

<style scoped lang="scss">
	.login_container {
		width: 100%;
		height: 100vh;
		background-image: url("../../static/images/df3835cd6740ff8434d4cd2d04e7c5d6.jpg");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding-top: 100rpx;

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
			-webkit-background-clip: text;
			color: transparent;
			font-size: 68rpx;
			margin-bottom: 100rpx;
		}
	}

	#btn {
		display: block;
		width: 100rpx;
		height: auto;
		background-color: skyblue;
		color: #fff;
	}

	#h2 {
		text-align: center;
	}

	#vx_login {
		width: 15vw;
		height: 15vw;
		margin-left: 10vw;

		:hover {
			cursor: pointer;
		}
	}

	.common {
		position: relative;
		height: 100rpx;
		margin-bottom: 50rpx;

		text {
			position: absolute;
			left: 0;
			width: auto;
			height: auto;
			font-size: 36rpx;
			color: #000;
		}

		input {
			position: absolute;
			border: 4rpx solid #000;
			border-radius: 10rpx;
			left: 20%;
			font-size: 36rpx;
			color: #000000;
			width: auto;
			height: auto;
		}

	}

	.user_another {
		display: flex;
		justify-content: space-between;
		font-size: 36rpx;
		margin-bottom: 100rpx;
	}
</style>