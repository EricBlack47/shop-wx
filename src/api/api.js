import { get, post } from '@/util/http';

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
export const getAllGoods = params =>get('goods/allGoods',params);
export const getGoodsCat = () =>get('goods/navList')
export const getAllGoodsByMerchant =params =>post('item/list',params);//获取商家详情
export const fllowMerchant =params =>authPost('member/follow/insert',params);//商家关注
export const GoodsListBanner = () =>get("content/list/8");//商品轮播
export const getAllGoods = params =>get('goods/allGoods',params);//获取所有商品
export const getGoodsCat = () =>get('goods/navList');//获取商品分类
export const getGoodsDetById = params =>get('goods/productDet',params);//通过商品Id获取商品详情

