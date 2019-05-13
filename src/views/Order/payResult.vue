<template>
	<div>
		<div>
			<van-nav-bar title="支付完成" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<div style="padding-top: 48px;"  v-if="status == true">
				<h2 class="ok">付款成功</h2>
				<div style="width: 100%; text-align: center;left: 32%;z-index:1;">
						<div style="padding-right: 20px;float: left;margin-left: 25%;">
							<van-button  @click="goOrder"  type="primary">查看订单</van-button>
						</div>	
					</van-uploader>	
					<div style="margin-right: 20%;">
						<van-button @click="goGoods" type="primary" class="tijiao">继续逛</van-button>	
					</div>	
				</div>
			</div>	
			<div style="padding-top: 48px;"  v-if="status != true">
				<h2 class="ok" style="text-align center;margin-top 50px" >付款失败</h2>
				<div style="width: 100%; text-align: center;left: 32%;z-index:1;margin-top: 20%;">
					<div style="padding-right: 20px;float: left;margin-left: 25%;">
						<van-button  @click="goOrder" plain hairline type="primary">查看订单</van-button>
					</div>	
					</van-uploader>	
					<div style="margin-right: 20%;">
						<van-button @click="goCharge" plain hairline type="primary" class="tijiao">充值</van-button>	
					</div>
				</div>	
			</div>	
		</div>
	</div>
</template>

<script>
	import { getMerberInfo,wxAuth } from '@/api/api.js';
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
			is_weixin() {
			  var ua = navigator.userAgent.toLowerCase();
			  if (ua.match(/MicroMessenger/i) == "micromessenger") {
			    return true;
			  } else {
			    return false;
			  }
			},
			goCharge(){
				if(this.is_weixin()){
					wxAuth().then(res=>{
						location.href=res.result;
					})
				}
				else{
					this.$router.push({path:'/recharge'})
				}
			},
		}
	};
</script>

<style lang="stylus" scoped>
.ok
  text-align center
  margin-top 50px
	
 
</style>
