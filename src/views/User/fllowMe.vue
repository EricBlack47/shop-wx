<template>
	<div>
		<div><van-nav-bar title="关注我的" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;background-color: #FFFFFF;">
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>关注我的</span>
			</div>
			<van-list >
				<div v-for="(value, index) of Doctorlist" :key="index" style="height: 80px;border-bottom: #666666 solid 1upx;background-color: #FFFFFF;">
					<van-card :desc="value.phone" :title="value.username" :thumb="value.image" />
				</div>
			</van-list>
		</div>
	</div>
</template>

<script>
import { List } from 'vant';
import { getMerberInfo, getflowList } from '@/api/api.js';
export default {
	data() {
		return {
			chosenAddressId: '',
			userInfo: {
				orderCount: {
					waitPay: 0,
					waitReceive: 0,
					waitSend: 0
				},
				overMoney: 0,
				overPoints: 0,
				total: 0
			},
			Doctorlist: [
			],
		};
	},
	mounted() {
	},
		created(){
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		this.getlistMec();
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		getlistMec() {
			var _this = this;
			var query = {
				"doctorMemberId": _this.userInfo.id,
				"page": 1,
				"size": 200
			};
			getflowList(query).then(e => {
				if (e.result != null && e.result != "") {
					_this.Doctorlist = e.result.list;
					for (var i = 0; i < _this.Doctorlist.length; i++) {
						if (!_this.Doctorlist[i].image)
							_this.Doctorlist[i].image = "/static/user.png"
					}
				}
			});
		},
	
	}
};
</script>

<style></style>
