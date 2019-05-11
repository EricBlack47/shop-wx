<template>
	<div>
		<div>
			<van-nav-bar title="科室列表" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<div class="home-swipe" style="padding-top: 48px;" >
				<van-swipe :autoplay="3000" class="swipe">
					<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index"><img :src="item.picUrl" /></van-swipe-item>
				</van-swipe>
			</div>
			<div v-for="(item, index) in items"  :key="index" style="width: 33%; height: 125px;float: left;margin-top: 10px;">
				<img  @click="goDet(item)"  :src="item.image" style="width: 80%;height: 80%; background: yellow;margin-left: 10%;"/>
				<div style="text-align: center;" >{{item.name}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		sectionBanner,
		sectionList
	} from '@/api/api';
	export default {
		data() {
			return {
				banners: [],
				items:[],
			};
		},
		mounted() {
			sectionBanner().then(res => {
				this.banners = res.data;
			});
		},
		
		created() {
			this.getsectionList();
		},


		methods: {
			goBack() {
				this.$router.go(-1);
			},
			getsectionList(){
				var query ={
					page: 1, size: 10
				}
				sectionList(query).then(res =>{
					this.items = res.result.list
				})
			},
			goDet(item){
			 this.$router.push({path:'/sectionDet',query:{sectionsId:item.name}});
			}
		}
	};
</script>

<style lang="stylus" scoped>
 .swipe img
	 width 100% 
	 height 200px
	 


</style>
