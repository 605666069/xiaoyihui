<template>
	<view class="content">
		<uni-card  :is-shadow="true" class="card">
			<view class="top uni-flex">
				<view class="left">
					<view class="name">
						{{login_data.realname||'无'}}
					</view>
					<view class="address">
						{{login_data.hospital_name||'无'}}
					</view>
				</view>
				<view class="left">
					<view class="top-text">
						我的积分
					</view>
					<view class="top-text yellow center">
						{{login_data.points||0}}
					</view>
				</view>
			</view>
			<view class="main">
				<image :src="licence_pic" mode="" @click="upload()" class="main-img"></image>
				<view class="btn-wrap">
					<button type="primary" @click="upload()" size="mini" class="main-btn">{{licence_pic?'重新上传':'上传资质'}} </button>
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
					<view class="" v-for="(d,index) in task_list" :key="d.task_info.task_tid">
						<view class="uni-flex uni-row  btn-list ">
							<view class="uni-flex icon my-center">
								<image :src="d.product_info.product_pic" mode="" class="iamge"></image>
							</view>
							<view class="uni-flex text">
								<view class="flex-1">
									<view class="title uni-flex ">
										<text  class="title-left text-overflow">{{d.product_info.product_name}}</text>
									</view>
									<view class="uni-flex">
										<view  class="text-line" >
											<rich-text :nodes="d.product_info.product_detail"></rich-text>
										</view>
									</view>
									
								</view>
								<view class="uni-flex">
									<view class="text-num ">
										<view class="">
											下单量
										</view>
										<view class="yellow">
											{{d.task_info.task_num}}
										</view>
									</view>
									
								</view>
							</view>
							
						</view>
						<view class="my-divider"></view>
					</view>
					<uni-load-more :status="status"  :icon-size="12" v-if="task_list.length >= 10"/>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				licence_pic: this.util.login_data.licence_pic?this.util.config.img_url + this.util.login_data.licence_pic:'',
				login_data:this.util.login_data,
				task_list:[],
				page:1,
				rows:10,
				status:"more",
				total:0
			}
		},
		created() {
			this.getTaskList(true)
		},
		onShow() {},
		onPullDownRefresh() {
		},
		onReachBottom() {
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
						buyer_user_id:this.util.login_data.user_id
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
			resetPage() {
				this.page = 1;
			},
			changeStatus (status) {
				this.status = status||'more';
			},
			
			upload() {
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						let _this = this;
				        uni.uploadFile({
				            url:  _this.util.config.api_url + '/upload/upload_file', 
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                token_access:_this.util.login_data.token_access
				            },
				            success: (uploadFileRes) => {
								let licence_pic = '';
								try{
									licence_pic = JSON.parse(uploadFileRes.data).data.file.save_url;
								}catch(e){
									licence_pic = ''
								}
								
								_this.$ajax.post('Home/edit_user_info',{data: {
									param:{
										user_id:_this.util.login_data.user_id,
										licence_pic:licence_pic
									}
								}}).then((res)=>{
									_this.licence_pic = _this.util.config.img_url + res.licence_pic;
									_this.$forceUpdate();
								})
								 
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
