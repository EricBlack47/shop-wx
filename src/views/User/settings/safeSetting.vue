<template>
	<div>
		<div>
			<van-nav-bar title="安全设置" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
		</div>
		<div style="padding-top: 46px;">
			<van-cell-group>
				<van-field value="原始密码" disabled />
				<van-field v-model="opassword" placeholder="请输入原始密码" />
				<van-field value="新密码" disabled />
				<van-field v-model="npassword" placeholder="请输入新密码" />
				<van-field value="确认密码" disabled />
				<van-field v-model="rpassword" placeholder="请输入新密码" />
			</van-cell-group>
			<van-button size="large" @click="check">保存</van-button>
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
						if (this.npassword == "" || this.rpassword == "") {
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
								this.$router.push('/User');															
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
		background: orange;
		color: white
	
</style>
