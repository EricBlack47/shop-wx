<template>
	<div>
		<div>
			<transition name="slide">
				<van-nav-bar title="地址编辑" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			</transition>
		</div>
		<div style="padding-top: 48px;">
			<van-address-edit
			 :area-list="areaList"
			 :address-info="addAddressInfo"
			 show-delete 
			 show-set-default 
			 @save="onSave" 
			 @delete="onDelete"/>
		</div>
	</div>
</template>

<script>
	import { Dialog } from 'vant';
	import { AddressEdit } from 'vant';
	import { Area } from 'vant';
	import AreaList from "@/util/area"
	import { updateAddress,delAddress } from '@/api/api.js';
	export default {
		data() {
			return {
				areaList: AreaList,
				addAddressInfo:{
					id:'',
					name:'',
					tel:'',
					isDefault:false
				}
			};
		},
		created() {
			var adres =JSON.parse(this.$route.query.address) 
			this.addAddressInfo = adres
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			onSave(address) {
				var addrInfo={
					province:address.province,
					city:address.city,
					county:address.county,
					addressDetail:address.addressDetail,
					areaCode:address.areaCode
				}
				var query = {
					addressId:this.addAddressInfo.id,
					userName: address.name,
					tel: address.tel,
					streetName: JSON.stringify(addrInfo),
					isDefault:address.isDefault
				}
				updateAddress(query).then(res => {
					if(res.code ==200){
						Dialog.alert({
						  title: '成功',
						  message: '已更新地址！'
						}).then(() => {
						   this.$router.push('/AddressList');
						});
					}
					Dialog.alert({
					  title: '失败',
					  message: '更新地址失败！'
					})
				})
			},
			onDelete(address){
				var query={
					addressId:address.id
				}
				delAddress(query).then(res =>{
				Dialog.alert({
					title: '成功',
					message: '已删除地址！'
					}).then(() => {
					 this.$router.push('/AddressList');
						})
					})
			}
		}
	}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
</style>
