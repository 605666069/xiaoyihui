<template>
	<view class="content">
		<view class="banner">
			<image src="../../static/shuijiao.jpg" mode=""></image>
		</view>
		<view class="my-padding-wrap">
			<view class="uni-flex uni-row  my-common-mt btn-list btn-bgc-1 " @click="goTab('product')">
				<view class="uni-flex icon my-center">
					<image src="../../static/uni.png" mode="" class="home-icon"></image>
				</view>
				<view class="uni-flex text">
					产品中心
				</view>
			</view>
			<view class="uni-flex uni-row   my-common-mt btn-list btn-bgc-2"  @click="goTab('shop')">
				<view class="uni-flex icon my-center">
					<image src="../../static/uni.png" mode="" class="home-icon"></image>
				</view>
				<view class="uni-flex text">
					积分商城
				</view>
			</view>
			<view class="uni-flex uni-row btn-list  my-common-mt btn-bgc-3"  @click="goTab('personal')">
				<view class="uni-flex icon my-center">
					<image src="../../static/uni.png" mode="" class="home-icon"></image>
				</view>
				<view class="uni-flex text">
					个人中心
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		onPullDownRefresh() {
		},
		onReachBottom() {
		},
		methods: {
			goTab(key) {
				let tab = {
					'product':'/pages/product-list/index',
					'shop':'/pages/shop/index',
					'personal':'/pages/personal/index',
					
				}
				this.$router.switchTab(tab[key])
				
			}

		}
	}
</script>

<style scoped>
	.banner {
		height: 386rpx;
		width: 100%;
	}
	.banner image {
		width: 100%;
		height: 100%;
	}
	.btn-area {
		padding: 20rpx;
		box-sizing: border-box;
	}
	.icon {
		margin: 0 70rpx;
	}
	.home-icon {
		width: 108rpx;
		height: 108rpx;
	}
	.text {
		font-size: 64rpx;
		color: #FFFFFF;
		line-height: 200rpx;
	}
	.btn-list {
		height: 200rpx;
		border-radius:10rpx;
	}
	.btn-bgc-1 {
		background-color: #3ED3AE;
	}
	.btn-bgc-2 {
		background-color: #EF8A46;
	}
	.btn-bgc-3 {
		background-color: #3EAEDC;
	}
</style>
