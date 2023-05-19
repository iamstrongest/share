<template>
	<view class="sport_shop_container">
		<navSearch nav_text="租借室" :show_back="false">
		</navSearch>
		<view class="sport_shop_container_top">
			<scroll-view class="left">
				<view class="left_conmon_type" v-for="(item,index) in sort" :class="{active:index==selectIndex}"
					@tap="changColor(index,item)">
					{{item}}
				</view>
				<!-- 分类 -->
			</scroll-view>
			<scroll-view class="right" scroll-y="true" show-scrollbar="false" @scrolltolower="getMore">
				<EquipmentCard v-for="(item,index) in selectType" :key="index" :equipment="item" @tap="goDetail(item)"
					:style_width="100">
				</EquipmentCard>
				<!-- 分类后的体育器材 -->
			</scroll-view>
			<tabBar :propsIndex="0"></tabBar>
		</view>
	</view>
</template>

<script setup>
	import EquipmentCard from "@/components/common/EquipmentCard.vue"
	import navSearch from "@/components/navBar/navSearch.vue"
	import {
		detailCartStore
	} from "@/stores/equipmentDetail.js"
	import {
		ref,
		getCurrentInstance,
		inject
	} from "vue"
	import {
		personStore
	} from "@/stores/person.js"
	const usePersonStore = personStore();
	const useDetailCartStore = detailCartStore();
	const {
		proxy
	} = getCurrentInstance();
	const sort = ref([]);
	const selectIndex = ref(0);
	const selectType = ref([]);
	const init = () => {
		uni.request({
			method: "GET",
			url: `${proxy.baseUrl}/types`,
			// header: {
			//    'content-type': 'application/json;charset:utf-8'
			//    },
			success(res) {
				sort.value = res.data.data;
				changColor(0, sort.value[0]);
			}
		})
	};
	const changColor = (index, type) => {
		selectIndex.value = index;
		uni.request({
			method: "GET",
			url: `${proxy.baseUrl}/type`,
			data: {
				type,
			},
			success(res) {
				selectType.value = res.data.data
			}
		})
	};
	const goDetail = (equipment) => {
		useDetailCartStore.detail = equipment;
		uni.navigateTo({
			url: `/pages/details/details`
		})
	};
	init();
</script>
<style lang="scss" scoped>
	.active {
		color: #fff;
		background-color: skyblue;
	}

	.sport_shop_container {
		.sport_shop_container_top {
			width: 100%;
			height: 90vh;
			display: flex;
			flex-direction: row;

			.left {
				width: 30%;
				height: 90%;
				border-right: 6rpx rgba(65, 168, 99, 0.3) solid;

				.left_conmon_type {
					width: 100%;
					font-size: 48rpx;
					height: 100rpx;
					border-left: 10rpx #ccc solid;
					font-size: #ccc;
					text-align: center;
					margin-bottom: 50rpx;
				}
			}

			.right {
				flex: 1;
				height: 90%;
				padding-bottom: 200rpx;

				.margin {
					width: 100%;
					height: 10rpx;
					margin-bottom: 50rpx
				}
			}
		}
	}
</style>