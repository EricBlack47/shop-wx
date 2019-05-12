<template>
	<div class="home" style="width: 100%;color: gray;">
		<div @click="onSearch"><van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action><div slot="action">搜索</div></van-search></div>
		<div class="home-swipe">
			<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index" @click="goMainDet(item)"><img :src="item.picUrl" /></van-swipe-item>
			</van-swipe>
		</div>
		<div class="grid-nav">
			<van-row type="flex" justify="space-around" class="nav-row">
				<van-col span="5">
					<img @click="goHospital" class="nav-row-img" src="../../../public/img/h1.png" alt="用户" />
					<div class="text">
						医院
					</div>
				</van-col>
				<van-col span="5">
					<img @click="goMouth" class="nav-row-img" src="../../../public/img/h2.png" alt="用户" />
					<div class="text">口腔</div>
				</van-col>
				<van-col span="5">
					<img @click="goBeauty" class="nav-row-img" src="../../../public/img/h3.png" alt="用户" />
					<div class="text">美容</div>
				</van-col>
				<van-col span="5">
					<img @click="goSectionList" class="nav-row-img" src="../../../public/img/h4.png" alt="用户" />
					<div class="text">科室</div>
				</van-col>
				<van-col span="5">
					<img @click="goDrogStore" class="nav-row-img" src="../../../public/img/h5.png" alt="用户" />
					<div class="text">药店</div>
				</van-col>
			</van-row>
			<van-row type="flex" justify="space-around" class="nav-row">
				<van-col span="5">
					<img @click="goDoc" class="nav-row-img" src="../../../public/img/h6.png" alt="用户" />
					<div class="text">找医生</div>
				</van-col>
				<van-col span="5">
					<img @click="goGoodsList1" class="nav-row-img" src="../../../public/img/h7.png" alt="用户" />
					<div class="text">找医生</div>
				</van-col>
				<van-col span="5">
					<img @click="goGoodsList2" class="nav-row-img" src="../../../public/img/h8.png" alt="用户" />
					<div class="text">美妆个护</div>
				</van-col>
				<van-col span="5">
					<img @click="goGoodsList3" class="nav-row-img" src="../../../public/img/h9.png" alt="用户" />
					<div class="text">精品酒水</div>
				</van-col>
				<van-col span="5">
					<img @click="goGoodsList4" class="nav-row-img" src="../../../public/img/h10.png" alt="用户" />
					<div class="text">珠宝配饰</div>
				</van-col>
			
			</van-row>
		</div>
		<good-item title="名医工作室" describe="名医问诊" moreRoute="/famousDoctor">
			<van-swipe class="swipe" @change="changeSwipe" :show-indicators=false>
				<van-swipe-item v-for="(doctor, index) in docList" class="swipe-item" :key="index">
					<div v-for="(item, index) in doctor" style="display: inline-block;width: 31%;margin: 1%;" class="swipe-item" :key="index" @click="goDocDet(item)">
						<div><img :src="item.image" style="width: 95px;height: 100px;" /></div>
						<span style="display: inline-block;text-align: center;margin: 0 auto;font-size: 14px;">{{ item.name }}工作室</span>
					</div>
				</van-swipe-item>
			</van-swipe>
		</good-item>
		<good-item title="会员医院" describe="名医问诊" moreRoute="/memberHospital">
			<van-swipe  class="swipe" @change="changeSwipe" :show-indicators=false>
				<van-swipe-item v-for="(doctor, index) in ss" class="swipe-item" :key="index" @click="goHosDet(item)">
					<div v-for="(item, index) in doctor" style="display: inline-block;width: 50%;" class="swipe-item" :key="index" @click="goHosDet(item)">
						<div><img :src="item.image" style="width: 130px;height: 100px;" /></div>
						<span style="display: inline-block;text-align: center;margin: 0 auto;font-size: 14px;">{{ item.hospitalName }}</span>
					</div>
				</van-swipe-item>
			</van-swipe>
		</good-item>
		<div style="margin-bottom: 0.375rem"></div>
		<van-row type="flex" title="" describe="" style="padding-left: 4px;margin-bottom: 10px;">
			<van-col span="6"><span style="padding: 5px;border-left:3px solid red;font-weight: bold;">医互头条</span></van-col>
			<van-col span="18">
			<van-swipe style="text-align: left;" :autoplay="3000" class="swipe" @change="changeSwipe" :show-indicators=false>
				<van-swipe-item v-for="(item, index) in news" class="swipe-item" :key="index" @click="goNews()">
					<span style="display: block;width: 100%;text-align: left;">{{ item.title }}</span>
				</van-swipe-item>
			</van-swipe>
			</van-col>
		</van-row>
		<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe" :show-indicators=false>
			<van-swipe-item v-for="(item, index) in imgUrls2" class="swipe-item" :key="index" @click="goDetail(item)">
				<img style="width: 375px;height: 100px;" :src="item.picUrl" />
			</van-swipe-item>
		</van-swipe>
		<!-- 更多好店 -->
		<div v-if="contentList.length > 0" style="margin-bottom: 0.375rem;background-color: #fff;">
			<van-row gutter="20">
				<div @click ="goContentList(item.items[0].panelId,item.name)" v-for="(item, index) in contentList" :key="index">
					<van-col span="12" style="border-right: 3px solid #f0f0f0;">
						<span style="padding-left: 10px;">{{ item.name }}<span style="float: right;padding-top: 2px;"><van-icon name="arrow"/></span></span>
						<van-row>
							<van-col span="12"><img style="width: 100px;height: 80px;padding-right: 10px;margin-left: 35px;margin-top: 10px;" :src="item.items[0].picUrl" /></van-col>
						</van-row>
					</van-col>
				</div>
			</van-row>
		</div>
		<div v-if="contentArticle.length > 0">
			<good-item :title="contentArticle[0].name" describe="养生" moreRoute="/healthyList">
				<div><img style="height: 140px;width: 99%;" :src="contentArticle[0].items[0].picUrl" /></div>
				<span style="display: inline-block;">{{ articleTitle }}</span>
			</good-item>
		</div>		
		<div  style="height: 480px;">
			<div v-for="(item, i) in contentNow" :key="i" v-if="contentNow.length > 0">
				<good-item :title="item.name" >
					<div style="width: 32%; overflow: hidden;float: left;" v-for="(product, index) in item.items" :key="index" @click="goGoodsDetail(product.productId)">
						<div style="margin-bottom: 10px;margin-left: 10px;">
							<img :src="product.picUrl" style="width: 100px;height: 100px;margin-right: 5px;" />
							<span style="display: inline-block;overflow: hidden;height: 40px;font-size: 14px;">{{ product.articleTitle.length>5?product.articleTitle.slice(0,15)+'...':product.articleTitle }}</span>
							<span style="display: inline-block;text-align: center;font-size: 14px;color: red;">售价:￥{{ product.salePrice }}</span>
						</div>
					</div>			
				</good-item>
			</div>
		</div>	
	</div>
