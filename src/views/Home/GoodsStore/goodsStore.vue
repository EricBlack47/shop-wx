<template>
	<div>
		<div>
			<van-nav-bar left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
		</div>
		<div style="padding-top: 48px;">
			 <div class="tab-item">
			  <div class="item" v-for="item in AllGoods" :key="item.productId" @click="showGood(item)">
			    <div class="item-detail">
			      <img v-lazy="item.productImageBig" alt="">
			      <div class="desc">{{item.productName}}</div>
			      <div class="price">
			        <span class="new-price">{{item.salePrice}}</span>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getAllGoods,
		getGoodsCat
	} from '@/api/api.js';
	export default {
		data() {
			return {
				goodsKind: [],
				AllGoods: []
			};
		},
		mounted() {
			var cid = this.$route.query.cid
			this.getGoodByCid(cid)
		},
		methods: {
			getGoodByCid(cid) {
				var query = {
					page: 1,
					size: 100,
					cid: cid
				};
				getAllGoods(query).then(res => {
					if (res.result != null)
						this.AllGoods = res.result.data;
				});
			},
			goGoodsDetail(AllGoods) {
				this.$router.push({
					path: '/Good',
					query: {
						productId: AllGoods.productId
					}
				});
			},
			goBack() {
				this.$router.push('/');
			},
			showGood(item) {
			  this.setGood(item);
				this.$router.push({path:'/Good',query:{productId:item.productId}});
			},
		}
	}
</script>

<style lang="stylus" scoped>
.tab-item
  display flex
  flex-wrap wrap

  .item
    width 50%

    &:nth-child(2n) .item-detail
      margin-right 6px

    &:nth-last-child(1) .item-detail, &:nth-last-child(2) .item-detail
      margin-bottom 6px

    .item-detail
      background-color #fff
      margin 6px 0 0 6px

      img
        width 100%
        height 180px

      .desc
        height 36px
        padding 4px
        font-size 14px
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden

      .new-price
        margin-left 2px
        color #ff4c0a

      .old-price
        font-size 12px
        color #333
        margin-left 6px
</style>