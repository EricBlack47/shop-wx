<template>
	<!-- 物流信息 -->
	<div class="">
		<div class="uni-timeline" style="padding: 30px 20px;background-color: #fff;">
			<van-steps direction="vertical" :active="0">
				<div v-for="(value, key) in listData" :key="key">
					<van-step>
						<h3>{{ value.context }}</h3>
						<p>{{ value.time }}</p>
					</van-step>
				</div>
			</van-steps>
		</div>
	</div>
</template>

<script>
import {getLogisticList} from '@/api/api.js';
export default {
	data() {
		return {
			listData: [
			],
			shippingName:undefined,
			shippingCode:undefined
		};
	},
	created() {
		this.shippingName = this.$route.query.shippingName;
		this.shippingCode = this.$route.query.shippingCode;
		this.getList(this.shippingName, this.shippingCode);
	},
	onShow() {},
	methods: {
		getList: function(shippingName, shippingCode) {
			var _this = this;
			var query = {
				shippingName:shippingName,
				shippingCode:shippingCode
			};
			getLogisticList(query).then(res => {
				if(res.result!=null){
					_this.listData = res.result.data;
				}
			});
		}
	}
};
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

.uni-timeline-last-item .bottom-border::after {
	display: none;
}

.uni-timeline-item-content .datetime {
	color: #cccccc;
}

/* 自定义节点颜色 */
.uni-timeline-last-item .uni-timeline-item-divider {
	background-color: #1aad19;
}
</style>
