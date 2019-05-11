<template>
	<div>
		<div><van-nav-bar left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 48px;">
			<div class="home-swipe">
				<van-swipe :autoplay="3000" class="swipe">
					<van-swipe-item v-for="(item, index) in imgUrls" class="swipe-item" :key="index"><img :src="item" /></van-swipe-item>
				</van-swipe>
			</div>
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>医院介绍</span>
			</div>
			<div class="descrption" v-html="hospitalDescrption"></div>
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>科室介绍</span>
			</div>
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>专家介绍</span>
			</div>
			<div v-for="doctors in Doctorlist" :key="doctors.id" @click="goDet(doctors)">
				 <van-card :desc="doctors.major" :title="doctors.name" :thumb="doctors.image" />
			</div>
		</div>
	</div>
</template>

<script>
import { hospitalBanner, hospitalList, hospitalDet } from '@/api/api';
export default {
	data() {
		return {
			isShow: false,
			hospitalId: null,
			/* 轮播图 */
			imgUrls: [],
			/* 医院详情 */
			hospitalDetail: [],
			hospitalDescrption: null,
			showImg: true,
			num: 2,
			showDec: "展开",
			/* 医生列表 */
			Doctorlist: [],
			sections: [],
			address: "",
			isLogin: false,
			incomeCount: 0,
			userInfo: {},
			idHb: '',
			grids: [
				"../../../static/c1.png", "../../../static/c2.png", "../../../static/c3.png"
			],
			isCircular: true,
			hongbaoDetail: {
				id: null
			},
			haveHongbao: false,
		};
	},
	mounted() {
		var id = this.$route.query.hospitalId;
		this.getHospitalDet(id);
	},
	created() {},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		getHospitalDet(id) {
			var query = {
				id: id
			};
			hospitalDet(query).then(res => {
				console.log(res,"haha")
				if (res.result != null) {
					this.hospitalDetail =res.result;
					this.Doctorlist = res.result.doctors;
					for (var i = 0; i < this.Doctorlist.length; i++) {
						if (!this.Doctorlist[i].image)
							this.Doctorlist[i].image = "/static/user.png"
					}
					var sec = res.result.sections;
					if (sec == null) sec = [];
					var len = sec.length;
					var lineNum = len % 3 === 0 ? len / 3 : Math.floor((len / 3) + 1)
					for (var i = 0; i < lineNum; i++) {
						var temp = sec.slice(i * 3, i * 3 + 3);;
						this.sections.push(temp);
					}
					this.num = 2; /* 设置医院详情为收缩 */
					this.imgUrls = this.hospitalDetail.image.split(",");
					/* 地址不为空校验,再显示 */
					if (this.hospitalDetail.address != null && this.hospitalDetail.address != "") {
						this.address = this.hospitalDetail.address.replace(/\s*/g, "");
					}
					this.hospitalDescrption = res.result.descript.replace(/<img/gi, "<img width='100%'").replace(
							/style=\"(.*)\"/gi, "style='width:100%;'")
						.replace(/width=\"(.*)\"/gi, "style='width:100%;'")
						.replace(/<span>/gi, "");
				}
			});
		},
		goDet(item) {
			this.$router.push({ path: '/doctorDet', query: { doctorId: item.id } });
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
