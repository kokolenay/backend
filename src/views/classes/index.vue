<template>
	<div>
		<el-row>
			<!-- 操作栏 -->
			<el-col :span="24">
				<el-card class="box-card">
					<el-input v-model="className" placeholder="请输入课程名字" size="small" class="filter-input" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" size="small" @click="getData()" plain>搜索</el-button>
				</el-card>
			</el-col>
			<!-- 数据列表部分 -->
			<el-card class="box-card data">
				<el-button type="primary" size="small" icon="el-icon-plus" class="button" @click="handleCreate()"
						plain>新增</el-button>
				<el-table :data="tableData" style="width: 100%" size="small">
					<el-table-column prop="classId" label="序号" sortable>
						<template slot-scope="scope">
							<div style="padding-left: 12px;">{{ scope.row.classId }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="class_name" label="课程名称">
					</el-table-column>
					<el-table-column prop="class_teacher" label="教师">
					</el-table-column>
					<el-table-column prop="time" label="时间">
					</el-table-column>
					<el-table-column prop="area" label="校区">
					</el-table-column>
					<el-table-column prop="place" label="地点">
					</el-table-column>
					<el-table-column prop="capacity" label="容量">
					</el-table-column>
					<el-table-column prop="chosen" label="已选人数">
					</el-table-column>
					<el-table-column prop="type" label="类型">
					</el-table-column>
					
					<el-table-column label="操作" align="center" width="180px">
						<template slot-scope="scope">
							<el-button type="primary" size="small" icon="el-icon-edit" class="button" @click="handleUpdate(scope.row)"  plain>编辑
							</el-button>
							<el-button type="danger" size="small" icon="el-icon-delete" class="button" @click="deleteUser(scope.row.classId)" plain>删除
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
			<el-dialog title="新增课程" :visible.sync="dialogFormVisible">
				<el-row>
					<el-col :span="24">
						<el-form :model="formData" :rules="rules" ref="formData">
							<el-form-item label="课程编号" prop="class_id" label-position="right" label-width="100px">
								<el-input v-model="formData.class_id" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="课程名称" prop="class_name" label-position="right" label-width="100px">
								<el-input  v-model="formData.class_name" autocomplete="off"></el-input>
							</el-form-item>

							<el-form-item label="教师" prop="class_teacher" label-position="right" label-width="100px">
								<el-input  v-model="formData.class_teacher"></el-input>
							</el-form-item>
							<el-form-item label="时间" prop="time" label-position="right" label-width="100px">
								<el-input  v-model="formData.time"></el-input>
							</el-form-item>
							<el-form-item label="校区" prop="area" label-position="right" label-width="100px">
								<el-select v-model="formData.area" placeholder="请选择上课校区" class="filter-input" size="small">
									<el-option label="A" value="0"></el-option>
									<el-option label="B" value="1"></el-option>
									<el-option label="C" value="2"></el-option>
									<el-option label="D" value="3"></el-option>
								</el-select>
			
							</el-form-item>
							<el-form-item label="地点" prop="place" label-position="right" label-width="100px">
								<el-input v-model="formData.place"></el-input>
							</el-form-item>
							<el-form-item label="容量" prop="capacity" label-position="right" label-width="100px">
								<el-input v-model="formData.capacity"></el-input>
							</el-form-item>
							<el-form-item label="类型" prop="type" label-position="right" label-width="100px">
								<el-select v-model="formData.type" placeholder="请选择课程类型" class="filter-input" size="small">
									<el-option label="通识" value="0"></el-option>
									<el-option label="必修" value="1"></el-option>
									<el-option label="选修" value="2"></el-option>
								</el-select>
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
							<el-form-item label="课程编号" prop="class_id" label-position="right" label-width="100px">
								<el-input v-model="formData.class_id" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="课程名称" prop="class_name" label-position="right" label-width="100px">
								<el-input  v-model="formData.class_name" autocomplete="off"></el-input>
							</el-form-item>
							
							<el-form-item label="教师" prop="class_teacher" label-position="right" label-width="100px">
								<el-input  v-model="formData.class_teacher"></el-input>
							</el-form-item>
							<el-form-item label="时间" prop="time" label-position="right" label-width="100px">
								<el-input  v-model="formData.time"></el-input>
							</el-form-item>
							<el-form-item label="校区" prop="area" label-position="right" label-width="100px">
								<el-select v-model="formData.area" placeholder="请选择上课校区" class="filter-input" size="small">
									<el-option label="A" value="0"></el-option>
									<el-option label="B" value="1"></el-option>
									<el-option label="C" value="2"></el-option>
									<el-option label="D" value="3"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="地点" prop="place" label-position="right" label-width="100px">
								<el-input  v-model="formData.place"></el-input>
							</el-form-item>
							<el-form-item label="容量" prop="capacity" label-position="right" label-width="100px">
								<el-input v-model="formData.capacity"></el-input>
							</el-form-item>
							<el-form-item label="已选人数" prop="chosen" label-position="right" label-width="100px">
								<el-input v-model="formData.chosen" disabled></el-input>
							</el-form-item>
							<el-form-item label="类型" prop="type" label-position="right" label-width="100px">
								<el-select v-model="formData.type" placeholder="请选择课程类型" class="filter-input" size="small">
									<el-option label="通识" value="0"></el-option>
									<el-option label="必修" value="1"></el-option>
									<el-option label="选修" value="2"></el-option>
								</el-select>
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
				classId:"",
                className:"",
				/* 表单数据 */
				formData: {
                    classId:"",
					className:"",
                    classTeacher:"",
                    time:"",
                    place:"",
                    credits:"",
                    capacity:"",
                    chosen:"",
                    department:"",
                    type:"",
                    area:"",
                    image:""
				},
				/* 分页数据模型 */
				pagination: {
					currentPage: 1, //当前页码
					pageSize: 10, //每页显示的记录数
					total: 0, //总记录数
				},
				/*数据校验 */
				rules: {
					className: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}]
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
			
			/* 查询所有用户信息 */
			handleQuery() {
				this.axios.get("/user/classesPage?currentPage=" + this.pagination.currentPage + "&pageSize=" + this.pagination
						.pageSize)
					.then((res) => {
						if (res.data.code == 200) {
							//将数据设置到表格中
							this.tableData = res.data.data.list
							//设置总记录数
							this.pagination.total = res.data.data.total
						}
					})
			},

			/* 分页查询数据 */
			handleCurrentChange(currentPage) {
				this.pagination.currentPage = currentPage
				//重新加载数据
				this.handleQuery()
			},

			
			/* 添加通知信息 */
			handleAdd() {
				this.axios.post("/user/insertClass", this.formData).then((res) => {
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
				this.axios.put("/user/updateClass", this.formData).then((res) => {
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
						url: '/user/deleteClass'+"/"+id,
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
			},
			
			/* 条件查询 */
			getData() {
				this.axios.post('/user/findClasses', {
					className:this.className
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
					alert("找不到相关信息")
					}
				})
				.catch((error) => {
					console.error('请求失败', error);
				});
			},

            
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
