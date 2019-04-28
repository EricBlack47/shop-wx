<template>
	<div>
		<div> <van-nav-bar title="关于我们"
		  left-text="返回"
		  left-arrow
		  @click-left="goBack"
		  :z-index="10"
		  fixed /></div>
		 <div style="padding-top: 46px;">
			<div class="content" >
				<img  style="width: 250px;margin: auto auto;" v-for="img in imageList" v-lazy="img" >
				<div class="qrcode" >
					
					<span class="tip">扫码体验医互链点</span>
				</div>
				<div class="desc">
					医互链点是提供医疗教育与商城服务的综合APP，使你的生活更加有条不紊。
				</div>
				<div class="source">
					<div class="title">我们提供：</div>
					<div class="source-list">
						<div class="source-cell">
							<span space="nbsp">1. </span>
							<span>软硬件开发、技术服务</span>
						</div>
						<div class="source-cell">
							<span space="nbsp">2. </span>
							<span>计算机系统集成及综合布线</span>
						</div>
						<div class="source-cell">
							<span space="nbsp">3. </span>
							<span>广告设计发布</span>
						</div>
						<div class="source-cell">
							<span space="nbsp">4. </span>
							<span>商家入驻</span>
						</div>
						<div class="source-cell">
							<span space="nbsp">5. </span>
							<span>商城服务</span>
						</div>
					</div>
				</div>
			</div>
		 </div>
	</div>
	
</template>

<script>
	import { Lazyload } from 'vant';
	export default {
		data() {
			return {
				 imageList: [
				  'http://assets.mtlyn.com/yhldFX.jpg'
				]
			};
		},
		
		methods:{
			goBack() {
				this.$router.go(-1);
			},
			
		}
		}
</script>
<style lang="stylus" scoped>
.content 
	margin-left 10px

</style>
