<template>
	<div class="home" style="padding-bottom: 60px;">
		<van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action @search="onSearch"><div slot="action" @click="onSearch">搜索</div></van-search>
		<div class="home-swipe">
			<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(item, index) in banners" class="swipe-item" :key="index" @click="goDetail(item)"><img :src="item.picUrl" /></van-swipe-item>
			</van-swipe>
		</div>
		<div class="grid-nav">
			<van-row type="flex" justify="space-around" class="nav-row">
				<van-col span="5">
					<img @click="goHospital" style="" src="../../../public/img/h1.png" alt="用户" />
					<div class="text">
						医院
					</div>
				</van-col>
				<van-col span="5">
					<img @click="goMouth" src="../../../public/img/h2.png" alt="用户" />
					<div class="text">口腔</div>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goBeauty" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../public/img/h3.png" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">美容</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goSectionList" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../public/img/h4.png" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">科室</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goDrogStore" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../public/img/h5.png" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">药店</span></van-row>
				</van-col>
			</van-row>
			<van-row type="flex" justify="space-around" class="nav-row">
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goDoc" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../public/img/h6.png" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">找医生</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goGoodsList1" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../public/img/h7.png" alt="用户" />
					</div>
					<van-row><span style="margin-left: 15px; text-align: center; display: inline-block;margin-top: 10px;">农产品</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goGoodsList2" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../public/img/h8.png" alt="用户" />
					</div>
					<van-row><span style="margin-left: 10px; text-align: center; display: inline-block;margin-top: 10px;">美妆个护</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goGoodsList3" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../public/img/h9.png" alt="用户" />
					</div>
					<van-row><span style="margin-left: 10px; text-align: center; display: inline-block;margin-top: 10px;">精品酒水</span></van-row>
				</van-col>
				<van-col span="5">
					<div style="background-image: url(../../images/bgc/bgc.jpg);height: 30px;width: 30px;">
						<img @click="goGoodsList4" style="margin-left: 15px; height: 40px;width: 40px;border-radius: 50%;" src="../../../public/img/h10.png" alt="用户" />
					</div>
					<van-row><span style="margin-left: 10px; text-align: center; display: inline-block;margin-top: 10px;">珠宝配饰</span></van-row>
				</van-col>
			</van-row>
		</div>

		<good-item title="名医工作室" describe="名医问诊" moreRoute="/famousDoctor">
	
			<van-swipe  class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(doctor, index) in docList" class="swipe-item" :key="index">
					<div v-for="(item, index) in doctor" style="display: inline-block;" class="swipe-item" :key="index" @click="goDocDet(item)">
						<div><img :src="item.image" style="width: 118px;height: 120px;margin-right: 2px;" /></div>
						<span style="display: inline-block;text-align: center;margin: 0 auto;">{{ item.name }}工作室</span>
					</div>
				</van-swipe-item>
			</van-swipe>
		</good-item>
		<good-item title="会员医院" describe="名医问诊" moreRoute="/memberHospital">
			<van-swipe  class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(doctor, index) in ss" class="swipe-item" :key="index" @click="goHosDet(item)">
					<div v-for="(item, index) in doctor" style="display: inline-block;width: 175px;margin-right: 4px;margin-left: 2px;" class="swipe-item" :key="index" @click="goHosDet(item)">
						<div><img :src="item.image" style="width: 170px;height: 120px;" /></div>
						<span style="display: inline-block;text-align: center;margin: 0 auto;">{{ item.hospitalName }}</span>
					</div>
				</van-swipe-item>
			</van-swipe>
		</good-item>
		<div style="margin-bottom: 0.375rem"></div>
		<good-item title="医互头条" describe="">

			<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(item, index) in news" class="swipe-item" :key="index" @click="goDetail(item)">
					<span style="height: 100px;text-align: center;">{{ item.title }}</span>
				</van-swipe-item>
			</van-swipe>
			<van-swipe :autoplay="3000" class="swipe" @change="changeSwipe">
				<van-swipe-item v-for="(item, index) in imgUrls2" class="swipe-item" :key="index" @click="goDetail(item)">
					<img style="width: 375px;height: 100px;" :src="item.picUrl" />
				</van-swipe-item>
			</van-swipe>
		</good-item>
		<!-- 更多好店 -->
		<div v-if="contentList.length > 0" style="margin-bottom: 0.375rem;background-color: #FFFFFF;">
			<van-row>
				<div @click ="goContentList(item.items[0].panelId,item.name)" v-for="(item, index) in contentList" :key="index">
					<van-col span="12">
						<span>{{ item.name }}</span>
						<van-row>
							<van-col span="10">点击进入</van-col>
							<van-col span="6"><img style="width: 100px;height: 80px;" :src="item.items[0].picUrl" /></van-col>
						</van-row>
					</van-col>
				</div>
			</van-row>
		</div>
		<div v-if="contentArticle.length > 0">
			<good-item :title="contentArticle[0].name" describe="养生" moreRoute="/healthyList">
				<div><img style="width: 375px;height: 140px;" :src="contentArticle[0].items[0].picUrl" /></div>
				<span style="display: inline-block;">{{ articleTitle }}</span>
			</good-item>
		</div>
		<div  style="margin-bottom: 6px;" v-for="(item, i) in contentNow" :key="i" v-if="contentNow.length > 0">
			<good-item :title="item.name" >
				<div style="width: 118px; overflow: hidden;float: left;" v-for="(product, index) in item.items" :key="index" @click="goGoodsDetail(product.productId)">
					<div><img :src="product.picUrl" style="width: 118px;height: 120px;margin-right: 2px;" /></div>
					<div style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;height: 40px;overflow: hidden;">
						<span style="display: inline-block;text-align: center;margin: 0 auto;overflow: hidden;">
							{{ product.articleTitle }}
						</span>
					</div>
					<div>
						<span style="display: inline-block;text-align: center;margin: 0 auto;">售价:${{ product.salePrice }}</span>
					</div>
					<!-- <div>
						<span style="display: inline-block;text-align: center;margin: 0 auto;">{{ product.salePrice + 20 }}</span>
					</div> -->
				</div>
			</good-item>
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
		goContentList(panelId, title) {
			 this.$router.push({path:'/goodsStore',query:{panelId:panelId,title:title}});
		},
		goHosDet(item){
		 this.$router.push({path:'/hospitalDet',query:{hospitalId:item.id}});
		},
		goDocDet(doctors){
			 this.$router.push({path:'/doctorDet',query:{doctorId:doctors.id}});
		},
		goGoodsDetail(e){
				this.$router.push({path:'/Good',query:{productId:e}});
		},
		/* 获取所有列表 */
		getAllList() {
			var _this = this;
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

.grid-nav
  background-color #FFFFFF
  margin-bottom 6px
  
  .nav-row
    padding 10px
	img
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
