<template>
  <transition name="slide">
    <div class="reg">
			<div class="back-btn" @click="goBack">
				<van-icon name="arrow-left" />
			</div>
      <h1>用户登陆</h1>
      <van-cell-group class="reg-from">
        <van-field v-model="regData.userName" clearable border label="手机号" placeholder="请输入手机号" :error-message="userNameErr" />
        <van-field v-model="regData.regCode" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary" @click="getCode">{{codeText}}</van-button>
        </van-field>
				<van-cell>
          <van-row>
					<!-- 	<van-col span="12" class="btn">
							<van-button type="primary" size="small" @click="login" :loading="loading">登陆</van-button>
						</van-col> -->
            <van-col span="24" class="btn">
              <van-button type="primary" size="small" @click="reg" :loading="loading">登陆</van-button>
            </van-col>			
          </van-row>
        </van-cell>
      </van-cell-group>
    </div>
  </transition>
</template>

<script>
import MD5 from 'crypto-js/md5';
import { emailCheck, pwdCheck } from '@/util/util';
import { reg,smsCode,msgLogin } from '@/api/api';
import { Toast,	Dialog } from 'vant';

export default {
  data() {
    return {
      userName: '',
      password: '',
      passwordRep: '',
      userNameErr: '',
      passwordErr: '',
      passwordRepErr: '',
			sms:'',
      loading: false,
			regData: {
				userName: null,
				userPwd: null,
				userPwd2: null,
				type: 1,
				Recommender: null,
				name: null,
				relName: "",
				IdCard: undefined,
				regCode: "" /* 短信验证码 */ ,
				phone: "" /* 电话号码 */
			},
			checked: true,
			codeText: '获取验证码',
			userInfo: null,
			disabled: false,
			seconds: 0,
			 current: 0
		}
  },
  methods: {
		/* 获取验证码 */
		getCode() {
			if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.regData.userName))) {
				Toast({
					position:'bottom',
					message: '请输入正确手机号'
				});
				return;
			}
			if (this.seconds > 0) return
			this.disabled = true;
			this.seconds = 60;
			this.codeText = this.seconds + "s后重新获取";
			var _this=this;
			var timer = setInterval(function() {
				_this.seconds--;
				_this.codeText = _this.seconds + "s后重新获取";
				if (_this.seconds <= 0) {
					clearInterval(timer)
					_this.disabled = false
					_this.codeText = '重新获取'
				}
			}, 1000)
			smsCode({phone:this.regData.userName}).then(res =>{
				
			})
		},
    reg() {
      this.userNameErr = '';
      this.loading = true;
			var query ={
				userName: this.regData.userName,
				code: this.regData.regCode,
			}
      msgLogin(query)
        .then(res => {
						this.loading = false;
						var userInfo = JSON.stringify(res.result);
						localStorage.setItem("userInfo", userInfo);
						localStorage.setItem("token", res.result.token)
						Dialog.alert({
							message: '登陆成功！即将返回首页',
						}).then(()=>{
								this.$router.push('/');
					})
        })
        .catch(error => {
          Toast.fail(error);
          this.loading = false;
        });
    },
		goBack() {
			this.$router.push('/');
		},
  }
};
</script>

<style lang="stylus" scoped>
.reg
  width 100%
  height 100%
  text-align center
  background url('./../../images/bgc/bgc.jpg')
  background-repeat no-repeat
  background-size cover
  overflow hidden

  h1
    margin-top 40%

.reg-from
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
			
.van-cell
 padding-top 10px
 padding-bottom 10px
 padding-left 0px
 padding-right 0px
</style>
