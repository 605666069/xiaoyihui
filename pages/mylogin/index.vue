<template>
	<view class="content">
		<view class="banner"></view>
		<view class="center">
			<image src="../../static/logo.png" mode="" class="logo"></image>
		</view>
		<view class="register" v-show="tab==1">
			<view class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<input class="uni-input" focus placeholder="姓名" v-model="register_data.realname"/>
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input"  placeholder="所在医院" v-model="register_data.hospital_name"/>
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input"  type="number"  placeholder="手机号"  v-model="register_data.phone"/>
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input"  placeholder="密码" v-model="register_data.password" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						关联业务员
					</view>
					
					<picker @change="selectID" :value="index" :range="list" range-key="realname" class="my-border">
						<view class="uni-input">{{list[index].realname}} ({{list[index].user_id}})</view>
					</picker>
					
				</view>
				
			</view>
			<view class="bottom">
				<view class="uni-common-mt pt-20">
					<button type="primary" @click="register()">注册</button>
				</view>
			</view>
			
		</view>
		<view class="login" v-show="tab==0">
			<view class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<input class="uni-input" focus  type="number"  placeholder="手机号" v-model="login_data.username" />
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input" password  placeholder="密码"  v-model="login_data.password" />
				</view>
			</view>
			
			<view class="bottom">
				<view class="uni-common-mt pt-20">
					<button type="primary" @click="login()">登录</button>
				</view>
				<view class="text-box">
					没有账号？<text class="text" @click="changeTab(1)">免费注册</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				
				login_data:{
					username:'',
					password:''
				},
				register_data:{
					my_saler_id:'',
					realname:'',
					hospital_name:'',
					phone:'',
					password:''
				
				},
				tab:0,
				index:0
			}
		},
		onLoad() {
			this.getSellerList();
	
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
		},
		methods: {
			getSellerList () {
				this.$ajax.post('login/get_seller_list').then((data)=>{
					this.list = data;
					this.register_data.my_saler_id = this.list[this.index].user_id;
					
				});
			},
			login (param) {
				if(!param&&!this.checkLogin()) return;
				let data = {
					param:param||this.login_data
				}
				uni.showLoading();
				this.$ajax.post('Login/do_login',{data: data}).then((res)=>{
					uni.setStorageSync('login_data',res);
					this.util.login_data = res;
					this.$router.reLaunch('/pages/index/index');
					
				})
			},
			checkLogin() {
				
				if(!this.login_data.username) {
					this.util.msg('请填写账号');
					return false;
				}
				if(!this.login_data.password) {
					this.util.msg('请填写账号');
					return false;
				}
				return true;
			},
			
			changeTab(tab) {
				this.tab = tab;
			},
			register() {
				
				if(!this.checkRegister()) return;
				let data = {
					param:this.register_data
				}
				this.$ajax.post('login/register',{data: data}).then((res)=>{
					this.login({
						username:this.register_data.phone,
						password:this.register_data.password
					})
					
				})
				
			},
			checkRegister () {
				
				if(!this.register_data.realname) {
					this.util.msg('请填写姓名');
					return false;
				}
				if(!this.register_data.hospital_name) {
					this.util.msg('请填写所在医院');
					return false;
				}
				if(!this.register_data.phone) {
					this.util.msg('请填写手机号');
					return false;
				}
				if(!this.register_data.password) {
					this.util.msg('请填写密码');
					return false;
				}
				if(!this.register_data.my_saler_id) {
					this.util.msg('请选择业务员');
					return false;
				}
				
				return true;
			},
			selectID(e) {
				this.index = e.target.value;
				this.register_data.my_saler_id = this.list[this.index].user_id;
			}
	
		}
	}
</script>

<style scoped>
	.content {
		background-color: #FFFFFF;
	}
	.banner {
		background-color: #3CCAA7;
		height: 16rpx;
	}
	.logo {
		width: 148rpx;
		height: 148rpx;
		margin-top: 75rpx;
	}
	.uni-common-mt {
		width: 80%;
		margin: 0 auto;
	}
	input,select {
		border: 1px solid #BFBFBF;
		font-size: 26rpx;
		height: 20rpx;
		
	}
	
	.content >>> .show-box {
		border-radius: 0;
	}
	.title {
		font-size: 32rpx;
		margin-top: 20rpx;
	}
	.text-box {
		font-size: 24rpx;
		text-align: center;
		padding-top: 20rpx;
	}
	.text {
		color: #3EAEDC;
	}
</style>
