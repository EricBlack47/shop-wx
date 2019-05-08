<template>
	<transition name="slide">
		<div class="login">
			<div class="back-btn" @click="goBack">
				<van-icon name="arrow-left" />
			</div>
			<h1>医互链点</h1>
			<van-cell-group class="login-from">
				<van-field v-model="userName" clearable border label="手机" placeholder="请输入号码" :error-message="userNameErr" />
				<!-- <van-field v-model="password" clearable border type="password" label="密码" placeholder="请输入密码" :error-message="passwordErr" /> -->
				<van-cell>
					<van-row>
						<van-col span="12" class="btn">
							<van-button type="primary" size="small" @click="login" :loading="loading">登陆</van-button>
						</van-col>
						<van-col span="12" class="btn">
							<van-button type="default" size="small" @click="reg">去首页</van-button>
						</van-col>
					</van-row>
				</van-cell>
			</van-cell-group>
		</div>
	</transition>
</template>

<script>
	import {
		Dialog
	} from 'vant';
	import MD5 from 'crypto-js/md5';
	import {
		phoneNumCheck,
		pwdCheck
	} from '@/util/util';
	import {
		login,
		modiPassword,
	} from '@/api/api';
	import {
		Toast
	} from 'vant';
	import {
		userLogin
	} from '@/api/api.js';
	import {
		authPost
	} from '@/util/http.js';
	export default {
		data() {
			return {
				userName: '',
				password: '',
				userNameErr: '',
				passwordErr: '',
				loading: false,
				redirect: this.$route.query.redirect
			};
		},
		mounted() {
			if (this.redirect) {
				Toast({
					position: 'bottom',
					message: '未登录或登陆过期，请重新登陆~'
				});
			}
		},
		methods: {
			login() {
				this.userNameErr = '';
				this.passwordErr = '';
				this.loading = true;
				if (!phoneNumCheck(this.userName)) {
					this.userNameErr = '手机号码格式不正确';
					this.loading = false;
					return;
				}
			  else
				userLogin({
					userName: this.userName,
					userPwd: this.password,
					"type": 1
				})
				.then(res => {
					if (res.result.id == null) {
						Dialog.alert({
							message: '用户名或密码错误',
						});		
						this.loading = false;
					} 
					else{
						this.loading = false;
						var userInfo = JSON.stringify(res.result);
						localStorage.setItem("userInfo", userInfo);
						localStorage.setItem("token", res.result.token)
						this.$router.push('/');
					}	
				})
			},
			reg() {
				this.$router.push('/');
			},
			goBack() {
				this.$router.push('/');
			},
		}
	};
</script>

<style lang="stylus" scoped>
.login
  width 100%
  height 100%
  text-align center
  background url('./../../images/bgc/bgc.jpg')
  background-repeat no-repeat
  background-size cover
  overflow hidden

  h1
    margin-top 40%

.login-from
  width 80%
  text-align center
  padding 10px
  margin 0 auto
  box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 8px 0 rgba(0, 0, 0, 0.19)

  .btn
    text-align center
    margin-top 10px

.slide-enter-active, .slide-leave-active
  transition all 0.5s

.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
.back-btn
    position fixed
    z-index 999
    top 10px
    left 10px
    width 30px
    height 30px
    border-radius 50%
    color #fff
    line-height 32px
    text-align center
    background-color rgba(102, 102, 102, 0.4)

    i
      font-weight 700
      margin-left -2px
      margin-top 4px

</style>
