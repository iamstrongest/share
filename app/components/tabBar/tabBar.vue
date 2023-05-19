<template>
	<view class="tabBar_contianer">
		<view class="common_icon" v-for="(item, index) in dataList" :key="index" @tap="select(item.pagePath, index)">
			<view class="image">
				<image :src="selectIndex == index ? item.selectedIconPath : item.iconPath" mode=""></image>
			</view>
			<view class="text">
				<text>{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import tabBarList from "@/static/iconPath.js"
export default {
	data() {
		return {
			dataList: [],
			selectIndex: 0
		}
	},
	props: {
		propsIndex: {
			type: Number,
			default: 0
		}
	},
	created() {
		this.dataList = tabBarList;
		this.selectIndex = parseInt(this.propsIndex);
	},
	methods: {
		select(url, index) {
			// uni.navigateTo({
			// 	url,
			// })
			uni.switchTab({
				url,
			})
			this.selectIndex = index;
		}
	}
}
</script>

<style scoped  lang="scss">
.tabBar_contianer {
	width: 100%;
	height: 100rpx;
	display: flex;
	flex-direction: row;
	align-content: center;
	position: fixed;
	left: 0;
	bottom: 0;
	justify-content: space-around;

	.common_icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.image image {
			width: 50rpx;
			height: 50rpx;
		}

		.text {
			font-size: 28rpx;
		}
	}
}
</style>
