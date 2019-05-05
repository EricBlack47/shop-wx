<template>
	<div>
		<div><van-nav-bar title="关注我的" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;background-color: #FFFFFF;">
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>会员医院</span>
			</div>
			<van-swipe-item v-for="(item, index) in HosList" class="swipe-item" :key="index" @click="goDetail(item)">
				<div><img :src="item.image" style="width: 175px;height: 120px;margin-right: 5px;" /></div>
				<span style="display: inline-block;text-align: center;margin: 0 auto;">{{ item.hospitalName }}</span>
			</van-swipe-item>
		</div>
	</div>
</template>

<script>
import { List } from 'vant';
import { getMerberInfo,getHospitalList,getDoctorList } from '@/api/api.js';
export default {
	data() {
		return {
		askList: [],
HosList: [], //会员医院
		};
	},
	mounted() {
		this.getHospitalList();
	},
		created(){
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		this.getAklist();
	},
	methods: {
		/* 获取名医列表 */
		getHospitalList() {
			var _this = this;
			var query = {
				page: 1,
				size: 100,
				catId: 1
			};
			getHospitalList(query).then(res => {
				if (res.result != null) {
					this.HosList = res.result.list;
					for (var i = 0; i < this.HosList.length; i++) {
						this.HosList[i].image = this.HosList[i].image.split(',')[0];
						this.HosList[i].descript = this.HosList[i].descript
							.replace(/<[^>]+>|&[^>]+;/g, '')
							.trim()
							.substring(0, 60);
					}	
				}
			});
		},
		goBack() {
			this.$router.go(-1);
		},
		getAklist() {
			var _this = this;
			var query = {
				page: 1,
				size: 10,
				state: 1
			};
			getDoctorList(query).then(res => {
				if (res.result != null) {
					_this.docList = res.result.list;
				}
			});
		},
	
	}
};
</script>

<style></style>
