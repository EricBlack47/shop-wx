<template>
	<div style="width: 100%; color:dimgray">
		<div>
			<van-nav-bar title="我的销售" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
		</div>
		<div style="padding-top: 46px;z-index: 10;">
			<div style="border-bottom: 1px solid gainsboro;width: 95%;margin-left: 2.5%;margin-top: 10px;" @click="openActionSheet">选择日期:<span
				 style="margin-left: 20px;">{{currentDateStr}}</span></div>
			<van-actionsheet v-model="show" :actions="actions">
				<van-datetime-picker @change="setTime" v-model="currentDate" type="date" :min-date="minDate" @confirm="timeConfirm" @cancel="closeConfirm"/>
			</van-actionsheet>
		</div>
		<div style="width: 100%;margin: 5px 10px;">
			<div style="float: left; margin-left: 20px;">
				<p>销售总额:<span style="color: limegreen;">{{trade.totalMoney}}</span>元</p>
				<p style="margin-top: 20px;">累计销量:<span style="color: limegreen;">{{trade.totalTradeTimes}}</span>件</p>
			</div>
			<div style="float: right; margin-right: 80px;">
				<p>当天售额:<span style="color: limegreen;">{{trade.todayMoney}}</span>元</p>
				<p style="margin-top: 20px;">当天销量:<span style="color: limegreen;">{{trade.todayTradeTimes}}</span>件</p>
			</div>
		</div>
		<div style="clear: both;"></div>
		<div style="width: 100%;" v-for="(item, index) of orderList" :key="item.id" :data-index="index">
			<div style="border: 0.3px solid gainsboro;width: 95%;margin-left: 2.5%;">
				<p style="float: left;">来源：{{item.type==2?"线下支付":item.type==1?"线上支付":"收款"}}</p>
				<p style="float: right;color: red;">{{"交易完成"}}</p>
			</div>
			<div style="clear: both;"></div>
			<div style="border: 0.3px solid gainsboro;width: 95%;margin-left: 2.5%;">
				<p style="float: left;">实付：￥{{item.money}}</p>
				<p style="float: right;">时间：{{item.created}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Collapse,
		CollapseItem,
		DatetimePicker,
		Actionsheet,
		Icon
	} from 'vant';
	import {
		getMySale
	} from '@/api/api.js';
	export default {

		data() {
			return {
				show: false,
				minDate: new Date(2018, 10, 1),
				currentDate: new Date(),
				currentDateStr:this.getDate(),
				trade: {},
				orderList: [],
				query: {
					page: 1,
					size: 0,
					status: -1
				},
				userId: null,
				actions: []
			};
		},
		mounted() {
			this.getMySale()
			var userInfo = localStorage.getItem("userInfo")
			this.userId = userInfo.id
			this.query.status = this.query.status - 0;
			if (this.query.status == -1) this.query.status = null
		},
		
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},

		methods: {
			closeConfirm(){
				this.show = false
			},
			setTime(picker){
				var a=picker.getValues();
				this.currentDateStr=a.join("-");
			},
			timeConfirm(val) {
				this.currentDate=val;
				this.show = false
				var date = {
					created: this.currentDateStr
				}
				getMySale(date).then(res => {
					if (res.result != null) {
						this.trade = res.result;
						if (this.trade.totalMoney == null) {
							this.trade.totalMoney = 0;
						}
						if (this.trade.totalTradeTimes == null) {
							this.trade.totalTradeTimes = 0;
						}
						if (this.trade.todayTradeTimes == null) {
							this.trade.todayTradeTimes = 0;
						}
						if (this.trade.todayMoney == null) {
							this.trade.todayMoney = 0;
						}
						this.orderList = res.result.details;
					}
				})
			},
			openActionSheet() {
				this.show = true
			},
			
			goBack() {
				this.$router.go(-1);
			},
			getMySale() {
				var date = {
					created: this.currentDateStr
				}
				getMySale(date).then(res => {
					if (res.result != null) {
						this.trade = res.result;
						if (this.trade.totalMoney == null) {
							this.trade.totalMoney = 0;
						}
						if (this.trade.totalTradeTimes == null) {
							this.trade.totalTradeTimes = 0;
						}
						if (this.trade.todayTradeTimes == null) {
							this.trade.todayTradeTimes = 0;
						}
						if (this.trade.todayMoney == null) {
							this.trade.todayMoney = 0;
						}
						this.orderList = res.result.details;
					}
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			},
			confirm(e) {

			}
		}
	};
</script>

<style>

</style>
