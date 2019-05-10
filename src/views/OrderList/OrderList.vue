<template>
	<div>
		<div><van-nav-bar title="订单" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;">
			<div class="order" style="height: 130px; padding:15px 5px;border-bottom: 1px gainsboro solid;" v-for="(item, index) of orderList" :key="item.id" :data-index="index">
				<div style="display: inline-block;width: 100%;" class="l">
					<span style="float: left;">订单编号：{{ item.orderId }}</span>					
					<span style="color: red;float: right;margin-right: 20px;" class="r">{{ item.orderStatus == 0 ? '未付款' : item.orderStatus == 2 ? '待发货' : item.orderStatus == 3 ? '待收货' : '交易完成' }}</span>
				</div>
				<div class="goods" v-for="(iitem, iindex) of item.goodsList" :key="iitem.id" :data-index="iindex">
					<van-card :num="iitem.productNum" tag="优惠" :price="iitem.salePrice" desc="" :title="iitem.productName" :thumb="iitem.productImg">
					</van-card>
					<div style="padding-top: 8px;">
						<div  class="l" style="float: left;">实付：￥{{item.orderTotal}}</div>
						<div @click="cancelOrderList(item.orderId)" style="margin-right: 20px;float: right;" v-if="item.orderStatus==0&&item.memberGoldId!=userId"><van-button size="mini">取消订单</van-button></div>
						<div @click="goBuy(item.orderId)" style="margin-right: 20px;float: right;" v-if="item.orderStatus==0&&item.memberGoldId!=userId"><van-button size="mini">去付款</van-button></div>
						<div style="margin-right: 20px;float: right;" v-if="item.orderStatus==2&&item.memberGoldId==userId" ><van-button size="mini" >发货</van-button></div>
						<div style="margin-right: 20px;float: right;" v-if="item.orderStatus>2" ><van-button size="mini">查物流</van-button></div>
						<div style="margin-right: 20px;float: right;" v-if="item.orderStatus==3&&item.memberGoldId!=userId"><van-button size="mini">确认收货</van-button></div>
					</div>	
				</div>						
			</div>
		</div>
	</div>
</template>

<script>
import { getOrderList,getOrder, getGoodById,cancelOrder } from '@/api/api';
export default {
	data() {
		return {
			orderList: [],
			userInfo:undefined,
			userId:undefined,
			type:undefined
		};
	},
		created(){
				this.orderList=[];
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		this.userId = this.userInfo.id
	},
	mounted() {
		this.orderList=[];
		var type = this.$route.query.type-0
		this.getOrder(type);
  },
	methods: {
		//发货
		orderShip(orderId) {
			this.$router.push({path:'/OrderList',query:{orderIds:orderId}});
		},
		/* 查物流 */
		seeLogistics(shippingName,shippingCode) {
			this.$router.push({path:'/OrderList',query:{orderIds:orderId}});
		},
		// 点击“去付款”
		payOrder(orderId) {
			console.log(orderId)
			this.$router.push({path:'/OrderList',query:{orderIds:orderId}});
		},
		/* 确认收货 */
		confirmOrder(orderId) {
			var query = {
				orderId: orderId
			};
			confirm(query).then(res => {
				this.orderList=[]
				this.getOrder(this.$route.query.type-0);
				/* this.$router.push('/OrderList'); */
			});
		},
		//取消订单
		cancelOrderList(orderId) {
			var query = {
				orderId: orderId
			};
			cancelOrder(query).then(res => {
				this.orderList=[]
				this.getOrder(this.$route.query.type-0);
				/* this.$router.push('/OrderList'); */
			});
		},
		getOrder(type) {
			var query = {
				page: 1,
				size: 10,
				status:type
			};
			getOrderList(query).then(res => {
				this.orderList = res.result.data; /* this.orderList.concat(res.result.data); */
			});
		},
		goBack() {
			this.$router.push('/User');
		},
		formatPrice(price) {
			return price.toFixed(2);
		},
		goBuy(id){
			this.$router.push({path:'/payMoney',query:{orderIds:[id]}});				
		},
	}
};
</script>
<style lang="stylus" scoped>

   
.orderlist
  background-color #eee

.list-box
  padding-top 46px

  .list
    margin-top 20px

    &:first-child
      margin-top 0

.order-footer
  height 50px
  margin-top 20px
  text-align center
  font-size 14px

.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)

.van-card
  height 80px
  
.van-card img
  width 75px
  height 75px
  
.van-button--mini
  height 25px
  min-width 60px
  

</style>
