<template>
	<div>
		<div class="back-btn" @click="goBack">
			<van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="goBack" :z-index="10"/>
		</div>
		<div>
			<van-search v-model="searchKey" placeholder="请输入搜索关键词" show-action @search="onSearch"><div slot="action" @click="onSearch">搜索</div></van-search>
		</div>
		<div v-if="listHospital.length>0">
			<div @click="goHospital" class="bean-text" style="border-top: #BBBBBB 1px solid;border-bottom: #BBBBBB 1px solid;">
				<span style="font-size: 20px; font-weight: 900;color: #FF3333;">|</span>
				<span style="font-size: 14px;">医院<span style="float: right;padding-top:1.5%;"><van-icon name="arrow" /></span></span>
			</div>
			<div class="hospitals" v-for="(value,key) in listHospital" :key="key" @click="goHospitalDet(value)">
				<van-card :desc="value.introduction" :title="value.hospitalName" :thumb="value.image" />
			</div>
		</div>
		<div v-if="listDoctor.length>0">
		<div @click="goDoctor" class="bean-text" style="border-top: #BBBBBB 1px solid;border-bottom: #BBBBBB 1px solid;">
			<span style="font-size: 20px; font-weight: 900;color: #FF3333;">|</span>
			<span style="font-size: 14px;">医生<span style="float: right;padding-top:1.5%;"><van-icon name="arrow" /></span></span>
		</div>
		<div>
			<div v-for="(value,key) in listDoctor" :key="key" @click="goDoctorDetail(value)">
				 <van-card :desc="value.major" :title="value.name" :thumb="value.image" />
			</div>
		</div>
		</div>
		<div v-if="listPharmacy.length>0">
			<div @click="goStore"  class="bean-text" style="border-top: #BBBBBB 1px solid;border-bottom: #BBBBBB 1px solid;">
				<span style="font-size: 20px; font-weight: 900;color: #FF3333;">|</span>
				<span style="font-size: 14px;">药店<span style="float: right;padding-top:1.5%;"><van-icon name="arrow" /></span></span>
			</div>
			<div>
				<div v-for="(value,key) in listPharmacy" :key="key" @click="goPharmacyDetail(value)">
					 <van-card :desc="value.address" :title="value.hospitalName" :thumb="value.image" />
				</div>
			</div>
		</div>
		<div v-if="listSection.length>0">
			<div @click="goSection" class="bean-text" style="border-top: #BBBBBB 1px solid;border-bottom: #BBBBBB 1px solid;">
				<span style="font-size: 20px; font-weight: 900;color: #FF3333;">|</span>
				<span style="font-size: 14px;">科室<span style="float: right;padding-top:1.5%;"><van-icon name="arrow" /></span></span>
			</div>
			<div>
				<div v-for="(value,key) in listSection" :key="key" @click="goDpartmentDetail(value)">
					<div class="sectonList"><van-card :desc="value.hospitalName" :title="value.name" :thumb="value.image" /></div>
				</div>
			</div>
		</div>
		<div v-if="listItem.length>0">
			<div @click="goItem" class="bean-text" style="border-top: #BBBBBB 1px solid;border-bottom: #BBBBBB 1px solid;">
				<span style="font-size: 20px; font-weight: 900;color: #FF3333;">|</span>
				<span style="font-size: 14px;">商品<span style="float: right;padding-top:1.5%;"><van-icon name="arrow" /></span></span>
			</div>
			<div>
				<div v-for="(value,key) in listItem" :key="key" @click="goItemDetail(value)">
					<div class="sectonList"><van-card :desc="value.sellPoint" :title="value.title" :thumb="value.images[0]" /></div>
				</div>
			</div>
		</div>
		<div v-if="listGlod.length>0">
			<div @click="goMerchant" class="bean-text" style="border-top: #BBBBBB 1px solid;border-bottom: #BBBBBB 1px solid;">
				<span style="font-size: 20px; font-weight: 900;color: #FF3333;">|</span>
				<span style="font-size: 14px;">商家<span style="float: right;padding-top:1.5%;"><van-icon name="arrow" /></span></span>
			</div>
			<div>
				<div v-for="(value,key) in listGlod" :key="key" @click="goMerchantsDetail(value)">
					<div class="sectonList"><van-card :desc="value.address" :title="value.name" :thumb="value.image" /></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { searchList } from '@/api/api';
	export default {
		data() {
			return {
			/* 搜索值 */
			searchKey: "",
			/* 搜索id */
			serchId: 0,
			kind: 0,
			showImg: true,
			listHospital: [],
			listDoctor: [],
			listPharmacy: [],
			listItem: [],
			listSection: [],
			listGlod: [],
			address: "昆明",
			searchValue:'',
			};
		},
		
		created() {
			this.search()
		},

		methods: {
			search() {
				switch (this.serchId) {
					case '0':
						this.kind = 0;
						break;
					case '1':
						this.kind = 1;
						break;
					case '2':
						this.kind = 2;
						break;
					case '3':
						this.kind = 3;
						break;
					case '4':
						this.kind = 4;
						break;
					case '5':
						this.kind = 5;
						break;
					case '6':
						this.kind = 6;
						break;
				}
					var query = {
						page: 1,
						size: 5,
						searchKey: this.searchKey,
						address: this.address,
						kind: 0
					}
					searchList(query).then(res=>{
							if (res.hospital != null) {
								this.listHospital = res.hospital.list;
								for (var i = 0; i < this.listHospital.length; i++) {
									this.listHospital[i].image = this.listHospital[i].image.split(",")[0]
									this.listHospital[i].introduction = this.listHospital[i].introduction.replace(/<[^>]+>|&[^>]+;/g, "").trim()
										.substring(0, 60);
								}
							}
							if (res.doctor != null) {
								this.listDoctor = res.doctor.list;
							}
							if (res.drugStore != null) {
								this.listPharmacy = res.drugStore.list;
								for (var i = 0; i < this.listPharmacy.length; i++) {
									this.listPharmacy[i].image = this.listPharmacy[i].image.split(",")[0]
									this.listPharmacy[i].descript = this.listPharmacy[i].descript.replace(/<[^>]+>|&[^>]+;/g, "").trim().substring(
										0, 60);
								}
							}
							if (res.item != null) {
								this.listItem = res.item.list;
							}
							if (res.section != null) {
								this.listSection = res.section.list;
							}
							if (res.glod != null) {
								this.listGlod = res.glod.list;
								for (var i = 0; i < this.listGlod.length; i++) {
									this.listGlod[i].image = this.listGlod[i].image.split(",")[0]
								}
							}
						})
					},
					goBack() {
						this.$router.push('/');
					},
					onSearch() {
						this.search();
					},
					goHospitalDet(value){
						 this.$router.push({path:'/hospitalDet',query:{hospitalId:value.id}});
					},
					goDoctorDetail(value){
						this.$router.push({path:'/doctorDet',query:{doctorId:value.id}});
					},
					goPharmacyDetail(value){
						this.$router.push({ path: '/hospitalDet', query: { hospitalId: value.id } });
					},
					goDpartmentDetail(value){
						this.$router.push({path:'/sectionDet',query:{sectionsId:value.name}});
					},
					goItemDetail(value){
						this.$router.push({path:'/Good',query:{productId:value.productId}});
					},
					goMerchantsDetail(value){
						this.$router.push({path:'/Merchant',query:{memberGoldId:this.value.memberGoldId}});
					},
					goHospital(){
						this.$router.push({path:'/searchMore',query:{id:1,address:this.address,searchKey:this.searchKey}})
					},
					goDoctor(){
						this.$router.push({path:'/searchMore',query:{id:3,address:this.address,searchKey:this.searchKey}})
					},
					goStore(){
						this.$router.push({path:'/searchMore',query:{id:4,address:this.address,searchKey:this.searchKey}})
					},
					goSection(){
						this.$router.push({path:'/searchMore',query:{id:2,address:this.address,searchKey:this.searchKey}})
					},
					goItem(){
						this.$router.push({path:'/searchMore',query:{id:5,address:this.address,searchKey:this.searchKey}})
					},
					goMerchant(){
						this.$router.push({path:'/searchMore',query:{id:6,address:this.address,searchKey:this.searchKey}})
					},
					
			},	
		}
</script>

<style lang="stylus" scoped>
 .van-card__thumb img
 	 width 80px
 	 height 75px
	 
.sectonList img
 background-color greenyellow

.van-card__title
 font-size 14px
 padding 10px
 
.van-card__bottom, .van-card__desc
 font-size 12px
 padding 10px
</style>
