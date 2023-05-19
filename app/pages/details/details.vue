<template>
	<view class="details_container">
		<view class="image">
			<image :src="equipment.imageUrl" mode=""></image>
		</view>
		<view class="equipment_information">
			<view class="name">
				<text class="common_left_text">名字:</text> <text class="common_right_text"> {{equipment.name}}</text>
			</view>
			<view class="type">
				<text class="common_left_text">类型:</text> <text class="common_right_text"> {{equipment.type}}</text>
			</view>
			<view class="price">
				<text class="common_left_text">单价:</text> <text class="common_right_text"> {{equipment.price}}</text>
			</view>
			<view class="unit">
				<text class="common_left_text">计费方式:</text> <text class="common_right_text"> {{equipment.unit}}</text>
			</view>
			<view class="rest">
				<text class="common_left_text">剩余数量:</text> <text class="common_right_text">
					{{equipment.restNum}}</text>
			</view>
			<view class="description">
				<text class="common_left_text">介绍:</text> <text class="common_right_text">
					{{equipment.description}}</text>
			</view>
		</view>
		<view class="bottom">
			<view class="addCart" @tap="operate">
				<!-- 未添加 -->
				<template v-if="!useCollectCartStore.selectIdList.includes(equipment.id)">
					<view class="">
						点击加入收藏夹
					</view>
					<image src="@/static/images/collect.png" mode=""></image>
				</template>
				<template v-else>
					<view class="goCart_text">
						取消加入收藏夹
					</view>
					<image src="@/static/images/collect_active.png" mode=""></image>
				</template>
			</view>
			<!-- 去收藏夹结算 -->
			<view class="goCart" @tap="goCollectUrl">
				<view class="goCart_text">
					前往收藏夹结算
				</view>
				<image src="../../static/tab_icons/cart.png" mode=""></image>
			</view>
		</view>
	</view>
	<TextCard color="red"></TextCard>
	<view class="recommend">
		<EquipmentCard v-for="(item,index) in data" :equipment="item" :style_width="style_width" :key="index"
			@tap="goDetail(item)">
		</EquipmentCard>
	</view>
</template>

<script>
	import TextCard from "@/components/common/TextCard.vue"
	import EquipmentCard from "@/components/common/EquipmentCard.vue"
	import {
		detailCartStore
	} from "@/stores/equipmentDetail.js"
	import {
		reactive,
		ref,
		getCurrentInstance
	} from "vue";
	import {
		collectCartStore
	} from "@/stores/collectCart.js"
	import {
		personStore
	} from "@/stores/person.js"
	export default {
		setup() {
			const {
				proxy
			} = getCurrentInstance();
			let equipment = reactive({});
			let style_width = 800;
			let data = ref([]);
			let page = ref(1);
			let totalLength = ref();
			const useCollectCartStore = collectCartStore();
			const useDetailCartStore = detailCartStore();
			const usePersonStore = personStore();
			equipment = useDetailCartStore.detail;

			function operate() {
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
							uni.request({
								url: `${proxy.baseUrl}/changeCart`,
								method: "POST",
								data: {
									user_id: usePersonStore.personData.id,
									equ_id: equipment.id,
								},
								success() {
									uni.request({
										method: 'GET',
										url: `${proxy.baseUrl}/getCart`,
										data: {
											id: usePersonStore.personData.id
										},
										success(res) {
											useCollectCartStore.selectIdList = res.data.selectId;
											useCollectCartStore.selectEquipmentList = res.data
											.data;
										}
									})
								}
							})
						}
					}
				})

			};

			function getMore() {
				uni.request({
					method: "GET",
					url: `${proxy.baseUrl}/random`,
					data: {
						page: page.value
					},
					success(res) {
						totalLength.value = res.data.length;
						data.value = [...data.value, ...res.data.data];
						page.value++;
					}
				})
			};

			function goDetail(item) {
				useDetailCartStore.detail = item;
				uni.navigateTo({
					url: `/pages/details/details`
				})
			};

			function goCollectUrl() {
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
							uni.navigateTo({
								url: "/pages/sportCart/sportCart"
							})
						}
					}
				})

			}
			getMore();
			return {
				useCollectCartStore,
				useDetailCartStore,
				equipment,
				style_width,
				totalLength,
				data,
				operate,
				getMore,
				goDetail,
				goCollectUrl,
			}
		},
		components: {
			TextCard,
			EquipmentCard,
		},
		onLoad() {


		},
		onReachBottom() {
			// console.log(this.data.length,this.totalLength);
			// this.getMore();
			if (this.data.length < this.totalLength) {
				this.getMore();
			} else {
				uni.showToast({
					title: "暂无更多数据~"
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	.details_container {

		.image {
			width: 100%;
			height: 600rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.equipment_information {
			width: 100%;
			height: 500rpx;
			display: flex;
			background-color: rgba(0, 0, 0, 0.9);
			flex-direction: column;
			justify-content: space-between;
		}
	}

	.common_left_text {
		font-size: 36rpx;
		color: #fff;
		font-weight: 800;
		font-style: italic;
	}

	.common_right_text {

		color: #fff;
		font-size: 30rpx;
	}

	.bottom {
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.addCart,
		.goCart {
			display: flex;
			align-items: center;
			font-weight: 900;
			width: 100%;
			height: 100%;

			.goCart_text {
				width: auto;
				height: auto;
			}

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
</style>
