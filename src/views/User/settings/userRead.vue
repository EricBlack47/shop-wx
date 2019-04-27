<template>
	<div>
		<div>
			<van-nav-bar title="关于我们" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
		</div>
		<div style="padding-top: 46px;">
			<van-cell title="充值协议"  @click="goAggrement1()"  />
			<van-cell title="会员管理规则（普通会员）" @click="goAggrement2()" />
			<van-cell title="会员管理规则（钻石会员）"  @click="goAggrement3()"  />
			<van-cell title="会员管理规则（VIP会员）"  @click="goAggrement4()"  />
			<van-cell title="医护链点软件使用许可及服务协议"  @click="goAggrement5()"  />
			<van-cell title="医护链点软件使用许可及服务协议商家版"  @click="goAggrement6()"  />
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			goAggrement1(type){
				this.$router.push({path:'/aggrement',query:{type:1}});
			},
			goAggrement2(type){
				this.$router.push({path:'/aggrement',query:{type:2}});
			},
			goAggrement3(type){
				this.$router.push({path:'/aggrement',query:{type:3}});
			},
			goAggrement4(type){
				this.$router.push({path:'/aggrement',query:{type:4}});
			},
			goAggrement5(type){
				this.$router.push({path:'/aggrement',query:{type:5}});
			},
			goAggrement6(type){
				this.$router.push({path:'/aggrement',query:{type:6}});
			},
		}
	}
</script>

<style>
</style>
