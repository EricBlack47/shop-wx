<template>
	<div>
		<div>
			<van-nav-bar title="实名认证" left-text="返回" left-arrow @click-left="goBack" :z-index="10" autosize fixed />
		</div>
		<div style="padding-top: 46px;line-height:10px;">
			<van-cell-group>
				<van-field v-model="relName" required clearable label="姓名" placeholder="请输入真实姓名" autosize />
				<van-field v-model="IdCard" required clearable label="身份证信息" placeholder="请输入身份证号" autosize />
			</van-cell-group>
			<div style="text-align: center;margin-top: 20px;color: gainsboro;">(请上传身份证正反面照片共两张,图片大小1M以内)</div>
			<img style="width: 240px;height: 151px; margin-left: 18%;padding-top: 20px;" v-for="img in imageList" v-lazy="img" />
			<div style="text-align: center;position: fixed;bottom: 60px;left: 32%;z-index:1;">
				<van-uploader :max-size="409600" :after-read="afterRead">
					<div style="padding-right: 20px;"><van-button plain hairline type="primary">上传</van-button></div>	
				</van-uploader>	
					<van-button plain hairline type="primary" class="tijiao" @click="regName">提交</van-button>	
			</div>				
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
				relName: '',
				IdCard: '',
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
				if (/^[\u4e00-\u9fa5]{2,4}$/.test(this.realName)) {
					Dialog.alert({
						message: '请输入正确的姓名'
					}).then(() => {
						return;
					});
					return;
				}
				if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IdCard))) {
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
					Dialog.alert({
					message: '提交成功'
					}).then(() => {
						return;
						this.$router.push('/User');
				})
			})
			},
			goBack() {
				this.$router.push('/settings');
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
