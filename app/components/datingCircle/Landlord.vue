<template>
	<view class="landlord_container">
		<view class="message">
			<view class="left_image" :style="{'margin-left':props.margin_left+'rpx'}">
				<image :src="data.imageUrl" mode=""
					:style="{width:props.image_width+'rpx',height:props.image_height+'rpx','font-weight':props.font_style}">
				</image>
			</view>
			<view class="right_information">
				<text class="username">{{data.username}}</text>
				<!-- 文字 -->
				<view class="msg">{{data.message}}</view>
				<view class="operate">
					<view class="time">{{useDate(data.time)}}</view>
					<view class="reply" @tap="reply">
						<text>回复</text>
						<image src="../../static/images/reply.png" mode=""></image>
					</view>
					<view class="image" @tap="changeLandThumbs">
						<image v-if="!userInThumbs.includes(usePersonStore.personData.id)"
							src="../../static/images/collect.png" mode=""></image>
						<!-- v-else -->
						<image v-else src="../../static/images/collect_active.png" mode=""></image>
						<text>{{goodNum}}</text>
					</view>
				</view>
				<Reply v-if="isShowMore&&length>0" v-for="(item,index) in replyData" :data="item" :key="index"></Reply>
				<view v-if="props.isLandlord&&length>0" class="show_more" @tap="addMore">
					<text v-if="!isShowMore">
						展开{{length}}条信息
					</text>
					<text v-else>
						<text v-if="nowShowLength<length">展开更多信息</text>
					</text>
				</view>
			</view>
		</view>

	</view>

</template>

<script setup>
	import {
		ref,getCurrentInstance
	} from "vue";
	import Reply from "@/components/datingCircle/Reply.vue"
	import {
		datingCircleStore
	} from "@/stores/datingCircle.js"
	import {
		personStore
	} from "@/stores/person.js"
	import {
		useDate
	} from "@/utils/useDate.js"
	const useDatingCircleStore = datingCircleStore();
	const usePersonStore = personStore();
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
		isLandlord: {
			type: Boolean,
			default: false
		},
		margin_left: {
			type: Number,
			default: 100
		},
		font_style: {
			type: Number || String,
			default: 700
		},
		data: {
			type: Object,
		}
	});
	const isShowMore = ref(false);
	let length = ref(0);
	let page = ref(1);
	let nowShowLength = ref(0);
	const goodNum = ref(0);
	const userInThumbs = ref([]);
	let replyData = ref([]);
	const getLength = () => {
		uni.request({
			url: `${proxy.baseUrl}/getReplyLength`,
			method: "GET",
			data: {
				floor: props.data.id
			},
			success(res) {
				length.value = res.data.length;
			}
		})
	}
	const getLandThumbsLength = () => {
		uni.request({
			url: `${proxy.baseUrl}/get/landThumbs`,
			method: "GET",
			data: {
				land_id: props.data.id,
			},
			success(res) {
				goodNum.value = res.data.length;
				userInThumbs.value = res.data.data;
			}
		})
	}
	const changeLandThumbs = () => {
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
						url: `${proxy.baseUrl}/change/landThumbs`,
						method: "POST",
						data: {
							land_id: props.data.id,
							user_id: usePersonStore.personData.id,
							been_given_id:props.data.user_id,
						},
						success(res) {
							if (res.data.code == 0) {
								getLandThumbsLength();
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
							}
						}
					})
				}
			}
		})
	}
	const addMore = () => {
		if (!isShowMore.value) {
			isShowMore.value = true;
		}
		uni.request({
			url: `${proxy.baseUrl}/reply/${props.data.id}`,
			method: "GET",
			data: {
				page: page.value
			},
			success(res) {
				replyData.value = [...replyData.value, ...res.data.data];
				page.value++;
				nowShowLength.value += res.data.length;
			}
		})
	}
	const reply=()=>{
		useDatingCircleStore.isShowPublish=true;
		useDatingCircleStore.type=2;
		useDatingCircleStore.reply_id=props.data.user_id;
		useDatingCircleStore.floor=props.data.id
	}
	getLength();
	getLandThumbsLength();
</script>

<style scoped lang="scss">
	.landlord_container {
		padding-bottom: 150rpx;

		.message {
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
						margin-left: 20rpx;
						width: 150rpx;
						margin-right: 20rpx;
					}

					.time {
						width: 300rpx;
					}

				}

				.show_more {
					color: #ccc;
					margin-top:30rpx;
					transform: translateX(-50%);
					margin-left: 50%;
				}
			}
		}
	}
</style>
