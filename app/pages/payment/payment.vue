<template>

</template>

<script setup>
	import {
		personStore
	} from "@/stores/person.js"
	import {
		getCurrentInstance
	} from "vue"
	const usePersonStore = personStore();
	const {
		proxy
	} = getCurrentInstance();
	uni.request({
		method: "PUT",
		url: `${proxy.baseUrl}/return/order`,
		data: {
			id: usePersonStore.partPayList[0].id,
			user_id: usePersonStore.personData.id,
			payTime: usePersonStore.partPayList[0].payTime,
			prices: usePersonStore.partPayList[0].prices,
			nums: usePersonStore.partPayList[0].nums,
			idList: usePersonStore.partPayList[0].idList,
		},
		success(result) {
			uni.request({
				method: "GET",
				url: `${proxy.baseUrl}/order`,
				data: {
					user_id: usePersonStore.personData.id
				},
				success(res) {
					usePersonStore.fullPayList = res.data.fullPayList;
					usePersonStore.partPayList = res.data.partPayList;
				}
			})
			uni.request({
				method: "GET",
				url: `${proxy.baseUrl}/get`,
				data: {
					id: usePersonStore.personData.id
				},
				success(res) {
					usePersonStore.personData = res.data.data;
					uni.showModal({
						title: "温馨提示,点击确定1秒返回租借室,您可以回到历史界面，查看信息",
						content: `${result.data.message}`,
						success() {
							setTimeout(() => {
								uni.navigateTo({
									url: "/pages/sportShop/sportShop"
								})
							}, 1000)
						}
					})
				}
			})
			// 	uni.showModal({
			// 	title: "温馨提示,点击确定1秒返回租借室,您可以回到历史界面，查看信息",
			// 	content: `${res.data.message}`,
			// 	success() {
			// 		setTimeout(() => {
			// 			uni.request({
			// 				method: "GET",
			// 				url: `${proxy.baseUrl}/order`,
			// 				data: {
			// 					user_id: usePersonStore.personData.id
			// 				},
			// 				success(res) {
			// 					usePersonStore.fullPayList = res.data.fullPayList;
			// 					usePersonStore.partPayList = res.data.partPayList;
			// 					uni.navigateTo({
			// 						url: "/pages/sportShop/sportShop"
			// 					})
			// 				}
			// 			})

			// 		}, 1000)
			// 	}
			// })
		}
	})


	const goIndex = () => {
		uni.navigateTo({
			url: "/pages/sportShop/sportShop"
		})
	}
</script>

<style>

</style>