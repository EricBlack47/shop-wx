<template>
	<div class="page">
		<div class="pay-list">
			<div class="h">选择快递名称</div>
			<van-picker :columns="columns" @change="onChange" />
		</div>
		<div class="pay-list">
			<div class="h">输入快递单号</div>
			<div class="b">
				<div class="item"><input type="text" v-model="shippingCode" /></div>
			</div>
		</div>
		<div class="pay-btn" @click="send">发货</div>
	</div>
</template>

<script>
import { Picker } from 'vant';
import {getAreaList ,orderShip} from '@/api/api.js';
export default {

	data() {
		return {
			 columns: [],
			pickerSingleArray: [],
			orderId:null,
			value:undefined,
			index:undefined,
			shippingCode:null,
		}
	},
	created() {
		this.orderId = this.$route.query.orderId
		console.log(this.orderId)
		var _this=this;
		var query = {
			
		};
		getAreaList(query).then(res => {
			console.log(res)
			var _this=this;
			_this.pickerSingleArray=res.data;
			for(var i = 0;i<res.data.length;i++){
				_this.columns.push( res.data[i].label);
			}
		});
	},
	onShow() {

	},
	methods: {
		onChange(picker, value, index) {
			this.value=value;
			this.index=index;
		},
		send(){
			if(this.columns==null||this.columns==""){
				console.log("快递为空")
				return;
			}
			if(this.shippingCode==null||this.shippingCode==""){
				console.log("单号为空")
				return;
			}
			var query = {
				orderId:this.orderId,
				shippingCode:this.shippingCode,
				shippingName:this.pickerSingleArray[this.index].code
			};
			console.log(this.pickerSingleArray[this.index]);
			console.log(this.columns[this.index]);
			orderShip(query).then(res => {
				console.log(res)
				_this.pickerSingleArray=res.data;
				for(var i = 0;i<res.data.length;i++){
					_this.columns.push( res.data[i].label);
				}
			});
		}
	}
}
</script>

<style scoped>
page {
	min-height: 100%;
	width: 100%;
	background: #f4f4f4;
}

.pay-list {
	margin-top: 15px;
	height: 100px;
	width: 100%;
	overflow: hidden;
}

.pay-list .h {
	width: 100%;
	height: 25px;
	line-height: 25px;
	margin-left: 16px;
	margin-bottom: 16px;
}

.pay-list .item {
	width: 750upx;
	height: 54px;
	padding-left: 16px;
	background: #fff;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #f4f4f4;
}

.you {
	flex-grow: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}

.pay-btn {
	position: fixed;
	left: 0;
	bottom: 0;
	height: 50px;
	width: 100%;
	text-align: center;
	line-height: 50px;
	background: #b4282d;
	color: #fff;
	font-size: 15px;
}
</style>
