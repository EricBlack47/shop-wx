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
			<van-uploader :max-size="102400" @oversize="logContent('oversize')" :after-read="afterRead">
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
	import {
		uploadImage,
		goodsBanner
	} from '@/api/api';
	export default {
		data() {
			return {
				username: '',
				code: '',
				images: []
			}
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			onRead(file) {
				console.log(file)
			},
			afterRead(image) {
				//console.log(file)
				uploadImage(image).then(res => {
					this.images = res.result
				})
			},

		}
	}
</script>

<style>
</style>
