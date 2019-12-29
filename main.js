import Vue from 'vue'
import App from './App'
// import uLink from '@/components/uLink.vue'

Vue.config.productionTip = true
App.mpType = 'app'


import uniCard from '@/components/uni-card/uni-card.vue'
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
// import xflSelect from '@/common/xfl-select.vue'
import uniPopup from "@/components/uni-popup/uni-popup.vue"
import util from "@/common/util.js"

Vue.prototype.util = util
Vue.component('uniCard', uniCard)
Vue.component('uniLoadMore', uniLoadMore)
Vue.component('uniNumberBox', uniNumberBox)
// Vue.component('uLink', uLink)
// Vue.component('xflSelect', xflSelect)
Vue.component('uniPopup', uniPopup)


//路由拦截
import $router from "@/router/index.js"
Vue.prototype.$router = $router

//网络拦截
import request from "@/api/index.js"
Vue.prototype.$ajax = request;

Vue.prototype.$eventHub = new Vue();


const app = new Vue({
	...App
})
app.$mount()
