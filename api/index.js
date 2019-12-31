import util from "@/common/util.js"
import request from "@/common/request.js"
import $router from "@/router/index.js"

// 全局配置
request.setConfig({
	baseUrl: util.config.api_url, // 此为测试地址，需加入到域名白名单，或者更改为您自己的线上地址即可
	dataType: 'json', // 可删除，默认为json
	responseType: 'text', // 可删除，默认为text
	// 设置请求头，支持所有请求头设置，也可不设置，去掉header就行
	header: {
		'token': 'token from global',
		'content-type': 'application/json'
	}
})

// 设置请求拦截器
request.interceptors.request(config => {
	if(config.data&&config.data.param) config.data.param.token_access = util.login_data&&util.login_data.token_access;
  // 配置参数和全局配置相同，此优先级最高，会覆盖在其他地方的相同配置参数

  // 追加请求头，推荐
  // config.header['content-type'] = 'application/json';
  // config.header.token = 'token from interceptors';

  // 覆盖请求头
  // config.header = {
    // 'content-type': 'application/json',
    // 'token': 'token from interceptors'
  // }

  // return false; // 终止请求
  // return Promise.reject('error from request interceptors'); // 向外层抛出错误，用catch捕获
  return config; // 返回修改后的配置，如未修改也需添加这行
})

// 设置响应拦截器
request.interceptors.response(res => {
	
	
	uni.hideLoading();
	const data = res.data||{};
	
	
	if(data.code == 90001) {
		//重新登录
		util.msg(data.msg);
		uni.removeStorageSync('login_data');
		$router.reLaunch('/pages/mylogin/index');
		return Promise.reject(data.msg);
	}
	if(data.code != 10000) {
		util.msg(data.msg);
		return Promise.reject(data.msg);
	}
	
	return data.data; //统一输入
  

  // return false;    // 阻止返回,页面不会接收返回值
  // return {message: '自定义值，来自拦截器'};   // 返回您自定义的值，将覆盖原始返回值
  // return Promise.reject('error from response interceptors') // 向外层抛出错误，用catch捕获
},(err)=>{ 
	uni.hideLoading();
	if (err && err.response) {
	    switch (err.response.status) {
	      	case 400:
	        	util.msg('请求错误')
	        break
	    	case 403:
	      		util.msg('拒绝访问')
	        break
	      case 404:
	        	util.msg('请求地址出错') 
	        break
	      case 408:
	      		util.msg('请求超时') 
	        break
	      case 500:
	      		util.msg('服务器内部错误') 
	        break
	      case 501:
	     	util.msg('服务未实现') 
	        break
	      case 502:
	     	util.msg('网关错误') 
	        break
	      case 503:
	      	util.msg('服务不可用') 
	        break
	      case 504:
	      	util.msg('网关超时') 
	        break
	      case 505:
	      	util.msg('HTTP版本不受支持') 
	        break;
	      default:
	    }
  	}
	store.state.loading = false;
  	return Promise.reject(err)
})

export default request