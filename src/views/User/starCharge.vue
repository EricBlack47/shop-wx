<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default{
		data(){
			return {
				url: "http://lsc.mynatapp.cc/local.html"
			};
		},
		onLoad(option) {
			var type=option.type;
			console.log(type)
			var token=localStorage.getItem("token")
			this.url=this.url+"?token="+token+"&type="+type
		}
	}
</script>

<style>
</style>
