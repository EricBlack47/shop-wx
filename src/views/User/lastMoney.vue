<template>
  <div >
    <div>
      <van-nav-bar title="余额" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
    </div>
	<div style="padding-top: 46px;">
		<van-cell title="我的余额" icon="gold-coin-o" :value="userInfo.overMoney" is-link to="/myMoney"  />
		<van-cell title="总收入" icon="balance-o" :value="userInfo.balance" is-link to="/myMoney"  />
		<van-cell title="总消费" icon="exchange" :value="userInfo.consumeMoney" is-link to="/myMoney"  />
	</div>
	<van-tabs>
		<van-tab title="全部信息">
			<van-list>
				<div style="border-bottom: #999999 solid 1px;" v-for="(list, index) in listAll" :key="index">
					<van-row>	
						<van-col span="8">
							{{
								list.kind == '支出'
									? list.type == 0
										? '线上消费'
										: list.type == 1
										? '线下消费'
										: list.type == 2
										? '提现'
										: '会费'
									: list.type == 1
									? '线上销售'
									: list.type == 2
									? '线下销售'
									: list.type == 3
									? '推荐'
									: list.type == 5 || list.type == 6
									? '充值'
									: list.type == 0
									? '红包'
									: list.type == 4
									? '返利'
									: list.type == 7
									? '会费'
									: '其他'
							}}
						</van-col>
						<!-- <van-col span="4"></van-col> -->
						<van-col span="8">
							<span>{{list.kind}}:{{ list.money }}{{ list.charge != null && list.charge != 0 ? '  服务费：' + list.charge : '' }}</span>
						</van-col>
						<van-col span="8">{{list.created}}</van-col>
					</van-row>
				</div>
			</van-list>
		</van-tab>
		<van-tab title="收入信息"><van-list>
				<div style="border-bottom: #999999 solid 1px;" v-for="(list, index) in listget" :key="index">
					<van-row>
						
						<van-col span="8">
							{{
								list.kind == '支出'
									? list.type == 0
										? '线上消费'
										: list.type == 1
										? '线下消费'
										: list.type == 2
										? '提现'
										: '会费'
									: list.type == 1
									? '线上销售'
									: list.type == 2
									? '线下销售'
									: list.type == 3
									? '推荐'
									: list.type == 5 || list.type == 6
									? '充值'
									: list.type == 0
									? '红包'
									: list.type == 4
									? '返利'
									: list.type == 7
									? '会费'
									: '其他'
							}}
						</van-col>
						<!-- <van-col span="4">{{list.kind}}</van-col> -->
						<van-col span="8">
							<span>{{list.kind}}:{{ list.money }}{{ list.charge != null && list.charge != 0 ? '  服务费：' + list.charge : '' }}</span>
						</van-col>
						<van-col span="8">{{list.created}}</van-col>
					</van-row>
				</div>
			</van-list></van-tab>
		<van-tab title="支出信息"><van-list>
				<div style="border-bottom: #999999 solid 1px;" v-for="(list, index) in listuse" :key="index">
					<van-row>
						
						<van-col span="8">
							{{
								list.kind == '支出'
									? list.type == 0
										? '线上消费'
										: list.type == 1
										? '线下消费'
										: list.type == 2
										? '提现'
										: '会费'
									: list.type == 1
									? '线上销售'
									: list.type == 2
									? '线下销售'
									: list.type == 3
									? '推荐'
									: list.type == 5 || list.type == 6
									? '充值'
									: list.type == 0
									? '红包'
									: list.type == 4
									? '返利'
									: list.type == 7
									? '会费'
									: '其他'
							}}
						</van-col>
						<!-- <van-col span="4">{{list.kind}}</van-col> -->
						<van-col span="8">
							<span>{{list.kind}}:{{ list.money }}{{ list.charge != null && list.charge != 0 ? '  服务费：' + list.charge : '' }}</span>
						</van-col>
						<van-col span="8">{{list.created}}</van-col>
					</van-row>
				</div>
			</van-list></van-tab>
	</van-tabs>
  </div>
</template>

<script>
import { List } from 'vant';
import { Dialog } from 'vant';
import { getMerberInfo, getBillList } from '@/api/api.js';
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
			name: 'User',
			list: [],
			loading: false,
			finished: false,
			active: 0,
			allMoney: 0 /* 总额 */,
			memberType: 1,
			yanseclass: '',
			jinbiyue: 100,
			listAll: [],
			listget: [],
			listuse: [],
			loadingType: 0,
			current: 0,
			activeColor: '#E22426',
			styleType: 'text'
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
		this.getBillALL();
		this.getBillGet();
		this.getBillUse();
	},
	methods: {
		//获取账单信息
		getBillALL() {
			getMerberInfo().then(e => {
				var query = {
					type: 0,
					page: 1,
					size: 100,
					kind: 0
				};
				getBillList(query).then(res => {
					if (res.result != '' && res.result != null) {
						this.listAll = res.result.list;
						for (var i = 0; i < res.result.length; i++) {
							this.listAll[i].points = (res.result.list[i].points * this.userInfo.beanRate).toFixed(4);
							this.listAll[i].money = res.result.list[i].money.toFixed(4);
							/* for(var i = 0;i<_this.listAll.length;i++){
								_this.allMoney=(_this.listAll[i].money+_this.listAll[i].charge).toFixed(4);
							} */
						}
					} else this.listAll = [];
				});
			});
		},
		//获取账单信息收入
		getBillGet() {
			getMerberInfo().then(e => {
				var query = {
					type: 1,
					page: 1,
					size: 100,
					kind: 0
				};
				getBillList(query).then(res => {
					if (res.result != '' && res.result != null) {
						this.listget = res.result.list;
						for (var i = 0; i < res.result.length; i++) {
							this.listget[i].points = (res.result.list[i].points * this.userInfo.beanRate).toFixed(4);
							this.listget[i].money = res.result.list[i].money.toFixed(4);
						}
					} else this.listget = [];
				});
			});
		},
		//获取账单信息支出
		getBillUse() {
			getMerberInfo().then(e => {
				var query = {
					type: 2,
					page: 1,
					size: 100,
					kind: 0
				};
				getBillList(query).then(res => {
					if (res.result != '' && res.result != null) {
						this.listuse = res.result.list;
						for (var i = 0; i < res.result.length; i++) {
							this.listuse[i].points = (res.result.list[i].points * this.userInfo.beanRate).toFixed(4);
							this.listuse[i].money = res.result.list[i].money.toFixed(4);
							/* for(var i = 0;i<_this.listAll.length;i++){
								_this.allMoney=(_this.listAll[i].money+_this.listAll[i].charge).toFixed(4);
							} */
						}
					} else this.listuse = [];
				});
			});
		},
				goBack() {
		  this.$router.go(-1);
		},
		goPerson() {
			this.$router.push('/settings');
		},
		getMerBerInfo() {
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
				this.userInfo = e.result;
				if (e.result.overPoints == null) e.result.overPoints = 0;
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
				if (!this.userInfo.image)
					this.userInfo.image = "/static/user.png"
				this.userInfo.image = this.userInfo.image.split(",")[0]
			});
		}
	}
};
</script>

<style lang="stylus" scoped>
.van-col
 font-size 12px
 line-height 20px
 color gray
 text-align center
</style>
