<template>
	<transition name="slide">
		<div class="order">
			<van-nav-bar title="支付" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<div class="address">
				<div class="address-item">
					<div address="address-top">
						<van-icon name="location" />
						<span class="user-info">{{hasDefaultAddress?defaultAddress.userName:'添加收货地址'}}</span>
						<span class="phonenum">{{hasDefaultAddress?defaultAddress.tel:''}}</span>
					</div>
					<div class="address-bottom">
						<div class="address-info">{{defaultAddress.address}}</div>
					</div>
				</div>
			</div>
			<van-panel title="商品" v-for="(item,index) in orderGoodList" :key="index" class="allGood">
				<div class="allGood-item">
					<van-card :title="item.productName" :num="item.productNum" :price="item.salePrice" :thumb="item.productImg" />
					<van-cell-group>
						<van-cell title="合计" style="color:#f44" :value="'￥'+formatPrice(item.salePrice*item.productNum)" />
					</van-cell-group>
				</div>
			</van-panel>
			<div class="h">支付方式</div>
			<div class="b" style="padding-bottom: 30px;">
				<div class="item">
					<div >
						<div>默认优先使用MMC结算，MMC不重复积分,若MMC不足，余额抵扣！</div>
						<div>需付金额：{{money}}</div>
						<div>MMC已抵扣：{{mmc}}</div>
						<div>可获得积分：{{points}}</div>
					</div>
				</div>
			</div>
			<van-submit-bar :price="actualPrice*100" button-text="付款" @submit="onSubmit" />
		</div>
	</transition>
</template>

<script>
	import {
		getAddressList,
		createOrder,
		delFromCart,
		buyNow,
		getCartProduct,
		getCheckedCartList,
		addOrder,
		orderDetail,
		getMerberInfo,
		payMoney
	} from '@/api/api';
	import { Dialog } from 'vant';
	export default {
		data() {
			return {
				orders: [],
				orderGoodList: [],
				checked: true,
				addressList: [],
				hasDefaultAddress: false,
				defaultAddress: {
					userName:null,
					tel:null,
					address:null
				},
				addressId: '',
				money:0,
				mmc:0,
				points:0,
				userInfo:{},
				actualPrice: 0.00,
				orderIds:[],
				checkOut: 0,
			};
		},
		created() {
			var ids = this.$route.query.orderIds
			this.getOrderDetail(ids)
			var userInfo = localStorage.getItem("userInfo")
			this.userInfo = JSON.parse(userInfo);
			this.mmc = this.userInfo.overProfit;
		},
		mounted() {			
			getAddressList()
				.then(result => {
					this.addressList = result.result;
					result.result.forEach(item => {
						if (item.Isdefault === 1) {
							this.defaultAddress = item;
							this.hasDefaultAddress = true;
							var addr=JSON.parse(item.streetName)
							this.hasDefaultAddress.address=addr.province+addr.city+addr.county+addr.addressDetail
							return;
						}
					});
					if(this.defaultAddress.address==null&&this.addressList.length>0){
						this.defaultAddress=this.addressList[0];
						this.hasDefaultAddress = true;
						var addr=JSON.parse(this.defaultAddress.streetName)
						this.defaultAddress.address=addr.province+addr.city+addr.county+addr.addressDetail
					}
				})
				.catch(error => {
					console.log(error);
				});
				
		},
		methods: {
			handleCheck(e) {
				this.checkOut = e.detail.value == 1 ? 1 : 0
				console.log(this.checkOut)
			},
			//获取订单列表
			getOrderDetail(ids){
				for (var i = 0; i <ids.length; i++) {
					this.orderIds.push(ids[i]+"")
					orderDetail(ids[i]).then(res =>{
						this.orderGoodList = res.result.goodsList
						this.actualPrice += res.result.orderTotal
						this.points += res.result.point;
						if (this.mmc >= this.actualPrice) {
							this.mmc = this.actualPrice;
						} else {
							this.money = this.actualPrice - this.mmc;
							this.points = (1 - this.mmc / this.actualPrice) * this.points;
						}
					})
					this.actualPrice = this.actualPrice*100
				}
			},

			onSubmit() {
				getMerberInfo().then(e=>{
					localStorage.setItem("userInfo",JSON.stringify(e.result))
					var userInfo = localStorage.getItem("userInfo")
					this.userInfo = JSON.parse(userInfo);
					if(this.actualPrice>this.mmc*1+this.userInfo.overMoney*1){
						Dialog.alert({
							title:"失败",
							message:"余额不足，请充值!"+(this.actualPrice-this.mmc-this.userInfo.overMoney),
						})
						return;
					}
					var count = this.orderIds.length
					payMoney({
						orderId: this.orderIds,
						checkOut: this.checkOut,
						}).then(res=>{
						console.log(res)
						this.$router.push({path:'/payResult',query:{message:res.message}});
					}) 
				});
			},			
			formatPrice(price) {
				return price.toFixed(2);
			},
			goBack() {
				this.$router.go(-1);
			},
		},
	};
</script>

<style lang="stylus" scoped>

.order
  background-color #eee

.address
  padding-top 47px
  position relative
  background-color #fff

  &::after
    content ''
    display block
    height 2px
    background -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #3283fa 0, #3283fa 45%, transparent 0, transparent 50%)
    background repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #3283fa 0, #3283fa 45%, transparent 0, transparent 50%)
    background-size 80px

  .address-item
    padding 15px 10px

    .user-info
      margin-left 10px
      font-weight bold

    .phonenum
      float right
      margin-right 20px

    .address-bottom
      margin-top 6px

      .address-info
        font-size 14px
        margin-left 24px
        margin-right 20px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap

  .next-icon
    position absolute
    right 10px
    top 76px

    i
      font-weight bold
      color #888

.allGood
  margin-top 14px

.cell
  margin-top 10px

.order-footer
  height 120px
  margin-top 10px
  text-align center
  font-size 14px

.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
  
 .van-icon, .van-icon::before 
 display none
  </style>
