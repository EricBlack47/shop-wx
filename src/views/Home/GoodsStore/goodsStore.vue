<template>
	<div>
		<div><van-nav-bar :title="name" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 48px;">
			<div class="tab-item">
				<div class="item" v-for="(item, index) in AllGoods" :key="index" @click="goDetail(item.type,item.productId)">
					<div class="item-detail">
						<img v-lazy="item.picUrl" alt="" />
						<div class="desc">{{ item.articleTitle }}</div>
						<div class="price" v-if="item.type == 8">
							<span class="new-price">价格:{{ item.salePrice+20}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { gettitleGoods, getGoodsCat } from '@/api/api.js';
export default {
	data() {
		return {
			goodsKind: [],
			AllGoods: [],
			name: ''
		};
	},
	mounted() {
		var panelId = this.$route.query.panelId - 0;
		this.name = this.$route.query.title;
		console.log(panelId, 'panelId');
		this.getGoodByCid(panelId);
	},
	methods: {
		goDetail: function(type,id) {
			if(type==8){
				this.$router.push({path:'/Good',query:{productId:id}});
			}
			else if(type==7){
				this.$router.push({path:'/Merchant',query:{memberGoldId:id}});
			}
		},
		getGoodByCid(panelId) {
				var query = {
					page:1,
					panelId:panelId,
					size:10
				};
			gettitleGoods(query).then(res => {
				console.log(res)
				if (res.result != null) this.AllGoods = res.result.list;
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
			this.$router.push({ path: '/Good', query: { productId: item.productId } });
		}
	}
};
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
