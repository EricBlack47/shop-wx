<template>
	<div>
		<van-tabbar v-model="active" class="tab" style="z-index:999">
			<van-tabbar-item icon="good" to="/GoodList">商品</van-tabbar-item>
			<van-tabbar-item icon="good" to="/Merchant">商家</van-tabbar-item>

			<van-tabbar-item icon="home" to="/">首页</van-tabbar-item>
			<van-tabbar-item icon="cart" to="/Cart">购物车</van-tabbar-item>
			<van-tabbar-item icon="contact" to="/User">用户</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 1,
			icon: {
				normal: '//img.yzcdn.cn/icon-normal.png',
				active: '//img.yzcdn.cn/icon-active.png'
			}
		};
	},
	watch: {
		$route(to, from) {
			switch (to.fullPath) {
				case '/':
					this.active = 1;
					break;
				case '/Cart':
					this.active = 2;
					break;
				case '/User':
					this.active = 3;
					break;
				case '/GoodList':
					this.active = 0;
					break;
				case '/Merchant':
					this.active = 4;
					break;
				default:
					this.active = 1;
			}
		}
	}
};
</script>

<style lang="stylus" scoped></style>
