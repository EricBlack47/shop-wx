

import { get, post, authPost,authGet,upload} from '@/util/http';

export const indexList=()=>get("content/list/0");
export const test = () => get('/');
export const userLogin = params=>post('member/login',params);
export const login = params => post('login', params);
export const reg = params => post('member/register', params);
export const hotSale = () => post('hotsale');
export const saleGroup = () => post('salegroup');
export const discover = () => post('discover');
export const getCartCount = () => post('getCartCount');
export const getCart = () => post('getCart');
export const updateCartCount = params => post('updateCartCount', params);
export const addToCart = params => post('addToCart', params);
export const delFromCart = params => post('delFromCart', params);
export const getAddress = () => post('getAddress');
export const getOrder = () => post('getOrder');
export const createOrder = params => post('createOrder', params);
export const getGoodById = params => post('getGoodById', params);
export const getGoodsList = () =>get('goods/allGoods');
export const sectionDetBanner = () =>get('content/list/4')
export const goodsBanner = () =>get("content/list/8");
export const MerchantBanner = () =>get("content/list/7");
export const getAllGoodsByMerchant =params =>post('item/list',params);//获取商家详情
export const fllowMerchant =params =>authPost('member/follow/insert',params);//商家关注
export const GoodsListBanner = () =>get("content/list/8");//商品轮播
export const getAllGoods = params =>get('goods/allGoods',params);//获取所有商品
export const getGoodsCat = () =>get('goods/navList');//获取商品分类
export const getGoodsDetById = params =>get('goods/productDet',params);//通过商品Id获取商品详情
export const addCart = params =>authPost('member/addCart',params);//添加购物车
export const getCarList = params => authPost('member/cartList',params)//获取购物车
export const updateCart =params => authPost('member/cartEdit',params);//更新购物车
export const delCart = params => authPost('member/delCartChecked',params)//删除购物车商品
export const getMerberInfo = params =>authPost('member/info',params);//获取会员信息
export const getflowDocList = params =>authPost('doctorFollow/getListByMemberId',params);//我的关注的医生
export const getflowMecList = params =>authPost('member/followList',params);//我的关注的商家
export const getflowList = params =>authPost('member/getListByDoctorMemberId',params);//关注我的
export const getmyAsk = params =>authPost('comments/getListByMemberId',params);//我的提问
export const getSuggestion = params =>authPost('comments/addContent',params);//投诉建议
export const modiPassword = params => authPost('member/checkPassword',params);//检查密码
export const updataPassword = params => authPost('member/update',params);//更新密码
export const getAggrement = params => post('agreement/getAgreement',params);//获取用户协议
export const getAddressList = params => authPost('member/addressList',params);//获取收货地址
export const addAddress = params => authPost('member/addAddress',params);//新增收货地址
export const updateAddress = params => authPost('member/updateAddress',params)//更新收货地址
export const delAddress = params => authPost('member/delAddress',params)//删除地址
export const getBillList = params =>authPost('member/memberIncomeAndExpend',params);//账单
export const getOrderList = params =>authPost('member/orderList',params);//订单
export const uploadImage = file =>upload('member/imgaeUpload1',file);//上传图片
export const cancelOrder = params =>authPost('member/cancelOrder',params);//取消订单
export const confirm = params =>authPost('member/confirmOrder',params);//确认收货
export const addCar = params =>authPost('member/addCart',params);//加入购物车
export const merchantList = params => post('memberGold/list',params);//商家
export const merchantKind = params => post('kind/list',params);//商家分类
export const getCartProduct = params =>authPost('member/getCartProduct',params);//获取购物车数据
export const getCheckedCartList = params =>authPost('member/checkedCartList',params);//获取选中的购物车数据
export const addOrder =params =>authPost('member/addOrder',params);//添加订单
export const getMecList = params =>authPost('member/memberIncome',params);//获取推荐人信息
export const realName = params =>authPost('member/updateMine',params);//实名认证
export const buyNow = params =>authPost('member/buyNowIntr',params);//商品详情页-立即购买
export const orderDetail = params =>authPost('member/orderDetail',params);//获取订单详情
export const payMoney = params => authPost('memberPay/pay',params)//购买
export const hospitalBanner=()=>get("content/list/1");//医院轮播
export const beautyBanner = () =>get('content/list/2');//美容医院轮播
export const mouthBanner = () =>get('content/list/3');//口腔医院轮播
export const hospitalList = params =>post('hospital/list',params)//医院列表
export const sectionBanner=()=>get("content/list/4");//医生轮播
export const sectionList = params => post('sectionCat/search',params)//科室列表
export const sectionAndDoctor = params => post('section/searchSectionAndDoctor',params)//医生和科室名
export const getDoctorList = params => post('doctor/search',params)//名医工作室
export const getHospitalList = params => post('hospital/list',params)//会员医院
export const getAllList = params => post('content/panelItem',params)//获取所有专题
export const getHealthy = params => post('content/list',params)//养生专题列表
export const hospitalDet = params => authPost('hospital/selectByIdAndDoctor',params);//获取医院详情

export const sectionDet = params => authPost('doctor/getListBySectionName',params);//获取科室详情
export const getdrugStorelist = params => post('drugStore/search',params)//获取药店列表
export const drugStoreDet = params => authPost('drugStore/getOne',params);//获取药店详情
export const drugStoreNews = params => authPost('news/DrugStoreNews',params);//获取药店广告
export const drugStoreBanner = () =>get('content/list/5');
export const gettitleGoods = params => post('content/list',params)//获取海外好货
export const getDocDetail = params => authPost('doctor/getOneById',params);//获取医生详情
export const getNewsList = params => authPost('news/list',params);//获取新闻列表
export const getNewsDetal = params => authPost('news/Info',params);//获取新闻列表
export const getMySale = params => authPost('memberIncome/getTrade',params);//获取我的销售
export const smsCode = params =>post('sms',params);//短信验证码
export const wxCharge = params =>authGet('wxpay/mpCharge',params);//微信充值
export const wxAuth = params =>authGet('wxpay/auth',params);
export const msgLogin = params =>post('member/msgLogin',params);//短信登陆
export const getAreaList = params => authPost('express/list',params);//获取快递列表
export const orderShip = params => authPost('order/deliver',params);//发货
export const getLogisticList = params => authPost('order/expressPostOrder',params);//发货
export const searchList = params => post('index/getall',params)//搜索列表
