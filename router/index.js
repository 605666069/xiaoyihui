import Vue from 'vue'
import $router, { $route } from '@/common/uni_router.js'
import util from "@/common/util.js"

$router.beforeEach = (to, next) => { // 注册全局前置守卫

    console.log('全局前置守卫', to)
	if((JSON.stringify(util.login_data) == "{}"||!util.login_data)&&!to.path.includes('/mylogin/index')) {
		next(vm => {
            vm.push('/pages/mylogin/index')
        });
		
	}
    next();
}

$router.afterEach = to => { // 注册一个全局后置守卫
 console.log('全局后置守卫', to)
}

export default $router