<template>
	<div>
		<div><van-nav-bar left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 48px;">
			<div class="descrption" v-html="DoctorDetail.major"></div>
		</div>
	</div>
</template>

<script>
import { Row, Col } from 'vant';
import { getDocDetail } from '@/api/api.js';
export default {
	data() {
		return {
		};
	},
	mounted() {
		var id = this.$route.query.productId;
		console.log(id,"id");
		this.getNewsDetal(id);
	},
	methods: {
		getGoodByCid(cid) {
			var query = {
				id:cid
			};
			getDocDetail(query).then(res => {
				console.log(res)
				if (res.result!=null||res.result!="") {
					this.DoctorDetail = res.result;
					this.hospitalDescrption = res.result.descript.replace(/<img/gi, "<img width='100%'").replace(/style=\"(.*)\"/gi, "style='width:100%;'")
					.replace(/width=\"(.*)\"/gi,"style='width:100%;'");
					this.DoctorID=res.result.id;
					/* this.showAsk(); */
				}
			});
		},
		goBack() {
			this.$router.push('/');
		},
	}
};
</script>

<style>
	
</style>
