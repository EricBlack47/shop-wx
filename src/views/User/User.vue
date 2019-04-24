<template>
	<div style="padding-bottom: 50px;margin-left: 15upx;">
		<img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png" alt="用户" />
		<van-row>
			<van-col span="8"><img  @click="goPerson" style="margin-left: 20upx; height: 100px;width: 100px;border-radius: 50%;" :src="userInfo.image" alt="用户" /></van-col>
			<van-col span="8">
				<span v-if="userInfo.memberType == 0" style=" line-height: 100px;text-align: center;color: chartreuse;font-size: 28px;">{{ userInfo.username }}</span>
			</van-col>
			<van-col span="8">
				<span v-if="userInfo.memberType == 0" style="line-height: 100px;text-align: center;color: chartreuse;font-size: 28px;text-decoration:underline">普通会员</span>
				<span v-if="userInfo.memberType == 3">医生</span>
				<span v-if="userInfo.memberType == 2">医院</span>
				<span v-if="userInfo.memberType == 1">院长</span>
				<span v-if="userInfo.memberType == 4">商家</span>
			</van-col>
		</van-row>
		<van-row>
			<van-col span="8">
				<van-row>
					<div class="nav-m">总积分</div>
					<div class="nav-m">{{ userInfo.points }}</div>
				</van-row>
			</van-col>
			<van-col span="8">
				<van-row>
					<div class="nav-m">总返利</div>
					<div class="nav-m">{{ userInfo.pendingProfit }}</div>
				</van-row>
			</van-col>
			<van-col span="8">
				<van-row>
					<div class="nav-m">今日返利</div>
					<div class="nav-m">{{ userInfo.todayProfit }}</div>
				</van-row>
			</van-col>
		</van-row>
		<van-row class="user-link">
			<van-col span="6" is-link to="/OrderList">
				<van-icon name="pending-payment"></van-icon>
				待付款
			</van-col>
			<van-col span="6" is-link to="/OrderList">
				<van-icon name="logistics"></van-icon>
				待接单
			</van-col>
			<van-col span="6" is-link to="/OrderList">
				<van-icon name="logistics"></van-icon>
				待发货
			</van-col>
			<van-col span="6" is-link to="/OrderList">
				<van-icon name="logistics"></van-icon>
				待收货
			</van-col>
		</van-row>
		<van-cell-group class="user-group"><van-cell title="全部订单" icon="records" is-link to="/OrderList" /></van-cell-group>
		<van-cell-group>
	<!-- 		<van-row style="margin-left: 15upx;">
				<van-col span="6">span</van-col>
				<van-col span="10">span: 8</van-col>
				<van-col span="6">span: 8</van-col>
			</van-row> -->
			<van-cell title="我的资产" icon="exchange" :value="userInfo.name" is-link />
			<van-cell title="余额" icon="gold-coin" value="内容" is-link />
			<van-cell title="MMC" icon="gift" value="内容" is-link />
			<van-cell title="积分" icon="gift" value="内容" is-link />
			
			<van-cell title="充值" icon="gift" is-link />
			<van-cell title="提现" icon="gift" is-link />
			<van-cell title="账单" icon="gift" is-link />
		</van-cell-group>
		<van-cell-group>
			<van-cell title="我的销售" icon="gift" is-link to="/OrderList" />
			<van-cell title="我的关注" icon="gift" is-link to="/OrderList" />
			<van-cell title="关注我的" icon="gift" is-link to="/OrderList" />
			<van-cell title="我的提问" icon="gift" is-link to="/OrderList" />
			<van-cell title="投诉建议" icon="gift" is-link to="/OrderList" />
		</van-cell-group>
	</div>
</template>

<script>
import { getMerberInfo } from '@/api/api.js';
export default {
	data() {
		return {
			userInfo: {},
			name: 'User'
		};
	},
	mounted() {
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (!this.userInfo) {
			this.$router.push('/Login');
			/* Dialog.alert({
				message: '未登录或登陆过期，请重新登陆'
			}).then(() => {
				this.$router.push('/Login');
			}); */
		}
		//获取会员信息
		this.getMerberInfo();
	},
	methods: {
		goPerson() {
			this.$router.push('/settings');
		},
		getMerberInfo() {
			getMerberInfo().then(res => {
				console.log(res);
			});
		}
	}
};
</script>

<style lang="stylus" scoped>

.user-poster
  width 100%
  height auto
  display block

.user-link
  text-align center
  font-size 12px
  padding 15px 0
  background-color #fff

  .van-icon
    display block
    margin-bottom 4px
    font-size 24px

.user-group
  margin-bottom 0.3rem

	.touxiang {
		width: 136upx;
		height: 136upx;
		border-radius: 50%;
	}
	
	.nav-m{
		text-align:center;
		color:#666666;
		font-size:24px;
	}
</style>
