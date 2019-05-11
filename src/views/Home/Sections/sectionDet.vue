<template>
	<div>
		<div><van-nav-bar left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 48px;">
			<van-swipe :autoplay="3000" class="swipe">
				<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index"><img :src="item.picUrl" /></van-swipe-item>
			</van-swipe>
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>科室分类</span>
			</div>
			<span >
				{{sectionName}}
			</span>
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>科室医生</span>
			</div>
			<div v-for="doctors in subCategoryList" :key="doctors.id">
				 <van-card :desc="doctors.major" :title="doctors.name" :thumb="doctors.image" />
			</div>
		</div>
	</div>
</template>

<script>
import { hospitalBanner, hospitalList, sectionDet,sectionDetBanner } from '@/api/api';
export default {
	data() {
		return {
			banners: [],
			categoryList: [],
			subCategoryList: [],
			height: 0,
			categoryActive: 0,
			scrollTop: 0,
			scrollHeight: 0,
			showImg: true,
			dpartmentName: "",
			sectionName:undefined
		};
	},
	mounted() {
		sectionDetBanner().then(res=>{
			this.banners = res.data
		})
		var id = this.$route.query.sectionsId;
		this.sectionName = this.$route.query.sectionsId;
		this.getSectionDet(id);
	},
	created() {},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		getSectionDet(id) {
			var query = {
				page: 1,
				size: 50,
				name: id
			};
			sectionDet(query).then(res => {
				console.log(res,"haha")
				if (res.result !== null) {
					this.subCategoryList=res.result.list;
				}
			});
		},
		goDet(item) {
			this.$router.push({ path: '/hospitalDet', query: { hospitalId: item.id } });
		}
	}
};
</script>

<style lang="stylus" scoped>
.swipe img
 width 100%
 height 200px

</style>
