<template>
  <transition name="slide">
	  <div>
		 <van-nav-bar title="地址列表"
		    left-text="返回"
		    left-arrow
		    @click-left="goBack"
		    :z-index="10"
		    fixed />
		 <van-address-edit
		 :area-list="areaList"
		  show-postal
		  show-set-default
		  show-search-result
		  :search-result="searchResult"
		  @save="onSave"
		  @delete="onDelete"
		  @change-detail="onChangeDetail"
		  /> 
	  </div>
  </transition>
</template>

<script>
import { AddressEdit } from 'vant';
import { Area } from 'vant';
export default {
  data() {
    return {
      areaList,
      searchResult: []
    }
  },

  methods: {
    onSave() {
      Toast('save');
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心	',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
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
