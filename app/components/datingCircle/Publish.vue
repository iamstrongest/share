<template>
	<view class="mask">
		<view class="publish_container">
			<textarea class="textarea" v-model="useDatingCircleStore.message" placeholder="善于结善缘,恶言伤人心" />
			<view class="buttons">
				<view class="publish common" @tap="publish">
					<text>发布</text>
				</view>
				<view class="cancle common"  @tap="cancle">
					<text>取消</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {getCurrentInstance} from "vue"
	import {
		datingCircleStore
	} from "@/stores/datingCircle.js"
	import {
		personStore
	} from "@/stores/person.js"
	const useDatingCircleStore = datingCircleStore();
	const usePersonStore = personStore();
	const {
		proxy
	} = getCurrentInstance();
	getCurrentInstance
	const publish=()=>{
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
					if(useDatingCircleStore.type==1){
						uni.request({
							url: `${proxy.baseUrl}/add/landlord`,
							method: "POST",
							data: {
								publish_id: usePersonStore.personData.id,
								message: useDatingCircleStore.message
							},
							success(res) {
								if (res.data.code == 0) {
									uni.showToast({
										title: `${res.data.message}`
									})
									useDatingCircleStore.isShowPublish=false;
									useDatingCircleStore.message="";
									useDatingCircleStore.type=0;
									usePersonStore.isPublishLandlord=true;
									uni.navigateTo({
										url:"/pages/datingCircles/datingCircles"
									})
								}
							}
						})
					}else if (useDatingCircleStore.type==2){
						uni.request({
							url: `${proxy.baseUrl}/add/reply`,
							method: "POST",
							data: {
								publish_id: usePersonStore.personData.id,
								message: useDatingCircleStore.message,
								reply_id:useDatingCircleStore.reply_id,
								floor:useDatingCircleStore.floor
							},
							success(res) {
								if (res.data.code == 0) {
									uni.showToast({
										title: `${res.data.message}`
									})
									useDatingCircleStore.isShowPublish=false;
									useDatingCircleStore.message="";
									useDatingCircleStore.type=0;
									useDatingCircleStore.reply_id="";
									useDatingCircleStore.floor=";"
									usePersonStore.isPublishReply=true;
									uni.navigateTo({
										url:"/pages/datingCircles/datingCircles"
									})
								}
							}
						})
					}
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
	const cancle=()=>{
		useDatingCircleStore.isShowPublish=false;
		useDatingCircleStore.message="";
	}
</script>

<style scoped lang="scss">
	.mask{
	    position: fixed;
	    left: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    margin: auto;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(0, 0, 0, 0.3);
	    z-index: 2;
		.publish_container {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			width:100%;
			height: 400rpx;
			background-color: #fff;
			.textarea{
				width: 100%;
				height: 300rpx;
				background-color: #ccc;
			}
			.buttons{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.common{
					width: 120rpx;
					height: 60rpx;
					color: #fff;
					font-size: 48rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 20rpx;
					margin-top: 20rpx;
				}
				.publish{
					background-color: deepskyblue;
				}
				.cancle{
					background-color: red;
				}
			}
			
		}
	}
	
</style>
