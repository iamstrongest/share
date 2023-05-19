<template>
	<view class="set_container">
		<view @tap="show(1)">
			<image src="../../static/images/nickname.png" mode=""></image>
			<text>修改昵称></text>
		</view>
		<view @tap="show(2)">
			<image src="../../static/images/description.png" mode=""></image>
			<text>修改签名></text>
		</view>
		<view @tap="show(3)">
			<image src="../../static/images/email.png" mode=""></image>
			<text>绑定邮箱></text>
		</view>
		<view @tap="upload">
			<image src="../../static/images/avatar.png" mode=""></image>
			<text>修改头像></text>
		</view>
	</view>
	<Mask v-if="showMask.showName">
		<template #default>
			<input class="common_ipt" type="text" v-model="user.username" placeholder="请输入昵称" />
			<view class="oprate">
				<view class="common confirm" @tap="changeTickname">确定</view>
				<view class="common cancle" @tap="cancle">取消</view>
			</view>
		</template>
	</Mask>
	<Mask v-if="showMask.showDesc">
		<template #default>
			<input class="common_ipt" type="text" v-model="user.description" placeholder="请输入个人简介" />
			<view class="oprate">
				<view class="common confirm" @tap="changeDesc">确定</view>
				<view class="common cancle" @tap="cancle">取消</view>
			</view>
		</template>
	</Mask>
	<Mask v-if="showMask.showEmail">
		<template #default>
			<view class="email_top">
				<input class="email common_ipt" type="email" v-model="user.email" placeholder="请输入待绑定的邮箱号" />
				<view class="common verificationCode" @tap="getVerificationCode">
					<text>获取验证码</text>
				</view>
			</view>
			<view class="email_bottom">
				<input class="ipt_verificationCode common_ipt" type="text" v-model="user.verificationCode"
					placeholder="请输入验证码" />
				<form action="">
					<view class="oprate">
						<view class="common confirm" @tap="submit">
							<text>绑定</text>
						</view>
						<view class="common cancle" @tap="cancle">
							<text>取消</text>
						</view>
					</view>
				</form>
			</view>
		</template>
	</Mask>
</template>

<script setup>
	import Mask from "@/components/common/Mask.vue"
	import {
		personStore
	} from "@/stores/person.js"
	import {
		ref,
		reactive,
		getCurrentInstance
	} from "vue";
	const usePersonStore = personStore();
	const {
		proxy
	} = getCurrentInstance();
	const user = reactive({
		username: "",
		email: "",
		description: "",
		verificationCode: ""
	})
	const showMask = reactive({
		showName: false,
		showEmail: false,
		showDesc: false
	})
	const show = (type) => {
		switch (type) {
			case 1:
				showMask.showName = true;
				break;
			case 2:
				showMask.showDesc = true;
				break;
			case 3:
				showMask.showEmail = true;
				break;
			default:
				break;
		}
	}
	const cancle = () => {
		showMask.showName = false;
		showMask.showDesc = false;
		showMask.showEmail = false;
	}
	const changeTickname = () => {
		uni.request({
			url: `${proxy.baseUrl}/change/name`,
			method: "PUT",
			data: {
				id: usePersonStore.personData.id,
				username: user.username,
			},
			success(res) {
				uni.showToast({
					title: `${res.data.message}`
				})
				uni.request({
					url: `${proxy.baseUrl}/get`,
					data: {
						id: usePersonStore.personData.id
					},
					success(res) {
						usePersonStore.personData = res.data.data;
						uni.navigateTo({
							url: "/pages/my/my"
						})
					}
				})
			}
		})
		showMask.showName = false;
	}
	const changeDesc = () => {
		uni.request({
			url: `${proxy.baseUrl}/change/description`,
			method: "PUT",
			data: {
				id: usePersonStore.personData.id,
				description: user.description,
			},
			success(res) {
				uni.showToast({
					title: `${res.data.message}`
				})
				uni.request({
					url: `${proxy.baseUrl}/get`,
					data: {
						id: usePersonStore.personData.id
					},
					success(res) {
						usePersonStore.personData = res.data.data;
						uni.navigateTo({
							url: "/pages/my/my"
						})
					}
				})
			}
		})
		showMask.showDesc = false;
	}
	const getVerificationCode = () => {
		uni.request({
			url: `${proxy.baseUrl}/send/email`,
			method: "POST",
			data: {
				id: usePersonStore.personData.id,
				email: user.email,
			},
			success(res) {
				uni.showModal({
					title: `${res.data.message}`
				})
			}
		})
	}
	const submit = () => {
		uni.request({
			url: `${proxy.baseUrl}/register/email`,
			method: "POST",
			data: {
				phone: usePersonStore.personData.phone,
				verificationCode: user.verificationCode,
			},
			success(res) {
				uni.showToast({
					title: `${res.data.message}`
				})
				uni.request({
					url: `${proxy.baseUrl}/get`,
					data: {
						id: usePersonStore.personData.id
					},
					success(res) {
						usePersonStore.personData = res.data.data;
						uni.showModal({
							title: `${res.data.message}`
						})
					}
				})
			}
		})
	}
	const upload = () => {
		uni.chooseImage({ //选择图片
			count: 1,
			sizeType: ["compressed"],
			success(res) {
				const tempFilePaths = res.tempFilePaths;
				uni.uploadFile({ //上传代码
					url: `${proxy.baseUrl}/upload/image`, //本地node.js服务器地址
					filePath: tempFilePaths[0],
					name: 'file',
					formData: {//用于给file文件添加额外说明信息
						id: usePersonStore.personData.id,
					},
					success: function(res) {
						uni.showToast({
							title: `修改头像成功`
						})
						uni.request({
							url: `${proxy.baseUrl}/get`,
							data: {
								id: usePersonStore.personData.id
							},
							success(response) {
								usePersonStore.personData = response.data.data;
								uni.navigateTo({
									url: "/pages/my/my"
								})
							}
						})
					},
					fail: function(err) {
						console.log(err)
					}
				})
			}
		})
	}
</script>

<style scoped lang="scss">
	.set_container {
		width: 100%;
		height: 100vh;

		view {
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 100rpx;

			image {
				width: 100rpx;
				height: 100rpx;
			}

			text {
				font-size: 60rpx;
				color: #ccc;
			}
		}
	}

	.common_ipt {
		width: 100%;
		height: 80rpx;
		font-size: 60rpx;
		border-radius: 20rpx;
		color: #fff;
		border: 4rpx #ccc solid;
		margin-bottom: 30rpx;
	}

	.common {
		width: 200rpx;
		height: 80rpx;
		font-size: 50rpx;
		text-align: center;
		color: #fff;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.oprate {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.confirm {
		background-color: deepskyblue;
	}

	.verificationCode {
		position: relative;
		left: 65%;
		width: 250rpx;
		background-color: #cd6600;
		height: 100rpx;
		border-radius: 20rpx;
		margin: 30rpx 0;
	}

	.cancle {
		background-color: #d33682;
	}

	.email_top {}
</style>
