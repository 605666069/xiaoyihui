<template>
	<view class="content">
		<view class="card-wrap">
			<view class="my-card box" v-for="(d,index) in shop_list" :key="d.trade_id">
				<view class="img-wrap" :style="{ backgroundImage: 'url('+ d.trade_pic+ ')'}" >
				</view>
				<view class="uni-flex my-space-between">
					<view class="box-title">
						{{d.trade_name}}
					</view>
					<view class="">
						剩余<text class="yellow">{{d.trade_num}}</text>
					</view>
					
				</view>
				<view class="msg">
					{{d.trade_desc}}
				</view>
				<view class="uni-flex my-space-between">
					<view class="mini-text">
						<text class="fz-20">积分</text><text class="green">{{d.trade_points}}</text>
					</view>
					<view class="box-btn">
						<button type="primary"  size="mini" class="main-btn" @click="toDetail(d,index)">兑换</button>
					</view>
				</view>
				
			</view>
			
		</view>
		<uni-load-more :status="status"  :icon-size="12" v-if="shop_list.length >= 10"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop_list:[],
				index:0,
				status: 'more',
				search_data:{
					// - trade_status 商品状态：1上架，2下架
					trade_status:1,
					page:1,
					rows:10
				},
				total:0
			}
		},
		
		onShow() {
			this.getShopList(true)
		},
		onLoad() {
	
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
			this.getShopList()
		},
		methods: {
			getShopList(isReset) {
				//数据饱和不再进行调用
				if(this.status == 'noMore'&&!isReset) return;
				//重置数据
				if(isReset) {
					this.resetPage();
					this.shop_list = [];
					 
				} else {
					this.search_data.page++;
					this.changeStatus('loading');
				}
				
				
				let data = {
					param:this.search_data
				}
				this.$ajax.post('Home/get_trade_list',{data: data}).then((result)=>{
					
					this.$set(this,'total',result.total);
					//无数据返回则重置状态
					if (this.total != 0 && this.shop_list.length >= this.total ) {
						this.status = 'noMore';
						this.search_data.page -- ;
						return;
					}
					let new_list = [];
					new_list = this.shop_list.concat(result.trade_list);
					this.$set(this,'shop_list',new_list);
					this.changeStatus();
					
				})
					
				
				
				
			},
			resetPage () {
				this.search_data.page = 1;
				//重新搜索返回页面顶部
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				this.changeStatus();
				
			},
			changeStatus (status) {
				this.status = status||'more';
			},
			toDetail(res,index) {
				this.index = index;
				let _this = this;
				this.$eventHub.$on('shop_detail', function(data) {
					_this.$set(_this.shop_list,this.index ,data)
					
					
					//清除监听，不清除会消耗资源
					_this.$eventHub.$off('shop_detail');
				});
			
				this.$router.push("/pages/shop-detail/index",{
					shop_detail:res
				})
					
				
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
		margin-right: 10rpx;
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
