<template>
	<view class="collect_container">
		<!-- <image src="../static/images/6970d3ed573a1bb758d67a2f44ad16cd" mode=""></image> -->
		<navBarCollectCart :show_back="false"></navBarCollectCart>
		<scroll-view class="scroll_view" scroll-y="true">
			<CollectionEquipment v-if="useCollectCartStore.selectEquipmentList.length>0"
				v-for="(item,index) in useCollectCartStore.selectEquipmentList" :equipment="item" :key="index"
				:style_width="1000">
			</CollectionEquipment>
			<view class="null" v-else>
				<text>啊哦~亲，暂无收藏，请前往租借室前往收藏吧!</text>
				<image src="../../static/images/no_collect.png" mode=""></image>
			</view>
		</scroll-view>
	</view>
	<view>
		<view class="operate" v-if="useCollectCartStore.isShowOprate">
			<view class="all" @tap="selectAll">
				全部选择
			</view>
			<view class="delete" @tap="deleteSelect">
				删除
			</view>
			<view class="create_order" @tap="submit">
				生成订单
			</view>
		</view>
		<tabBar :propsIndex="1"></tabBar>
	</view>
</template>

<script>
	import CollectionEquipment from "@/components/common/CollectionEquipment.vue"
	import navBarCollectCart from "@/components/navBar/navBarCollectCart.vue"
	import {
		collectCartStore
	} from "@/stores/collectCart.js"
	import {
		personStore
	} from "@/stores/person.js"
	import {
		ref,getCurrentInstance
	} from "vue"
	export default {
		setup() {
			const useCollectCartStore = collectCartStore();
			const usePersonStore = personStore();
			let statusBarHeight = ref();
			const {
				proxy
			} = getCurrentInstance();
			uni.request({
				method: "POST",
				url: `${proxy.baseUrl}/validate`,
				// uni.setStorageSync('authorization', res.data.token);
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
						// authorization: uni.getStorageSync('authorization')
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
			const init = (id) => {
				if (id === undefined) return;
				uni.request({
					method: 'GET',
					url: `${proxy.baseUrl}/getCart`,
					data: {
						id,
					},
					success(res) {
						useCollectCartStore.selectIdList = res.data.selectId;
						useCollectCartStore.selectEquipmentList = res.data.data;
					}
				})
			}
			const selectAll = () => {
				useCollectCartStore.clickList.idList =useCollectCartStore.selectEquipmentList.map((item,index)=>item.id);
				useCollectCartStore.clickList.idList.forEach((item,index)=>{
				const detail=useCollectCartStore.selectEquipmentList.filter((equipment)=>item==equipment.id);
				useCollectCartStore.clickList.payNameList.push(detail[0].name);
				useCollectCartStore.clickList.prices.push(detail[0].price);
				useCollectCartStore.clickList.numList.push(0);
				})
			}
			const deleteSelect = () => {
				uni.request({
					method: "DELETE",
					url: `${proxy.baseUrl}/delete/cartEquipment`,
					data: {
						user_id: usePersonStore.personData.id,
						equipments: useCollectCartStore.clickList.idList
					},
					success(res) {
						res.data.code == 0 ? uni.showToast({
							title: `${res.data.message}`
						}) : ""
						useCollectCartStore.isShowOprate = false;
						useCollectCartStore.clickList = {
							idList: [],
							payNameList: [],
							numList: [],
							prices: [],
						}
						uni.navigateTo({
							url:"/pages/sportCart/sportCart"
						})
					}
				})
			}

			const submit = () => {
				uni.request({
					method: "POST",
					url: `${proxy.baseUrl}/create/order`,
					data: {
						user_id: usePersonStore.personData.id,
						phone: usePersonStore.personData.phone,
						payName: useCollectCartStore.clickList.payNameList.join("-"),
						nums: useCollectCartStore.clickList.numList.join("-"),
						prices: useCollectCartStore.clickList.prices.join("-"),
						ids: useCollectCartStore.clickList.idList.join("-")
					},
					success(res) {
						uni.showToast({
							title: `${res.data.message}`
						})
						useCollectCartStore.isShowOprate = false;
						useCollectCartStore.clickList = {
							idList: [],
							payNameList: [],
							numList: [],
							prices: [],
						}
						init(usePersonStore.personData.id);
					}
				})
			}

			init(usePersonStore.personData.id);
			statusBarHeight.value = uni.getSystemInfoSync()['statusBarHeight'];
			statusBarHeight.value = statusBarHeight.value + 50;
			return {
				useCollectCartStore,
				usePersonStore,
				init,
				selectAll,
				deleteSelect,
				submit
			}
		},

		components: {
			CollectionEquipment,
			navBarCollectCart,
		},
		onLoad() {}
	}
</script>

<style scoped lang="scss">
	.operate {
		position: fixed;
		left: 0;
		bottom: 10%;
		display: flex;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		background-color: rgb(49, 108, 147);

		view {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 20rpx;
			width: 150rpx;
			color: #fff;
			height: 100rpx;
		}

		.all {
			background-color: rgb(19, 208, 118);
		}

		.delete {
			background-color: #cb2d01;
		}

		.create_order {
			background-color: deepskyblue;
		}
	}

	.collect_container {
		width: 100%;
		height: 90vh;
        padding-bottom: 300rpx;
		.null {
			margin-top: 500rpx;
			color: red;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 50%;
				height: 500rpx;
			}

		}
	}
</style>
