<template>
	<div style="color: gray;">
		<div><van-nav-bar title="充值" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;">
			<van-cell-group>
				<div style="font-size: 18px;"><van-field value="输入金额" label="充值金额" v-model="param.money" /></div>
			</van-cell-group>
			<div style="margin: 5%;color: skyblue;">充值方式</div>
			<van-radio-group v-model="radio">
				<van-cell-group>
					<van-cell title="微信支付"  @click="radio = '1'"><van-radio name="1" /></van-cell>
					<van-cell title="支付宝支付"  @click="radio = '2'"><van-radio name="2" /></van-cell>
				</van-cell-group>
			</van-radio-group>
		</div>
		<div style="margin-top: 5%;text-align: center;">
			<van-checkbox v-model="check">
				<span @click="goAggrement" style="text-underline: 1px initial;color: red;text-decoration: underline;">我已仔细阅读《充值协议》</span>
			</van-checkbox>
		</div>
		<div @click="goCharge" style="position: fixed;width: 100%;bottom: 0px;"><van-button size="large" type="danger">充值</van-button></div>
	</div>
</template>

<script>
import { Cell, CellGroup,Dialog, RadioGroup, Radio, Field } from 'vant';
import { wxCharge } from '@/api/api.js';
export default {
	data() {
		return {
			param: {
				money: null,
				type: 5
			},
			disabled: false,
			checked: true,
			check:false,
			radio: '1'
		};
	},
	created(option) {
		this.param.type = option.type;
		if (this.param.type == '2') {
			this.disabled = true;
			this.param.money = '1680';
		} else if (this.param.type == '3') {
			this.disabled = true;
			this.param.money = '16800';
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		goAggrement(type){
			this.$router.push({path:'/aggrement',query:{type:1}});
			this.check =true
		},
		goCharge(){
			if (this.param.money == null || this.param.money <= 0) {
				Dialog.alert({
					message: "请输入充值金额！",
				})
				return;
			}
			if (this.check === false) {
				Dialog.alert({
					message: "请仔细阅读协议后并勾选同意协议",
				}).then(res =>{
					return;
				})
			wxCharge(this.param).then(res =>{
				console.log(res)
			})
			}
		}
	}
};
</script>

<style></style>
