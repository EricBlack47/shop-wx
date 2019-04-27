<template>
	<div>
		<div><van-nav-bar title="提现" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;">
			<van-cell-group>
				<van-field value="输入金额" label="提现金额" left-icon="contact" v-model="money" />
			</van-cell-group>
			<van-cell value="提现方式" />
			<van-radio-group v-model="radio">
				<van-cell-group>
					<van-cell title="提现到支付宝"  @click="radio = '1'"><van-radio name="1" /></van-cell>
					<van-cell title="提现到微信"  @click="radio = '2'"><van-radio name="2" /></van-cell>
				</van-cell-group>
			</van-radio-group>
			<div style="position: fixed;right: 20px;"><van-button type="danger">提现</van-button></div>
		</div>
	</div>
</template>

<script>
import { Cell, CellGroup } from 'vant';
import { Field } from 'vant';
export default {
	data() {
		return {
			param: {
				money: null,
				type: 5
			},
			disabled: false,
			checked: true,
			money: undefined,
			 radio: '1'
		};
	},
	mounted() {},
	onLoad(option) {
		this.param.type = option.type;
		if (this.param.type == '2') {
			this.disabled = true;
			this.param.money = '1680';
		} else if (this.param.type == '3') {
			this.disabled = true;
			this.param.money = '16800';
		}
	},
	computed: {},
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>

<style></style>
