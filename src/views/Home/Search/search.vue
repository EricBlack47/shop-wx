<template>
	<div style="height: 100%;">
		<div class="back-btn" @click="goBack">
			<van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="goBack" :z-index="10"/>
		</div>
		<div>
			<van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action @search="onSearch"><div slot="action" @click="onSearch">搜索</div></van-search>
		</div>
		<div class="bean-text" style="border-top: #BBBBBB 1px solid;border-bottom: #BBBBBB 1px solid;">
			<span style="font-size: 30px; font-weight: 900;color: #FF3333;">|</span>
			<span style="font-size: 20px;">医院</span>
		</div>
		<div class="hospitals" v-for="(item, index) in hospitalList"  :key="index" @click="goHospitalDet(item)">
			<van-card :desc="item.introduction" :title="item.hospitalName" :thumb="item.image" />
		</div>
		<div class="bean-text" style="border-top: #BBBBBB 1px solid;border-bottom: #BBBBBB 1px solid;">
			<span style="font-size: 30px; font-weight: 900;color: #FF3333;">|</span>
			<span style="font-size: 20px;">医生</span>
		</div>
		<div>
			<van-panel v-for="(item, index) in doctorList"  :key="index" :title="item.name">
				<div v-for="doctors in item.doctors" :key="doctors.id" @click="goDoctorDet(doctors)">
					 <van-card :desc="doctors.major" :title="doctors.name" :thumb="doctors.image" />
				</div>
			</van-panel>
		</div>
	</div>
</template>

<script>
	import { hospitalList, hospitalDet } from '@/api/api';
	export default {
		data() {
			return {
				searchValue: '',
				hospitalList:[],
				doctorList:[],
			};
		},
		mounted() {
			this.getHospitalList();
		},

		methods: {
			getHospitalList(){
				var query ={
					page: 1, size: 5,catId:1
				}
				hospitalList(query).then(res =>{
					this.hospitalList = res.result.list
					for (var i = 0; i < this.hospitalList.length; i++) {
						this.hospitalList[i].image = this.hospitalList[i].image.split(',')[0];
						this.hospitalList[i].descript = this.hospitalList[i].descript
							.replace(/<[^>]+>|&[^>]+;/g, '')
							.trim()
							.substring(0, 60);
					}	
				})
			},
			goHospitalDet(item){
			 this.$router.push({path:'/hospitalDet',query:{hospitalId:item.id}});
			},
			goBack() {
				this.$router.go(-1);
			},
			onSearch() {
				this.$router.go(-1);
			},
		}
	};
</script>

<style lang="stylus" scoped>
 .van-card__thumb img
 	 width 90px
 	 height 75px
 
</style>
