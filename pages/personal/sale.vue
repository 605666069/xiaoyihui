<template>
	<view class="content">
		<view class="my-card">
			<view class="nav mini-segmented ">
				<uni-segmented-control :current="tab" :values="items" @clickItem="changeTab" style-type="button" active-color="#3CCAA7"></uni-segmented-control>
			</view>
			<view >
				<view v-show="tab === 0">
					<view class="" v-for="(d,index) in task_list" :key="d.task_info.task_tid">
						<view class="uni-flex uni-row  btn-list ">
							<view class="uni-flex icon my-center">
								<image :src="d.product_info.product_pic" mode="" class="iamge"></image>
							</view>
							<view class="uni-flex text">
								<view class="title uni-flex ">
									<text  class="title-left  text-bottom text-overflow">{{d.product_info.product_name}}</text>
									<button class="mini-btn" :type="d.task_info.task_status=='1'?'primary':'default'" size="mini" @click="verifyTask(d,index)">
										{{	
											(d.task_info.task_status=='1'&&'处理')||
											(d.task_info.task_status=='2'&&'已处理')||
											''
										}}
									</button>
								</view>
								<view class="uni-flex">
									<view  class="text-line">
										<rich-text :nodes="d.product_info.product_detail"></rich-text>
									</view>
								</view>
								
								<view class="uni-flex">
									<text  class="text-line text-address"> {{d.buyer_user_info.realname||''}} {{d.buyer_user_info.hospital_name||''}} {{d.buyer_user_info.phone}} </text>
								</view>
								<view class="uni-flex">
									<text  class="text-line"> 下单量：<text class="yellow">{{d.task_info.task_num}}</text>{{d.product_info.product_unit||''}}</text>
								</view>
								<view class="uni-flex text-time">
									<text  class="text-line">{{d.task_info.create_time}}</text>
								</view>
							</view>
							
						</view>
						<view class="my-divider"></view>
						
					</view>
					<uni-load-more :status="status"  :icon-size="12" v-if="task_list.length >= 10"/>
				</view>
				<view v-show="tab === 1">
					<view v-for="(d,index) in user_list" :key="d.user_id">
						<view class="uni-flex my-space-between">
							<view class="">
								<view class="fz-30">
									{{d.realname||''}}
								</view>
								<view class="">
									{{d.hospital_name||''}}
								</view>
							</view>
							<view class="uni-flex">
								<text class=" center text-right">{{d.phone||''}}</text>
							</view>
						</view>
						<view class="my-divider"></view>
					</view>
					<uni-load-more :status="status"  :icon-size="12" v-if="user_list.length >= 10"/>
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
				tab:0,
				page:1,
				rows:10,
				task_list:[],
				user_list:[],
				status:"more",
				total:0
			}
		},
		beforeMount() {
			this.changeTab({
				currentIndex:this.tab
			});
		},
		components:{
			uniSegmentedControl
		},
		
		
		methods: {
			getTaskList(isReset) {
				//数据饱和不再进行调用
				if(this.status == 'noMore'&&!isReset) return;
				//重置数据
				if(isReset) {
					this.resetPage();
					this.task_list = [];
					 
				} else {
					this.page++;
					this.changeStatus('loading');
				}
				this.$ajax.post('Home/get_task_list',{data: {
					param:{
						sales_user_id:this.util.login_data.user_id,
						page:this.page,
						rows:this.rows
					}
				}}).then((result)=>{
					this.$set(this,'total',result.total);
					//无数据返回则重置状态
					if (this.total != 0 && this.task_list.length >= this.total ) {
						this.status = 'noMore';
						this.page -- ;
						return;
					}
					let new_list = [];
					new_list = this.task_list.concat(result.task_list);
					this.$set(this,'task_list',new_list);
					this.changeStatus();
					
				})
			},
			getUserList(isReset) {
				//数据饱和不再进行调用
				if(this.status == 'noMore'&&!isReset) return;
				//重置数据
				if(isReset) {
					this.resetPage();
					this.user_list = [];
					 
				} else {
					this.page++;
					this.changeStatus('loading');
				}
				this.$ajax.post('Home/get_user_list',{data: {
					param:{
						my_saler_id:this.util.login_data.user_id,
						page:this.page,
						rows:this.rows
					}
				}}).then((result)=>{
					this.$set(this,'total',result.total);
					//无数据返回则重置状态
					if (this.total != 0 && this.user_list.length >= this.total ) {
						this.status = 'noMore';
						this.page -- ;
						return;
					}
					let new_list = [];
					new_list = this.user_list.concat(result.user_list);
					this.$set(this,'user_list',new_list);
					this.changeStatus();
					
				})
			},
			changeTab(res) {
				this.tab = res.currentIndex;
				this.switchList(true);
			
			},
			switchList(isReset) {
				if(this.tab==0) {
					this.getTaskList(isReset);
				}
				if(this.tab==1) {
					this.getUserList(isReset)
				}
				
			},
			resetPage() {
				this.page = 1;
			},
			changeStatus (status) {
				this.status = status||'more';
			},
			verifyTask(data,index) {
				if (data.task_info.task_status!='1') return;
				this.$ajax.post('Admin/verify_task_info',{data: {
					param:{
						task_status:2,
						task_tid:data.task_info.task_tid
					}
				}}).then((result)=>{
					this.$set(this.task_list,index,result);
					
				})
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
