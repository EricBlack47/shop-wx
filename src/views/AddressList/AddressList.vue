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
				AddressId:'',
				checked:0,
			};
		},
		created() {
			var num = this.$route.query.checked
			this.checked = num
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
						var addr=JSON.parse(item.streetName)
						obj.address =addr.province+addr.city+addr.county+addr.addressDetail;
						obj.province=addr.province;
						obj.city=addr.city;
						obj.county=addr.county;
						obj.addressDetail=addr.addressDetail
						obj.areaCode=addr.areaCode
						arr.push(obj)
					})
					this.address = arr
				})
			},
			onAdd() {
				this.$router.push('/Add');
			},
			onEdit(item) {		
				var adrr = item;	
				this.$router.push({
					path: '/EditAddress',
					query: { address: JSON.stringify(adrr) }
				});					
			},
		
			onSelect(item) {
				this.setAddressId(this.chosenAddressId)
				var adrr = item;
				if(this.checked==1){
					localStorage.setItem("address",JSON.stringify(adrr))
					this.$router.go(-1);
					return;
				}	
			},
			setAddressId() {
				this.AddressId = this.address.addressId
			},
			getDefaultId() {
				let id = '';
				for (let i = 0; i < this.addressList.length; i++) {
					if (this.addressList[i].isDefault === 1) {
						id = this.addressList[i].addressId;
						break;
					}
				}
				this.chosenAddressId = id;
			},
			goBack() {
				this.$router.push('/settings');
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
