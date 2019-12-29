<template>
	<view class="content">
		<view class="my-card">
			<view class="nav mini-segmented ">
				<uni-segmented-control :current="tab" :values="items" @clickItem="changeTab" style-type="button" active-color="#3CCAA7"></uni-segmented-control>
			</view>
			<view >
				<view v-show="tab === 0">
					<view class="">
						<view class="uni-flex uni-row  btn-list ">
							<view class="uni-flex icon my-center">
								<image src="../../static/uni.png" mode="" class="iamge"></image>
							</view>
							<view class="uni-flex text">
								<view class="title uni-flex ">
									<text  class="title-left  text-bottom text-overflow">阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片</text>
									<button class="mini-btn" type="primary" size="mini">下单</button>箱</text>
								</view>
								<view class="uni-flex">
									<text  class="text-line text-overflow">【规格型号】 100mg*30s</text>
								</view>
								<view class="uni-flex">
									<text  class="text-line text-overflow"> 通用名称：阿司匹林肠溶片 </text>
								</view>
								<view class="uni-flex">
									<text  class="text-line text-overflow"> 商品名称：阿司匹林肠溶片</text>
								</view>
								<view class="uni-flex">
									<text  class="text-line text-address">  李医生    安徽医科大学附属医院    13800003333</text>
								</view>
								<view class="uni-flex">
									<text  class="text-line"> 下单量：<text class="yellow">100</text>箱</text>
								</view>
								<view class="uni-flex text-time">
									<text  class="text-line"> 2019-12-08</text>
								</view>
							</view>
							
						</view>
						<view class="my-divider"></view>
					</view>
				</view>
				<view v-show="tab === 1">
					<view >
						<view class="uni-flex my-space-between">
							<view class="">
								<view class="fz-30">
									李医生
								</view>
								<view class="">
									安徽医科大学附属医院
								</view>
							</view>
							<view class="uni-flex">
								<text class=" center text-right">13811112222</text>
							</view>
						</view>
						<view class="my-divider"></view>
					</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		data() {
			return {
				items: ['我的订单','我的客户'],
				tab:0
			}
		},
		components:{
			uniSegmentedControl
		},
		onLoad() {
	
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
		},
		methods: {
			changeTab(res) {
				if (this.tab !== res.currentIndex) {
					this.tab = res.currentIndex;
					console.log(this.tab)
				}
			}
		}
	}
</script>

<style scoped>
	.nav {
		font-size: 20rpx;
		padding-bottom: 20rpx;
	}
	.iamge {
		width: 170rpx;
		height: 170rpx;
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
		top: 0;
	}
	.text-bottom {
		width: 320rpx;
	}
	.text-time {
		color: #B1B1B1;
		font-size: 22rpx;
		text-align: right;
	}
	.text-address {
		word-break: break-all;
	}
</style>
