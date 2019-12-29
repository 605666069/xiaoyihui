<template>
	<view class="content">
		<uni-card  :is-shadow="true" class="card">
			<view class="top uni-flex">
				<view class="left">
					<view class="name">
						刘德华
					</view>
					<view class="address">
						安徽医科大学附属医院
					</view>
				</view>
				<view class="left">
					<view class="top-text">
						我的积分
					</view>
					<view class="top-text yellow center">
						10000
					</view>
				</view>
			</view>
			<view class="main">
				<image src="../../static/60x60.png" mode="" @click="upload()" class="main-img"></image>
				<view class="btn-wrap">
					<button type="primary" @click="upload()" size="mini" class="main-btn">上传资质</button>
					<view class="min-text">
						*请上传JPG,PNG格式图片
					</view>
				</view>
				
			</view>
			<view class="my-divider"></view>
			<view class="list-wrap">
				<view class="list-title">
					我的订单
				</view>
				<view class="list">
					<view class="">
						<view class="uni-flex uni-row  btn-list ">
							<view class="uni-flex icon my-center">
								<image src="../../static/uni.png" mode="" class="iamge"></image>
							</view>
							<view class="uni-flex text">
								<view class="flex-1">
									<view class="title uni-flex ">
										<text  class="title-left text-overflow">阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片</text>
									</view>
									<view class="uni-flex">
										<text  class="text-line text-overflow">【规格型号】 100mg*30s</text>
									</view>
									<view class="uni-flex">
										<text  class="text-line text-overflow"> 通用名称：阿司匹林肠溶片 </text>
									</view>
									<view class="uni-flex">
										<text  class="text-line text-overflow text-bottom"> 商品名称：阿司匹林肠溶片</text>
									</view>
								</view>
								<view class="uni-flex">
									<view class="text-num ">
										<view class="">
											下单量
										</view>
										<view class="yellow">
											1000
										</view>
									</view>
									
								</view>
							</view>
							
						</view>
						<view class="my-divider"></view>
					</view>
				</view>
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
		onLoad() {
	
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
		},
		methods: {
			upload() {
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						
				        uni.uploadFile({
				            url: 'http://120.27.27.185:12341/ApiYouzan/upload/upload_file', 
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                
				            },
				            success: (uploadFileRes) => {
								console.log(uploadFileRes);
				                // console.log(uploadFileRes.data);
				            }
				        });
				    }
				});
				
			}
	
		}
	}
</script>

<style scoped>
	
	.top {
		justify-content: space-between;
	}
	.name {
		font-size: 32rpx;
	}
	.address {
		font-size: 24rpx;
	}
	.top-text {
		font-size: 26rpx;
	}
	.main-img {
		width: 142rpx;
		height: 142rpx;
		float: left;
	}
	.main-btn {
	/* 	display: inline-block;
		margin-left: 20rpx; */
		/* width: 142rpx; */
	}
	.btn-wrap {
		float: left;
		padding-left: 20rpx;
		padding-top: 30rpx;
	}
	.main {
		overflow: hidden;
	}
	.min-text {
		font-size: 22rpx;
		color: #999999;
		display: block;
	}
	.list-title {
		font-size: 32rpx;
		padding-bottom: 20px;
	}
	.card-list {
		
		padding-top: 104rpx;
		box-sizing: border-box;
		overflow-y: auto;
	}
	.example-body >>> .uni-searchbar.data-v-51118c3b {
		background-color: #3CCAA7;
	}
	.iamge {
		width: 170rpx;
		height: 170rpx;
	}
	.text {
		padding-left: 20rpx;
		width: 100%;
		position: relative;
		overflow: hidden;
		justify-content: space-between;
	}
	.text-show {
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
	.text-num {
		 text-align: center;
		 margin: auto;
	}
</style>
