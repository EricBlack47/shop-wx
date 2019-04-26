<template>
  <div >
    <div>
      <van-nav-bar title="ÌáÏÖ"
        left-text="è¿”å›ž"
        left-arrow
        @click-left="goBack"
        :z-index="10"
        fixed />
    </div>
	<div style="padding-top: 46px;">
		
	</div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      chosenAddressId: ''
    };
  },
  mounted() {

  },

  computed: {

  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  }
};
</script>

<style >

</style>
