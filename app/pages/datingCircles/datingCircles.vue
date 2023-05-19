<template>
	<view class="dating_circle_container">
		<navBarBatingCircle :show_back="false" :margin_height="statusBarHeight" nav_text="谈论圈" right_text="发布"
			img_url="@/static/images/publish.png"></navBarBatingCircle>
		<Landlord :image_width="100" :image_height="100" :isLandlord="true" :margin_left="0" :font_style="900"
			v-for="(item,index) in landlordData" :data="item" :key="index">
		</Landlord>
        <Publish v-if="useDatingCircleStore.isShowPublish"></Publish>
		<tabBar :propsIndex="3"></tabBar>
	</view>
</template>

<script>
	import navBarBatingCircle from "@/components/navBar/navBarBatingCircle.vue"
	import Publish from "@/components/datingCircle/Publish.vue"
	import {
		ref,getCurrentInstance
	} from "vue"
	import Landlord from "@/components/datingCircle/Landlord.vue"
	import {
		personStore
	} from "@/stores/person.js"
	import {
		datingCircleStore
	} from "@/stores/datingCircle.js"
	export default {
		setup() {
			const useDatingCircleStore = datingCircleStore();
			const {
				proxy
			} = getCurrentInstance();
			let statusBarHeight = ref();
			let length = ref(0);
			let page = ref(1);
			const landlordData = ref([]);
			const usePersonStore = personStore();
			statusBarHeight.value = uni.getSystemInfoSync()['statusBarHeight'];
			statusBarHeight.value = statusBarHeight.value + 50;
			const getLandlord = () => {
				uni.request({
					method: "GET",
					url: `${proxy.baseUrl}/landlord`,
					data: {
						page: page.value
					},
					success(res) {
						length.value=res.data.length;
						landlordData.value = [...landlordData.value, ...res.data.data];
						page.value++;
					}
				})
			}
			getLandlord();
			if(useDatingCircleStore.isPublishLandlord){
				getLandlord();
				useDatingCircleStore.isPublishLandlord=false;
			}
			return {
				useDatingCircleStore,
				statusBarHeight,
				landlordData,
				length,
				page,
				getLandlord
			}
		},
		components: {
			navBarBatingCircle,
			Landlord,
			Publish
		},
		onReachBottom() {
			if (this.landlordData.length < this.length) {
				this.getLandlord();
			} else {
				return uni.showToast({
					title: "暂时没有更多数据了~"
				})
			}
		}
	}
</script>

<style>

</style>
