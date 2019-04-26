<template>
	<div>
		<div><van-nav-bar title="关注我的" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;background-color: #FFFFFF;">
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>我的提问</span>
			</div>
			<van-list >
				<div v-for="(value, index) of askList" :key="index" style="height: 80px;border-bottom: #666666 solid 1upx;background-color: #FFFFFF;">
					<van-card :desc="value.question" :title="value.username" :thumb="value.memberImage" />
					<div v-if="value.answer!==null"><van-card :desc="value.answer" :title="value.doctorName" :thumb="value.doctor.image" /></div>
				</div>
			</van-list>
		</div>
	</div>
</template>

<script>
import { List } from 'vant';
import { getMerberInfo, getmyAsk } from '@/api/api.js';
export default {
	data() {
		return {
		askList: [],
		};
	},
	mounted() {
	},
		created(){
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		this.getAklist();
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		getAklist() {
			var _this = this;
			var query = {
				"page": 1,
				"size": 20,
				"memberId": this.userInfo.id,
				"type":0
			};
			getmyAsk(query).then(e => {
				if (e.code == 200) {
					if (e.result != null) {
						_this.askList = e.result.list;
						for(var i= 0;i<_this.askList.length;i++){
							if (!_this.askList[i].memberImage)
								_this.askList[i].memberImage = "/static/user.png"
						}
					}
				}
			});
		},
	
	}
};
</script>

<style></style>
