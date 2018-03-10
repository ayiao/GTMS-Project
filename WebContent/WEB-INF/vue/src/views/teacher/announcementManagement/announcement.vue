<template>
	<div class="box">
		<div class="top">
			<div class="button">
				<el-button type="text" icon="el-icon-plus" size="small " @click="addAnnounce">新增</el-button>
				<el-button type="text" icon="el-icon-edit" size="small " @click="editAnnounce">编辑</el-button>
				<el-button type="text" icon="el-icon-upload" size="small " @click="publish">发布</el-button>
				<el-button type="text" icon="el-icon-refresh" size="small" @click="refresh">刷新</el-button>
			</div>
			<el-form class="searchForm" :inline="true">
				<el-form-item label="标题：" label-width="100px">
					<el-input v-model="subjectSearch" id="subjectSearch" size="mini" style="width:160px;margin-right: 10px" clearable prefix-icon="el-icon-search"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="block">
			<el-table :data="tableData3" height="430" style="width: 100%" size="mini" sortable="true" border stripe @selection-change="selectItem" @row-click="selectByRow">
				<el-table-column type="selection" width="55" prop="id" align="center">
				</el-table-column>
				<el-table-column prop="title" label="公告标题" width="240" align="center">
				</el-table-column>
				<el-table-column prop="teacher" label="创建时间" width="100" align="center">
				</el-table-column>
				<el-table-column prop="details" label="内容" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" align="center">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="120">
					<template slot-scope="scope">
						<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
							<el-button size="small" type="text">上传附件</el-button>
						</el-upload>
						<el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
				<!--新增  审核中  审核通过  已发布-->
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
			</el-pagination>
		</div>
		<el-dialog title="添加通知" :visible.sync="show.add" size="mini" :close-on-click-modal="false">
			<el-form :model="announceAdd" ref="announceAddForm">
				<el-form-item label="通知标题：" prop="title" label-width="120px" :rules="[{ required: true, message: '请输入通知标题' }]">
					<el-input v-model="announceAdd.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="内容：" prop="details" label-width="120px" :rules="[{ required: true, message: '请输入通知内容' }]">
					<el-input v-model="announceAdd.details" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -35px;">
				<el-button type="primary" @click="confirmAdd('announceAddForm')">确 定</el-button>
				<el-button @click="show.add = false">取 消</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑通知" :visible.sync="show.edit" size="mini" :close-on-click-modal="false">
			<el-form :model="announceEdit" ref="announceEditForm">
				<el-form-item label="通知标题：" prop="title" label-width="120px" :rules="[{ required: true, message: '请输入通知标题' }]">
					<el-input v-model="announceEdit.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="内容：" prop="details" label-width="120px" :rules="[{ required: true, message: '请输入通知内容' }]">
					<el-input v-model="announceEdit.details" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -35px;">
				<el-button type="primary" @click="confirmEdit('announceEditForm')">确 定</el-button>
				<el-button @click="show.edit = false">取 消</el-button>
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
					add: false,
					edit: false,
				},
				announceAdd: {
					title: '',
					details: '',
				},
				announceEdit: {
					title: '',
					details: '',
				},
				temp: {
					title: '',
					details: '',
					status: ''
				}
			}
		},
		activated() {
			this.currentPage = 1;
			this.currentPageSize = 30;
		},
		methods: {
			selectByRow(row) {
				this.$refs.multipleTable.clearSelection();
				this.$refs.multipleTable.toggleRowSelection(this.girdData[(row.rownum_) - (this.currentPage - 1) * this.currentPageSize - 1])
			},
			selectItem(selection) {
				this.selectItemsLength = selection.length;
				for(var i = 0; i < selection.length; i++) {
					this.selectItemId = selection[0].id;
					this.temp.title = selection[0].title;
					this.temp.details = selection[0].details;
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
			/*新增公告*/
			addAnnounce() {
				this.show.add = true;
				setTimeout(() => {
					this.$refs['announceAddForm'].resetFields();
				}, 100)
			},
			confirmAdd(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						addUserGroup({
							title: this.announceAdd.title,
							details: this.announceAdd.details,
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
									this.temp.status = "新增";
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
			/*编辑公告*/
			editAnnounce() {
				if(this.selectItemsLength == 1) {
					debugger;
					if(this.temp.status == "新增") {
						this.show.edit = true;
						this.announceEdit.title = this.temp.title;
						this.announceEdit.teacher = this.temp.teacher;
						this.announceEdit.details = this.temp.details;
						this.announceEdit.type = this.temp.type;
						this.announceEdit.num = this.temp.num;
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
			/*发布公告*/
			publish() {
				if(this.selectItemsLength == 1) {
					if(this.temp.status == "已发布") {
						this.$message({
							showClose: true,
							message: '该状态不能对数据进行此操作！'
						});
					} else {
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
									this.temp.status = "已发布";
								});
							} else {
								this.$message({
									showClose: true,
									message: '录入失败！',
									type: 'error'
								});
							}
						});

					}

				} else {
					this.$message({
						showClose: true,
						message: '请选择一条数据发布！'
					});
				}

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