<template>
	<div>
		<div><van-nav-bar title="关注我的" left-text="返回" left-arrow @click-left="goBack" :z-index="10" fixed /></div>
		<div style="padding-top: 46px;background-color: #FFFFFF;">
			<div class="bean-text">
				<span style="font-size: 32px; font-weight: 900;color: #FF3333;">|</span>
				<span>会员医院</span>
			</div>
			<van-swipe-item v-for="(item, index) in HosList" class="swipe-item" :key="index" @click="goDetail(item)">
				<div><img :src="item.image" style="width: 175px;height: 120px;margin-right: 5px;" /></div>
				<span style="display: inline-block;text-align: center;margin: 0 auto;">{{ item.hospitalName }}</span>
			</van-swipe-item>
		</div>
	</div>
</template>

<script>

</script>

<style></style>
