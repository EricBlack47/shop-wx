<template>
	<div>
		<div><van-nav-bar title="会员管理" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;">
			<van-row>
				<van-col span="8">会员昵称</van-col>
				<van-col span="8">手机号</van-col>
				<van-col span="8">加入时间</van-col>
			</van-row>
		</div>
		<van-list>
			<div style="border-bottom: #999999 solid 1px;" v-for="(value,key) in member" :key="key">
				<van-row>
					<van-col span="8">{{value.name}}</van-col>
					<van-col span="8">{{value.phone}}</van-col>
					<van-col span="8">{{value.time}}</van-col>
				</van-row>
			</div>
		</van-list>
	</div>
</template>

<script>
import { List } from 'vant';
import { Dialog } from 'vant';
import { getMerberInfo, getBillList ,getMecList} from '@/api/api.js';
export default {
	data() {
		return {
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
			member: [],
			userInfo: null,
			phone:undefined
		};
	},
	created() {
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
	},
	mounted() {
		if (!this.userInfo) {
			this.$router.push('/Login');
			Dialog.alert({
				message: '未登录或登陆过期，请重新登陆'
			}).then(() => {
				this.$router.push('/Login');
			});
		}
		//获取会员信息
		this.getList();
	},
	methods: {
		getList() {
			var _this = this;
			var query = {
				id: this.userInfo.id,
				memberType: this.userInfo.memberType,
			};
			getMecList(query).then(res => {
				if (res.result) {
					console.log( res.result.money)
					_this.member = res.result;
					console.log(_this.member.memberPhone)
					for (var i = 0; i < _this.member.length; i++) {
						_this.member[i].time = _this.member[i].time.substring(0, 10);
						if(_this.member[i].name.length==11){
							var myphone =_this.member[i].name.substr(3, 4);
							_this.member[i].name = _this.member[i].name.replace(myphone, "****");
						}
						
					}
				}
			});
		},
		goBack() {
			this.$router.go(-1);
		},
		goPerson() {
			this.$router.push('/settings');
		},
		getMerBerInfo() {
			var _this = this;
			getMerberInfo().then(e => {
				if (e.code == 500 || e.code == 401) {
					if (!this.userInfo) {
						this.$router.push('/Login');
						Dialog.alert({
							message: '未登录或登陆过期，请重新登陆'
						}).then(() => {
							this.$router.push('/Login');
						});
					}
					return;
				}
				_this.userInfo = e.result;
				if (e.result.overPoints == null) e.result.overPoints = 0;
				_this.userInfo.overMoney = e.result.overMoney.toFixed(4);
				_this.userInfo.points = e.result.points.toFixed(4);
				_this.userInfo.overProfit = e.result.overProfit.toFixed(4);
				_this.eqMoney = (e.result.overProfit - 0).toFixed(4);
				_this.userInfo.total = (_this.userInfo.overMoney - 0 + (_this.eqMoney - 0)).toFixed(4);
				_this.userInfo.pendingProfit = e.result.pendingProfit.toFixed(4);
				_this.userInfo.rebate = e.result.rebate.toFixed(4);
				if (e.result.todayProfit != null) _this.userInfo.todayProfit = e.result.todayProfit.toFixed(4);
				else _this.userInfo.todayProfit = '0.0000';
				if (!_this.userInfo.image) _this.userInfo.image = '/static/user.png';
				_this.userInfo.image = _this.userInfo.image.split(',')[0];
			});
		}
	}
};
</script>

<style></style>
