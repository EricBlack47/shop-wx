<template>
  <transition name="slide">
	  <div>
		 <van-nav-bar title="地址列表"
		    left-text="返回"
		    left-arrow
		    @click-left="goBack"
		    :z-index="10"
		    fixed />
		<div style="padding-top: 48px;">
		 <van-address-edit
		 :area-list="areaList"
		  show-postal
		  show-set-default
		  @change-detail="onChangeDetail"
			@save="onSave"
		  /> 
		<!-- 		show-search-result
			 :search-result="searchResult" -->
		</div>
	  </div>
  </transition>
</template>

<script>
import { AddressEdit } from 'vant';
import { Area } from 'vant';
import AreaList from "@/util/area"
import { addAddress } from '@/api/api.js';
export default {
  data() {
    return {
			areaList:AreaList,
      // searchResult: [],
			form:{
				userName:'',
				tel:'',
				streetName:''
			}
    }
  },

  methods: {
    onSave() {
			var query ={
				uesrName:this.form.userName,
				tel:this.form.tel,
				streetName:this.form.streetName
			}
			addAddress(query).then(res =>{
				console.log(res)
			})
      
    },

    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '',
          address: ''
        }];
      } else {
        this.searchResult = [];
      }
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
