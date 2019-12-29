<template>
	<view class="content">
		<view class="example-body">
			<uni-search-bar @confirm="search" radius="100" clearButton="always" @input="input" @cancel="cancel"  fgColor="#ededed" bgColor="#3CCAA7" />
		</view>

		
		<view class="card-list">
			<uni-card  :is-shadow="true" @click="toDetail()" v-for="d in list">
				<view class="">
					<view class="uni-flex uni-row  btn-list ">
						<view class="uni-flex icon my-center">
							<image src="../../static/uni.png" mode="" class="iamge"></image>
						</view>
						<view class="uni-flex text">
							<view class="title uni-flex ">
								<text  class="title-left text-overflow">阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片</text>
								<text  class="title-right text-overflow">剩余 <text class="yellow"> 100 </text> 箱</text>
							</view>
							<view class="uni-flex">
								<text  class="text-line">【阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片
								阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片阿司匹林肠溶片</text>
							</view>
							
							<button class="mini-btn" type="primary" size="mini">下单</button>
						</view>
						
					</view>
				</view>
			</uni-card>
			<uni-load-more :status="status"  :icon-size="12" v-show="list.length >= 10"/>
			
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
				list:[1,2,3,4,5,6,7,8,9,10],
				search_data:{
					search_key:'',
					page:1,
					rows:10
				}
			}
		},
		components: {
			uniSearchBar,
			uniSection
		},
		onLoad() {
			console.log('load');
		},
		onPullDownRefresh() {
			
		},
		onShow() {
			this.getList();
		},
		onReachBottom() {
			console.log(22222)
			this.changeStatus('loading');
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
			getList(res) {
				if(!res&&this.status == 'noMore') return;
				if(res) {
					this.resetPage();
					this.search_data.search_key = res.value
				}
				let data = {
					param:this.search_data
				}
				this.$ajax.post('home/get_product_list',{data: data}).then((result)=>{
					console.log(result)
					
				});
				// let _this = this;
				// let result = [];
				// setTimeout(()=>{
				// 	_this.changeStatus();
				// },1000);
				
				
				
				console.log(this.status)
			},
			resetPage () {
				this.search_data.page = 1;
				this.search_data.rows = 10;
				this.changeStatus();
				
			},
			changeStatus (status) {
				this.status = status||'more';
			},
			toDetail(res) {
				let detail = {
					id:1
				}
				uni.navigateTo({
					url: '/pages/product-detail/index?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
			}
	
		}
	}
	
</script>

<style scoped>
	.example-body {
		position: fixed;
		top: 0;
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
