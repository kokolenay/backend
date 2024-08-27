<template>
	<!-- 主体区域 -->
	<div class="section">
		<el-row gutter="10" style="flex-wrap: wrap; flex-direction: row">
			<!-- 个人信息 -->
			<el-col :span="7">
				<el-card class="box-card person">
					<div slot="header" class="clearfix">
						<span>个人信息</span>
						<el-button style="float: right; padding: 3px 0" type="text">...</el-button>
					</div>
					<img src="../../assets/u169.svg" />
					<div class="person_msg">
					<ul class="per_msg_content">
						<li>姓名: {{ userInfo.username }}</li>
						<li>工号: 00{{ userInfo.id }}</li>
						<li >学院: 计算机学院</li>
						<li>上次登录时间: 2024-08-25</li>
						<li>上次登录IP: 192.168.73.100</li>
					</ul>
					</div>
				</el-card>
			</el-col>
			<!-- 快捷入口 -->
			<el-col :span="17">
				<el-card class="box-card quick">
					<div slot="header" class="clearfix">
						<span>快捷入口</span>
						<el-button style="float: right; padding: 3px 0" type="text">...</el-button>
					</div>
					<ul>
						<router-link to="/users">
							<li>
								<img src="../../assets/icon/用户管理.png"/>
							<span class="text">用户管理</span>
						</li>
						</router-link>
						<router-link to="/classes">
							<li>
								<img src="../../assets/icon/作品管理.png"/>
							<span class="text">课程管理</span>
						</li>
						</router-link>
						<router-link to="/notice">
							<li >
								<img src="../../assets/icon/资讯专区.png" />
								<span class="text">通知公告</span>
							</li>
						</router-link>
						<router-link to="/email">
							<li >
								<img src="../../assets/icon/电脑.png" />
								<span class="text">邮件通知</span>
							</li>
						</router-link>
							<li  @click="toDate('http://127.0.0.1:5500/index.html')">
								<img src="../../assets/icon/报表统计.png" />
								<span class="text">数据统计</span>
							</li>
					</ul>
				</el-card>
			</el-col><!-- 快捷菜单end -->
	
			<!-- 日历信息 -->
			<el-col :span="7" style="margin-top: 10px;">
				<div>
					<el-card class="box-card calendar">
						<div slot="header" class="clearfix">
							<span>今日日程</span>
							<el-button style="float: right; padding: 3px 0" type="text">...</el-button>
						</div>
						<el-calendar v-model="value" style="margin-top: -20px;"></el-calendar>
					</el-card>
				</div>
			</el-col>
			<!-- 通知公告 -->
			<el-col :span="17" style="margin-top: 10px;">
				<el-card class="box-card notice">
					<div slot="header" class="clearfix">
						<span>通知公告</span>
						<router-link to="/notice">
							<el-button style="float: right; padding: 3px 0" type="text" >查看更多</el-button>
						</router-link>
					</div>
					<div class="text">
						<ul>
						<li v-for="(item, index) in tableData.slice(0, 8)" :key="index">
							<span>{{ item.title }}</span>
							<span>{{ new Date(item.date).toISOString().split('T')[0] }}</span>
						</li>
					</ul>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tableData:[],
				userInfo:{
				}
			}
		},
		mounted() {
			this.handleQuery();
			this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		},
		methods: {
			/* 查询所有用户信息 */
			handleQuery() {
				this.axios.get('/api/notice')
				.then((res) => {
					if (res.data.code == 200) {
					// 返回通知用户列表
						this.tableData = res.data.data;
					} else {
					console.error('请求失败，错误消息:', res.data.msg);
					}
				})
				.catch((error) => {
					console.error('请求失败', error);
				});
			},
			toDate(url) {
				window.location.href = url;
			}

		}
	}
</script>

<style scoped>
	/* 主体部分 */
	.section {
		height: 96%;
		width: 100%;
		display: flex;
	}
	
	.el-row {
		padding: 10px;
		width: 100%;
	
	}
	
	.box-card {
		width: 100%;
		position: relative;
		height: 260px;
	}
	
	.el-card__header {
		padding: 10px 10px;
		font-size: 14px;
	}
	
	.person img {
		width: 130px;
		margin-top: 15px;
	}
	
	.person ul {
		position: absolute;
		top: 60px;
		left: 45%;
	}
	
	.person ul li {
		padding: 0;
		line-height: 30px;
		list-style: none;
		font-size: 13px;
		color: #2f2f2f;
	}
	
	/* 快捷入口样式 */
	.quick ul {
		margin: -25px;
	
	}
	
	.quick ul li {
		list-style: none;
		margin-left: 28px;
		margin-top: 25px;
		width: 70px;
		height: 70px;
		position: relative;
		cursor: pointer;
		float: left;
	}
	
	.quick ul li img {
		width: 100%;
		height: 70px;
	}
	
	.quick .text {
		position: relative;
		margin: 20px 10px;
		font-size: 12px;
		bottom: 5px;
	}
	
	/* 日历样式 */
	.calendar {
		width: 100%;
		height: 424px;
	
	}
	
	/* 日期样式 */
	/deep/.el-calendar-day {
		height: 40px !important;
		width: 40px !important;
		border: none;
		text-align: center;
		line-height: 20px;
		align-items: center;
		padding: 0;
		font-size: 12px;
	}
	
	/* 日期标题 */
	/deep/.el-calendar__title {
		color: #626262;
		font-size: 13px;
	}
	
	/* 星期标题 */
	/deep/.el-calendar-table th {
		font-size: 13px;
	}
	
	.el-calendar__body {
		padding: 0px;
	}
	
	/* 通知公告样式 */
	.notice{
		height: 100%;
	}
	.notice ul li {
		list-style: none;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px dashed gray;
		font-size: 13px;
		background: url("../../assets/05.png") no-repeat center left;
		background-size: 15px 15px;
		margin-left: 10px;
		cursor: pointer;
		position: relative;
	}
	
	.notice ul li span:first-child {
		display: inline-block;
		margin-left: 20px;
	}
	
	.notice ul li span:last-child {
		display: inline-block;
		position: absolute;
		right: 10px;
	}
	
	.notice ul li:hover {
		color: #00aaff;
	}
	
	.per_msg_content{
		margin-top: 25px;
	}
	
</style>