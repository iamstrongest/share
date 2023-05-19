<template>
	<view class="line" :style="{'border-color':this.line_color,'border-width':this.line_width,'border-style':this.line_style}">
	</view>
</template>

<script>
	export default {
		data(){
			return{

			}
		},
		props: {
			line_color: {
				type: String,
				default: "red"
			},
			line_width: {
				type: String,
				default: "2rpx"
			},
			line_style: {
				type: String,
				default: "solid"
			},
		},
	}
</script>

<style scoped>
	.line {
		width: 100%;
		border: 4rpx solid #000;
		margin-bottom:20rpx;
	}
</style>
