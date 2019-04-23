<template>
	<div class="home">
		<van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action @search="onSearch">
			<div slot="action" @click="onSearch">搜索</div>
		</van-search>
		<div class="home-swipe">
			<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(item,index) in banners" class="swipe-item" :key="index">
					<img :src="item.picUrl">
				</van-swipe-item>
			</van-swipe>
		</div>
		<van-tabs @change="handleTabsChange">
		  <van-tab v-for="(value,key) in goodsKind" :key="key" :title="value.name">
		    <tabItem :data="AllGoods"  @click="goGoodsDetail(AllGoods)"></tabItem>
		  </van-tab>
		</van-tabs>
	</div>
</template>


<script>
	import scrollX from '@/components/scroll/scrollX';
	import tabItem from '@/components/tabItem/tabItem';
	import goodItem from '@/components/goodItem/goodItem';
	import {GoodsListBanner,getAllGoods,getGoodsCat} from '@/api/api.js';
	export default {
		name: 'GoodList',
		data() {
			return {
				banners: [],
				searchValue: '',
				indexPage: 1,
				hotGoods: [],
				saleGroupGoods: [],
				discoverGoods: [],
				goodsKind: [],
				AllGoods:[]
			};
		},
		mounted() {
			GoodsListBanner().then(res => {
				this.banners = res.data;
			});
			getGoodsCat().then(res => {
				this.goodsKind = res.result;
				this.getGoodByCid(this.goodsKind[0].id)
			})
		},
		created() {
			
		},
		components: {
			goodItem,
			scrollX,
			tabItem
		},
		computed: {
			goodItems() {
			  return {
			   
			  };
			} 
		},
		methods:{
			handleTabsChange(index,title){
				var cid=this.goodsKind[index].id;
				this.getGoodByCid(cid)
			},
			getGoodByCid(cid){
				var query={
						page: 1,
						size: 100,
						cid: cid};
				getAllGoods(query).then(res=>{
					if(res.result!=null)
						this.AllGoods=res.result.data;
				});
			},
// 			goDetail(item){
// 				this.$router.push({path:'/Good',query:{productId:item.productId}});
// 				console.log(This.item.productId)
// 				},
			goGoodsDetail(AllGoods){
			this.$router.push({path:'/Good',query:{productId:AllGoods.productId}});
			console.log(This.AllGoods.productId)
			},
				
			  onSearch() {
			    
			  },
			  changeSwipe(index) {
			    this.indexPage = index;
			  },
			  showGood(item) {
			    this.setGood(item);
			    this.$router.push('/Good');
			  }
				
			},
		
			}
		
		
	
	
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
.van-swipe{
	height:230px
}
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
</style>

