<template>
	<div style="width: 100%;color: gray;height: 100%;">
		<div>
			<van-nav-bar title="会员升级" left-text="返回" left-arrow @click-left="goBack" />
		</div>
		<div>
			<div style="width: 90%;margin-left: 5%;border-left: red 3px solid;font-size: 18px;margin-top: 2%;margin-bottom: 2%;"><span style="padding-left: 5px;">普通会员</span></div>
			<div style="border: 2px solid gray;border-radius: 15px; width: 95%;font-size: 16px;margin-left: 2.5%;">
				<p class="textP">1.普通会员可以捡红包，红包可以在mmc查看。</p>
				<p class="textP">2.充值消费产生积分，积分每天返利千分之一，返利可在mmc查看。</p>
				<p class="textP">3.mmc可以消费，消费不产生积分。</p>
			</div>
		</div>
		<div>
			<div style="width: 90%;margin-left: 5%;border-left: red 3px solid;font-size: 18px;margin-top: 2%;margin-bottom: 2%;"><span style="padding-left: 5px;">钻石会员</span></div>
			<div style="margin-left: 2.5%;border: 2px solid gray;border-radius: 15px; width: 95%;font-size: 16px;">
				<p class="textP">1.钻石会员年费1680元。</p>
				<p class="textP">2.钻石会员可以捡红包，红包可以在mmc查看。</p>
				<p class="textP">3.充值消费产生积分，积分每天返利千分之五，返利可在mmc查看。</p>
				<p class="textP">4.mmc可以消费，消费不产生积分。</p>
				<p class="textP">5.mmc可以每日返现百分之一，返现百分之十五手续费。</p>
			</div>
		</div>
		<div>
			<div style="width: 90%;margin-left: 5%;border-left: red 3px solid;font-size: 18px;margin-top: 2%;margin-bottom: 2%;"><span style="padding-left: 5px;">VIP会员</span></div>
			<div style="margin-left: 2.5%;border: 2px solid gray;border-radius: 15px; width: 95%;font-size: 16px;">
				<p class="textP">1.VIP会员年费16800元。</p>
				<p class="textP">2.VIP会员可以捡红包，红包可以在mmc查看。</p>
				<p class="textP">3.充值消费产生积分，积分每天返利百分之一，返利可在mmc查看。</p>
				<p class="textP">4.mmc可以消费，消费不产生积分。</p>
				<p class="textP">5.mmc可以每日返现百分之一，返现百分之十五手续费。</p>
			</div>
		</div>
		<div style="width: 100%;margin-top: 5%;padding-bottom: 100px;" >
			<van-radio-group  v-model="type" >
				<van-radio v-for="item in items" :key="item.name" :name="item.value">{{ item.name }}</van-radio>
			</van-radio-group>
		</div>
		<div style="position: fixed;width: 100%;bottom: 0px;">
			<van-button size="large" type="danger" @click="rqReg">立即升级</van-button>
		</div>
	</div>
</template>

<script>
	import { Dialog } from 'vant';
	import { wxAuth } from '@/api/api.js';
	export default {
		data() {
			return {
				items: [
					{
						value: 2,
						name: '钻石会员'
					},
					{
						value: 3,
						name: 'VIP会员'
					},
				],
				checked:2,
				type:2,
				userInfo:{},
				current:0,
			};
		},
		mounted() {
			var userInfo=localStorage.getItem("userInfo");
			this.userInfo = JSON.parse(userInfo)
		},

		methods: {
			is_weixin() {
			  var ua = navigator.userAgent.toLowerCase();
			  if (ua.match(/MicroMessenger/i) == "micromessenger") {
			    return true;
			  } else {
			    return false;
			  }
			},
			goCharge(type){
				if(this.is_weixin()){
					wxAuth({type:this.type}).then(res=>{
						location.href=res.result;
					})
				}
				else{
					this.$router.push({path:'/recharge',query:{type:this.type}})
				}
			},
			goBack() {
				this.$router.go(-1);
			},
			rqReg(){
				console.log(this.type)
				if(this.userInfo.catId>=this.type){
					var title="您只能升级为VIP会员！";
					if(this.userInfo.catId==3){
						title="您已达最高级了！"
					}
					Dialog.alert({
						message:title,
					})
					return;
				}else{
					this.goCharge()
				}
				
			},
		},
	};
</script>

<style lang="stylus" scoped>	
 .textP
  margin 5px
  
 .van-radio
  float left
  padding-left 10%
  font-size 18px

</style>
