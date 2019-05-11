<template>
	<div style="padding-bottom: 50px;margin-left: 15upx; color:dimgrey"> 
		<van-row>
			<van-col span="5">
				<img @click="goPerson" style="margin:10px; height: 75px;width: 75px;border-radius: 50%;" :src="userInfo.image"/>	
			</van-col>	
			<van-col span="11">
				<span v-if="userInfo.memberType == 0" style="margin-left: 20px; line-height: 100px;text-align: center;color: chartreuse;font-size: 14px;">{{ userInfo.username }}</span>
				<span v-if="userInfo.memberType == 3" style="margin-left: 20px; line-height: 100px;text-align: center;color: chartreuse;font-size: 14px;">{{ userInfo.username }}</span>
				<span v-if="userInfo.memberType == 2" style="margin-left: 20px; line-height: 100px;text-align: center;color: chartreuse;font-size: 14px;">{{ userInfo.username }}</span>
				<span v-if="userInfo.memberType == 1" style="margin-left: 20px; line-height: 100px;text-align: center;color: chartreuse;font-size: 14px;">{{ userInfo.username }}</span>
				<span v-if="userInfo.memberType == 4" style="margin-left: 20px; line-height: 100px;text-align: center;color: chartreuse;font-size: 14px;">{{ userInfo.username }}</span>
			</van-col>
			<van-col span="7">
				<span v-if="userInfo.memberType == 0" style="margin-left: 20px; line-height: 100px;text-align: center;color: chartreuse;font-size: 16px;text-decoration:underline">普通会员</span>
				<span v-if="userInfo.memberType == 3" style="margin-left: 20px; line-height: 100px;text-align: center;color: chartreuse;font-size: 16px;text-decoration:underline">医生</span>
				<span v-if="userInfo.memberType == 2" style="margin-left: 20px; line-height: 100px;text-align: center;color: chartreuse;font-size: 16px;text-decoration:underline">医院</span>
				<span v-if="userInfo.memberType == 1" style="margin-left: 20px; line-height: 100px;text-align: center;color: chartreuse;font-size: 16px;text-decoration:underline">院长</span>
				<span v-if="userInfo.memberType == 4" style="margin-left: 20px; line-height: 100px;text-align: center;color: chartreuse;font-size: 16px;text-decoration:underline">商家</span>
			</van-col>
		</van-row>
		<div v-if="userInfo.state==1">
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
		</div>
		<div v-if="userInfo.state!=1" style="text-align: center;">
			<div @click="goRealName" style="color: red;font-size: 16px;">请先实名认证(点击认证)</div>
			<div style="font-size: 14px;">实名认证后方可解锁所有功能(提现，获得积分返利等)</div>
		</div>
		<van-cell>
		  <van-icon slot="icon" name="chat-o" size="25px"/>
			<van-swipe :autoplay="3000" indicator-color="white">
				<div v-for="(newss,key) in userInfo.news" :key="key" @click="goNews()">
					<van-swipe-item>{{newss.title}}</van-swipe-item>
				</div>
			</van-swipe>  		 
		</van-cell>
		<van-cell-group class="user-group"><van-cell title="全部订单"> <van-icon slot="icon" name="bookmark-o" size="25px" color="red"/></van-cell>
		<van-row class="user-link">
			<div @click="goList1()">
				<van-col span="6">
					<van-icon name="pending-payment"><div v-if="this.orderCount.waitPay!=0" class="van-info van-badge__info">{{orderCount.waitPay}}</div></van-icon>				
					<div>待付款</div>
				</van-col>
			</div>
			<div @click="goList3()" >
				<van-col span="6">
					<van-icon name="gift-card-o"><div v-if="this.orderCount.waitReceive!=0" class="van-info van-badge__info">{{orderCount.waitReceive}}</div></van-icon>
					<div>待收货</div>
				</van-col>
			</div>
			<div @click="goList2()" >
				<van-col span="6">
					<van-icon name="gift-card-o"><div v-if="this.orderCount.waitSend!=0" class="van-info van-badge__info">{{orderCount.waitSend}}</div></van-icon>
					<div>待发货</div>
				</van-col>
			</div>
			<!-- <div @click="goList3()" v-if="userInfo.memberType==4">
				<van-col span="6">				
					<van-icon name="logistics"><div v-if="this.orderCount.waitSend!=0" class="van-info van-badge__info">{{orderCount.waitSend}}</div></van-icon>
					<div v-if="userInfo.memberType!=4">待发货</div>
				</van-col>
			</div>
			<div @click="goList3()" v-if="userInfo.memberType!=4">
				<van-col span="6">				
					<van-icon name="logistics"><div v-if="this.orderCount.waitReceive!=0" class="van-info van-badge__info">{{orderCount.waitReceive}}</div></van-icon>
					<div v-if="userInfo.memberType==4">待收货</div>
				</van-col>
			</div> -->
			<div @click="goList4()">
				<van-col span="6">
					<van-icon name="bookmark-o"></van-icon>
					全部订单
				</van-col>
			</div>
		</van-row>
		</van-cell-group> 
		<van-cell-group>
			<van-cell title="余额     ----可提现"  :value="userInfo.overMoney" is-link to="/lastMoney"  ><van-icon slot="icon" name="gold-coin-o" size="22px"/></van-cell>
			<van-cell title="MMC      ---可使用"  :value="userInfo.overProfit" is-link to="/mmc"  ><van-icon slot="icon" name="gem-o" size="22px"/></van-cell>
			<van-cell title="积分     ----不可使用"   :value="userInfo.points" is-link to="/totalAssets"  ><van-icon slot="icon" name="stop-circle-o" size="22px"/></van-cell>
			<van-cell title="充值" @click="goCharge"W><van-icon slot="icon" name="bill-o" size="22px"/></van-cell>
			<van-cell title="提现"  is-link to="/withdrawal"><van-icon slot="icon" name="refund-o" size="22px"/></van-cell>
			<van-cell title="账单" is-link to="/bill" ><van-icon slot="icon" name="balance-list-o" size="22px"/></van-cell>
		</van-cell-group>
		<van-cell-group>
			<div v-if="userInfo.memberType===4"><van-cell title="我的销售"  is-link to="/mySale" ><van-icon slot="icon" name="gift" size="22px"/></van-cell></div>
			<div v-if="userInfo.memberType!==3"><van-cell title="我的关注"   is-link to="/myFollow" ><van-icon slot="icon" name="like-o" size="22px"/></van-cell></div> 
			<div v-if="userInfo.memberType===3"><van-cell title="关注我的"   is-link to="/fllowMe"> <van-icon slot="icon" name="like-o" size="22px"/></van-cell></div>
			<div v-if="userInfo.memberType!==3"><van-cell title="我的提问"  is-link to="/myAnswered" ><van-icon slot="icon" name="comment-circle-o" size="22px"/></van-cell></div>
			<div v-if="userInfo.memberType===3"><van-cell title="提问我的"  is-link to="/docAnswered" ><van-icon slot="icon" name="comment-circle-o" size="22px"/></van-cell></div>
			<van-cell title="投诉建议" is-link to="/suggestion" ><van-icon slot="icon" name="notes-o" size="22px"/></van-cell>
		</van-cell-group>
	</div>
