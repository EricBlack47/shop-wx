import Vue from 'vue';
import Router from 'vue-router';
const GoodList = () => import('@/views/Good/GoodList');
const Merchant = () => import('@/views/Merchant/Merchant');
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home/Home');
const Cart = () => import(/* webpackChunkName: "Cart" */ '@/views/Cart/Cart');
const User = () => import(/* webpackChunkName: "User" */ '@/views/User/User');
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login/Login');
const Reg = () => import(/* webpackChunkName: "Reg" */ '@/views/Reg/Reg');
const Good = () => import(/* webpackChunkName: "Good" */ '@/views/Good/Good');
const NotFound = () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound/NotFound');
const Order = () => import(/* webpackChunkName: "Order" */ '@/views/Order/Order');
const AddressList = () => import(/* webpackChunkName: "AddressList" */ '@/views/AddressList/AddressList');
const EditAddress = () => import(/* webpackChunkName: "EditAddress" */ '@/views/EditAddress/EditAddress');
const OrderList = () => import(/* webpackChunkName: "OrderList" */ '@/views/OrderList/OrderList');
const settings = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/settings/settings');

const bill = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/bill');
const docAnswered = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/docAnswered');
const fllowMe = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/fllowMe');
const lastMoney = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/lastMoney');
const mmc = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/mmc');
const myAnswered = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/myAnswered');
const myFollow = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/myFollow');
const myMoney = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/myMoney');
const mySale = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/mySale');
const orderList = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/orderList');
const recharge = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/recharge');
const suggestion = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/suggestion');
const totalAssets = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/totalAssets');
const withdrawal = () => import(/* webpackChunkName: "OrderList" */ '@/views/User/withdrawal');
const aboutUs = () => import('@/views/User/settings/aboutUs');
const memberManage = () => import('@/views/User/settings/memberManage');
const realName = () => import('@/views/User/settings/realName');
const safeSetting = () => import('@/views/User/settings/safeSetting');
const userInfo = () => import('@/views/User/settings/userInfo');
const userRead = () => import('@/views/User/settings/userRead');
const yihuliandian = () => import('@/views/User/settings/yihuliandian');
const Add = () => import('@/views/AddressList/Add');
const aggrement = () => import('@/views/User/settings/aggrement');
const confOrder = () => import('@/views/Order/confOrder');
const doctorDet = () => import('@/views/Home/Doctor/doctorDet');//医生详情
const doctorList = () => import('@/views/Home/Doctor/doctorList');//医生列表
const drogStore = () => import('@/views/Home/Drogstore/drogStore');//药店
const famousDoctor = () => import('@/views/Home/FamousDoctor/famousDoctor');//名医工作室
const goodsStore = () => import('@/views/Home/GoodsStore/goodsStore');//海外好货
const healthyDet = () => import('@/views/Home/Healthy/healthyDet');//养生专题详情
const healthyList = () => import('@/views/Home/Healthy/healthyList');//养生专题
const beauty = () => import('@/views/Home/Hospital/beauty');//美容医院
const hospitalDet = () => import('@/views/Home/Hospital/hospitalDet');//医院详情
const hospitalList = () => import('@/views/Home/Hospital/hospitalList');//医院列表
const mouth = () => import('@/views/Home/Hospital/mouth');//口腔医院
const memberHospital = () => import('@/views/Home/MemberHospital/memberHospital');//会员医院
const newsDet = () => import('@/views/Home/News/newsDet');//公告详情
const newsList = () => import('@/views/Home/News/newsList');//公告列表
const sectionDet = () => import('@/views/Home/Sections/sectionDet');//科室详情
const sectionList = () => import('@/views/Home/Sections/sectionList');//科室列表
const titleGoods = () => import('@/views/Home/TitleGoods/titleGoods');//发现好店
const goodsList = () => import('@/views/Home/goodsList');//商品列表

