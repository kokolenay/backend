<template>
	<div>
		<el-row>
			<!-- 操作栏 -->
			<el-col :span="24">
				<el-card class="box-card">
					<el-input v-model="stuId" placeholder="请输入学号" size="small" class="filter-input" clearable></el-input>
					<el-input v-model="stuName" placeholder="请输入姓名" size="small" class="filter-input" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" size="small" @click="getData()" plain>搜索</el-button>
				</el-card>
			</el-col>
			<!-- 数据列表部分 -->
			<el-card class="box-card data">
				<el-button type="primary" size="small" icon="el-icon-plus" class="button" @click="handleCreate()"
					plain>新增</el-button>
				<el-table :data="tableData" style="width: 100%" size="small">
					<el-table-column prop="stuId" label="学号" sortable>
						<template slot-scope="scope">
							<div style="padding-left: 12px;">{{ scope.row.stuId }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="stuName" label="姓名" >
					</el-table-column>
					<el-table-column prop="gender" label="性别">
					</el-table-column>
					<el-table-column prop="phone" label="联系电话">
					</el-table-column>
					<el-table-column prop="password" label="密码">
					</el-table-column>
					<el-table-column prop="idCard" label="身份证号码">
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">
							<el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
							<el-tag type="danger" v-if="scope.row.status==0">禁用</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="180px">
						<template slot-scope="scope">
							<el-button type="primary" size="small" icon="el-icon-edit" class="button"
								@click="handleUpdate(scope.row)" plain>编辑=
							</el-button>
							<el-button type="danger" size="small" icon="el-icon-delete"
								@click="deleteUser(scope.row.stuId)" class="button" plain>删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页插件 -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="pagination.currentPage" :page-size="pagination.pageSize"
					layout="total, prev, pager, next, jumper" :total="pagination.total">
				</el-pagination>
			</el-card>
		</el-row>
		<!-- 添加弹框插件 -->
		<div class="add-form">
			<el-dialog title="新增学生" :visible.sync="dialogFormVisible">
				<el-row>
					<el-col :span="24">
						<el-form :model="formData" :rules="rules" ref="formData">
							<el-form-item label="姓名" prop="stuName" label-position="right" label-width="100px">
								<el-input v-model="formData.stuName" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="性别" prop="gender" label-position="right" label-width="100px">
								<el-select v-model="formData.gender" placeholder="请选择性别" class="filter-input" size="small">
									<el-option label="男" value="0"></el-option>
									<el-option label="女" value="1"></el-option>
								</el-select>
							</el-form-item>
							
							<el-form-item label="联系电话" prop="phone" label-position="right" label-width="100px">
								<el-input v-model="formData.phone"></el-input>
							</el-form-item>
							
							<el-form-item label="密码" prop="phone" label-position="right" label-width="100px">
								<el-input v-model="formData.password"></el-input>
							</el-form-item>
							
							<el-form-item label="身份证号码" prop="idCard" label-position="right" label-width="100px">
								<el-input v-model="formData.idCard"></el-input>
							</el-form-item>
							
							<el-form-item label="用户状态" label-position="right" label-width="100px">
								<el-switch style="display: block" v-model="formData.status" active-color="#13ce66"
									inactive-color="#ff4949" active-text="启用" inactive-text="禁用" :active-value="1"
									:inactive-value="0">
								</el-switch>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>

				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="handleAdd()">确 定</el-button>
				</div>
			</el-dialog>
		</div>
		<!-- 编辑修改框 -->
		<div class="update-form">
			<el-dialog title="修改信息" :visible.sync="dialogFormVisibleEdit">
				<el-row>
					<el-col :span="24">
						<el-form :model="formData" :rules="rules" ref="formData">	
							<el-form-item label="姓名" prop="stuName" label-position="right" label-width="100px">
								<el-input v-model="formData.stuName" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="性别" prop="gender" label-position="right" label-width="100px">
								<el-select v-model="formData.gender" placeholder="请选择性别" class="filter-input" size="small" disabled>
									<el-option label="男" value="0"></el-option>
									<el-option label="女" value="1"></el-option>
								</el-select>
							</el-form-item>
							
							<el-form-item label="联系电话" prop="phone" label-position="right" label-width="100px">
								<el-input v-model="formData.phone"></el-input>
							</el-form-item>
							
							<el-form-item label="密码" prop="password" label-position="right" label-width="100px">
								<el-input v-model="formData.password"></el-input>
							</el-form-item>
							
							<el-form-item label="身份证号码" prop="idCard" label-position="right" label-width="100px">
								<el-input v-model="formData.idCard"></el-input>
							</el-form-item>
							
							<el-form-item label="用户状态" label-position="right" label-width="100px">
								<el-switch style="display: block" v-model="formData.status" active-color="#13ce66"
									inactive-color="#ff4949" active-text="启用" inactive-text="禁用" :active-value="1"
									:inactive-value="0">
								</el-switch>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>

				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="handleEdit()">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisible: false,
				dialogFormVisibleEdit: false,
				stuName:'',
				stuId:'',
				name:'',
				date:'',
				tableData: [],
				/* 表单数据 */
				formData: {
					stuId:"",
					stuName: '',
					phone: '',
					status: '',
					gender:'',
					password:',',
					idCard:''
				},

				/* 分页数据模型 */
				pagination: {
					currentPage: 1, //当前页码
					pageSize: 10, //每页显示的记录数
					total: 0, //总记录数
				},
				/*数据校验 */
				rules: {
					stuName: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					stuId:[{
						required: true,
						message: '请输入学号',
						trigger: 'blur'
					}],
					
					phone: [{
						required: true,
						message: '请输入联系号码',
						trigger: 'blur'
					},
					{
						pattern: /^[0-9]{11}$/, 
						message: '请输入正确的号码', 
						trigger: 'blur' 
					}],
					gender: [{
						required: true,
						message: '请选择性别',
						trigger: 'blur'
					}],
					
				}
			}
		},
		mounted() {
			this.handleQuery()
		},
		methods: {
			/* 弹出添加窗口 */
			handleCreate() {
				this.dialogFormVisible = true
			},

			/* 弹出修改窗口 */
			handleUpdate(row) {
				this.dialogFormVisibleEdit = true,
				//将数据填充到formData
				this.formData = row
			},

			/* 查询所有用户信息 */
			handleQuery() {
				this.axios.get('/user/findAllStudent')
				.then((res) => {
					if (res.data.code == 200) {
					// 返回学生用户列表
						this.tableData = res.data.data;
						console.log(this.tableData);
					} else {
					console.error('请求失败，错误消息:', res.data.msg);
					}
				})
				.catch((error) => {
					console.error('请求失败', error);
				});
			},

			/* 添加用户信息 */
			handleAdd() {
				this.axios.post("/user/addStudent", this.formData).then((res) => {
					if (res.data.code == 200) {
						this.$message.success("用户信息添加成功")
						//关闭窗口
						this.dialogFormVisible = false
						//重新加载数据
						this.handleQuery()
						//重置表单数据
						this.formData = {}
					} else {
						this.$message.error("用户信息添加失败,稍后重试")
					}
				}).catch(() => {
					this.$message.waring("网络连接错误")
				})
			},

			/* 修改用户信息 */
			handleEdit() {
				console.log(this.formData);
				this.axios.post("/user/updateStudent", this.formData).then((res) => {
					if (res.data.code == 200) {
						this.$message.success("用户信息修改成功")
						//关闭窗口
						this.dialogFormVisibleEdit = false
						//重新加载数据
						this.handleQuery()
						//重置表单数据
						this.formData = {}
					} else {
						this.$message.error("用户信息修改失败,稍后重试")
					}
				}).catch(() => {
					this.$message.warning("网络连接错误")
				})
			},

			/* 删除用户信息 */
			deleteUser(StuId) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//确定删除，发送求到后端控制器
					console.log(StuId)
					this.axios.request({
						url: '/user/stuDelete',
						method: 'DELETE',
						data: {
							"maps":{
								"stuId":StuId
							}
						},
						headers: {
							'Content-Type': 'application/json'
						}
					}).then((res) => {
						if (res.data.code == 200) {
							this.$message.success("数据删除成功")
							//重新加载数据
							this.handleQuery()
						} else {
							this.$message.error("数据删除失败！")
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},

			/* 条件查询 */
			getData() {
				this.axios.post('/user/findStudent', {
					stuId: this.stuId,
					stuName: this.stuName
				}, {
					headers: {
					'Content-Type': 'application/json'
					}
				})
				.then((res) => {
					if (res.data.code == 200) {
					// 返回学生用户列表
						this.tableData = res.data.data;
						console.log(this.tableData);
					} else {
					console.error('请求失败，错误消息:', res.data.msg);
					}
				})
				.catch((error) => {
					console.error('请求失败', error);
				});
			}
		}

	}
</script>

<style scoped>
	/* 操作框样式 */
	.box-card {
		margin: 5px;
	}

	/* 搜索框样式 */
	.filter-input {
		width: 200px;
		margin-right: 20px;
	}

	/* 按钮样式 */
	.button {
		margin-top: 5px;
	}


	/* 设置表格行间距 */
	/deep/.el-table td,
	.el-table th {
		padding: 5px 0 !important;
	}

	/* 分页插件样式 */
	.el-pagination {
		margin: 10px;
		float: right;
	}

	.el-switch {
		margin-top: 10px;
		margin-left: 10px;
	}
	.disabled-input{
		background-color: #f5f7fa; /* 自定义背景色 */
		color: #b0b0b0; /* 自定义文本颜色 */
	}
</style>
