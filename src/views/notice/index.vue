<template>
	<div>
		<el-row>
			<!-- 操作栏 -->
			<el-col :span="24">
				<el-card class="box-card">
					<el-input v-model="input" placeholder="请输入通知标题" size="small" class="filter-input"></el-input>
					<el-input v-model="input" placeholder="请输入时间" size="small" class="filter-input"></el-input>
					<el-button type="primary" icon="el-icon-search" size="small" plain>搜索</el-button>
					
					<br />
					<el-button type="primary" size="small" icon="el-icon-plus" class="button" @click="handleCreate()"
						plain>新增</el-button>
				</el-card>
			</el-col>
			<!-- 数据列表部分 -->
			<el-card class="box-card data">
				<el-table :data="tableData" style="width: 100%" size="small">
					<el-table-column prop="id" label="序号" sortable>
						<template slot-scope="scope">
							<div style="padding-left: 12px;">{{ scope.row.id }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="title" label="通知标题" width="180">
					</el-table-column>
					<el-table-column prop="content" label="通知内容">
					</el-table-column>
					
					<el-table-column label="操作" align="center" width="180px">
						<template slot-scope="scope">
							<el-button type="primary" size="small" icon="el-icon-edit" class="button" @click="handleUpdate(scope.row)"  plain>编辑
							</el-button>
							<el-button type="danger" size="small" icon="el-icon-delete" class="button" @click="deleteUser(scope.row.id)" plain>删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页插件 -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage4" :page-size="100" layout="total, prev, pager, next, jumper"
					:total="100">
				</el-pagination>
			</el-card>
		</el-row>
		<!-- 添加弹框插件 -->
		<div class="add-form">
			<el-dialog title="新增通知" :visible.sync="dialogFormVisible">
				<el-row>
					<el-col :span="24">
						<el-form :model="formData" :rules="rules" ref="formData">
							<el-form-item label="标题" prop="title" label-position="right" label-width="100px">
								<el-input v-model="formData.title" autocomplete="off"></el-input>
							</el-form-item>

							<el-form-item label="通知内容" label-position="right" label-width="100px">
								<el-input type="textarea" v-model="formData.content"></el-input>
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
							<el-form-item label="标题" prop="title" label-position="right" label-width="100px">
								<el-input v-model="formData.title" autocomplete="off"></el-input>
							</el-form-item>
		
							<el-form-item label="内容" prop="content" label-position="right" label-width="100px">
								<el-input v-model="formData.content"></el-input>
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
				tableData: [],
				dialogFormVisible: false,
				dialogFormVisibleEdit:false,
				id:"",
				/* 表单数据 */
				formData: {
					id: '',
					title: '',
					content: ''
				},
				/*数据校验 */
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '请输入内容',
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
				this.formData = row
			},
			
			/* 查询所有通知信息 */
			handleQuery() {
				this.axios.get('/api/notice')
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
			
			/* 添加通知信息 */
			handleAdd() {
				this.axios.post("/api/notice", this.formData).then((res) => {
					if (res.data.code == 200) {
						this.$message.success("通知信息添加成功")
						//关闭窗口
						this.dialogFormVisible = false
						//重新加载数据
						this.handleQuery()
						//重置表单数据
						this.formData = {}
					} else {
						this.$message.error("通知信息添加失败,稍后重试")
					}
				}).catch(() => {
					this.$message.waring("网络连接错误")
				})
			},
			
			/* 修改通知信息 */
			handleEdit() {
				this.axios.put("/api/notice", this.formData).then((res) => {
					console.log(this.formData);
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
			
			/* 删除通知信息 */
			deleteUser(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//确定删除，发送求到后端控制器
					console.log(id)
					this.axios.request({
						url: '/api/notice'+"/"+id,
						method: 'DELETE',
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
			}
			
		// 	/* 条件查询 */
		// 	getData() {
		// 		this.axios.post('/user/findStudent', {
		// 			stuId: this.stuId,
		// 			stuName: this.stuName
		// 		}, {
		// 			headers: {
		// 			'Content-Type': 'application/json'
		// 			}
		// 		})
		// 		.then((res) => {
		// 			if (res.data.code == 200) {
		// 			// 返回学生用户列表
		// 				this.tableData = res.data.data;
		// 				console.log(this.tableData);
		// 			} else {
		// 			console.error('请求失败，错误消息:', res.data.msg);
		// 			}
		// 		})
		// 		.catch((error) => {
		// 			console.error('请求失败', error);
		// 		});
		// 	}
		// }
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
		margin-top: 10px;
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
</style>
