<template>
	<view class="equipment_container" :style="{height:+style_height+'rpx',width:+style_width+'%'}">
		<radio v-if="useCollectCartStore.isShowOprate"
			:checked="useCollectCartStore.clickList.idList.includes(equipment.id)" @tap="changeChecked"></radio>
		<view class="image">
			<image :src="equipment.imageUrl" mode=""></image>
		</view>
		<view class="right">
			<view class="information">
				<view class="name">
					名字:{{equipment.name}}
				</view>
				<view class="type">
					种类:{{equipment.type}}
				</view>
				<view class="price">
					单价:{{equipment.price}}
				</view>
				<view class="unit">
					计费方式:{{equipment.unit}}
				</view>
				<view class="rest_num">
					剩余:{{equipment.restNum}}
				</view>
			</view>
			<view class="equipment_num" v-if="useCollectCartStore.isShowOprate">
				<view class="sub" @tap="sub">
					<image v-if="num>0" src="@/static/images/subtract.png" mode=""></image>
				</view>
				<view class="num">
					{{num}}
				</view>
				<view class="add" @tap="add">
					<image src="@/static/images/add.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		collectCartStore
	} from "@/stores/collectCart.js"
	const useCollectCartStore = collectCartStore();
	const num = ref(0);
	const props = defineProps({
		equipment: {
			type: Object,
			require: true
		},
		style_width: {
			type: Number || String,
			default: 50
		},
		style_height: {
			type: Number || String,
			default: 250
		},
		url: String
	});
	const changeChecked = () => {
		if (useCollectCartStore.clickList.idList.includes(props.equipment.id)) {
			const index = useCollectCartStore.clickList.idList.indexOf(props.equipment.id);
			useCollectCartStore.clickList.idList.splice(index, 1);
			useCollectCartStore.clickList.payNameList.splice(index, 1);
			useCollectCartStore.clickList.numList.splice(index, 1);
			useCollectCartStore.clickList.prices.splice(index, 1);
		} else {
			useCollectCartStore.clickList.idList.push(props.equipment.id);
			useCollectCartStore.clickList.prices.push(props.equipment.price);
			useCollectCartStore.clickList.payNameList.push(props.equipment.name)
			useCollectCartStore.clickList.numList.push(num.value)
		}
	}
	const sub = () => {
		num.value--;
		const index = useCollectCartStore.clickList.idList.indexOf(props.equipment.id);
		useCollectCartStore.clickList.numList[index] = num.value
	}
	const add = () => {
		num.value < props.equipment.restNum ? num.value++ : "";
		const index = useCollectCartStore.clickList.idList.indexOf(props.equipment.id);
		useCollectCartStore.clickList.numList[index] = num.value
	}
</script>

<style scoped lang='scss'>
	.equipment_container {
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		width: 100%;
		flex-direction: row;
		margin-bottom: 50rpx;
		align-items: center;
		box-shadow: 10rpx 10rpx 20rpx;

		.image {
			width: 150rpx;
			height: 150rpx;

			image {
				width: 100%;
				height: 100%;
			}

			margin-right: 10rpx;
		}

		.right {
			flex: 1;
			display: flex;

			.information {
				width: 300rpx;
				color: #fff;
				font-weight: 900;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}

			.equipment_num {
				display: flex;
				width: 180rpx;
				justify-content: space-between;
				align-items: center;

				view {
					color: #fff;
					font-size: 50rpx;
					width: 50rpx;
					height: 50rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

	}
</style>
