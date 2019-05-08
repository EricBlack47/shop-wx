<template>
	<transition name="slide">
		<div class="good">
			<div class="back-btn" @click="goBack">
				<van-icon name="arrow-left" />
			</div>
			<div class="home-swipe">
				<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
					<van-swipe-item v-for="(item,index) in goods.productImageSmall" class="swipe-item" :key="index">
						<img :src="item">
					</van-swipe-item>
				</van-swipe>
			</div>
			<van-cell-group class="good-detail">
				<van-cell>
					<div class="good-title">
						<span>{{goods.productName}}</span>
						<span class="good-price">￥{{goods.salePrice}}</span>
					</div>
					<div class="good-desc">{{goods.subTitle}}</div>
				</van-cell>
			</van-cell-group>
			<van-cell-group class="goods-cell-group dianpu">
				<van-cell value="商家店铺" icon="shop" is-link @click="goMerchant">
					<template slot="title">
						<span class="van-cell-text">进入店铺</span>
					</template>
				</van-cell>
				<!-- <van-cell title="线下门店" icon="location" is-link /> -->
			</van-cell-group>
			<div class="detail" ref="detail" v-html="descript.replace(/alt/g,'width=100%')">
			</div>
			<van-goods-action>
				<!-- <van-goods-action-mini-btn icon="chat" text="客服" /> -->
				<van-goods-action-mini-btn icon="cart" text="购物车" to="/Cart" />
				<van-goods-action-mini-btn icon="shop" text="店铺" @click="goMerchant"/>
				<van-goods-action-big-btn text="加入购物车" @click="addCart" />

				<van-goods-action-big-btn text="立即购买" primary @click="goBuy" />
			</van-goods-action>
		</div>
	</transition>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		
	} from 'vuex';
	import { Dialog } from 'vant';
	import {
		addToCart,
		getGoodsDetById,
		addCar,
		buyNow
	} from '@/api/api.js';
	export default {
		data() {
			return {
				loading: true,
				cartCount: '',
				showBase: false,
				sku: [],
				goods: {},
				goodsId: 1,
				count: 1,
				descript: ''
			};
		},
		mounted() {
			var productId = this.$route.query.productId
			this.getGoodsDetByid(productId);
		},
		methods: {
			goBuy(goods){
				var userInfo=JSON.parse(localStorage.getItem('userInfo'));
				if (!userInfo) {
					Dialog.alert({
						message: '请先登陆'
					}).then(() => {
						this.$router.push('/smsLogin');
					});
				}else{
					var query = {memberGoldId:this.goods.memberGoldId};
					buyNow(query).then(res => {
					this.$router.push({path:'/confOrder', query:{productId:this.goods.productId}});
					})	
				}				
			},
			goMerchant(goods){
				this.$router.push({path:'/Merchant',query:{memberGoldId:this.goods.memberGoldId}});
			},
			
			addCart() {
				var userInfo=JSON.parse(localStorage.getItem('userInfo'));
				if (!userInfo) {
					Dialog.alert({
						message: '请先登陆'
					}).then(() => {
						this.$router.push('/Login');
					});
				}else{
					var query = {
						productId: this.goods.productId,
						productNum: 1,
						memberGoldId: this.goods.memberGoldId
					}
					addCar(query).then(res => {					
						Dialog.alert({
						  message: '已加入购物车'
					        })
					
					})
				}
				
			},
			getGoodsDetByid(productId) {
				var query = {
					productId: productId
				}
				getGoodsDetById(query).then(res => {
					this.goods = res.result
					this.descript = res.result.detail
					this.descript.replace(/alt/g, "width='100%'")
				})
			},
			changeSwipe(index) {
				this.indexPage = index;
			},
			getCount(value) {
				this.count = value;
			},
			goBack() {
				this.$router.go(-1);
			},

		}
	};
</script>


	<style lang="stylus" scoped>
.good
  padding-bottom 50px

  .back-btn
    position fixed
    z-index 999
    top 10px
    left 10px
    width 30px
    height 30px
    border-radius 50%
    color #fff
    line-height 32px
    text-align center
    background-color rgba(102, 102, 102, 0.4)

    i
      font-weight 700
      margin-left -2px
      margin-top 4px

.swipe img
  width 100%
  height auto
  display block

.good-detail
  .good-title
    font-size 16px

  .good-price
    color red
    margin-left 10px

.goods-yunfei
  padding 5px 15px

  .goods-yun
    font-size 12px
    color #999
		
.detail
  width 100%
	
.detail img
	 width 100%
	 height:auto

 
  

.dianpu, .xiangqing
  margin 0.3rem 0

.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
</style>

