<template>
	<div>
		<div>
			<van-nav-bar title="实名认证" left-text="返回" left-arrow @click-left="goBack" :z-index="10" autosize fixed />
		</div>
		<div style="padding-top: 46px;">
			<van-cell-group>
				<van-field v-model="username" required clearable label="姓名" placeholder="请输入真实姓名" autosize />
				<van-field v-model="code" required clearable label="身份证信息" placeholder="请输入真实姓名" autosize />
			</van-cell-group>
		
			<van-uploader :max-size="102400" @oversize="logContent('oversize')" :after-read="afterRead">
				<van-button size="large">上传</van-button>		
			</van-uploader>

			<img  style="width: 250px;margin: auto auto;" v-for="img in imageList" v-lazy="img" >
			<van-button class="tijiao" @click="regName">提交</van-button>
		</div>
	</div>
</template>

<script>
	import { Lazyload } from 'vant';
	import { Dialog } from 'vant';
	import {
		Field,
		Uploader
	} from 'vant';
	import {
		uploadImage,
		goodsBanner,
		realName
	} from '@/api/api';
	export default {
		data() {
			return {
				username: '',
				code: '',
				imageList: [],
				userInfo: {
					orderCount: {
						waitPay: 0,
						waitReceive: 0,
						waitSend: 0
					},
					overMoney: 0,
					overPoints: 0,
					total: 0
				},
			}
		},
		created(){
			this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		
		},
		methods: {
			regName: function() {
				var _this = this;
				if (!(/^[\u4e00-\u9fa5]{2,4}$/.test(this.username))) {
					Dialog.alert({
						message: '请输入正确的姓名'
					}).then(() => {
						return;
					});
					return;
				}
				if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.code))) {
					Dialog.alert({
						message: '请输入正确的身份证号'
					}).then(() => {
						return;
					});
					return;
				}
				var imgs = this.imageList.join(",");
				if (imgs.length < 2) {
					Dialog.alert({
						message: '请上传身份证正反面'
					}).then(() => {
						return;
					});
					return;
				}
				var query={
					idcardImage: imgs,
					username: this.relName,
					idcard: this.IdCard,
					id: this.userInfo.id,
					state: 3
				}
				realName(query).then(res => {
						this.$router.push('/');
				})
			},
			goBack() {
				this.$router.go(-1);
			},
			onRead(file) {
				console.log(file)
			},
			afterRead(image) {
				var _this = this;
				if(this.imageList.length>1){
					return;
				}
				
				uploadImage(image).then(res => {
		
					 _this.imageList.push(res.result);
					 console.log(_this.imageList)
				})
			},

		}
	}
</script>

<style>
</style>
