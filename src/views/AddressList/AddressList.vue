<template>
	<transition name="slide">
		<div>
			<van-nav-bar title="地址列表" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			<van-address-list v-model="chosenAddressId" class="address-list" :list="address" @add="onAdd" @edit="onEdit" @select="onSelect" />
		</div>
	</transition>
</template>

<script>
	import {
		getAddressList
	} from '@/api/api.js';
	import {
		AddressList
	} from 'vant';
	export default {
		data() {
			return {
				address: [],
				chosenAddressId: '',
				AddressId: null
			};
		},
		created() {
			this.getAddressList()
		},
		methods: {
			getAddressList() {
				getAddressList().then(data => {
					var arr = []
					data.result.forEach(item => {
						var obj = {};
						obj.id = item.addressId;
						obj.name = item.userName;
						obj.tel = item.tel;
						obj.address = item.streetName;
						arr.push(obj)
					})
					this.address = arr
				})
			},
			onAdd() {
				this.$router.push('/Add');
			},
			onEdit(item) {
				let id = item.addressId;
				for (let i = 0; i < this.address.length; i++) {

					if (this.item[i].addressId == id) {
						var adres = this.item[i];
						console.log("address=" + adres)
						this.setEditAddress(adres);
						this.$router.push({
							path: '/EditAddress',
							query: {
								address: adres
							}
						});
						break;
					}
				}
			},
			onSelect() {
				this.setAddressId(this.chosenAddressId)
			},
			setAddressId(id) {
				this.AddressId = id
				console.log(".." + this.addressId)
			},
			getDefaultId() {
				let id = '';
				for (let i = 0; i < this.addressList.length; i++) {
					if (this.addressList[i].Isdefault === 1) {
						id = this.addressList[i].addressId;
						break;
					}
				}
				this.chosenAddressId = id;
			},
			goBack() {
				this.$router.go(-1);
			},
		}
	};
</script>

<style lang="stylus" scoped>
	.address-list 
		padding-top 46px 
	.slide-enter-active,.slide-leave-active 
		transition all 0.3s 
	.slide-enter,.slide-leave-to 
		opacity 0 
		transform translate3d(100%, 0, 0)
</style>
