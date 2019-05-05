<template>
	<div class="home">
		<div class="home-swipe">
			<div class="back-btn" @click="goBack">
				<van-icon name="arrow-left" />
			</div>
			<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(item, index) in imgUrls" class="swipe-item" :key="index"><img :src="item" /></van-swipe-item>
			</van-swipe>
		</div>
		<van-tabs v-model="active">
			<van-tab title="商品列表"><tabItemM :data="shop.tbItem" @click="goDetail(AllGoods.productId)"></tabItemM></van-tab>
			<van-tab title="商家详情" >
				<!-- 商家介绍 -->
				<div style="background-color: #FFFFFF;">
					<div class="bean-text">
						<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
						<span>商家介绍 :</span>
						<div class="flex-item desImg"><image @click="follow" style="width: 60px;height:60px;float: right;" src="/static/guanzhu.png" mode=""></image></div>
					</div>
					<div class="descrption" v-html="shop.descript">
					</div>
					<!-- 商家信息 -->
					<div class="bean-text">
						<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
						<span>商家信息</span>
					</div>
					<div>
						<!-- 电话 -->
						<div class="hospitalMessage" >
							<image src="/static/img/phone.png" mode="" style="margin-right: 20px;"></image>
							<span>热线 ：</span>
							<span>{{shop.telPhone}}</span>
						</div>
						<!-- 地址 -->
						<div class="hospitalMessage">
							<image src="/static/img/address.png" mode=""></image>
							<span>地址 ：</span>
							<span>{{shop.address}}</span>
						</div>
					</div>
				</div>
				
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import scrollX from '@/components/scroll/scrollX';
import tabItem from '@/components/tabItem/tabItem';
import tabItemM from '@/components/tabItem/tabItemM';
import goodItem from '@/components/goodItem/goodItem';
import { MerchantBanner, getAllGoodsByMerchant, getMerchantCat } from '@/api/api.js';
export default {
	name: 'Merchant',
	data() {
		return {
			banners: [],
			searchValue: '',
			indexPage: 1,
			hotGoods: [],
			saleGroupGoods: [],
			discoverGoods: [],
			merchantKind: [],
			AllGoods: [],
			active: 0,
			shop: {
				name: '',
				descript: '',
				phone: '',
				tbItem: []
			},
			imgUrls: []
		};
	},
	mounted() {
		var memberGoldId = this.$route.query.memberGoldId
		this.getMerchant(memberGoldId);
		MerchantBanner().then(res => {
			this.banners = res.data;
		});
	},
	created() {
		
	},
	components: {
		goodItem,
		scrollX,
		tabItem,
		tabItemM
	},
	computed: {
		goodItems() {
			return {
				商品列表: this.hotGoods,
				商家详情: this.saleGroupGoods
			};
		}
	},
	methods: {
		/* 关注商家 */
		follow() {
			var _this = this;
			var query = {
				memberId:507,
				goldId: this.shop.id
			};
			fllowMerchant(query).then(e => {
				if (e.message == 'success') {
					Dialog.alert({
						message: '已关注'
					}).then(() => {
						
					});
				} else {
					Dialog.alert({
						message: e.message
					}).then(() => {
						
					});
				}
			});
		},
		handleTabsChange(index, title) {
			var cid = this.goodsKind[index].id;
			this.getGoodByCid(cid);
		},
		/* 		getGoodByCid(cid) {
			var query = {
				page: 1,
				size: 100,
				cid: cid
			};
			getAllGoods(query).then(res => {
				if (res.result != null) this.AllGoods = res.result.data;
			});
		}, */
		getMerchant(cid) {
			var query = {
				page: 1,
				size: 100,
				id: cid
			};
			getAllGoodsByMerchant(query).then(data => {
				if (data.result != null) {
					this.shop = data.result;
					this.shopName = this.shop.name;
					this.shop.address = this.shop.address.replace(/\s*/g, '');
					this.imgUrls = this.shop.image.split(',');

					for (var i = 0; i < this.shop.tbItem.length; i++) {
						this.shop.tbItem[i].image = this.shop.tbItem[i].image.split(',');
					}
				}
			});
		},

		goDetail(item) {
			this.$router.push({ path: '/Good', query: { productId: item.productId } });
		},
		onSearch() {},
		changeSwipe(index) {
			this.indexPage = index;
		},
		showGood(item) {
			this.setGood(item);
			this.$router.push('/Good');
		},
			goBack() {
			this.$router.go(-1);
		},
	}
};
</script>

<style lang="stylus" scoped>
.home
  background-color #eee
  margin-bottom 50px

.home-swipe
  box-sizing border-box
  padding 4px 6px
  background-color #fff
  border-bottom 1px solid #dedede

  .home-swipe-head
    padding 4px 0

    .recommend
      font-weight 700

    .tips
      font-size 12px
      margin-left 6px
      color #8f8f8f

    .swipe-num
      float right

      .indexPage
        font-weight 700

      .pageNum
        font-size 12px
        color #8f8f8f
  .swipe
    img
      width 100%

.scroll-hot
  width 100%
  overflow hidden

  .scroll-item
    display inline-block

.sale-ul
  display flex

  .sale-item
    flex-grow 1
    padding 2px 4px

    img
      width 100%

    .sale-title
      text-align center
      font-size 14px

      .sale-price
        color #ff4c0a
        font-size 16px

.discover-ul
  display flex
  height 100px
  margin-bottom 4px

  .discover-img
    width 100px

  .discover-li
    flex-grow 1
    margin-right 4px

    &:last-child
      margin-right 0

.recommend-title
  display flex
  justify-content center
  align-items center
  text-align center
  font-size 14px
  height 30px

  .border
    width 12px
    height 1px
    margin 0 8px
    background-color #000

/* 医院联系方式 */
	.hospitalMessage {
		line-height: 60px;
		margin-left: 20px;
	}

	.hospitalMessage image {
		width: 60px;
		height: 60px;
		margin-left: 20px;
	}
	
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
	
</style>
