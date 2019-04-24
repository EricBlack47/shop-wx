<template>
	<div class="page">
		<div> <van-nav-bar title="我的设置"
		  left-text="返回"
		  left-arrow
		  @click-left="goBack"
		  :z-index="10"
		  fixed /></div>
		<van-cell title="个人信息" icon="manager-o" value="" is-link to="/userInfo"/>
		<van-cell title="实名认证" icon="manager-o" value="" is-link to="/realName"/>
		<van-cell title="安全设置" icon="setting-o" value="" is-link to="/safeSetting"/>
		<van-cell title="收获地址" icon="location-o" value="" is-link to="/AddressList"/>
		<van-cell title="会员管理" icon="manager-o" value="" is-link to="/memberManage"/>
		<van-cell title="关于我们" icon="friends-o" value="" is-link to="/aboutUs"/>
		<van-cell title="用户须知" icon="description" value="" is-link to="/userRead"/>
		<van-cell title="医互链点" icon="like-o" value="" is-link to="/yihuliandian"/>
		<div @click="quit"><van-cell title="退出登陆" icon="exchange" value="" is-link /></div>
	</div>
</template>

<script>
import { Dialog } from 'vant';
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
			Dialog.alert({
			  title: '退出',
			  message: '已退出登陆'
			}).then(() => {
			   this.$router.go(-1);
			});
			},
		goBack() {
			this.$router.go(-1);
		},			
	}
}
</script>

<style>
.page {
	background-color: #ffffff;
}
</style>
