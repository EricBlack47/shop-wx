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
	import { hospitalBanner, hospitalList, hospitalDet } from '@/api/api';
	export default {
		data() {
			return {
				
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
		/* 	getHospitalDet(id) {
				console.log("han",id)
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
						this.num = 2;
						this.imgUrls = this.hospitalDetail.image.split(",");
					}
				});
			}, */
	/* 		goDet(item) {
				this.$router.push({ path: '/hospitalDet', query: { hospitalId: item.id } });
				console.log(item.id);
			} */
		}
	};
</script>

<style></style>
