<template>
	<div class="container">
		<div class="title">
			<span>重庆大学</span>
			<span>新生报到管理平台</span>
		</div>
		<div class="main">
			<el-carousel trigger="click" height="660px">
				<el-carousel-item v-for="item in imgList" :key="item.id">
					<img v-bind:src="item.imgUrl" width="100%" height="100%" />
				</el-carousel-item>
			</el-carousel>
			<el-card class="box-card">
				<div class="text item">
					<p>用户登录</p>

					<el-form ref="formData" :model="formData" :rules="rules">
						<el-form-item prop="username">
							<el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="formData.username">
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input placeholder="请输入密码" type="password" prefix-icon="el-icon-unlock"
								v-model="formData.password" show-password="true">

							</el-input>
						</el-form-item>
						<el-form-item prop="code">
							<el-input id="code" placeholder="请输入验证码" prefix-icon="el-icon-key"
								v-model="formData.code">

							</el-input>
							<img  :src="formData.captcha" @click="getCaptcha()" title="点击重新获取验证码"/>
						</el-form-item>
						<el-checkbox v-model="checked">记住密码</el-checkbox>
					</el-form>
					<el-button type="primary" @click="login('formData')">登&nbsp;录</el-button>
					<el-link type="primary">忘记密码?</el-link>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				/* 轮播图数据 */
				imgList: [{
					id: 1,
					imgUrl: require("@/assets/images/00.jpg")
				}, {
					id: 2,
					imgUrl: require("@/assets/images/03.jpg")
				}, {
					id: 3,
					imgUrl: require("@/assets/images/05.jpg")
				}],
				/* 表单数据 */
				formData: {
					username: '',
					password: '',
					captcha: 'http://127.0.0.1:8081/user/api/captcha',
					code:''
				},
				/* 定义表单校验规则 */
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}, {
						min: 3,
						max: 8,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入登录密码',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}],

				}
			}
		},
		/* 函数定义区域 */
		methods: {
			/* 生成验证码 */
			getCaptcha(){
				this.formData.captcha = "http://127.0.0.1:8081/user/api/captcha?id="+Math.random()
			},
			
			login: function(formData) {
				this.$refs[formData].validate((valid) => {
					if (valid) {
						//数据校验成功，发送请求到后端控制器
						this.axios.post("/user/userLogin",this.formData).then((res)=>{
							if(res.data.code==200){
								this.$message.success("登录成功")
								this.$router.push("/home")
							}else{
								this.$message.error(res.data.msg)
							}
						})
						
					} else {
						this.$message({
							message: '校验失败，请输入登录信息',
							type: 'error'
						});
					}
				})
			}
		}
	}
</script>

<style scoped>
	/* logo标题部分样式 */
	.title {
		width: 100%;
		height: 60px;
		background: #0055ff;
	}

	.title span {
		color: #fff;
		line-height: 60px;
		display: inline-block;
	}

	.title span:first-child {
		margin-left: 20px;
		font-size: 24px;
		font-weight: 600;
	}

	.title span:last-child {
		margin-left: 30px;
		font-size: 20px;
	}

	.main {
		position: relative;
	}

	/* 轮播图部分 */
		
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	/* 卡片样式 */
	.box-card {
		position: absolute;
		/* 绝对定位 */
		right: 150px;
		bottom: 25%;
		z-index: 999;
		/* 层级 值越大，层级越高 */
		width: 350px;
		height: 380px;
	}

	.item p {
		margin-left: 38%;
		margin-top: 6%;
		margin-bottom: 20px;
		font-size: 18px;
	}

	.el-input {
		width: 90%;
		margin-left: 5%;

	}

	/* 验证码输入框 */
	/deep/#code {
		width: 60%;
	}

	/* 验证码图片 */
	.el-form-item img {
		width: 100px;
		height: 35px;
		position: absolute;
		right: 5%;
		top: 3px;
		cursor: pointer;
	}

	.el-checkbox {
		margin-left: 20px;

	}

	/* 复选框文字 */
	.el-checkbox__label {
		font-size: 13px;
	}

	/* 登录按钮 */
	.el-button {
		width: 90%;
		margin-left: 20px;
		margin-top: 10px;
	}

	.el-form-item {
		margin-bottom: 18px;
	}

	/* 设置提示 */
	.el-form-item__error {
		margin-left: 20px;
	}

	/* 忘记密码链接 */
	.el-link {
		margin-top: 10px;
		margin-left: 20px;
		font-size: 13px;
	}
	/deep/.el-form-item__error{
		margin-left: 15px;
	}
</style>
