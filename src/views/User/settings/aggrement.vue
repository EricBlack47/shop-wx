<template>
  <div >
    <div>
      <van-nav-bar title="用户须知"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        :z-index="10"
        fixed />
    </div>
	<div class="descrption" v-html="shop.descript" style="padding-top:48px;"></div>
  </div>
</template>

<script>
import {
		getAggrement,
	} from '@/api/api.js';
export default {
  data() {
    return {
       shop:{
		   descript:''
	   }	  
    };
  },
  mounted() {
    var type = this.$route.query.type
		this.getAggrement(type);
  },

  computed: {

  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
	 getAggrement(type){
		 var query = {
		 	type: type-0
		 }
		 getAggrement(query).then(res => {
		 	this.shop.descript = res.result.descript;
		 })
	 }
  }
};
</script>

<style lang="stylus" scoped>
.descrption
 color gray
</style>