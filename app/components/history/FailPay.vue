<template>
	<view class="">
		<view class="warn" v-if="data.length==0">
			亲~，查询您暂无租借历史，请前往租借室租借吧!
		</view>
		<view v-else class="list">
			<view class="payName">
				<text class="common">器材名字:</text>{{data[0].payName}}
			</view>
			<view class="numbers">
				<text class="common">数量:</text>{{data[0].nums}}
			</view>
			<view class="prices">
				<text class="common">单价</text>:{{data[0].prices}}
			</view>
			<view class="payTime">
				<text class="common">租借时间:</text>{{useDate(data[0].payTime)}}
			</view>
		</view>
		<view class="return" @tap="toPay">
			点击归还
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
	import {useDate} from "@/utils/useDate.js"
	const usePersonStore = personStore();
	const data = ref([]);
	data.value = usePersonStore.partPayList;

	const toPay = () => {
		if(data.value.length>0){
			uni.navigateTo({
				url: "/pages/paymentMethods/paymentMethods"
			})
		}else{
			uni.showToast({
				title:"请您先去租借器材，再来结算吧~"
			})
		}
		
	}
</script>

<style scoped lang="scss">
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

	.return {
		background-color: deepskyblue;
		color: #fff;
		width: 300rpx;
		height: 120rpx;
		font-size: 48rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 55%;
		top: 80%;
		border-radius: 20rpx;
	}
</style>
