import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: "/",
		name: '用户登录',
		component: () => import('../views/login')
	},
	{
		path: "/home",
		name: '首页',
		redirect: '/welcome',
		component: () => import('../views/home'),
		children:[
			{
				path:'/welcome',
				name:'欢迎页面',
				component:() => import('../views/welcome')
			},
			{
				path:'/users',
				name:'学院管理',
				component:() => import('../views/users'),
				meta:{
					title:'用户管理'
				}
			},
			{
				path:'/notice',
				name:'学院管理',
				component:() => import('../views/notice'),
				meta:{
					title:'通知管理'
				}
			},
			{
				path:'/email',
				name:'学院管理',
				component:() => import('../views/email'),
				meta:{
					title:'邮件通知'
				}
			},
			{
				path:'/data',
				name:'数据分析',
				component:() => import('../views/data'),
				meta:{
					title:'数据分析'
				}
			},
			{
				path:'/person',
				name:'个人中心',
				component:() => import('../views/person'),
				meta:{
					title:'个人中心'
				}
			},
			{
				path:'/classes',
				name:'课程管理',
				component:() => import('../views/classes'),
				meta:{
					title:'课程管理'
				}
			},
		]
	},

]
const router = new VueRouter({
	routes
})

export default router
