<template>
  <transition name="slide">
    <div class="reg">
			<div class="back-btn" @click="goBack">
				<van-icon name="arrow-left" />
			</div>
      <h1>用户注册</h1>
      <van-cell-group class="reg-from">
        <van-field v-model="userName" clearable border label="手机号" placeholder="请输入手机号" :error-message="userNameErr" />
        <van-field v-model="password" clearable border type="password" label="密码" placeholder="请输入密码" :error-message="passwordErr" />
        <van-field v-model="passwordRep" clearable border type="password" label="重复密码" placeholder="请再次输入密码" :error-message="passwordRepErr" />
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary" @click="getCode">发送验证码</van-button>
        </van-field>
				<van-cell>
          <van-row>
						<van-col span="12" class="btn">
							<van-button type="primary" size="small" @click="login" :loading="loading">登陆</van-button>
						</van-col>
            <van-col span="12" class="btn">
              <van-button type="primary" size="small" @click="reg" :loading="loading">注册</van-button>
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
import { reg } from '@/api/api';
import { Toast } from 'vant';
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
			items: [{
					value: '1',
					name: '普通会员'
				},
				{
					value: '2',
					name: '钻石会员'
				},
				{
					value: '3',
					name: 'VIP会员'
				},
			],
			 current: 0
		}
  },
  methods: {
		/* 获取验证码 */
		getCode() {
			if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.userName))) {
				uni.showModal({
					content: "请输入正确的手机号",
					confirmText: "确定",
					showCancel: false,
					success: function() {
						return;
					}
				})
				return;
			}
			if (this.seconds > 0) return
			this.disabled = true;
			this.seconds = 60;
			this.codeText = this.seconds + "s后重新获取";
			var timer = setInterval(function() {
				this.seconds--;
				this.codeText = this.seconds + "s后重新获取";
				if (this.seconds <= 0) {
					clearInterval(timer)
					this.disabled = false
					this.codeText = '重新获取'
				}
			}, 1000)
			uni.request({
				url: this.baseURI + 'sms',
				data: {
					phone: this.regData.userName
				},
				method: 'POST',
				success: function(res) {
					if (res.data.code != 0) {
						this.disabled = false
						this.codeText = '重新获取'
					}
				}
			});
			},
    reg() {
      this.userNameErr = '';
      this.passwordErr = '';
      this.passwordRepErr = '';
      this.loading = true;
      if (!phoneNumCheck(this.userName)) {
        this.userNameErr = '手机格式不正确';
        this.loading = false;
        return;
      }
      if (!pwdCheck(this.password)) {
        this.passwordErr = '密码格式不正确';
        this.loading = false;
        return;
      }
      if (this.password !== this.passwordRep) {
        this.passwordRepErr = '两次密码不一致';
        this.loading = false;
        return;
      }
      reg({ userName: this.userName, password: MD5(this.password).toString() })
        .then(res => {
          if (res.status === 200) {
            this.loading = false;
            Toast.success('跳转登陆界面');
            setTimeout(() => {
              Toast.clear();
              this.$router.push('/login');
            }, 1000);
          } else {
            this.loading = false;
            Toast.fail(res.msg);
          }
        })
        .catch(error => {
          Toast.fail(error);
          this.loading = false;
        });
    },
		login(){
			 this.$router.push('/login');
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

</style>
