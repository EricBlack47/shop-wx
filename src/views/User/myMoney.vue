<template>
	<div>
		<div><van-nav-bar title="我的资产" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div  style="padding-top: 46px;">
			<van-cell-group>
				<van-cell title="总资产" icon="exchange" :value="userInfo.total" is-link to="/myMoney"  />
				<van-cell title="余额     ----可提现" icon="gold-coin"  :value="userInfo.overMoney" is-link to="/lastMoney"  />
				<van-cell title="MMC      ---可使用" icon="gift" :value="userInfo.overProfit" is-link to="/mmc"  />
				<van-cell title="积分     ----不可使用" icon="gift" :value="userInfo.points" is-link to="/totalAssets"  />
				<van-cell title="充值" icon="gift" is-link to="/recharge"  />
				<van-cell title="提现" icon="gift" is-link to="/withdrawal"/>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
import { getMerberInfo } from '@/api/api.js';
export default {
	data() {
		return {
			userInfo: {
				image: '/static/user.png',
				username: '',
				overMoney: 0,
				overPoints: 0
			}
		};
	},
	onLoad() {
		this.userInfo = localStorage.getItem('userInfo');
		if (!this.userInfo.image) this.userInfo.image = '/static/user.png';
	},
	methods: {
		goPay() {

		},
		 goBack() {
		   this.$router.go(-1);
		 },
	}
};
</script>

<style>

</style>
