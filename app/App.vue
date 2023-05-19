<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.hideTabBar({
				animation:false
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/iconfont.css";
	@import "./common/font_color.css";
	
</style>
