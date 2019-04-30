<template>
	<div class="home">
		<van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action @search="onSearch"><div slot="action" @click="onSearch">搜索</div></van-search>
		<div class="home-swipe">
			<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index" @click="goDetail(item)"><img :src="item.picUrl" /></van-swipe-item>
			</van-swipe>
		</div>
		<div style="background-color: #FFFFFF;  margin-bottom :6px">
			<van-row type="flex" justify="space-around">
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goHospital" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="http://assets.mtlyn.com/yhldFX.jpg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">医院</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goMouth" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="http://assets.mtlyn.com/yhldFX.jpg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">口腔</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goBeauty" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="http://assets.mtlyn.com/yhldFX.jpg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">美容</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goSectionList" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="http://assets.mtlyn.com/yhldFX.jpg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">科室</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goDrogStore" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="http://assets.mtlyn.com/yhldFX.jpg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">药店</span></van-row>
				</van-col>
			</van-row>
			<div style="height: 2px;width: 100%;color: #aaaaaa;border-bottom: #aaaaaa solid 1px;"></div>
			<van-row type="flex" justify="space-around">
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goDoc" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="http://assets.mtlyn.com/yhldFX.jpg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">找医生</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goGoodsList1" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="http://assets.mtlyn.com/yhldFX.jpg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">农产品</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goGoodsList2" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="http://assets.mtlyn.com/yhldFX.jpg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 10px; text-align: center; display: inline-block;margin-top: 10px;">美妆个护</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goGoodsList3" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="http://assets.mtlyn.com/yhldFX.jpg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 10px; text-align: center; display: inline-block;margin-top: 10px;">精品酒水</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goGoodsList4" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="http://assets.mtlyn.com/yhldFX.jpg" alt="用户" />
					</div>
					<van-row><span style="margin-left: 10px; text-align: center; display: inline-block;margin-top: 10px;">珠宝配饰</span></van-row>
				</van-col>
			</van-row>
		</div>

		<good-item title="名医工作室" describe="名医问诊" moreRoute="/more/1">
			<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index" @click="goDetail(item)">
					<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index" @click="goDetail(item)">
						<img :src="item.picUrl" style="width: 120px;height: 120px;padding-bottom: 20px;" />
						<!-- <span style="position: relative;">{{}}工作室</span> -->
					</van-swipe-item>
				</van-swipe-item>
			</van-swipe>
		</good-item>
		<good-item title="会员医院" describe="名医问诊" moreRoute="/more/1">
			<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index" @click="goDetail(item)">
					<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index" @click="goDetail(item)">
						<img :src="item.picUrl" style="width: 180px;height: 120px;padding-bottom: 20px;" />
						<!-- <span style="position: relative;">{{}}工作室</span> -->
					</van-swipe-item>
				</van-swipe-item>
			</van-swipe>
		</good-item>
		<div style="margin-bottom: 0.375rem">
			
		</div>
		<good-item title="医互头条" describe="">
			<van-swipe :autoplay="3000" indicator-color="white">
				<van-swipe-item>1</van-swipe-item>
				<van-swipe-item>2</van-swipe-item>
				<van-swipe-item>3</van-swipe-item>
				<van-swipe-item>4</van-swipe-item>
			</van-swipe>
			<van-swipe :autoplay="3000" indicator-color="white">
				<van-swipe-item>1</van-swipe-item>
				<van-swipe-item>2</van-swipe-item>
				<van-swipe-item>3</van-swipe-item>
				<van-swipe-item>4</van-swipe-item>
			</van-swipe>
		</good-item>
		<!-- 更多好店 -->
		<div style="margin-bottom: 0.375rem;background-color: #FFFFFF;">
			<van-row>
				<van-col span="12">
					<span>发现好店</span>
					<van-row>
						<van-col span="10">点击进入</van-col>
						<van-col span="6"><img style="width: 100px;" src="../../../public/method-draw-image.svg" /></van-col>
					</van-row>
				</van-col>
				<van-col span="12"><span>
				<span>海外好货</span>
				<van-row>
					<van-col span="10">点击进入</van-col>
					<van-col span="6"><img style="width: 100px;" src="../../../public/method-draw-image.svg" /></van-col>
				</van-row></span></van-col>
			</van-row>
		</div>
		<good-item title="养生专题" describe="养生">
			<div>
				<img style="width: 375px;height: 140px;" src="../../../public/method-draw-image.svg" />
			</div>
			
			<span style="display: inline-block;">发现好店</span>
		</good-item>
		<good-item title="热门推荐" describe="预约挂号" moreRoute="/more/1"><scrollX scrollDir="scrollX" class="scroll-hot" :data="hotGoods"></scrollX></good-item>
		<good-item title="每日好货" describe="一起拼最划算" moreRoute="/more/">
			
		</good-item>
		
	</div>
</template>

<script>
import { NoticeBar } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import icons from '@vant/icons';
import goodItem from '@/components/goodItem/goodItem';
import scrollX from '@/components/scroll/scrollX';
import backgroundImg from '@/components/backgroundImg/backgroundImg';
import tabItem from '@/components/tabItem/tabItem';
import { hotSale, saleGroup, discover, indexList } from '@/api/api';
import { mapMutations } from 'vuex';
export default {
	name: 'Home',
	data() {
		return {
			banners: [],
			searchValue: '',
			indexPage: 1,
			hotGoods: [],
			saleGroupGoods: [],
			discoverGoods: [],
			icons: [{ icon: 'fire-o' }, {}, {}, {}, {}]
		};
	},
	mounted() {
		indexList().then(res => {
			this.banners = res.data;
		});

		hotSale()
			.then(result => {
				this.hotGoods = result.data;
			})
			.catch(error => {});
		saleGroup()
			.then(result => {
				this.saleGroupGoods = result.data;
			})
			.catch(error => {});
		discover()
			.then(result => {
				this.discoverGoods = result.data;
			})
			.catch(error => {});
	},
	components: {
		goodItem,
		scrollX,
		backgroundImg,
		tabItem
	},
	computed: {
		goodItems() {
			return {
				推荐: this.hotGoods,
				拼团: this.saleGroupGoods,
				低价: this.discoverGoods,
				发现: this.hotGoods,
				火爆: this.saleGroupGoods
			};
		}
	},
	methods: {
		goHospital() {
			this.$router.push('/hospitalList');
		},
		goMouth() {
			this.$router.push('/mouth');
		},
		goBeauty() {
			this.$router.push('/beauty');
		},
		goSectionList() {
			this.$router.push('/sectionList');
		},
		goDrogStore() {
			this.$router.push('/drogStore');
		},
		goDoc() {
			this.$router.push('/doctorList');
		},
		goGoodsList1() {
			this.$router.push({ path: '/goodsList', query: { cid: 1200 } });
		},
		goGoodsList2() {
			this.$router.push({ path: '/goodsList', query: { cid: 1208 } });
		},
		goGoodsList3() {
			this.$router.push({ path: '/goodsList', query: { cid: 1211 } });
		},
		goGoodsList4() {
			this.$router.push({ path: '/goodsList', query: { cid: 1209 } });
		},
		goDetail(item) {
			console.log(item);
			this.$router.push({ path: '/Good', query: { productId: item.productId } });
		},
		onSearch() {
			console.log('onSearch');
		},
		changeSwipe(index) {
			this.indexPage = index;
		},
		showGood(item) {
			this.setGood(item);
			this.$router.push('/Good');
		},
		...mapMutations({
			setGood: 'SET_GOOD_MUTATION'
		})
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
</style>
