<template>
	<div>
		<div>
			<transition name="slide">
				<van-nav-bar title="地址编辑" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed />
			</transition>
		</div>
		<div style="padding-top: 48px;">
			<van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result :search-result="searchResult"
			 @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		mounted() {
			var adres = this.$route.query.address
			console.log(adres);
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			}
		}
	};
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
</style>
