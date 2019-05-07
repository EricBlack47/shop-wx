<template>
	<div>
		<div><van-nav-bar left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 48px;">
			<div class="descrption" v-html="article.descript.replace(/alt/g,'width=100%')"></div>
		</div>
		<div class="article-meta">
			<text class="article-text">发表于</text>
			<text class="article-time">{{article.updated}}</text>
		</div>
	</div>
</template>

<script>
import { Row, Col } from 'vant';
import { getNewsDetal } from '@/api/api.js';
export default {
	data() {
		return {
			article:{}
		};
	},
	mounted() {
		var id = this.$route.query.productId;
		console.log(id,"id");
		this.getNewsDetal(id);
	},
	methods: {
		getNewsDetal(id) {
			
			getNewsDetal(id).then(res => {
				console.log(res)
				if (res.result!=null||res.result!="") {
					this.article=res.result;
					console.log(this.article);
				}
			});
		},
		goBack() {
			this.$router.push('/');
		},
	}
};
</script>

<style>
	
</style>
