<template>
	<view class="content">
		<!-- <Client></Client> -->
		<Sale></Sale>
	</view>
</template>

<script>
	import Client from "@/pages/personal/client.vue";
	import Sale from "@/pages/personal/sale.vue";
	export default {
		components: {
			Client,Sale
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
	
		},
		onPullDownRefresh() {
			console.log(22222)
		},
		onReachBottom() {
			console.log(22222)
		},
		methods: {
	
		},
		
	}
</script>

<style>
</style>
