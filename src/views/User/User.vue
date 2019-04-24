<template>
	<div style="padding-bottom: 50px;">
		<img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png" alt="用户" />
		{{ userInfo.id }}哈啊哈
		<van-row class="user-link">
			<van-col span="6">
				<van-icon name="pending-payment"></van-icon>
				待付款
			</van-col>
			<van-col span="6">
				<van-icon name="pending-orders"></van-icon>
				待接单
			</van-col>
			<van-col span="6">
				<van-icon name="pending-deliver"></van-icon>
				待发货
			</van-col>
			<van-col span="6">
				<van-icon name="logistics"></van-icon>
				待收货
			</van-col>
		</van-row>
		<van-cell-group class="user-group"><van-cell title="全部订单" icon="records" is-link to="/OrderList" /></van-cell-group>
		<van-cell-group>
			<van-cell title="我的资产" icon="exchange" is-link />
			<van-cell title="余额" icon="gold-coin" is-link />
			<van-cell title="MMC" icon="gift" is-link />
			<van-cell title="积分" icon="gift" is-link />
			<van-cell title="充值" icon="gift" is-link />
			<van-cell title="提现" icon="gift" is-link />
			<van-cell title="账单" icon="gift" is-link />
		</van-cell-group>
		<van-cell-group>
			<van-cell title="我的销售" icon="gift" is-link />
			<van-cell title="我的关注" icon="gift" is-link />
			<van-cell title="关注我的" icon="gift" is-link />
			<van-cell title="我的提问" icon="gift" is-link />
			<van-cell title="投诉建议" icon="gift" is-link />
		</van-cell-group>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			name: 'User'
		};
	},
	mounted() {
		this.userInfo = JSON.parse(LocalStorage.getItem('userInfo'));
		if (!this.userInfo) {
			Dialog.alert({
				message: '未登录或登陆过期，请重新登陆'
			}).then(() => {
				this.$router.push('/Login');
			});
		}
	},
	methods: {}
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
</style>
