<template>
	<view class="content">
		<view class="example-body">
			<uni-search-bar @confirm="getList" radius="100" @input="changeGetList" @cancel="cancel" clearButton="always"  fgColor="#ededed" bgColor="#3CCAA7" />
		</view>

		
		<view class="card-list">
			<uni-card  :is-shadow="true" @click="toDetail(d)" v-for="(d,index) in list" :key="d.product_id">
				<view class="">
					<view class="uni-flex uni-row  btn-list ">
						<view class="uni-flex icon my-center">
							<image :src="d.product_pic" mode="" class="iamge"></image>
						</view>
						<view class="uni-flex text">
							<view class="title uni-flex ">
								<text  class="title-left text-overflow" >{{d.product_name}}</text>
								<text  class="title-right text-overflow">剩余 <text class="yellow"> {{d.product_num}} </text> {{d.product_unit}}</text>
							</view>
							<view class="uni-flex">
								<view  class="text-line" >
									<rich-text :nodes="d.product_detail"></rich-text>
								</view>
							</view>
							
							<button class="mini-btn" type="primary" size="mini">下单</button>
						</view>
						
					</view>
				</view>
			</uni-card>
			<uni-load-more :status="status"  :icon-size="12" v-if="list.length >= 10"/>
			
		</view>
		
		
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import uniSection from '@/components/uni-section/uni-section.vue';
	export default {
		data() {
			return {
				searchVal: '',
				contentText:{
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				reload:false,
				status: 'more',
				last_id:'',
				list:[],
				search_data:{
					search_key:'',
					page:1,
					rows:10
				},
				total:0
			}
		},
		components: {
			uniSearchBar,
			uniSection
		},
		onLoad() {
			this.getList({value:this.search_data.search_key});
		},
		onPullDownRefresh() {
			
		},
		onShow() {
			
		},
		onReachBottom() {
			this.getList();
		},
		methods: {
			search (res) {
				
			},
			input (res) {
				this.searchVal = res.value;
			},
			cancel (res) {
				
			},
			onClick(res) {
				
			},
			changeGetList(res) {
				if(!res.value) this.getList(res);
			},
			
			getList(res) {
			
				if(!res) {
					//数据饱和不再进行调用
					if(this.status == 'noMore') return;
					//加载更多增加页码
					this.search_data.page++;
					this.changeStatus('loading');
				} else {
					//搜索重置页码
					this.resetPage();
					this.search_data.search_key = res.value
				}
				
				
				let data = {
					param:this.search_data
				}
				this.$ajax.post('home/get_product_list',{data: data}).then((result)=>{
					
					this.$set(this,'total',result.total);
					//无数据返回则重置状态
					if (this.total != 0 && this.list.length >= this.total ) {
						this.status = 'noMore';
						this.search_data.page -- ;
						return;
					}
					let new_list = [];
					if (this.status == 'loading') {
						//合并数据
						new_list = this.list.concat(result.product_list);
						this.changeStatus();
					} else {
						new_list = result.product_list
					}
					this.$set(this,'list',new_list);
					
				});
				
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
			toDetail(res) {
				let _this = this;
				this.$eventHub.$on('product_detail', function(data) {
					res.product_num = data.product_num;
					
					//清除监听，不清除会消耗资源
					_this.$eventHub.$off('product_detail');
				});

				this.$router.push("/pages/product-detail/index",{
					product_detail:res
				})
				
			}
	
		}
	}
	
</script>

<style scoped>
	.example-body {
		position: fixed;
		top: 0rpx;
		left: 0;
		right: 0;
		z-index: 2;
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
		line-height: 1.2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		
		
	}
	.mini-btn {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.text-bottom {
		width: 320rpx;
	}
</style>
