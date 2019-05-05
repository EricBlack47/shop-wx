<template>
	<div>
		<div>
			<van-nav-bar left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
		</div>
		<div style="padding-top: 48px;">
			<van-cell-group>
				<div v-for="(item, index) in news" :key="index" @click="goNewsDet(item)"><van-cell :title="item.title" icon="balance-list-o" /></div>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
	import {
		getAllGoods,
		getNewsList
	} from '@/api/api.js';
	export default {
		data() {
			return {
				goodsKind: [],
				news: []
			};
		},
		mounted() {
			var cid = this.$route.query.cid
			this.getlist()
		},
		methods: {
			goNewsDet(value){
				this.$router.push({
					path: '/newsDet',
					query: {
						productId: value.id
					}
				});
			},
			getlist(cid) {
				var query = {
					page: 1,
					size: 100,
				};
				getNewsList(query).then(res => {
					console.log(res)
					if (res.result != null)
						this.news = res.result.list;
				});
			},
			goBack() {
				this.$router.push('/');
			},
			showGood(item) {
			  this.setGood(item);
				this.$router.push({path:'/Good',query:{productId:item.productId}});
			},
		}
	}
</script>

<style lang="stylus" scoped>

</style>