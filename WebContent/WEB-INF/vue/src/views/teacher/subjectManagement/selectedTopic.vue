<template>
	<div class="box">
		<div class="top">
			<div class="button">
				<el-button type="text" icon="el-icon-plus" size="small " @click="addSubject">添加</el-button>
				<el-button type="text" icon="el-icon-edit" size="small " @click="editSubject">编辑</el-button>
				<el-button type="text" icon="el-icon-delete" size="small " @click="deleteSubject">删除</el-button>
				<el-button type="text" icon="el-icon-search" size="small" @click="search">搜索</el-button>
				<el-button type="text" icon="el-icon-message" size="small" @click="submit">提交审核</el-button>
				<el-button type="text" icon="el-icon-upload" size="small" @click="publish">发布</el-button>
				<el-button type="text" icon="el-icon-refresh" size="small" @click="refresh">刷新</el-button>
			</div>
			<el-form class="searchForm" :inline="true">
				<el-form-item label="标题：" label-width="100px">
					<el-input v-model="subjectSearch" id="subjectSearch" size="mini" style="width:160px;margin-right: 10px" clearable  prefix-icon="el-icon-search"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="block">
			<el-table :data="tableData3" height="430" style="width: 100%" size="mini" sortable="true" border stripe @selection-change="selectItem" @row-click="selectByRow">
				<el-table-column type="selection" width="55" prop="id" align="center">
				</el-table-column>
				<el-table-column prop="date" label="日期" width="180" align="center">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="180" align="center">
				</el-table-column>
				<el-table-column prop="address" label="地址" align="center">
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination>
		</div>
		<!--添加题目信息-->
		<el-dialog title="添加题目" :visible.sync="show.add" size="tiny" :close-on-click-modal="false" v-drag>
			<el-form :model="subjectAdd" ref="subjectAddForm">
				<el-form-item label="题目名称：" prop="name" label-width="120px" :rules="[{ required: true, message: '请输入题目名称' }]">
					<el-input v-model="subjectAdd.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -35px;">
				<el-button type="primary" @click="confirmAdd('subjectAddForm')">确 定</el-button>
				<el-button @click="show.add = false">取 消</el-button>
			</div>
		</el-dialog>
		<!--编辑题目信息-->
		<el-dialog title="编辑题目" :visible.sync="show.edit" size="tiny" :close-on-click-modal="false" v-drag>
			<el-form :model="subjectEdit" ref="subjectEditForm">
				<el-form-item label="题目名称：" prop="name" label-width="120px" :rules="[{ required: true, message: '请输入题目名称' }]">
					<el-input v-model="subjectAdd.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -35px;">
				<el-button type="primary" @click="confirmEdit('subjectEditForm')">确 定</el-button>
				<el-button @click="show.edit= false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				tableData3: [],
				currentPage: 1, //当前页码
				totalItems: 0, //总数据
				currentPageSize: 30, //当前页面显示条数
				show: {
					add: false
				},
				subjectAdd: {
					name: '',
				},
			}
		},
		activated() {
			this.currentPage = 1;
			this.currentPageSize = 30;
		},
		methods: {
			selectByRow(row){
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(this.girdData[(row.rownum_)-(this.currentPage-1)*this.currentPageSize-1])
           },	
			selectItem(selection) {
				this.selectItemsLength = selection.length;
				for(var i = 0; i < selection.length; i++) {
					if(i == 1) {
						this.selectItemId = selection[0].id;
						this.temp.name = selection[0].name;
					} else  {
						this.selectItemId = selection[0].ids;
						this.temp.name = selection[0].names;
					}
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
							name: this.subjectAdd.name
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
					this.show.edit = true;
					this.groupEdit.name = this.temp.name;
				} else {
					this.$message({
						showClose: true,
						message: '请选择一条数据查看！'
					});
				}
			},
			confirmEdit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						editUserGroup({
							id: this.selectItemId,
							name: this.groupEdit.name
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
			deleteSubject() {
				if(this.selectItemsLength > 0) {
					this.$confirm('您确定要删除吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						delUserGroup({
							id: row.id
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

		},
		computed: {
			loading() {
				return this.$store.state.tableLoading.graduation;
			}
		},
		created: function() {
			axios.get('http://localhost:8080/static/tableData3.json').then((res) => {
				var result = res.data.tableData3
				this.tableData3 = result;
				console.log(result)
			});
		}

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
</style>