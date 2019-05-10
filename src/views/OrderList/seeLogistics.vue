<template>
	<!-- 物流信息 -->
	<div class="">
		<div class="uni-timeline" style="padding: 30px 20px;background-color: #fff;">
			<div v-for="(value,key) in listData" :key="key" class="uni-timeline-item uni-timeline-first-item">
				<div class="uni-timeline-item-keynode">{{value.time}}</div>
				<div class="uni-timeline-item-divider"></div>
				<div class="uni-timeline-item-content">{{value.context}}</div>
			</div>
			<div class="uni-timeline-item uni-timeline-last-item">
				<div class="uni-timeline-item-keynode"></div>
				<div class="uni-timeline-item-divider"></div>
				<div class="uni-timeline-item-content"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		authPost
	} from "../../../common/request.js"
	export default {
		data() {
			return {
				listData: [
				],
			}
		},
		onLoad(options) {
			console.log(options);
			this.getList(options.shippingName,options.shippingCode);
		},
		onShow() {
			
		},
		methods: {
			getList: function(shippingName,shippingCode) {
				var _this = this;

				authPost('order/expressPostOrder', {
					shippingName:shippingName,
					shippingCode:shippingCode
				}, function(res) {
					if(res.result!=null){
						_this.listData = res.result.data;
					}
					
				})
			},
		}
	}
</script>

<style>
	/* timeline */
	.uni-timeline {
			margin: 35upx 0;
			display: flex;
			flex-direction: column;
			position: relative;
		}
	
	
		.uni-timeline-item {
			display: flex;
			flex-direction: row;
			position: relative;
			padding-bottom: 20upx;
			box-sizing: border-box;
			overflow: hidden;
	
		}
	
		.uni-timeline-item .uni-timeline-item-keynode {
			width: 180upx;
			flex-shrink: 0;
			box-sizing: border-box;
			padding-right: 20upx;
			text-align: right;
			line-height: 65upx;
		}
	
		.uni-timeline-item .uni-timeline-item-divider {
			flex-shrink: 0;
			position: relative;
			width: 30upx;
			height: 30upx;
			top: 15upx;
			border-radius: 50%;
			background-color: #bbb;
		}
	
	
	
		.uni-timeline-item-divider::before,
		.uni-timeline-item-divider::after {
			position: absolute;
			left: 15upx;
			width: 1upx;
			height: 100vh;
			content: '';
			background: inherit;
		}
	
		.uni-timeline-item-divider::before {
			bottom: 100%;
		}
	
		.uni-timeline-item-divider::after {
			top: 100%;
		}
	
	
		.uni-timeline-last-item .uni-timeline-item-divider:after {
			display: none;
		}
	
		.uni-timeline-first-item .uni-timeline-item-divider:before {
			display: none;
		}
	
		.uni-timeline-item .uni-timeline-item-content {
			padding-left: 20upx;
		}
		
		.uni-timeline-last-item .bottom-border::after{
			display: none;
		}
		
		.uni-timeline-item-content .datetime{
			color: #CCCCCC;
		}
		
		/* 自定义节点颜色 */
		.uni-timeline-last-item .uni-timeline-item-divider{
			background-color: #1AAD19;
		}
	  
</style>
