<template>
	<view class="content">
		<view class="card-wrap">
			<view class="my-card box">
				<view class="img-wrap" style="background-image: url(../../static/uni.png);">
				</view>
				<view class="uni-flex my-space-between">
					<view class="box-title">
						泰国香米
					</view>
					<view class="">
						剩余<text class="yellow">100</text>
					</view>
					
				</view>
				<view class="msg">
					原装进口大米5KG 原装进口大米5KG 原装进口大米5KG 原装进口大米5KG 原装进口大米5KG 原装进口大米5KG 原装进口大米5KG 原装进口大米5KG 
				</view>
				<view class="uni-flex my-space-between">
					<view class="mini-text">
						<text class="fz-20">积分</text><text class="green">30</text>
					</view>
					<view class="box-btn">
						<button type="primary"  size="mini" class="main-btn" @click="toDetail()">兑换</button>
					</view>
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
			toDetail(res) {
				let detail = {
					id:1
				}
				uni.navigateTo({
					url: '/pages/shop-detail/index?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
			}
		}
	}
</script>

<style scoped>
	.card-wrap {
		padding: 20rpx;
		box-sizing: border-box;
		overflow: hidden;
	}
	.box {
		width: 345rpx;
		height:500rpx;
		margin: 10rpx 0;
		padding: 20rpx;
		box-sizing: border-box;
		float: left;
	}
	.img-wrap {
		border: 1px solid #CDCDCD;
		height: 300rpx;
		width: 100%;
		background-size: 100% auto;
		
	}
	.box-title {
		font-size: 28rpx;
	}
	.msg {
		height: 57rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		line-height: 1.2;
	}
	.box-btn {
		padding-top: 10rpx;
	}
	.mini-text {
		line-height: 55rpx;
	}
</style>
