<template>
	<div class="page">
		<van-cell title="个人信息" icon="gold-coin" value="" is-link />
		<van-cell title="实名认证" icon="gift" value="" is-link />
		<van-cell title="安全设置" icon="gift" value="" is-link />
		<van-cell title="收获地址" icon="gold-coin" value="" is-link />
		<van-cell title="会员管理" icon="gift" value="" is-link />
		<van-cell title="关于我们" icon="gift" value="" is-link />
		<van-cell title="用户须知" icon="gold-coin" value="" is-link />
		<van-cell title="医互链点" icon="gift" value="" is-link />
		<div @click="quit"><van-cell title="退出登陆" icon="gift" value="" is-link /></div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      cartCount: '',
      showBase: false,
      sku:[],
      goods: {},
      goodsId: 1,
      count: 1,
			descript:''
    };
  },
  mounted() {


	}, 
	methods: {
		quit(){
			localStorage.removeItem("userInfo"); 
	}
}}
</script>

<style>
.page {
	background-color: #ffffff;
}
</style>