</template>

<script>
import { GoodsListBanner, getAllGoods, getGoodsCat, getDoctorList, getHospitalList, getAllList } from '@/api/api.js';
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
			userInfo: {
				orderCount: {
					waitPay: 0,
					waitReceive: 0,
					waitSend: 0
				},
				overMoney: 0,
				overPoints: 0,
				total: 0
			},
			banners: [],
			searchValue: '',
			indexPage: 1,
			hotGoods: [],
			saleGroupGoods: [],
			discoverGoods: [],
			icons: [{ icon: 'fire-o' }, {}, {}, {}, {}],
			docList: [],
			imgUrls2: [],
			bannerShow2: false,
			adMessage: [],
			isCircular: true,
			contentList: [], //列表专题
			contentNow: [], //直接显示专题
			contentArticle: [], //商品文章专题
			hosList: [], //会员医院
			ss:[],
			GoodStore: [],
			GoodStoreImg: undefined,
			//首页导航滑动
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			titleList: [],
			articleTitle: '',
			news:undefined
		};
	},
	created() {
		this.userInfo =JSON.parse(localStorage.getItem('userInfo'));
		this.news=JSON.parse(localStorage.getItem('news'));
		this.getDoctorList();
		this.getHospitalList();
		this.getAllList();
	},
	mounted() {
		indexList().then(res => {
			this.banners = res.data;
		});		
	},
	components: {
		goodItem,
		scrollX,
		backgroundImg,
		tabItem
	},	
	methods: {
		goNews(id){
			this.$router.push({path:'/newsList',query:{type:0}});
		},
		goContentList(panelId, title) {
			 this.$router.push({path:'/goodsStore',query:{panelId:panelId,title:title}});
		},
		goHosDet(item){
		 this.$router.push({path:'/hospitalDet',query:{hospitalId:item.id}});
		},
		goMainDet(item){
		 this.$router.push({path:'/hospitalDet',query:{hospitalId:item.productId}});
		},
		goDocDet(doctors){
			 this.$router.push({path:'/doctorDet',query:{doctorId:doctors.id}});
		},
		goGoodsDetail(e){
				this.$router.push({path:'/Good',query:{productId:e}});
		},
		/* 获取所有列表 */
		getAllList() {
			var query = {};
			getAllList(query).then(res => {
				if (res.result !== null && res.result != '') {
					var goosSwiper = res.result.filter(item => item.type == 0);
					this.imgUrls2 = goosSwiper[0].items;
					this.contentList = res.result.filter(item => item.remark == 'list');
					this.contentArticle = res.result.filter(item => item.remark == 'article');

					this.articleTitle = this.contentArticle[0].items[0].articleTitle.split('~')[0];				
					this.contentNow = res.result.filter(item => item.remark != 'article' && item.remark != 'list' && item.type != 0);
				}
			});
		},
		/* 获取名医列表 */
		getHospitalList() {
			var _this = this;
			var lia=[];		 
			var query = {
				page: 1,
				size: 100,
				catId: 1
			};
			getHospitalList(query).then(res => {
				if (res.result != null) {
					var sec = res.result.list;
					if (sec == null) sec = [];
					var len = sec.length;
					var lineNum = len % 2 === 0 ? len / 2 : Math.floor(len / 2 + 1);
					for (var i = 0; i < lineNum; i++) {
						var temp = sec.slice(i * 2, i * 2 + 2);
						for (var j = 0; j < temp.length; j++) {
							temp[j].image = temp[j].image.split(',')[0];
						}
						this.ss.push(temp);
					}
				}
			});
		},
		/* 获取名医列表 */
		getDoctorList() {
			var _this = this;
			var query = {
				page: 1,
				size: 100,
				state: 1
			};
			getDoctorList(query).then(res => {
				if (res.result != null) {
					var sec = res.result.list;
					if (sec == null) sec = [];
					var len = sec.length;
					var lineNum = len % 3 === 0 ? len / 3 : Math.floor(len / 3 + 1);
					for (var i = 0; i < lineNum; i++) {
						var temp = sec.slice(i * 3, i * 3 + 3);
						 _this.docList.push(temp);
					}
					
				}
			});
		},
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
			this.$router.push({ path: '/goodsList', query: { cid: 1208 } });
		},
		goGoodsList2() {
			this.$router.push({ path: '/goodsList', query: { cid: 1211 } });
		},
		goGoodsList3() {
			this.$router.push({ path: '/goodsList', query: { cid: 1200 } });
		},
		goGoodsList4() {
			this.$router.push({ path: '/goodsList', query: { cid: 1209 } });
		},
		goDetail(item) {
			this.$router.push({ path: '/Good', query: { productId: item.productId } });
		},
		onSearch() {
			this.$router.push('/search');
		},
		changeSwipe(index) {
			this.indexPage = index;
		},
		showGood(item) {
			this.setGood(item);
			this.$router.push('/Good');
		},
	}
};
</script>

<style lang="stylus" scoped>
.van-swipe-item
 text-align center
.text
 font-size 12px
.home
  background-color #eee
  margin-bottom 50px
  height 100%

.grid-nav
  background-color #FFFFFF
  margin-bottom 6px
  
  .nav-row
    padding 10px
	
	.nav-row-img
	  display block
	  margin 0px auto
	  height 40px
	  width 40px
	  border-radius 50%
	.text
	  text-align center
	  margin-top 5px

.home-swipe
  box-sizing border-box
  padding 4px 6px
  background-color #fff

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
.van-swipe__indicators
 display none
 
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
	
.good-item[data-v-3106e062]
	margin-bottom 0
	
.good-item .head .more[data-v-3106e062]
 color #ddd
 border 0px
</style>
