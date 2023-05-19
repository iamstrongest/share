<template>
	<view>
		<view class="warn">
			请选择下列支付方式
		</view>
		<radio-group>
			<view class="vx common">
				<image src="@/static/images/vxPay.png" mode=""></image>
				<text>微信</text>
                 <radio></radio>
			</view>
			<view class="ali common">
				<image src="@/static/images/aliPay.png" mode=""></image>
				<text>支付宝</text>
			     <radio></radio>
			</view>
		</radio-group>
		<view class="pay" @tap="pay"> 
			去支付
		</view>
	</view>
</template>

<script setup>
const pay=()=>{
	uni.navigateTo({
		url:"/pages/payment/payment"
	})
}
</script>

<style scoped lang="scss">
.common{
	width: 100%;
	height: 100rpx;
	margin-bottom: 100rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	image{
		width: 100rpx;
		height: 100rpx;
	}
}
.pay{
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
