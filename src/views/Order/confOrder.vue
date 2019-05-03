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
						<span class="user-info">{{hasDefaultAddress?defaultAddress.Name:'添加收货地址'}}</span>
						<span class="phonenum" v-if="hasDefaultAddress">{{defaultAddress.Phonenum}}</span>
					</div>
					<div class="address-bottom" v-if="hasDefaultAddress">
						<div class="address-info">{{defaultAddress.Address}}{{defaultAddress.AddressDetail}}</div>
					</div>
				</div>
			</div>
			<van-panel title="商品" v-for="(item,index) in orderGoodList" :key="index" class="allGood">
				<div class="allGood-item">
					<van-card :title="item.productName" :num="item.productNum" :price="item.salePrice"
					 :thumb="item.productImg" />
					<van-cell-group>
						<van-cell title="合计" style="color:#f44" :value="'￥'+formatPrice(item.salePrice*item.productNum)" />
					</van-cell-group>
				</div>
			</van-panel>
			<van-submit-bar :price="totalMoney" button-text="结算" @submit="onSubmit" />
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
				orders:[],
				orderGoodList: [],
				totalMoney: 0,
				checked: true,
				addressList: [],
				hasDefaultAddress: false,
				defaultAddress: {},
				addressId:''
			};
		},
		created() {
			var productId = this.$route.query.productId		  
			this.getOrderDetail(productId)
		},
		mounted() {
			if (!this.orderGood.length) {
				this.$router.push('/');
			} else {
				getAddressList()
					.then(result => {
						this.addressList = result.result;
						if (this.addressId) {
							result.data.forEach(item => {
								if (item.addressId === this.addressId) {
									this.defaultAddress = item;
									this.hasDefaultAddress = true;
									return;
								}
							});
						} else {
							result.result.forEach(item => {
								if (item.Isdefault === 1) {
									this.defaultAddress = item;
									this.hasDefaultAddress = true;
									return;
								}
							});
						}
					})
					.catch(error => {
						console.log(error);
					});
			}
		},
		methods: {
			//获取订单列表
			getOrderDetail(productId=null){
				if (productId) {
					//从立即购买提交订单
					getCartProduct({
						productId: productId
					}).then(res=>{
						this.orderGoodList.push(res.result)
					})
				} else {
					//从购物车提交订单
					getCheckedCartList().then(res=>{
						this.orderGoodList=res.result
					})
				}
			},
			onSubmit() {
				var idStr = '';
				var countStr = '';
				var idArr = [];
				var countArr = [];
				for (let i = 0; i < this.orderGood.length; i++) {
					idArr.push(this.orderGood[i].productId);
					countArr.push(this.orderGood[0].productNum);
				}
				idStr = '(' + idArr.toString() + ')';
				countStr = '(' + countArr.toString() + ')';
				var obj = {
					goodId: idStr,
					cartCount: countStr,
					addressId: this.defaultAddress.Addressid,
					totalMoney: this.totalMoney
				};
				addOrder(obj)
					.then(result => {
						console.log(result);
						this.$toast.success('付款成功~');
						var params = {
							delId: idArr
						};
						delFromCart(params)
							.then(result => {
								console.log(result);
							})
							.catch(error => {
								console.log(error);
							});
						setTimeout(() => {
							this.$router.push('/OrderList');
						}, 500);
					})
					.catch(error => {
						console.log(error);
					});
			},
			formatPrice(price) {
				return price.toFixed(2);
			},
			goAddressList() {
				this.$router.push('/AddressList');
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
  transform translate3d(100%, 0, 0)
</style>
