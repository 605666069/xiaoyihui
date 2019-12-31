<template>
	<view class="content">
		 <!-- - type 用户类型：1超级管理员，2业务员，3.客户 -->
		<Client v-if="page_type=='3'" ref="client"></Client>
		<Sale v-if="page_type=='2'" ref="sale"></Sale>
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
				page_type:0
			}
		},
		onShow() {
			this.getUserInfo();
			this.page_type = this.util.login_data.type;
		},
		onHide() {
			this.page_type = 0;
		},
		onLoad() {
	
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
			this.getChildFn()
		},
		methods: {
			getChildFn() {
				switch (this.page_type){
					case '2':
						this.$refs.sale.switchList(false);
						break;
					case '3':
						this.$refs.client.getTaskList(false);
						break;
					default:
						break;
				}
				
				
			},
			getUserInfo() {
				this.util.getLoginData(this.$ajax);
				
			}
		},
		
	}
</script>

<style>
</style>
