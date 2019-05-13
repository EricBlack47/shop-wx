<template>
	<div>
		<div><van-nav-bar title="投诉建议" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px; color: gray;line-height: 50px;">
			<image style="padding-top: 70px;display: block;margin: 0 auto;width: 180px;height: 180px;" src="../../../static/logo.png"></image>
			<text style="display: block;text-align: center;color: #e22426;font-size: 35px;padding-bottom: 77px;">医互链点</text>
			<!-- 用户提问 -->
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>联系我们</span>
			</div>
			<div @tap="askPhone()">
				<span style="margin-left:50px;margin-top:30px;margin-bottom: 30px;">客服电话：0871-65019933</span>
				<text class="iconfont2 you" style="color: #999999;position:absolute;right: 50px;">&#xe63f;</text>
			</div>
			<!-- 用户提问 -->
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>投诉建议</span>
			</div>
			<!-- 确认提交 -->
			<div class="button1">
				<div class="page-section">
					<div class="uni-list-cell">
						<van-cell-group><van-field v-model="askTest" placeholder="请输入您的意见货建议!" /></van-cell-group>
					</div>
				</div>
			</div>
			<div style="position: fixed;bottom: 0px;width: 95%;padding: 10px;"><van-button type="primary" size="large" @click="getSugges">投诉建议</van-button></div>
		</div>
	</div>
</template>

<script>
import { getMerberInfo, getSuggestion } from '@/api/api.js';
import { Field } from 'vant';
import { Dialog } from 'vant';
export default {
	data() {
		return {
			askTest: '',
			userInfo: null
		};
	},
	mounted() {},
	created() {
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
	},
	computed: {},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		getSugges() {
			var _this = this;
			console.log(_this.askTest)
			if (_this.askTest == null || _this.askTest == '') {
				Dialog.alert({
					message: '请输入您的意见或建议'
				}).then(() => {
					return;
				});
				return;
			}
			var query = {
				memberId: _this.userInfo.id,
				question: _this.askTest,
				type: 1
			};
			getSuggestion(query).then(e => {
				if (e.code == 200) {
					if (e.result != null) {
						if (e.result == 1) {
							Dialog.alert({
								message: '成功提交，我们会尽快处理！'
							}).then(() => {
								return;
							});
						}
					}
				}
			});
		}
	}
};
</script>

<style></style>
