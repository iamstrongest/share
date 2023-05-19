<template>
	<view class="search_container">
		<view class="search_top">
			<image class="search_image " src="../../static/images/search.png" mode=""></image>
			<input class="search_ipt " type="text" v-model="ipt" placeholder="宁可少输,也别打错" />
			<view class="search_click " @tap="search">
				<text>搜索</text>
			</view>
		</view>
		<view class="list">
			<EquipmentCard v-if="data.length>0" v-for="(item,index) in data" :key="index" :equipment="item"
				:style_width="1000" @tap="goDetail(item)"></EquipmentCard>
		</view>
	</view>
</template>

<script setup>
	import EquipmentCard from "@/components/common/EquipmentCard.vue"
	import {
		ref,
		getCurrentInstance
	} from "vue";
	import {
		detailCartStore
	} from "@/stores/equipmentDetail.js"
	import {
		personStore
	} from "@/stores/person.js"
	const usePersonStore = personStore();
	const useDetailCartStore = detailCartStore();
	const {
		proxy
	} = getCurrentInstance();
	const data = ref([]);
	const ipt = ref("");
	const search = () => {
		uni.request({
			method: "GET",
			url: `${proxy.baseUrl}/search`,
			data: {
				name: ipt.value
			},
			success(res) {
				res.data.code == 0 ? data.value = res.data.data : uni.showToast({
					title: `${res.data.message}`
				})
			}
		})
	}
	const goDetail = (equipment) => {
		useDetailCartStore.detail = equipment;
		uni.navigateTo({
			url: `/pages/details/details`
		})
	};
</script>

<style scoped lang="scss">
	.search_container {
		.search_top {
			width: 100%;
			display: flex;
			height: 100rpx;
			align-items: center;
			justify-content: space-between;

			.search_image {
				width: 80rpx;
				height: 80rpx;
			}

			.search_click {
				width: 100rpx;
				height: auto;
				font-size: 48rpx;
				color: #fff;
				text-align: center;
				background-color: deepskyblue;
				border-radius: 20rpx;
				font-style: italic;
			}

			.search_ipt {
				flex: 1;
				height: 60rpx;
				margin: 0 20rpx;
				border: 4rpx solid #ccc;
				border-radius: 10rpx;
			}
		}
	}
</style>
