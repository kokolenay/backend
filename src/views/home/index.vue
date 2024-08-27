<template>
	<el-container>
		<el-aside :width="isCollapse?'64px':'200px'">
			<el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
				:collapse="isCollapse" unique-opened :collapse-transition="collapse-transition" router>
				<div class="system-title">
					<img src="../../assets/logo-workspace.1d5ca1b8.png" />
				</div>
				<el-menu-item index="/welcome">
					<i class="el-icon-s-home"></i>
					<span slot="title">首页</span>
				</el-menu-item>

				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-setting"></i>
						<span slot="title">系统管理</span>
					</template>
					<el-menu-item index="/users">用户管理</el-menu-item>
					<el-menu-item index="/classes">课程管理</el-menu-item>
					<el-menu-item index="/notice">通知管理</el-menu-item>
				</el-submenu>
				<el-menu-item index="/email">
					<i class="el-icon-s-home"></i>
					<span slot="title">邮件通知</span>
				</el-menu-item>
				<el-menu-item index="/data" @click="toDate('http://127.0.0.1:5500/index.html')">
					<i class="el-icon-s-data"></i>
					<span slot="title">数据分析</span>
				</el-menu-item>
			</el-menu>
		</el-aside>
		<el-container class="inner-container">
			<el-header>
				<!-- 折叠按钮 -->
				<div class="collapse">
					<div class="toggle-button" @click="collapse()">
						<i v-if="isCollapse" class="el-icon-s-unfold"></i>
						<i v-if="!isCollapse" class="el-icon-s-fold"></i>
					</div>
				</div>
				<p class="subtitle">新生入学管理平台</p>
				<div class="user">
					<div class="avatar">
						<img src="../../assets/u169.svg" />
					</div>
					<el-dropdown placement="top">
						<span class="el-dropdown-link">
							{{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<router-link to="/person" tag="div">
								<el-dropdown-item>个人中心</el-dropdown-item>
							</router-link>
							<router-link to="/" tag="div">
								<el-dropdown-item>退出登录</el-dropdown-item>
							</router-link>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-header>
			<el-main>
				<!-- 面包屑 -->
				<div class="breadcrumb">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<!-- 引入router-view -->
				<router-view></router-view>
			</el-main>
			<!-- 脚注部分 -->
			<el-footer>
				<p>版权所有&copy;重庆大学</p>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false,
				title: true,
				userInfo:{

				}
			}
		},
		mounted() {
			this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		},
		methods: {
			collapse() {
				this.isCollapse = !this.isCollapse
				if (this.isCollapse) {
					this.isCollapse = true;
					this.title = false;
				} else {
					this.title = true;
				}
			},

			handleClose() {
				console.log()
			},
			handleOpen() {

			},
			sideWidth() {

			},
			exit(){
				this.$router.push('/');
			},
			toDate(url) {
				window.location.href = url;
			}
		}
	}
</script>

<style scoped>
	/* 头部和脚注 */

	.el-footer {
		background-color: #fefdf9;
		color: #333;
		text-align: center;
		line-height: 35px;
		height: 35px !important;
	}

	/* 左侧菜单 */
	.el-aside {
		background-color: #fff;
		color: #333;
		line-height: 200px;
		/* 隐藏溢出部分内容 */
		overflow: hidden;
	}

	/* 系统标题 */
	.system-title {
		background-color: rgb(0, 82, 168);
		font-size: 20px;
		color: #ffffff;
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-weight: bold;
		text-indent: 40px;
	}

	/* logo */
	.system-title img {
		width: 150px;
		position: absolute;
		top: 4px;
		left: 20px;
	}

	/* 鼠标经过 */
	.el-submenu>.el-submenu__title:hover {
		color: #409eff !important;
	}

	/* icon图标也跟着变 */
	.el-submenu>.el-submenu__title:hover i {
		color: #409eff !important;
	}

	/* 激活状态文字 */
	.el-submenu.is-active>.el-submenu__title {
		color: #409eff !important;
	}

	/* icon图标也跟着变 */
	.el-submenu.is-active>.el-submenu__title i {
		color: #409eff !important;
	}

	.el-submenu__title:hover {
		background: rgb(230, 247, 255) !important;

	}

	.el-menu-item:hover {
		background: rgb(230, 247, 255) !important;
		color: #1890ff !important;
	}

	/* 二级菜单文字缩进10像素 */
	.el-submenu .el-menu-item {
		text-indent: 10px;
	}

	.el-header {
		background-color: rgb(242, 243, 245);
		color: #333;
		line-height: 60px;
		display: flex;
	}

	.toggle-button {
		width: 30px;
		height: 30px;
		cursor: pointer;
		font-size: 22px;
		margin-left: -15px;
	}

	.subtitle {
		font-weight: 600;
		flex: 1;
	}

	.user {
		display: flex;
	}

	.user img {
		width: 40px;
		margin-top: 10px;
	}

	.el-dropdown-menu {
		margin-top: -5px;
	}

	.el-dropdown-link {
		margin-left: 10px;
		cursor: pointer;
		color: #8f0100;
	}

	/* 主体部分 */
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		padding: 0;
	}

	/* 面包屑样式 */
	.breadcrumb {
		width: 100%;
		height: 25px;
		background: #fff;
	}

	.el-breadcrumb {
		line-height: 25px;
		margin-left: 10px;
		color: #eeeeee;
		font-size: 13px;
	}


	/* 内部容器 */
	.inner-container {
		height: 100vh;
		/* //vh：视窗高度的百分比 */
	}

	
</style>
