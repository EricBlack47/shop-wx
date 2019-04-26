<template>
  <transition name="slide">
    <div>
      <van-nav-bar title="地址列表"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        :z-index="10"
        fixed />
      <van-address-list v-model="chosenAddressId"
        class="address-list"
        :list="address"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect" />
    </div>
  </transition>
</template>

<script>

import { getAddressList } from '@/api/api.js';
export default {
  data() {
    return {
			address:[{
				id:'',
				name:'',
				tel:'',
				address:'',
			}],
      chosenAddressId: '',
			AddressId:''
    };
  },
  mounted() {
		this.getAddressList()
  },

  computed: {
    list() {
      var arr = [];
      this.getAddressList().forEach(item => {
				console.log(item)
        var obj = {};
        obj.id = item.addressId;
        obj.name = item.userName;
        obj.tel = item.tel;
        obj.address = item.streetName;
				console.log(obj)
        arr.push(obj);
      });
      return arr;
    },
  },
  methods: {
		getAddressList(){
			 getAddressList().then(data =>{
					this.address = data.result;
			 })
				 
			 },
    onAdd() {
			
		},
    onEdit(item) {
			console.log(item)
      let id = item.addressId;
      for (let i = 0; i < this.address.length; i++) {
        if (this.address[i].addressId == id) {
          var address = this.address[i];
          this.setEditAddress(address);
          this.$router.push('/EditAddress');
          break;
        }
      }
    },
    onSelect() {
      this.setAddressId(this.chosenAddressId)
    },
		setAddressId(id){
			this.AddressId = id
			console.log(".."+this.addressId)
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

.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
</style>
