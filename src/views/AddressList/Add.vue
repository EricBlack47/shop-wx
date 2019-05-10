<template>
	<transition name="slide">
		<div>
			<van-nav-bar title="地址列表" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<div style="padding-top: 48px;">
				<van-address-edit
		        :area-list="areaList"
		         show-set-default
			     @save="onSave"
		     />
			</div>
		</div>
	</transition>
</template>

<script>
	import { Dialog } from 'vant';
	import {
		AddressEdit
	} from 'vant';
	import {
		Area
	} from 'vant';
	import AreaList from "@/util/area"
	import {
		addAddress
	} from '@/api/api.js';
	export default {
		data() {
			return {
				areaList: AreaList,
				checked:0
			}
		},
		created(){
			var num = this.$route.query.checked
			this.checked =num
		},

		methods: {
			onSave(address) {
				var addrInfo={
					province:address.province,
					city:address.city,
					county:address.county,
					addressDetail:address.addressDetail,
					areaCode:address.areaCode
				}
				var query = {
					userName: address.name,
					tel: address.tel,
					streetName: JSON.stringify(addrInfo),
					isDefault:address.isDefault
				}
				addAddress(query).then(res => {
					
						Dialog.alert({
						  title: '成功',
						  message: '已新增地址！'
						}).then(() => {
						this.$router.go(-1);
						});
					
					
				})
			},

			goBack() {
				this.$router.go(-1);
			},
		}
	}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
	
.van-address-edit__buttons .van-button
  margin-bottom: 15px
	bottom:0
	position:absolute
	width:92%

</style>
