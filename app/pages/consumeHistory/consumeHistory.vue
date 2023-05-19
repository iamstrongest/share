<template>
	<view class="history_container">
		<view class="top">
			<view class="success" @tap="change('SuccessPay')">已支付</view>
			<view class="fail" @tap="change('FailPay')">待支付</view>
		</view>
		<view class="data_show">
			<!-- #ifndef MP-WEIXIN -->
			<component :is="show"></component>
			<!-- #endif -->
		</view>
		<tabBar :propsIndex="4"></tabBar>
	</view>
</template>

<script>
	import SuccessPay from "@/components/history/SuccessPay.vue"
	import FailPay from "@/components/history/FailPay.vue"
	import {
		ref,getCurrentInstance
	} from "vue"
	import {
		personStore
	} from "@/stores/person.js"
	import {
		collectCartStore
	} from "@/stores/collectCart.js"
	export default {
		setup() {
			const usePersonStore = personStore();
			const useCollectCartStore = collectCartStore();
			const {
				proxy
			} = getCurrentInstance();
			const show = ref("SuccessPay");
			const change = (component) => {
				show.value = component;
			};
			
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
			return {
				show,
				change,
				usePersonStore,

			}
		},
		components: {
			SuccessPay,
			FailPay
		},
		onLoad() {

		}
	}
</script>

<style scoped lang="scss">
	.history_container {
		width: 100%;
        padding-bottom: 200rpx;
		.top {
			width: 100%;
			display: flex;
			height: 120rpx;

			view {
				flex: 1;
				font-size: 48rpx;
				display: flex;
				align-items: center;
				color: #fff;
				border: 4rpx solid #fff;
				border-radius: 10rpx;
				justify-content: center;
			}

			.success {
				background-color: #41a863;
			}

			.fail {
				background-color: #dc2d00;
			}
		}
	}
</style>
