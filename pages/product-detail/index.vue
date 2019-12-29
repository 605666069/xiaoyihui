<template>
	<view class="content" id="content">
		<uni-card  :is-shadow="true" class="card">
			<view class="">
				<view class="uni-flex uni-row  btn-list ">
					<view class="uni-flex icon my-center">
						<image :src="product_detail.product_pic" mode="" class="iamge my-border"></image>
					</view>
					<view class="uni-flex text">
						<view class="title uni-flex ">
							<text  class="title-left">{{product_detail.product_name||''}}</text>
						</view>
						<view class="uni-flex">
							<view  class="text-line">
								<rich-text :nodes="product_detail.product_detail"></rich-text>
							</view>
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
					<uni-number-box id="min-numbox" :max="total_num" @change="changeTaskNum"></uni-number-box>
					<view class="">
						<text >剩余 <text class="yellow"> {{total_num}} </text> 箱</text>
					</view>
				</view>
				<view class="right-main">
					<view  class="main-title">
						<text>获取积分</text>
					</view>
					<view class="center yellow">
						<text>{{product_detail.product_points||0}}</text>
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
				product_id:0,
				product_detail:{
					
				},
				total_num:0,
				task_num:0
			}
		},
		onShow() {
			let product_detail = this.$router.route.query.product_detail ||{}
			this.product_id = product_detail.product_id || 0
			this.getDetail();
		},
		onLoad(data) {
			
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
		},
		methods: {
			changeTaskNum(num) {
				this.task_num = num;
			},
			getDetail() {
				this.$ajax.post('home/get_product_list',{data: {
					param:{
						product_id:this.product_id
					}
				}}).then((result)=>{
					this.product_detail = result.product_list[0]||{};
					this.total_num =  this.product_detail.product_num;
				});
			},
			submit () {
			
				uni.showLoading();
				this.$ajax.post('Home/add_task_info',{data: {
					param:{
						task_num:this.task_num,
						product_id:this.product_detail.product_id,
						buyer_user_id:this.util.login_data.user_id
					}
				}}).then((result)=>{
					this.util.msg('产品下单成功');
					let product_detail = result.product_info;
					this.$eventHub.$emit('product_detail',product_detail);
					uni.navigateBack();
				});
				
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
