<template>
	<view class="message_container">
		<view class="left_image" :style="{'margin-left':props.margin_left+'rpx'}">
			<image :src="data.imageUrl" mode=""
				:style="{width:props.image_width+'rpx',height:props.image_height+'rpx','font-weight':props.font_style}">
			</image>
		</view>
		<view class="right_information">
			<text class="username">{{data.publish_name}}=>{{data.reply_name}}</text>
			<!-- 文字 -->
			<view class="msg">{{data.message}}</view>
			<view class="operate">
				<view class="time">{{useDate(data.time)}}</view>
				<view class="reply" @tap="reply">
					<text>回复</text>
					<image src="../../static/images/reply.png" mode=""></image>
				</view>
				<view class="image" @tap="changeFollowThumbs">
					<image v-if="!userInThumbs.includes(usePersonStore.personData.id)" src="../../static/images/collect.png" mode=""></image>
					<image v-else src="../../static/images/collect_active.png" mode=""></image>
					<text>{{goodNum}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,getCurrentInstance
	} from "vue"
	import {
		personStore
	} from "@/stores/person.js"
	import {
		datingCircleStore
	} from "@/stores/datingCircle.js"
	import {
		useDate
	} from "@/utils/useDate.js"
	const usePersonStore = personStore();
	const useDatingCircleStore = datingCircleStore();
	const {
		proxy
	} = getCurrentInstance();
	const props = defineProps({
		image_width: {
			type: Number,
			default: 70
		},
		image_height: {
			type: Number,
			default: 70
		},
		margin_left: {
			type: Number,
			default: -70
		},
		font_style: {
			type: Number || String,
			default: 700
		},
		data: {
			type: Object,
		}
	});
	const goodNum = ref(0);
	const userInThumbs = ref([]);
	const getFollowThumbsLength = () => {
		uni.request({
			url: `${proxy.baseUrl}/get/followThumbs`,
			method: "GET",
			data: {
				follow_id: props.data.id,
			},
			success(res) {
				goodNum.value = res.data.length;
				userInThumbs.value = res.data.data;
			}
		})
	}
	const changeFollowThumbs = () => {
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
						url: `${proxy.baseUrl}/change/followThumbs`,
						method: "POST",
						data: {
							follow_id: props.data.id,
							user_id: usePersonStore.personData.id,
							been_given_id:props.data.publish_id
						},
						success(res) {
							if (res.data.code == 0) {
								uni.request({
									method: "GET",
									url: `${proxy.baseUrl}/user/another`,
									data: {
										id: usePersonStore.personData.id
									},
									success(res) {
										usePersonStore.anotherData = res.data.data;
									}
								})
								getFollowThumbsLength();
							}
						}
					})
				}
			}
		})
	}
	const reply=()=>{
		useDatingCircleStore.isShowPublish=true;
		useDatingCircleStore.type=2;
		useDatingCircleStore.reply_id=props.data.publish_id;
		useDatingCircleStore.floor=props.data.floor;
	}
	// if(useDatingCircleStore.retutnIsPublishReply){
	// 	getLandlord();
	// 	useDatingCircleStore.retutnIsPublishReply=false;
	// }
	getFollowThumbsLength();
</script>

<style scoped lang="scss">
	.message_container {
		width: 100%;
		font-size: 38rpx;
		display: flex;
		flex-direction: row;

		.left_image {
			image {
				border-radius: 50%;
				vertical-align: top
			}
		}

		.right_information {
			width: 100%;
			display: flex;
			box-sizing: border-box;
			flex-direction: column;

			.username {
				color: #ccc;
				margin-bottom: 20rpx;
			}

			.msg {

				width: 650rpx;
				height: auto;
			}

			.operate {

				height: 50rpx;
				display: flex;
				font-size: 30rpx;
				align-items: center;
				color: #ccc;

				view {
					width: 200rpx;
					display: flex;
					align-items: center;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}

				.reply {
					width: 150rpx;
					margin-right: 20rpx;
				}

				.time {
					width: 300rpx;
				}

			}

			.show_more {
				color: #ccc;
				transform: translateX(-50%);
				margin-left: 50%;
			}
		}
	}
</style>
