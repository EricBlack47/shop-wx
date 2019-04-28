

import { get, post, authPost,upload} from '@/util/http';

export const indexList=()=>get("content/list/0");
export const test = () => get('/');
export const userLogin = params=>post('member/login',params);
export const login = params => post('login', params);
export const reg = params => post('reg', params);
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
export const uploadImage = file =>upload('member/imgaeUpload1',file);
export const cancelOrder = params =>authPost('member/cancelOrder',params);//取消订单
export const confirm = params =>authPost('member/confirmOrder',params);//确认收货
export const addCar = params =>authPost('member/addCart',params);//加入购物车
