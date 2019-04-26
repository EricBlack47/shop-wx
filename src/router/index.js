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
const Add = () => import('@/views/AddressList/Add')
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/User',
      name: 'User',
      component: User
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
			component: orderList,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/recharge',
			name: 'recharge',
			component: recharge,
			component: orderList,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/suggestion',
			name: 'suggestion',
			component: suggestion,
			component: orderList,
			 meta: {
			  fullScreen: true
			}
		}, 
				{
			path: '/totalAssets',
			name: 'totalAssets',
			component: totalAssets,
			component: orderList,
			 meta: {
			  fullScreen: true
			}
		}, 
		{
			path: '/withdrawal',
			name: 'withdrawal',
			component: withdrawal,
			component: orderList,
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
