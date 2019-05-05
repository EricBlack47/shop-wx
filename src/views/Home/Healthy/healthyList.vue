<template>
	<div>
		<div>
			<van-nav-bar title="养生专题" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<div class="home-swipe" style="padding-top: 48px;" >
				<div v-for="(value,key) in list" :key="key" @click="goDetail(value.id)">
					<div><img style="width: 375px;height: 140px;" :src="contentArticle[0].items[0].picUrl" /></div>
					<span style="display: inline-block;">{{ articleTitle }}</span>
				</div>
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
				list:[],
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
					if (res.result !== null && res.result != "") {
						this.list=res.result.list;
						for(var i = 0;i<this.list.length;i++){
							this.list[i].articleTitle=this.list[i].articleTitle.split("~");
						}
					}
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
