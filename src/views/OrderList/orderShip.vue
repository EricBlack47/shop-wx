<template>
	<div class="page">
		<div class="pay-list">
			<div class="h">选择快递名称</div>
			<div class="b">
				<div class="item" @tap="showSinglePicker">
					<text style="font-size: 30px;color: #666666;padding-left: 20px;">{{shippingName}}</text>
					<text class="icon you" style="color: #999999;">&#xe62d;</text>
				</div>
			</div>
		</div>
		<div class="pay-list">
			<div class="h">输入快递单号</div>
			<div class="b">
				<div class="item">
					<input type="text"  v-model="shippingCode" />
				</div>
			</div>
		</div>
		<div class="pay-btn" @click="send">发货</div>
	</div>
</template>

<script>
	import {
		authPost
	} from "../../../common/request.js"
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				orderId:null,
				shippingName: '',
				shippingName2: '',
				shippingCode:null,
				pickerSingleArray: [],
				themeColor: '#007AFF',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[]
			}
		},
		onLoad(options) {
			console.log(options)
			this.orderId = options.orderId;
			var _this=this;
			authPost("express/list",{},function (res) {
				_this.pickerValueArray=res.data;
				
				console.log(_this.pickerValueArray)
			})
		},
		onShow() {
			
		},
		methods: {
			// 单列
			showSinglePicker() {
				console.log("===")
				//this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				var index=e.index[0];
				console.log(this.pickerValueArray[index].code)
				console.log(e.code,"haha")
				this.shippingName = e.label
				this.pickerValueDefault2=this.pickerValueArray[index].code
			},
			send(){
				
				if(this.pickerValueDefault2==null||this.pickerValueDefault2==""){
					uni.showModal({
						content: "请选择快递",
						confirmText: "确定",
						showCancel: false,
						success: function() {
							return;
						}
					})
					return;
				}
				if(this.shippingCode==null||this.shippingCode==""){
					uni.showModal({
						content: "请输快递单号",
						confirmText: "确定",
						showCancel: false,
						success: function() {
							return;
						}
					})
					return;
				}
				authPost("order/deliver",{orderId:this.orderId,shippingCode:this.shippingCode,shippingName:this.pickerValueDefault2},function (res) {
					uni.navigateBack()
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
			margin-top: 30px;
			height: auto;
			width: 100%;
			overflow: hidden;
		}
	
		.pay-list .h {
			width: 100%;
			height: 50px;
			line-height: 50px;
			margin-left: 31.25px;
			margin-bottom: 31.25px;
		}
		
		.pay-list .item {
			height: 108px;
			padding-left: 31.25px;
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
		height: 100px;
		width: 100%;
		text-align: center;
		line-height: 100px;
		background: #b4282d;
		color: #fff;
		font-size: 30px;
	}
</style>
