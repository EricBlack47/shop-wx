<template>
	<div>
		<div><van-nav-bar title="关注我的" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;background-color: #FFFFFF;">
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>名医工作室</span>
			</div>
			<van-swipe-item v-for="(item, index) in docList" class="swipe-item" :key="index" @click="goDetail(item)">
				<div><img :src="item.image" style="width: 118px;height: 120px;margin-right: 2px;" /></div>
				<span style="display: inline-block;text-align: center;margin: 0 auto;">{{ item.name }}工作室</span>
			</van-swipe-item>
		</div>
	</div>
</template>

<script>
import { List } from 'vant';
import { getMerberInfo,getDoctorList } from '@/api/api.js';
export default {
	data() {
		return {
		askList: [],
		docList:[],
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
				page: 1,
				size: 10,
				state: 1
			};
			getDoctorList(query).then(res => {
				if (res.result != null) {
					_this.docList = res.result.list;
				}
			});
		},
	
	}
};
</script>

<style></style>
