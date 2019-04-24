<template>
	<div>
		<div> <van-nav-bar title="地址列表"
		  left-text="返回"
		  left-arrow
		  @click-left="goBack"
		  :z-index="10"
		  fixed /></div>
		 
		<h1>菜</h1>
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
