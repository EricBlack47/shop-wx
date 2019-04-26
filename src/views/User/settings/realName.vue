<template>
	<div>
		<div>
			<van-nav-bar title="实名认证" left-text="返回" left-arrow @click-left="goBack" :z-index="10" autosize fixed />
		</div>
		<div style="padding-top: 46px;">
			<van-cell-group>
				<van-field v-model="username" required clearable label="姓名" placeholder="请输入真实姓名" autosize />
				<van-field v-model="code" required clearable label="身份证信息" placeholder="请输入真实姓名" autosize />
			</van-cell-group>
			<van-uploader :max-size="102400" @oversize="logContent('oversize')" :before-read="beforeRead(1)">
				<van-icon name="photograph" />
			</van-uploader>
		</div>
	</div>
</template>

<script>
	import {
		Field,
		Uploader
	} from 'vant';
	export default {
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			onRead(file) {
				console.log(file)
			},
			beforeRead(index) {
				return file => {
					console.log(index, file);
				};
			},

		}
	}
</script>

<style>
</style>
