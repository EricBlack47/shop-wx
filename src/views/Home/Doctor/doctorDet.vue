<template>
	
	<div>
		<div><van-nav-bar left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 48px;">
			<van-row>
				<van-col span="8">
					<div><img style="margin-left: 15px; height: 80px;width: 60px;border-radius: 50%;" :src="DoctorDetail.image" alt="用户" /></div>
				</van-col>
				<van-col span="16">
					<van-row>姓名：{{DoctorDetail.name}}</van-row>
					<van-row>科室：{{DoctorDetail.sectionName}}</van-row>
					<van-row>职务：{{DoctorDetail.position}}</van-row>
					<van-row>医院:{{DoctorDetail.hospitalName}}</van-row>
				</van-col>
			</van-row>
			<!-- <van-row>
				<van-col span="8">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img  style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../../public/bars.svg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">jianm</span></van-row>
				</van-col>
				<van-col span="8">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../../public/bars.svg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">医院</span></van-row>
				</van-col>
				<van-col span="8">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../../public/bars.svg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">医院</span></van-row>
				</van-col>
			</van-row> -->
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>擅长</span>
			</div>
			<div class="descrption" v-html="DoctorDetail.major"></div>
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>背景介绍</span>
			</div>
			<div class="descrption" v-html="DoctorDetail.descript"></div>
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>医生回复</span>
			</div>
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>用户提问</span>
			</div>
		</div>
	</div>
</template>

<script>

import { Row, Col } from 'vant';
import { getDocDetail } from '@/api/api.js';
export default {
	data() {
		return {
			DoctorDetail:[],
			askTest:"",
			userAsk:"",
			Docausue:"",
			DoctorID:undefined,
			askList:[],
			num:2,
			showDec:"展开",
			idHb: '',
			isShow: false,
			hongbaoDetail:{id:null},
			haveHongbao:false,
			userInfo:null
		};
	},
	mounted() {
		var cid = this.$route.query.doctorId;
		console.log(cid,"id");
		this.getGoodByCid(cid);
	},
	methods: {
		getGoodByCid(cid) {
			var query = {
				id:cid
			};
			getDocDetail(query).then(res => {
				if (res.result!=null||res.result!="") {
					this.DoctorDetail = res.result;
					this.hospitalDescrption = res.result.descript.replace(/<img/gi, "<img width='100%'").replace(/style=\"(.*)\"/gi, "style='width:100%;'")
					.replace(/width=\"(.*)\"/gi,"style='width:100%;'");
					this.DoctorID=res.result.id;
					/* this.showAsk(); */
				}
			});
		},
		goGoodsDetail(AllGoods) {
			this.$router.push({
				path: '/Good',
				query: {
					productId: AllGoods.productId
				}
			});
		},
		goBack() {
			this.$router.push('/');
		},
		showGood(item) {
			this.setGood(item);
			this.$router.push({ path: '/Good', query: { productId: item.productId } });
		}
	}
};
</script>

<style></style>