Vue.use(Router);
export default new Router({
  routes: [
		{
		  path: '/',
		  name: 'Home',
		  component: Home
		},
    {
      path: '/doctorDet',
      name: 'doctorDet',
      component: doctorDet,
			 meta: {
			  fullScreen: true
			}
    },
		{
		  path: '/doctorList',
		  name: 'doctorList',
		  component: doctorList,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/drogStore',
		  name: 'drogStore',
		  component: drogStore,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/famousDoctor',
		  name: 'famousDoctor',
		  component: famousDoctor,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/goodsStore',
		  name: 'goodsStore',
		  component: goodsStore,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/healthyDet',
		  name: 'healthyDet',
		  component: healthyDet,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/healthyList',
		  name: 'healthyList',
		  component: healthyList,
			 meta: {
			  fullScreen: true
			}
		},
		
		{
		  path: '/beauty',
		  name: 'beauty',
		  component: beauty,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/hospitalDet',
		  name: 'hospitalDet',
		  component: hospitalDet,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/hospitalList',
		  name: 'hospitalList',
		  component: hospitalList,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/mouth',
		  name: 'mouth',
		  component: mouth,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/memberHospital',
		  name: 'memberHospital',
		  component: memberHospital,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/newsDet',
		  name: 'newsDet',
		  component: newsDet,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/newsList',
		  name: 'newsList',
		  component: newsList,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/sectionDet',
		  name: 'sectionDet',
		  component: sectionDet,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/sectionList',
		  name: 'sectionList',
		  component: sectionList,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/titleGoods',
		  name: 'titleGoods',
		  component: titleGoods,
			 meta: {
			  fullScreen: true
			}
		},
		{
		  path: '/goodsList',
		  name: 'goodsList',
		  component: goodsList,
			 meta: {
			  fullScreen: true
			}
		},
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart,
			 meta: {
			 
			}
    },
    {
      path: '/User',
      name: 'User',
      component: User,
			 meta: {
			 
			}
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        fullScreen: true
      }
    },
    {
      path: '/Reg',
      name: 'Reg',
      component: Reg,
      meta: {
        fullScreen: true
      }
    },
		 {
		  path: '/Merchant',
		  name: 'Merchant',
		  component: Merchant,
		  meta: {
		    fullScreen: true
		  }
		},
    {
      path: '/Good',
      name: 'Good',
      component: Good,
      meta: {
        fullScreen: true
      }
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order,
      meta: {
        fullScreen: true
      }
    },
		{
		  path: '/confOrder',
		  name: 'confOrder',
		  component: confOrder,
		  meta: {
		    fullScreen: true
		  }
		},
		
    {
      path: '/AddressList',
      name: 'AddressList',
      component: AddressList,
      meta: {
        fullScreen: true
      }
    },
    {
      path: '/EditAddress',
      name: 'EditAddress',
      component: EditAddress,
      meta: {
        fullScreen: true
      }
    },
    {
      path: '/OrderList',
      name: 'OrderList',
      component: OrderList,
      meta: {
        fullScreen: true
      }
    },
		{
			path: '/GoodList',
			name: 'GoodList',
			component: GoodList
		},
		{
			path: '/Merchant',
			name: 'Merchant',
			component: Merchant,
			 meta: {
			  fullScreen: true
			}
		}, 
			{
			path: '/settings',
			name: 'settings',
			component: settings,
			 meta: {
			  fullScreen: true
			}
		}, 
		{
			path: '/bill',
			name: 'bill',
			component: bill,
			 meta: {
			  fullScreen: true
			}
		}, 
		{
			path: '/docAnswered',
			name: 'docAnswered',
			component: docAnswered,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/fllowMe',
			name: 'fllowMe',
			component: fllowMe,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/lastMoney',
			name: 'lastMoney',
			component: lastMoney,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/mmc',
			name: 'mmc',
			component: mmc,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/myAnswered',
			name: 'myAnswered',
			component: myAnswered,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/myFollow',
			name: 'myFollow',
			component: myFollow,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/myMoney',
			name: 'myMoney',
			component: myMoney,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/mySale',
			name: 'mySale',
			component: mySale,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/orderList',
			name: 'orderList',
			component: orderList,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/recharge',
			name: 'recharge',
			component: recharge,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/suggestion',
			name: 'suggestion',
			component: suggestion,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/totalAssets',
			name: 'totalAssets',
			component: totalAssets,
			 meta: {
			  fullScreen: true
			}
		}, 
		{
			path: '/withdrawal',
			name: 'withdrawal',
			component: withdrawal,
			 meta: {
			  fullScreen: true
			}
		}, 
		
		{
			path: '/aboutUs',
			name: 'aboutUs',
			component: aboutUs,
			 meta: {
			  fullScreen: true
			}
		}, 
			
		{
			path: '/memberManage',
			name: 'memberManage',
			component: memberManage,
			 meta: {
			  fullScreen: true
			}
		},
		
		{
			path: '/realName',
			name: 'realName',
			component: realName,
			 meta: {
			  fullScreen: true
			}
		}, 
		
		{
			path: '/safeSetting',
			name: 'safeSetting',
			component: safeSetting,
			 meta: {
			  fullScreen: true
			}
		}, 
		
		{
			path: '/userInfo',
			name: 'userInfo',
			component: userInfo,
			 meta: {
			  fullScreen: true
			}
		},
		
		{
			path: '/userRead',
			name: 'userRead',
			component: userRead,
			meta: {
			  fullScreen: true
			}
		},
		 
		{
			path: '/yihuliandian',
			name: 'yihuliandian',
			component: yihuliandian,
			 meta: {
			  fullScreen: true
			}
		}, 
			{
			path: '/Add',
			name: 'Add',
			component: Add,
			 meta: {
			  fullScreen: true
			}
		}, 
		{
			path: '/aggrement',
			name: 'aggrement',
			component: aggrement,
			 meta: {
			  fullScreen: true
			}
		}, 
    {
      path: '*',
      name: 'Notfound',
      component: NotFound,
      meta: {
        fullScreen: true
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    };
  }
});
