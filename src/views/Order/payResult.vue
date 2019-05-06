<template>
	<div>
		<div>
			<van-nav-bar title="支付完成" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<div style="padding-top: 48px;"  v-if="status == true">
				<h2 class="ok">付款成功</h2>
				<div class="btn1"><van-button type="primary" @click="goOrder">查看订单</van-button></div>
				<div class="btn2"><van-button type="primary" @click="goGoods">继续逛</van-button></div>
			</div>	
			<div style="padding-top: 48px;"  v-if="status != true">
				<h2 class="ok" style="text-align center;margin-top 50px" >付款失败</h2>
				<div><van-button type="primary"  @click="goOrder">查看订单</van-button></div>
				<div><van-button type="primary">充值</van-button></div>
			</div>	
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				 status: false,
				message:null,
			};
		},
		mounted() {
			var message = this.$route.query.message
            if(this.message=="支付成功")
			this.status=true;
		},

	
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			goOrder(){
             this.$router.push({path:'/OrderList'});
			},
			goGoods(){
			  this.$router.push({path:'/GoodList'});	
			},
		}
	};
</script>

<style lang="stylus" scoped>
.ok
  text-align center
  margin-top 50px
	
 
</style>
