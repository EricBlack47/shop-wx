<template>
	<div style="width: 100%;">
		<div>
			<van-nav-bar title="我的销售" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
		</div>
		<div style="padding-top: 46px;z-index: 10;" >
			<van-collapse v-model="Data">
				<van-collapse-item title="请选择日期范围" name="2">
					<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" />
				</van-collapse-item>
			</van-collapse>
		</div>
		<div style="width: 100%;">
			<div style="float: left; margin-left: 20px;">
				<p>销售总额:<span style="color: limegreen;">{{trade.totalMoney}}</span>元</p>
				<p>累计销量:<span style="color: limegreen;">{{trade.totalTradeTimes}}</span>件</p>
			</div>
			<div style="float: right; margin-right: 80px;">
				<p>当天售额:<span style="color: limegreen;">{{trade.todayMoney}}</span>元</p>
				<p>当天销量:<span style="color: limegreen;">{{trade.todayTradeTimes}}</span>件</p>
			</div>
		</div>
		<div style="clear: both;"></div>
		<div style="width: 100%;">
			<div>
				<p style="float: left; margin-left: 20px;">来源:</p>
				<p style="float: right; margin-right: 80px;">状态</p>
			</div>
			<div style="clear: both;"></div>
			<div>
				<p style="float: left; margin-left: 20px;">实付:￥</p>
				<p style="float: right; margin-right: 200px;">时间:</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { Collapse, CollapseItem, DatetimePicker} from 'vant';
	import { getMySale } from '@/api/api.js';
	export default {

		data() {
			return {
				Data: ['1'],
				minDate: new Date(2018, 10, 1),
				currentDate: new Date(),
				trade:{},
				orderList: [],
				query: {
					page: 1,
					size: 0,
					status: -1
				},
				userId: null,
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
			goBack() {
				this.$router.go(-1);
			},
			getMySale(){
				var date = {
					created:this.currentDate
				}
				getMySale(date).then(res =>{
					if(res.result!=null){
						this.trade=res.result;
						if(this.trade.totalMoney==null){
							this.trade.totalMoney=0;
						}
						if(this.trade.totalTradeTimes==null){
							this.trade.totalTradeTimes=0;
						}
						if(this.trade.todayTradeTimes==null){
							this.trade.todayTradeTimes=0;
						}
						if(this.trade.todayMoney==null){
							this.trade.todayMoney=0;
						}
						this.orderList=res.result.details;
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
			}
		}
	};
</script>

<style>

</style>
