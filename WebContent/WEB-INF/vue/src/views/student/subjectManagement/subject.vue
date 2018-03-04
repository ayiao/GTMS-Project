<template>
	<div class="box">
		<div class="top">
			<div class="button">
				<el-button type="text" icon="el-icon-plus" size="small " @click="addSubject">添加</el-button>
				<el-button type="text" icon="el-icon-edit" size="small " @click="editSubject">编辑</el-button>
				<el-button type="text" icon="el-icon-delete" size="small " @click="deleteSubject">删除</el-button>
				<el-button type="text" icon="el-icon-message" size="small" @click="submit">提交审核</el-button>
				<el-button type="text" icon="el-icon-upload" size="small" @click="publish">发布</el-button>
				<el-button type="text" icon="el-icon-refresh" size="small" @click="refresh">刷新</el-button>
				<el-button type="text" icon="el-icon-search" size="small" @click="search">搜索</el-button>
			</div>
			<el-form class="searchForm" :inline="true">
				<el-form-item label-width="100px">
					<el-input v-model="subjectSearch" id="subjectSearch" size="mini" style="width:160px;margin-right: 10px" clearable prefix-icon="el-icon-search" placeholder="请搜索论文题目"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="block">
			<el-table :data="tableData3" height="430" style="width: 100%" size="mini" sortable="true" border stripe @selection-change="selectItem" @row-click="selectByRow">
				<el-table-column type="selection" width="55" prop="id" align="center">
				</el-table-column>
				<el-table-column prop="title" label="论文题目" width="240" align="center">
				</el-table-column>
				<el-table-column prop="teacher" label="教师姓名" width="100" align="center">
				</el-table-column>
				<el-table-column prop="details" label="题目描述" align="center">
				</el-table-column>
				<el-table-column prop="type" label="选题类型" width="100" align="center">
				</el-table-column>
				<el-table-column prop="num" label="限选人数" width="70" align="center">
				</el-table-column>
				<el-table-column prop="self" label="是否自拟" width="70" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" width="70" align="center">
				</el-table-column>
				<!--新增  审核中  审核通过  已发布-->
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
			</el-pagination>
		</div>
		<!--添加题目信息-->
		<el-dialog title="添加题目" :visible.sync="show.add" size="mini" :close-on-click-modal="false">
			<el-form :model="subjectAdd" ref="subjectAddForm">
				<el-form-item label="论文题目：" prop="title" label-width="120px" :rules="[{ required: true, message: '请输入论文题目' }]">
					<el-input v-model="subjectAdd.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="教师姓名：" prop="teacher" label-width="120px" :rules="[{ required: true, message: '请输入教师姓名' }]">
					<el-input v-model="subjectAdd.teacher" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="题目描述：" prop="details" label-width="120px" :rules="[{ required: true, message: '请输入题目描述' }]">
					<el-input v-model="subjectAdd.details" auto-complete="off" type="textarea" :rows="3"></el-input>
				</el-form-item>
				<el-form-item label="选题类型：" prop="type" label-width="120px">
					<el-select v-model="subjectAdd.type" clearable placeholder="请选择选题类型">
						<el-option label="设计类" :value="1">
						</el-option>
						<el-option label="论文类" :value="2">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="限选人数：" prop="num" label-width="120px">
					<el-select v-model="subjectAdd.num" clearable placeholder="请选择限选人数">
						<el-option label="1人" :value="1">
						</el-option>
						<el-option label="2人" :value="2">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -35px;">
				<el-button type="primary" @click="confirmAdd('subjectAddForm')">确 定</el-button>
				<el-button @click="show.add = false">取 消</el-button>
			</div>
		</el-dialog>
		<!--编辑题目信息-->
		<el-dialog title="编辑题目" :visible.sync="show.edit" size="mini" :close-on-click-modal="false">
			<el-form :model="subjectEdit" ref="subjectEditForm">
				<el-form-item label="论文题目：" prop="title" label-width="120px" :rules="[{ required: true, message: '请输入论文题目' }]">
					<el-input v-model="subjectEdit.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="教师姓名：" prop="teacher" label-width="120px" :rules="[{ required: true, message: '请输入教师姓名' }]">
					<el-input v-model="subjectEdit.teacher" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="题目描述：" prop="details" label-width="120px" :rules="[{ required: true, message: '请输入题目描述' }]">
					<el-input v-model="subjectEdit.details" auto-complete="off" type="textarea" :rows="3"></el-input>
				</el-form-item>
				<el-form-item label="选题类型：" prop="type" label-width="120px">
					<el-select v-model="subjectEdit.type" clearable placeholder="请选择选题类型">
						<el-option label="设计类" :value="1">
						</el-option>
						<el-option label="论文类" :value="2">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="限选人数：" prop="num" label-width="120px">
					<el-select v-model="subjectEdit.num" clearable placeholder="请选择限选人数">
						<el-option label="1人" :value="1">
						</el-option>
						<el-option label="2人" :value="2">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -35px;">
				<el-button type="primary" @click="confirmEdit('subjectEditForm')">确 定</el-button>
				<el-button @click="show.edit= false">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="提交审核" :visible.sync="show.submit" size="mini" :close-on-click-modal="false">
			<el-form :model="submitTo" ref="submitForm">
				<el-form-item label="审核院系：" prop="college" label-width="120px">
					<el-select v-model="submitTo.college" clearable placeholder="请选择审核人">
						<el-option label="信息科学技术学院" :value="1">
						</el-option>
						<el-option label="西方语言学院" :value="2">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -35px;">
				<el-button type="primary" @click="submitTo('submitForm')">确 定</el-button>
				<el-button @click="show.submit= false">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="发布" :visible.sync="show.publish" size="mini" :close-on-click-modal="false">
			<el-form :model="publishTo" ref="publishForm">
				<el-form-item label="发布院系：" prop="college" label-width="120px">
					<el-select v-model="publishTo.college" clearable placeholder="请选择发布院系">
						<el-option label="信息科学技术学院" :value="1">
						</el-option>
						<el-option label="西方语言学院" :value="2">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -35px;">
				<el-button type="primary" @click="publishTo('publishForm')">确 定</el-button>
				<el-button @click="show.publish= false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				subjectSearch: "",
				type: '设计类',
				/*选题类型*/
				num: '1人',
				/*限定人数*/
				tableData3: [],
				/*表格数据对象*/
				currentPage: 1, //当前页码
				totalItems: 0, //总数据
				currentPageSize: 30, //当前页面显示条数
				show: { /*添加选题内容*/
					add: false,
					edit: false,
					submit: false,
					publish:false
				},
				subjectAdd: {
					title: '',
					teacher: '',
					details: '',
					type: '',
					num: ''
				},
				subjectEdit: {
					title: '',
					teacher: '',
					details: '',
					type: '',
					num: ''
				},
				temp: {
					title: '',
					teacher: '',
					details: '',
					type: '',
					num: '',
					status: ''
				},
				submitTo: {
					college: '',
				},
				publishTo: {
					college: '',
				},
				outMemberDialog: {
					userName: '',
					realName: '',
					currentPage: 0,
					currentPageSize: 30,
					totalItems: 0,
					selectIds: []
				},
				inMemberDialog: {
					userName: '',
					realName: '',
					currentPage: 0,
					currentPageSize: 30,
					totalItems: 0,
					selectIds: []
				},
				inMemberData: [],
				outMemberData: [],
				tableHeight: 0,
			}
		},
		created: function() {
			axios.get('http://localhost:8080/static/tableData3.json').then((res) => {
				this.tableData3 = res.data.tableData3;
			});
		},
		activated() {
			this.currentPage = 1;
			this.currentPageSize = 30;
		},
		methods: {
			handleCommand(command) {
				this.$message('click on item ' + command);
			},
			selectByRow(row) {
				this.$refs.multipleTable.clearSelection();
				this.$refs.multipleTable.toggleRowSelection(this.girdData[(row.rownum_) - (this.currentPage - 1) * this.currentPageSize - 1])
			},
			selectItem(selection) {
				this.selectItemsLength = selection.length;
				for(var i = 0; i < selection.length; i++) {
					this.selectItemId = selection[0].id;
					this.temp.title = selection[0].title;
					this.temp.teacher = selection[0].teacher;
					this.temp.type = selection[0].type;
					this.temp.details = selection[0].details;
					this.temp.num = selection[0].num;
					this.temp.status = selection[0].status;
				}
			},
			handleSizeChange(size) {
				this.currentPage = 1;
				getUserGroupList({
					rows: size,
					page: this.currentPage,
					userGroupName: this.subjectSearch
				}).then((res) => {
					this.girdData = res.data.rows;
					this.currentPageSize = size;
					this.totalItems = res.data.total;
				});
			},
			handleCurrentChange(currentPage) {
				getUserGroupList({
					rows: this.currentPageSize,
					page: currentPage,
					userGroupName: this.subjectSearch
				}).then((res) => {
					this.girdData = res.data.rows;
					this.currentPage = currentPage;
					this.totalItems = res.data.total;
				});
			},
			/*添加题目*/
			addSubject() {
				this.show.add = true;
				setTimeout(() => {
					this.$refs['subjectAddForm'].resetFields();
				}, 100)
			},
			confirmAdd(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						addUserGroup({
							title: this.subjectAdd.title,
							teacher: this.subjectAdd.teacher,
							details: this.subjectAdd.details,
							type: this.subjectAdd.type,
							num: this.subjectAdd.num,
						}).then((res) => {
							if(res.data.code == 1) {
								this.$message({
									showClose: true,
									message: '录入成功！',
									type: 'success'
								});
								getUserGroupList({
									rows: '30',
									userGroupName: this.subjectSearch
								}).then((res) => {
									this.girdData = res.data.rows;
									this.totalItems = res.data.total;
									this.currentPageSize = 30;
									this.currentPage = 1;
									this.temp.status="新增";
								});
							} else {
								this.$message({
									showClose: true,
									message: '录入失败！',
									type: 'error'
								});
							}
						});
						this.show.add = false;
					} else {
						return false;
					}
				});
			},
			/*编辑题目消息*/
			editSubject() {
				if(this.selectItemsLength == 1) {
					debugger;
					if(this.temp.status == "新增") {
						this.show.edit = true;
						this.subjectEdit.title = this.temp.title;
						this.subjectEdit.teacher = this.temp.teacher;
						this.subjectEdit.details = this.temp.details;
						this.subjectEdit.type = this.temp.type;
						this.subjectEdit.num = this.temp.num;
					} else {
						this.$message({
							showClose: true,
							message: '该状态不能对数据进行此操作！'
						});
					}

				} else {
					this.$message({
						showClose: true,
						message: '请选择一条数据查看！'
					});
				}
			},
			confirmEdit(formName) {
				this.$refs[formName].validsubjectEditate((valid) => {
					if(valid) {
						editUserGroup({
							id: this.selectItemId,
							title: this.subjectEdit.title,
							teacher: this.subjectEdit.teacher,
							details: this.subjectEdit.details,
							type: this.subjectEdit.type,
							num: this.subjectEdit.num,
						}).then((res) => {
							if(res.data.code == 1) {
								this.$message({
									showClose: true,
									message: '编辑成功！',
									type: 'success'
								});
								getUserGroupList({
									rows: '30',
									userGroupName: this.subjectSearch
								}).then((res) => {
									this.girdData = res.data.rows;
									this.totalItems = res.data.total;
									this.currentPageSize = 30;
									this.currentPage = 1;
								});
							} else {
								this.$message({
									showClose: true,
									message: '编辑失败！',
									type: 'error'
								});
							}
						});
						this.show.edit = false;
					} else {
						return false;
					}
				});
			},

			/*题目搜索*/
			search() {
				getUserGroupList({
					subjectName: this.subjectSearch,
					rows: '30',
					page: '1'
				}).then((res) => {
					this.girdData = res.data.rows;
					this.totalItems = res.data.total;
					this.currentPage = 1;
					this.currentPageSize = 30;
				});
			},
			/*刷新*/
			refresh() {
				this.subjectSearch = '';
				if(this.currentPage != 1) {
					this.currentPageSize = 30;
					this.currentPage = 1;
				} else {
					getUserGroupList({
						rows: '30'
					}).then((res) => {
						this.girdData = res.data.rows;
						this.totalItems = res.data.total;
						this.currentPage = 1;
						this.currentPageSize = 30;
					});
				}
			},
			/*删除*/
			deleteSubject() {
				if(this.selectItemsLength > 0) {
					this.$confirm('您确定要删除吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						delUserGroup({
							id: this.selectItemId
						}).then((res) => {
							if(res.data.code == 1) {
								this.$message({
									showClose: true,
									message: '删除成功！',
									type: 'success'
								});
								getUserGroupList({
									rows: '30',
									userGroupName: this.subjectSearch
								}).then((res) => {
									this.girdData = res.data.rows;
									this.totalItems = res.data.total;
									this.currentPage = 1;
									this.currentPageSize = 30;
								});
							} else {
								this.$message({
									showClose: true,
									message: res.data.message,
									type: 'error'
								});
							}
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				} else {
					this.$message({
						showClose: true,
						message: '请选择一条或多条数据删除！'
					});
				}
			},
			/*提交审核*/
			submit() {
				if(this.selectItemsLength == 1) {
					if(this.temp.status == "新增") {
						this.show.submit = true;
					} else {
						this.$message({
							showClose: true,
							message: '该状态不能对数据进行此操作！'
						});
					}
				} else {
					this.$message({
						showClose: true,
						message: '请选择一条或多条数据提交！'
					});
				}
			},
			submitTo(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						addUserGroup({
							id: this.selectItemId,
							teacher: this.submitTo.teacher,
						}).then((res) => {
							if(res.data.code == 1) {
								this.$message({
									showClose: true,
									message: '录入成功！',
									type: 'success'
								});
								getUserGroupList({
									rows: '30',
									userGroupName: this.subjectSearch
								}).then((res) => {
									this.girdData = res.data.rows;
									this.totalItems = res.data.total;
									this.currentPageSize = 30;
									this.currentPage = 1;
									this.temp.status="审核中";
								});
							} else {
								this.$message({
									showClose: true,
									message: '录入失败！',
									type: 'error'
								});
							}
						});
						this.show.add = false;
					} else {
						return false;
					}
				});
			},
			publish() {
				if(this.selectItemsLength == 1) {
					if(this.temp.status == "审核通过") {
						this.show.publish = true;
					} else {
						this.$message({
							showClose: true,
							message: '该状态不能对数据进行此操作！'
						});
					}
				} else {
					this.$message({
						showClose: true,
						message: '请选择一条或多条数据提交！'
					});
				}
			},
			publishTo(formName){
				this.$refs[formName].validate((valid) => {
					if(valid) {
						addUserGroup({
							id: this.selectItemId,
							teacher: this.publishTo.teacher,
						}).then((res) => {
							if(res.data.code == 1) {
								this.$message({
									showClose: true,
									message: '录入成功！',
									type: 'success'
								});
								getUserGroupList({
									rows: '30',
									userGroupName: this.subjectSearch
								}).then((res) => {
									this.girdData = res.data.rows;
									this.totalItems = res.data.total;
									this.currentPageSize = 30;
									this.currentPage = 1;
									this.temp.status="已发布";
								});
							} else {
								this.$message({
									showClose: true,
									message: '录入失败！',
									type: 'error'
								});
							}
						});
						this.show.add = false;
					} else {
						return false;
					}
				});
			}

		},
		computed: {
			loading() {
				return this.$store.state.tableLoading.graduation;
			}
		},

	}
</script>

<style>
	.box {
		height: inherit;
		width: inherit;
	}
	
	.top {
		width: 100%;
		position: relative;
		height: 40px;
	}
	
	.searchForm {
		position: absolute;
		right: 10px;
	}
	
	.button {
		position: absolute;
		left: 10px;
		line-height: 40px;
	}
	
	.el-select {
		width: 100% !important;
	}
</style>