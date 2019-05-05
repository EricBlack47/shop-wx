<template>
	<div>
		<div>
			<van-nav-bar title="药店列表" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<div class="home-swipe">
				<van-swipe :autoplay="3000" class="swipe">
					<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index"><img :src="item.picUrl" /></van-swipe-item>
				</van-swipe>
			</div>
			<div class="items" v-for="(item, index) in pharmacyList" :key="index" @click="goDet(item)">
				<van-card :desc="item.introduction" :title="item.hospitalName" :thumb="item.image" />
			</div>
		</div>
	</div>
</template>

<script>
import { getdrugStorelist, drugStoreDet, drugStoreNews,drugStoreBanner  } from '@/api/api';
export default {
	data() {
		return {
			pickerText:'昆明市',
			banners: {},
			pharmacyList: [],
			last_id: "",
			descript:'',
			reload: false,
			imgUrls: [
				'../../../static/img/b2.jpg',
				'../../../static/img/b3.jpg',
				'../../../static/img/b4.jpg',
				'../../../static/img/b3.jpg',
			],
			showImg: true,
		};
	},
	mounted() {
		drugStoreBanner().then(res => {
			this.banners = res.data;
			console.log(this.banner,"han")
			/* for(var i= 0;i<this.banner.length;i++){
				picUrl
			} */
		});
	},
	created() {
		this.getHospitalList();
	},

	methods: {
		goBack() {
			this.$router.go(-1);
		},
		getHospitalList() {
			var query = {
				page: 1,
				size: 100
			};
			getdrugStorelist(query).then(res => {
				if(res.result!==null){
					this.pharmacyList = res.result.list;
					for(var i=0;i<this.pharmacyList.length;i++){
						this.pharmacyList[i].image=this.pharmacyList[i].image.split(",")[0]
						this.pharmacyList[i].descript=this.pharmacyList[i].descript.replace(/<[^>]+>|&[^>]+;/g,"").trim().substring(0, 60);
					}
				}
			});
		},
		goDet(item) {
			this.$router.push({ path: '/hospitalDet', query: { hospitalId: item.id } });
			console.log(item.id);
		}
	}
};
</script>

<style lang="stylus" scoped>
.swipe img
 width 100%
 height 250px
</style>
