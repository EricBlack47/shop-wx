<template>
	<div>
		<div>
			<van-nav-bar title="医生列表" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<div class="home-swipe" style="padding-top: 48px;">
				<van-swipe :autoplay="3000" class="swipe">
					<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index"><img :src="item.picUrl" /></van-swipe-item>
				</van-swipe>
			</div>
			<div>
				<van-panel v-for="(item, index) in items"  :key="index" :title="item.name">
					<div v-for="doctors in item.doctors" :key="doctors.id" @click="goDet(doctors)">
						 <van-card :desc="doctors.major" :title="doctors.name" :thumb="doctors.image" />
					</div>
				</van-panel>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		sectionBanner,
		sectionAndDoctor
	} from '@/api/api';
	export default {
		data() {
			return {
				banners: [],
				items:[],
				doctors:[],
			};
		},
		mounted() {
			sectionBanner().then(res => {
				this.banners = res.data;
			});
		},
		
		created() {
			this.getDoctorList();
		},


		methods: {
			goBack() {
				this.$router.go(-1);
			},
			getDoctorList(){
				var query ={
					page: 1, size: 50
				}
				sectionAndDoctor(query).then(res =>{
					this.items = res.result
					this.doctors = this.items.doctors
					console.log(res)
				})
			},
			goDet(doctors){
				 this.$router.push({path:'/doctorDet',query:{doctorId:doctors.id}});
			}
		}
	};
</script>

<style lang="stylus" scoped>
 .swipe img
	 width 100% 
	 height 200px
	 
.van-card__thumb img
	 width 75px
	 height 75px


</style>
