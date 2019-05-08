<template>
	<div>
		<div><van-nav-bar title="我的关注" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;background-color: #FFFFFF;">
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>我关注的医生</span>
			</div>
			<van-list >
				<div v-for="(value, index) of listDoc" :key="index" style="height: 80px;border-bottom: #666666 solid 1upx;background-color: #FFFFFF;">
					<van-card :desc="value.major" :title="value.name" :thumb="value.image" />
				</div>
			</van-list>
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>我关注的商家</span>
			</div>
			<van-list >
				<div v-for="(value, index) of listMec" :key="index" style="height: 80px;border-bottom: #666666 solid 1upx;background-color: #FFFFFF;">
					<van-card :desc="value.address" :title="value.goldName" :thumb="value.image" />
				</div>
			</van-list>
		</div>
	</div>
</template>

<script>
import { List } from 'vant';
import { getMerberInfo, getflowMecList, getflowDocList } from '@/api/api.js';
export default {
	data() {
		return {
			chosenAddressId: '',
			userInfo: {
				
			},
			listDoc: [
			],
			listMec: [
			]
		};
	},
	mounted() {
		
	},
		created(){
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		this.getlistMec();
		this.getlistDoc();
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		getlistMec() {
			var query = {
				"memberId": this.userInfo.id
			};
			getflowMecList(query).then(res => {
				if (res.result!=null&&res.result!="") {
					this.listMec = res.result;
					for(var i= 0;i<this.listMec.length;i++){
						this.listMec[i].image=this.listMec[i].image.split(",")[0];
					}
				}
			});
		},
		getlistDoc() {
			var query = {
				"memberId": this.userInfo.id,
				"page": 1,
				"size": 200,
				"memberType":this.userInfo.memberType
			};
			getflowDocList(query).then(res => {
				this.listDoc = res.result.list;
				if (res.statusCode == 200) {
					this.listDoc.descript = res.result.list.descript.replace(/<img/gi, "<img width='100%'").replace(
							/style=\"(.*)\"/gi, "style='width:100%;'")
						.replace(/width=\"(.*)\"/gi, "style='width:100%;'");
				}
			});
		}
	}
};
</script>

<style></style>
