<template>
	<div>
		<div>
			<van-nav-bar title="养生专题" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<div class="home-swipe" style="padding-top: 48px;" >
				
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getHealthy
	} from '@/api/api';
	export default {
		data() {
			return {
				items:[],
			};
		},
		
		created() {
			this.getHealthy();
		},

		methods: {
			goBack() {
				this.$router.go(-1);
			},
			getHealthy(){
				var query ={
					page:1,
					size:10
				}
				getHealthy(query).then(res =>{
					console.log(res)
					this.items = res.result
				})
			},
			goDet(item){
			 this.$router.push({path:'/healthyDet',query:{Id:item.id}});
			 console.log(item.id)
			}
		}
	};
</script>

<style lang="stylus" scoped>
 .swipe img
	 width 100% 
	 height 250px
	 


</style>
