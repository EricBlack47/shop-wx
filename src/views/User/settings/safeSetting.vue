<template>
	<div>
		<div>
			<van-nav-bar title="安全设置" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
		</div>
		<div style="padding-top: 46px;">
			<van-cell-group>
				<van-field v-model="opassword" placeholder="请输入原始密码" />
				<van-field v-model="npassword" placeholder="请输入新密码" />
				<van-field v-model="rpassword" placeholder="请确认新密码" />
			</van-cell-group>
			<van-button type="primary" size="large" @click="check">保存</van-button>
		</div>
	</div>
</template>

<script>
	import {
		Button,
		Dialog
	} from 'vant';
	import {
		modiPassword,
		updataPassword
	} from '@/api/api.js';
	export default {
		data() {
			return {
				opassword: "",
				npassword: "",
				rpassword: ""
			};
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			check() {
				modiPassword(this.opassword).then(res => {	
					    if(res.result==false){
							Dialog.alert({
								title: "错误",
								message: "原始密码错误"
							})
						}
						else if (this.npassword == "" || this.rpassword == "") {
							Dialog.alert({
								title: "错误",
								message: "密码不能为空"
							})
						} else if (this.npassword != this.rpassword) {
							Dialog.alert({
								title: "错误",
								message: "两次输入的密码不一致",
							})
						} else {
							var query = {
								password: this.npassword
							}
							updataPassword(query).then(res =>{
								localStorage.removeItem("userInfo")
								localStorage.removeItem("token")
								Dialog.alert({
									title: "修改成功",
									message: "即将返回登陆页面",
								}).then(()=>{
									this.$router.push('/Login');			
								})												
							})								
						}
				})
			}

		},
	}
</script>

<style lang="stylus" scoped>
	.van-button--large 
		bottom: 0px;
		position: absolute;
		color: white
	
</style>
