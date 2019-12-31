<template>
	<view class="content" id="content">
		<uni-card  :is-shadow="true" class="card">
			<view class="">
				<view class="uni-flex uni-row  btn-list ">
					<view class="img-wrap "  :style="{ backgroundImage: 'url('+ shop_detail.trade_pic+ ')'}"  >
						
					</view>
					<view class="uni-flex text">
						<view class="title uni-flex ">
							<text  class="title-left">{{shop_detail.trade_name}}</text>
						</view>
						<view class="uni-flex">
							<text  class="text-line">{{shop_detail.trade_desc}} </text>
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
						<text >剩余 <text class="yellow"> {{shop_detail.trade_num}} </text> </text>
					</view>
					
				</view>
				<view class="right-main">
					<view  class="main-title">
						<text>全部积分</text>
					</view>
					<view class="center yellow">
						<text>{{user_points}}</text>
					</view>
				</view>
			</view>
			<!-- - type 用户类型：1超级管理员，2业务员，3.客户 -->
			<view class="pt-20" v-if="user_type!=2">
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
				trade_id:0,
				exc_num:0,
				user_points:this.util.login_data.points||0,
				shop_id:0,
				shop_detail:{
					trade_pic:''
				},
				user_type:this.util.login_data.type||0,
				
			}
		},
		onLoad(data) {
			
		},
		
		
		onShow (data) {
			
			this.trade_id = this.$router.route.query.shop_detail.trade_id ||{};
			this.getDetail();
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
		},
		methods: {
			getDetail() {
				this.$ajax.post('home/get_trade_list',{data: {
					param:{
						trade_id:this.trade_id
					}
				}}).then((result)=>{
					this.shop_detail = result.trade_list[0]||{};
					this.getMax();
				});
			},
			getMax() {
				//用户可兑换最大值
				let user_max = Math.floor(this.user_points / this.shop_detail.trade_points);
			
				this.max = (user_max >= this.shop_detail.trade_num)?this.shop_detail.trade_num:user_max;
				
			},
			allNum() {
				this.exc_num = this.max;
			},
			changeNum(num) {
				this.exc_num = num;
			},
			submit () {
				if(!this.exc_num) {
					this.util.msg('请输入数量后点击兑换');
					return;
				}
				uni.showLoading({
					mask:true
				});
				this.$ajax.post('Home/add_exc_info',{data: {
					param:{
						exc_user_id:this.util.login_data.user_id,
						exc_num:this.exc_num,
						trade_id:this.shop_detail.trade_id
					}
				}}).then((result)=>{
					this.util.getLoginData(this.$ajax);
					
					let shop_detail = result.trade_info;
					this.$eventHub.$emit('shop_detail',shop_detail);
					uni.navigateBack();
					this.util.msg('积分兑换成功');
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
	.img-wrap {
		border: 1px solid #CDCDCD;
		width: 260rpx;
		height: 260rpx;
		background-size: 100% auto;
		
	}
</style>
