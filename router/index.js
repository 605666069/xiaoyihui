
import $router, { $route } from '@/common/uni_router.js'
import util from "@/common/util.js"
$router.beforeEach = (to, next) => { // 注册全局前置守卫

    console.log('全局前置守卫', to)
	if((JSON.stringify(util.login_data) == "{}"||!util.login_data)&&!to.path.includes('/mylogin/index')) {
		console.log(util.login_data)
		next(vm => {
            vm.push('/pages/mylogin/index')
        });
		
	}
    next();
}

$router.afterEach = to => { 
}

export default $router