<template>
	<div>
		<van-nav-bar title="医院详情" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
		<div class="descrption" v-html="hospitalDescrption"></div>
	</div>
</template>

<script>
	import {
		hospitalBanner,
		hospitalList,
		hospitalDet,
	} from '@/api/api';
	export default {
		data() {
			return {
			
				items:[],
			};
		},
		
		
		created() {
			this.getHospitalDet();
		},


		methods: {
			goBack() {
				this.$router.go(-1);
			},
			getHospitalDet(){
				var id = this.$router.query.id
				var query = {
					id:id
				}
				hospitalList(query).then(res =>{
					console.log(query)
					this.items = res.result.list
					for (var i = 0; i < this.items.length; i++) {
						this.items[i].image = this.items[i].image.split(',')[0];
						this.items[i].descript = this.items[i].descript
							.replace(/<[^>]+>|&[^>]+;/g, '')
							.trim()
							.substring(0, 60);
					}	
				})
			},
			goDet(item){
			 this.$router.push({path:'/hospitalDet',query:{hospitalId:item.id}});
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
