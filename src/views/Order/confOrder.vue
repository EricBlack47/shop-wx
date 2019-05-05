<template>
	<transition name="slide">
		<div class="order">
			<van-nav-bar title="提交订单" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<div class="address" @click="goAddressList" :editable="false">
				<div class="next-icon" v-if="hasDefaultAddress">
					<van-icon name="arrow" />
				</div>
				<div class="address-item">
					<div address="address-top">
						<van-icon name="location" />
						<span class="user-info">{{hasDefaultAddress?defaultAddress.userName:'添加收货地址'}}</span>
						<span class="phonenum" v-if="hasDefaultAddress">{{defaultAddress.tel}}</span>
					</div>
					<div class="address-bottom" v-if="hasDefaultAddress">
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
			<van-submit-bar :price="totalMoney" button-text="去付款" @submit="onSubmit" />
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
	} from '@/api/api';
	export default {
		data() {
			return {
				orders: [],
				orderGoodList: [],
				totalMoney: 0,
				checked: true,
				addressList: [],
				hasDefaultAddress: false,
				defaultAddress: {
					userName:null,
					tel:null,
					address:null
				},
				addressId: ''
			};
		},
		created() {
			var productId = this.$route.query.productId
			this.getOrderDetail(productId)
			
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
			
			//获取订单列表
			getOrderDetail(productId = null) {
				if (productId) {
					//从立即购买提交订单
					getCartProduct({
						productId: productId
					}).then(res => {
						this.totalMoney=res.result.salePrice*res.result.productNum;
						this.totalMoney=this.totalMoney*100;
						this.orderGoodList.push(res.result)								
					})
				} else {
					//从购物车提交订单
					getCheckedCartList().then(res => {
						this.orderGoodList = res.result
						for(var i=0;i<this.orderGoodList.length;i++){
						    this.totalMoney+=this.orderGoodList[i].salePrice*this.orderGoodList[i].productNum
							}
						this.totalMoney=this.totalMoney*100;
					})					
				}
			},
			onSubmit() {
				if (this.defaultAddress.addressId <= 0) {
					Dialog.alert({
					  title: '错误',
					  message: '请添加收货地址'
					})
					return;
				}
				var orderInfo = {
					userName: this.defaultAddress.name,
					tel: this.defaultAddress.tel,
					addressId: this.defaultAddress.addressId,
					streetName: this.defaultAddress.streetName,
					goodsList: this.orderGoodList
				}
				addOrder(orderInfo)
					.then(result => {
						var orderId = result.result
						this.$router.push({path:'/payMoney',query:{orderIds:orderId}});
					})
					.catch(error => {
						console.log(error);
					});
			},
			
			formatPrice(price) {
				return price.toFixed(2);
			},
			goAddressList() {
				this.$router.push({path:'/AddressList',query:{checked:1}});
			},
			goBack() {
				this.$router.go(-1);
			},
		}
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
  transform translate3d(100%, 0, 0)</style>
