<template>
	<div>
		<div><van-nav-bar title="我的资产" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div  style="padding-top: 46px;">
			<van-cell-group>
				<van-cell title="总资产" icon="balance-o" :value="userInfo.total" is-link to="/myMoney"  />
				<van-cell title="余额     ----可提现" icon="gold-coin-o"  :value="userInfo.overMoney" is-link to="/lastMoney"  />
				<van-cell title="MMC      ---可使用" icon="gem-o" :value="userInfo.overProfit" is-link to="/mmc"  />
				<van-cell title="积分     ----不可使用" icon="stop-circle-o" :value="userInfo.points" is-link to="/totalAssets"  />
				<van-cell title="充值" icon="bill-o" is-link to="/recharge"  />
				<van-cell title="提现" icon="refund-o" is-link to="/withdrawal"/>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
import { Dialog } from 'vant';
import { getMerberInfo } from '@/api/api.js';
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
			eqMoney: 0,
			name: 'User'
		};
	},
	created(){
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
		this.getMerBerInfo();
	},
	methods: {
		goBack() {
		  this.$router.go(-1);
		},
		goPerson() {
			this.$router.push('/settings');
		},
		getMerBerInfo() {
			var _this=this;
			getMerberInfo().then(e => {
				if (e.code == 500||e.code == 401) {
					if (!this.userInfo) {
						this.$router.push('/Login');
						Dialog.alert({
							message: '未登录或登陆过期，请重新登陆'
						}).then(() => {
							this.$router.push('/Login');
						});
					}
					return
				}                        
				_this.userInfo = e.result;
				if (e.result.overPoints == null) e.result.overPoints = 0;
				_this.userInfo.overMoney = e.result.overMoney.toFixed(4)
				_this.userInfo.points = e.result.points.toFixed(4)
				_this.userInfo.overProfit = e.result.overProfit.toFixed(4)
				_this.eqMoney = (e.result.overProfit - 0).toFixed(4)
				_this.userInfo.total = (_this.userInfo.overMoney - 0 + (_this.eqMoney - 0)).toFixed(4)
				_this.userInfo.pendingProfit = e.result.pendingProfit.toFixed(4)
				_this.userInfo.rebate = e.result.rebate.toFixed(4)
				if (e.result.todayProfit != null)
					_this.userInfo.todayProfit = e.result.todayProfit.toFixed(4)
				else
					_this.userInfo.todayProfit = "0.0000"
				if (!_this.userInfo.image)
					_this.userInfo.image = "/static/user.png"
				_this.userInfo.image = _this.userInfo.image.split(",")[0]
			});
		}
	}
};
</script>

<style>

</style>
