<template>
	<div>
		<div> <van-nav-bar title="关于我们"
		  left-text="返回"
		  left-arrow
		  @click-left="goBack"
		  :z-index="10"
		  fixed /></div>
		 <div style="padding-top: 46px;">
			 <h1>菜</h1>
		 </div>
	</div>
</template>

<script>
	export default {
		methods:{
			goBack() {
				this.$router.go(-1);
			},
			
		}
		}
</script>

<style>
</style>
