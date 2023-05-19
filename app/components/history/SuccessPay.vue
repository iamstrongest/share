<template>
	<view class="container">
		<view class="warn" v-if="data.length==0">
			亲~，查询您暂无租借历史，请前往租借室租借吧!
		</view>
		<view v-else class="list" v-for="(item,index) in data" :key="index">
			<view class="payName">
				<text class="common">器材名字:</text>{{item.payName}}
			</view>
			<view class="numbers">
				<text class="common">数量:</text>{{item.nums}}
			</view>
			<view class="prices">
				<text class="common">单价:</text>{{item.prices}}
			</view>
			<view class="payTime">
				<text class="common">租借时间:</text>{{useDate(item.payTime)}}
			</view>
			<view class="returnTime">
				<text class="common">归还时间:</text>{{useDate(item.returnTime)}}
			</view>
			<view class="cost">
				<text class="common">花费金额:</text>{{item.cost}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		personStore
	} from "@/stores/person.js"
	import {
		ref
	} from "vue"
	import {
		useDate
	} from "@/utils/useDate.js"
	const usePersonStore = personStore();
	const data = ref([]);
	data.value = usePersonStore.fullPayList;
</script>

<style scoped lang="scss">
	.container {}

	.list {
		margin-bottom: 50rpx;
	}

	.warn {
		margin-top: 500rpx;
		color: #e8dfc4;
		font-size: 60rpx;
		background-color: #dc2d00;
		text-align: center;
	}

	.list {
		background-color: rgba(0, 0, 0, 0.7);
		color: #fff;

		.common {
			font-weight: 800;
			font-style: italic;
			text-shadow: 1rpx 1rpx;
			margin-right: 10rpx;
		}
	}
</style>
