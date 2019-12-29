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
							<text  class="title-left">泰国香米</text>
						</view>
						<view class="uni-flex">
							<text  class="text-line">原装进口大米5KG </text>
						</view>
						
					</view>
					
				</view>
			</view>
			<view class="my-divider"></view>
			<view class="uni-flex main">
				<view class="left-main flex-1" >
					<view class="main-title">
						<text>需求数量</text>
					</view>
					<view class="num-wrap uni-flex">
						<uni-number-box id="min-numbox" :max="max" :value="exc_num" @change="changeNum"></uni-number-box>
						<view class="">
							<button type="primary" 	@click="allNum()" class="mini-btn">全部兑换</button>
						</view>
					</view>
					
					<view class="">
						<text >剩余 <text class="yellow"> 100 </text> </text>
					</view>
					
				</view>
				<view class="right-main">
					<view  class="main-title">
						<text>全部积分</text>
					</view>
					<view class="center yellow">
						<text>{{my_trade_points}}</text>
					</view>
				</view>
			</view>
			<view class="pt-20">
				<button type="primary" @click="submit()">确认兑换</button>
			</view>
		</uni-card>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				max:0,
				detail_data:{
					trade_points:30,
					num:0
				},
				exc_num:0,
				my_trade_points:130
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
		
		onShow (data) {
			this.getDetail();
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
		},
		methods: {
			getDetail() {
				
				this.max = Math.floor(this.my_trade_points / this.detail_data.trade_points)

			},
			allNum() {
				console.log('allnum :', this.exc_num);
				this.exc_num = this.max;
			},
			changeNum(num) {
				this.exc_num = num;
			},
			submit () {
				console.log(this.exc_num);
				// uni.showLoading({
				//     title: '加载中',
				// 	mask:true
				// });
				// setTimeout(()=>{
				// 	uni.hideLoading();
				// 	uni.navigateBack();
				// },1000)
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
		width: 180rpx;
		background-color: #EF8A46;
		margin-left: 10rpx;
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
	.num-wrap {
		overflow: hidden;
	}
	.num-wrap {
		
	}
</style>
