<template>
	<div style="padding-bottom: 50px;margin-left: 15upx;">
		<img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png" alt="用户" />
		<van-row>
			<van-col span="5"><img  @click="goPerson" style="margin-left: 20upx; height: 80px;width: 80px;border-radius: 50%;" :src="userInfo.image" alt="用户" /></van-col>
			<van-col span="10">
				<span v-if="userInfo.memberType == 0" style=" line-height: 100px;text-align: center;color: chartreuse;font-size: 22px;">{{ userInfo.username }}</span>
			</van-col>
			<van-col span="6">
				<span v-if="userInfo.memberType == 0" style="line-height: 100px;text-align: center;color: chartreuse;font-size: 18px;text-decoration:underline">普通会员</span>
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
		<van-swipe :autoplay="3000" indicator-color="white">
			<div v-for="(newss,key) in userInfo.news" :key="key">
				<div @click="goNews"><van-swipe-item>{{newss.title}}</van-swipe-item></div>
			</div>
		</van-swipe>
		<van-cell-group class="user-group"><van-cell title="全部订单" icon="bookmark-o"  /></van-cell-group>
		<van-row class="user-link">
			<div @click="goList1()">
				<van-col span="6">
					<van-icon name="pending-payment"></van-icon>
					待付款
				</van-col>
			</div>
			<div @click="goList2()">
				<van-col span="6">
					<van-icon name="gift-card-o"></van-icon>
					待收货
				</van-col>
			</div>
			<div @click="goList3()">
				<van-col span="6">
					<van-icon name="logistics"></van-icon>
					待发货
				</van-col>
			</div>
			<div @click="goList4()">
				<van-col span="6">
					<van-icon name="bookmark-o"></van-icon>
					全部订单
				</van-col>
			</div>
		</van-row>
		
		<van-cell-group>
			<van-cell title="我的资产" icon="balance-o" :value="userInfo.total" is-link to="/myMoney"  />
			<van-cell title="余额     ----可提现" icon="gold-coin-o"  :value="userInfo.overMoney" is-link to="/lastMoney"  />
			<van-cell title="MMC      ---可使用" icon="gem-o" :value="userInfo.overProfit" is-link to="/mmc"  />
			<van-cell title="积分     ----不可使用" icon="stop-circle-o" :value="userInfo.points" is-link to="/totalAssets"  />
			<van-cell title="充值" icon="bill-o" is-link to="/recharge"/>
			<van-cell title="提现" icon="refund-o" is-link to="/withdrawal"/>
			<van-cell title="账单" icon="balance-list-o" is-link to="/bill" />
		</van-cell-group>
		<van-cell-group>
			<div v-if="userInfo.memberType===4"><van-cell title="我的销售" icon="gift" is-link to="/mySale" /></div>
			<div v-if="userInfo.memberType!==3"><van-cell title="我的关注" icon="like-o" is-link to="/myFollow" /></div> 
			<div v-if="userInfo.memberType===3"><van-cell title="关注我的" icon="like-o" is-link to="/fllowMe" /> </div>
			<div v-if="userInfo.memberType!==3"><van-cell title="我的提问" icon="comment-circle-o" is-link to="/myAnswered" /></div>
			<div v-if="userInfo.memberType===3"><van-cell title="提问我的" icon="comment-circle-o" is-link to="/docAnswered" /></div>
			<van-cell title="投诉建议" icon="notes-o" is-link to="/suggestion" />
		</van-cell-group>
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
		goNews(id){
			this.$router.push({path:'/newsList',query:{type:0}});
		},
		goList1(){
			this.$router.push({path:'/OrderList',query:{type:0}});
		},
		goList2(){
			this.$router.push({path:'/OrderList',query:{type:2}});
		},
		goList3(){
			this.$router.push({path:'/OrderList',query:{type:3}});
		},
		goList4(){
			this.$router.push({path:'/OrderList',query:{type:null}});
		},
		goPerson() {
			this.$router.push('/settings');
		},
		getMerBerInfo() {
			var _this=this;
			getMerberInfo().then(e => {
				/* if (e.code == 500||e.code == 401) {
					if (!this.userInfo) {
						this.$router.push('/Login');
						Dialog.alert({
							message: '未登录或登陆过期，请重新登陆'
						}).then(() => {
							this.$router.push('/Login');
						});
					}
					return
				}           */             
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
				localStorage.setItem("news",JSON.stringify(_this.userInfo.news))
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
