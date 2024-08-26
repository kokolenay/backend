import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* 引入axios库 */
import axios from 'axios'
Vue.prototype.axios = axios
//全局配置axios请求根路径
axios.defaults.baseURL='http://127.0.0.1:8081'

//引入echarts组件
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;

/* 引入Element ui组件 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
