<template>
	<view class="content" id="content">
		<uni-card  :is-shadow="true" class="card">
			<view class="">
				<view class="uni-flex uni-row  btn-list ">
					<view class="uni-flex icon my-center">
						<image src="../../static/uni.png" mode="" class="iamge my-border"></image>
					</view>
					<view class="uni-flex text">
						<view class="title uni-flex ">
							<text  class="title-left">阿司匹林肠溶片</text>
						</view>
						<view class="uni-flex">
							<text  class="text-line">【规格型号】 100mg*30s</text>
						</view>
						<view class="uni-flex">
							<text  class="text-line"> 通用名称：阿司匹林肠溶片 </text>
						</view>
						<view class="uni-flex">
							<text  class="text-line text-bottom"> 商品名称：阿司匹林肠溶片</text>
						</view>
					</view>
					
				</view>
			</view>
			<view class="my-divider"></view>
			<view class="uni-flex main">
				<view class="left-main " >
					<view class="main-title">
						<text>需求数量(箱)</text>
					</view>
					<uni-number-box id="min-numbox"></uni-number-box>
					<view class="">
						<text >剩余 <text class="yellow"> 100 </text> 箱</text>
					</view>
				</view>
				<view class="right-main">
					<view  class="main-title">
						<text>获取积分</text>
					</view>
					<view class="center yellow">
						<text>100</text>
					</view>
				</view>
			</view>
			<view class="pt-20">
				<button type="primary" @click="submit()">确认下单</button>
			</view>
		</uni-card>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad(data) {
			// let option = {}
			// const payload = data.detailDate || data.payload;
			// try {
			// 	option = JSON.parse(decodeURIComponent(payload));
			// } catch (error) {
			// 	option = JSON.parse(payload);
			// }
			// console.log(option)
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
		},
		methods: {
			submit () {
				uni.showLoading({
				    title: '加载中',
					mask:true
				});
				setTimeout(()=>{
					uni.hideLoading();
					uni.navigateBack();
				},1000)
			}
	
		}
	}
</script>

<style scoped>
	.card >>> .uni-card {
		min-height: 95%;
	}
	.iamge {
		width: 260rpx;
		height: 260rpx;
	}
	.text {
		padding-left: 20rpx;
		width: 100%;
		display: block;
		position: relative;
		overflow: hidden;
	}
	.title {
		justify-content: space-between;
	}
	.title-left {
		color: #4D4D4D;
		font-size: 30rpx;
		width: 320rpx;
	}
	.title-right {
		color: #4D4D4D;
		font-size: 25rpx;
		text-align: right;
		/* vertical-align: bottom; */
	}
	
	.text-line  {
		width: 100%;
	}
	.mini-btn {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.text-bottom {
		width: 320rpx;
	}
	.main {
		justify-content: space-between;
	}
	.main-title {
		font-size: 30rpx;
		padding-bottom: 10rpx;
	}
</style>
