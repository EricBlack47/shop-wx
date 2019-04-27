
import { get, post, authPost} from '@/util/http';

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
export const getCartList = () =>authpost("member/cartList");
export const goodsBanner = () =>get("content/list/8");
export const MerchantBanner = () =>get("content/list/7");
export const getAllGoodsByMerchant =params =>post('item/list',params);//获取商家详情
export const fllowMerchant =params =>authPost('member/follow/insert',params);//商家关注
export const GoodsListBanner = () =>get("content/list/8");//商品轮播
export const getAllGoods = params =>get('goods/allGoods',params);//获取所有商品
export const getGoodsCat = () =>get('goods/navList');//获取商品分类
export const getGoodsDetById = params =>get('goods/productDet',params);//通过商品Id获取商品详情
export const addCart = params =>authPost('member/addCart',params);//添加购物车
export const getAddressList = params => authPost('member/addressList',params);//添加收货地址
export const getMerberInfo = params =>authPost('member/info',params);//获取会员信息

export const getflowDocList = params =>authPost('doctorFollow/getListByMemberId',params);//我的关注的医生
export const getflowMecList = params =>authPost('member/followList',params);//我的关注的商家
export const getflowList = params =>authPost('member/getListByDoctorMemberId',params);//关注我的
export const getmyAsk = params =>authPost('comments/getListByMemberId',params);//我的提问
export const getSuggestion = params =>authPost('comments/addContent',params);//投诉建议
export const getBillList = params =>authPost('member/memberIncomeAndExpend',params);//账单
export const getOrderList = params =>authPost('member/orderList',params);//订单