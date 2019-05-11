<template>
	<div class="home">
		<van-nav-bar title="商家" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
		<div class="home-swipe" style="margin-top: 48px;">
			<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(item,index) in banners" class="swipe-item" :key="index">
					<img :src="item.picUrl">
				</van-swipe-item>
			</van-swipe>
		</div>
		<van-tabs @change="handleTabsChange">
		  <van-tab v-for="(value,key) in Kind" :key="key" :title="value.kind">
			<div class="tab-item">
			  <div class="item" v-for="item in List" :key="item.id"  @click="goDetail(List)">
			    <div class="item-detail">
			      <img v-lazy="item.files[0]">
			      <div class="desc" style="text-align: center;">{{item.name}}</div>
			    </div>
			  </div>
			</div>
		  </van-tab>
		</van-tabs>
	</div>
</template>


<script>
	import {merchantList,merchantKind,MerchantBanner} from '@/api/api.js';
	export default {
		data() {
			return {
				banners: [],
				searchValue: '',
				indexPage: 1,
				hotGoods: [],
				saleGroupGoods: [],
				discoverGoods: [],
				Kind: [],
				List:[],
				All:[],
				image:"",
			};
		},
		mounted() {
			MerchantBanner().then(res => {
				this.banners = res.data;
			});
			merchantKind({page:1,size:100}).then(res => {
				this.Kind = res.result.list;
				this.getListByKind(this.Kind[0].id)
			})
		},
		created() {
			
		},
		methods:{
			handleTabsChange(index,title){
				var cid=this.Kind[index].id;
				this.getListByKind(cid)
			},
			getListByKind(id){
				var query={
						page: 1,
						size: 100,
						id: id,
						};
				merchantList(query).then(res=>{
					if(res.result!=null)
					this.All = res.result.list
					this.All.forEach(result=>{
						this.List = result.tbMemberGold
						
					})
				});
			},
			goDetail(List){
			this.$router.push({path:'/Good',query:{productId:List.productId}});
			},
				
			  onSearch() {
			    
			  },
			  changeSwipe(index) {
			    this.indexPage = index;
			  },
			  showGood(item) {
			    this.setGood(item);
			    this.$router.push('/Good');
			  },
			  goBack() {
			  	this.$router.push('/');
			  },
				
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
.swipe img
 height 200px
 
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

