<template>
	<div>
		<div>
			<van-nav-bar left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
		</div>
		<div style="padding-top: 48px;">
			
		</div>
	</div>
</template>

<script>
	import {
		getAllGoods,
		getGoodsCat
	} from '@/api/api.js';
	export default {
		data() {
			return {
				goodsKind: [],
				AllGoods: []
			};
		},
		mounted() {
			var cid = this.$route.query.cid
			this.getGoodByCid(cid)
		},
		methods: {
			getGoodByCid(cid) {
				var query = {
					page: 1,
					size: 100,
					cid: 1211
				};
				getAllGoods(query).then(res => {
					if (res.result != null)
						this.AllGoods = res.result.data;
				});
			},
			goGoodsDetail(AllGoods) {
				this.$router.push({
					path: '/Good',
					query: {
						productId: AllGoods.productId
					}
				});
			},
			goBack() {
				this.$router.push('/');
			},
		}
	}
</script>

<style>
</style>