</template>

<script>
import { Dialog } from 'vant';
import { getMerberInfo,wxAuth } from '@/api/api.js';
export default {
	data() {
		return {
			orderCount: {
				waitPay: 0,
				waitReceive: 0,
				waitSend: 0,
				waitJudge:0
			},
			userInfo: {		
				overMoney: 0,
				overPoints: 0,
				total: 0
			},
			activeKey: 0,
			eqMoney: 0,
			name: 'User',
			headmage:'http://assets.mtlyn.com/FoB3u6AwfhaJ5akMAjCNMuimSsof'
		};
	},
	created(){
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
	},
	mounted() {
		if (!this.userInfo) {
			this.$router.push('/smsLogin');
			Dialog.alert({
				message: '请先登陆'
			}).then(() => {
				this.$router.push('/smsLogin');
			});
		}
		//获取会员信息
		this.getMerBerInfo();
	},
	methods: {
		is_weixin() {
		  var ua = navigator.userAgent.toLowerCase();
		  if (ua.match(/MicroMessenger/i) == "micromessenger") {
		    return true;
		  } else {
		    return false;
		  }
		},
		goCharge(){
			if(this.is_weixin()){
				wxAuth().then(res=>{
					location.href=res.result;
				})
			}
			else{
				this.$router.push({path:'/recharge'})
			}
		},
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
			var userInfo=JSON.parse(localStorage.getItem('userInfo'));
			if (!userInfo) {
				Dialog.alert({
					message: '请先登陆'
				}).then(() => {
					this.$router.push('/smsLogin');
				});
			}else{
				getMerberInfo().then(e => { 
						localStorage.getItem("userInfo",JSON.stringify(e.result))
						this.userInfo = e.result;
						if (e.result.overPoints == null) e.result.overPoints = 0;
						this.orderCount = e.result.orderCount
						this.userInfo.overMoney = e.result.overMoney.toFixed(4)
						this.userInfo.points = e.result.points.toFixed(4)
						this.userInfo.overProfit = e.result.overProfit.toFixed(4)
						this.eqMoney = (e.result.overProfit - 0).toFixed(4)
						this.userInfo.total = (this.userInfo.overMoney - 0 + (this.eqMoney - 0)).toFixed(4)
						this.userInfo.pendingProfit = e.result.pendingProfit.toFixed(4)
						this.userInfo.rebate = e.result.rebate.toFixed(4)
						if (e.result.todayProfit != null)
							this.userInfo.todayProfit = e.result.todayProfit.toFixed(4)
						else
							this.userInfo.todayProfit = "0.0000"
						if (!this.userInfo.image){
							this.userInfo.image = this.headmage
						}	
						this.userInfo.image = this.userInfo.image.split(",")[0]
						localStorage.setItem("news",JSON.stringify(this.userInfo.news))
					});
				}
			},	
		onChange(key) {
			this.activeKey = key;
		},
		goRealName(){
			this.$router.push({path:'/realName'});
		}
	}
};
</script>

<style lang="stylus" scoped> 
.van-cell .van-icon 
    margin-right 10px 
		 
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
		font-size:16px; 
	} 
.van-info
	margin-right 25px
</style>
