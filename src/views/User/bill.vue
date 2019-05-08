<template>
	<div>
		<div><van-nav-bar title="账单" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;">
			<van-cell title="我的积分" icon="exchange" :value="userInfo.overMoney" is-link to="/myMoney" />
			<van-cell title="总返利" icon="exchange" :value="userInfo.balance" is-link to="/myMoney" />
			<van-cell title="今日返利" icon="exchange" :value="userInfo.balance" is-link to="/myMoney" />
		</div>
		<van-tabs>
			<van-tab title="全部信息">
				<van-list>
					<div style="border-bottom: #999999 solid 1px;" v-for="(list, index) in listAll" :key="index">
						<van-row>
							
							<van-col span="6">
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
							<van-col span="6">{{list.kind}}</van-col>
							<van-col span="6">
								<span>{{ list.money }}{{ list.charge != null && list.charge != 0 ? '  服务费：' + list.charge : '' }}</span>
							</van-col>
							<van-col span="6">{{list.created}}</van-col>
						</van-row>
					</div>
				</van-list>
			</van-tab>
			<van-tab title="收入信息"><van-list>
					<div style="border-bottom: #999999 solid 1px;" v-for="(list, index) in listget" :key="index">
						<van-row>
							
							<van-col span="6">
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
							<van-col span="6">{{list.kind}}</van-col>
							<van-col span="6">
								<span>{{ list.money }}{{ list.charge != null && list.charge != 0 ? '  服务费：' + list.charge : '' }}</span>
							</van-col>
							<van-col span="6">{{list.created}}</van-col>
						</van-row>
					</div>
				</van-list></van-tab>
			<van-tab title="支出信息"><van-list>
					<div style="border-bottom: #999999 solid 1px;" v-for="(list, index) in listuse" :key="index">
						<van-row>
							
							<van-col span="6">
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
							<van-col span="6">{{list.kind}}</van-col>
							<van-col span="6">
								<span>{{ list.money }}{{ list.charge != null && list.charge != 0 ? '  服务费：' + list.charge : '' }}</span>
							</van-col>
							<van-col span="6">{{list.created}}</van-col>
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
		this.getMerBerInfo();
		this.getBillALL();
		this.getBillGet();
		this.getBillUse();
	},
	created() {
		// 异步更新数据
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				this.list.push(this.list.length + 1);
			}
			// 加载状态结束
			this.loading = false;

			// 数据全部加载完成
			if (this.list.length >= 40) {
				this.finished = true;
			}
		}, 500);
	},
	methods: {
		//获取账单信息
		getBillALL() {
			var _this = this;
			getMerberInfo().then(e => {
				var _this = this;
				var query = {
					type: 0,
					page: 1,
					size: 100,
					kind: 0
				};
				getBillList(query).then(res => {
					if (res.result != '' && res.result != null) {
						_this.listAll = res.result.list;
						for (var i = 0; i < res.result.length; i++) {
							_this.listAll[i].points = (res.result.list[i].points * _this.userInfo.beanRate).toFixed(4);
							_this.listAll[i].money = res.result.list[i].money.toFixed(4);
							/* for(var i = 0;i<_this.listAll.length;i++){
								_this.allMoney=(_this.listAll[i].money+_this.listAll[i].charge).toFixed(4);
							} */
						}
					} else _this.listAll = [];
				});
			});
		},
		//获取账单信息收入
		getBillGet() {
			var _this = this;
			getMerberInfo().then(e => {
				var _this = this;
				var query = {
					type: 1,
					page: 1,
					size: 100,
					kind: 0
				};
				getBillList(query).then(res => {
					if (res.result != '' && res.result != null) {
						_this.listget = res.result.list;
						for (var i = 0; i < res.result.length; i++) {
							_this.listget[i].points = (res.result.list[i].points * _this.userInfo.beanRate).toFixed(4);
							_this.listget[i].money = res.result.list[i].money.toFixed(4);
						}
					} else _this.listget = [];
				});
			});
		},
		//获取账单信息支出
		getBillUse() {
			var _this = this;
			getMerberInfo().then(e => {
				var _this = this;
				var query = {
					type: 2,
					page: 1,
					size: 100,
					kind: 0
				};
				getBillList(query).then(res => {
					if (res.result != '' && res.result != null) {
						_this.listuse = res.result.list;
						for (var i = 0; i < res.result.length; i++) {
							_this.listuse[i].points = (res.result.list[i].points * _this.userInfo.beanRate).toFixed(4);
							_this.listuse[i].money = res.result.list[i].money.toFixed(4);
							/* for(var i = 0;i<_this.listAll.length;i++){
								_this.allMoney=(_this.listAll[i].money+_this.listAll[i].charge).toFixed(4);
							} */
						}
					} else _this.listuse = [];
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
