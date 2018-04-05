<template>
	<div class="box">
		<div class="top">
			<div class="button">
				<el-button type="text" icon="el-icon-plus" size="small " @click="addSubject">添加</el-button>
				<el-button type="text" icon="el-icon-edit" size="small " @click="editSubject">编辑</el-button>
				<el-button type="text" icon="el-icon-delete" size="small " @click="deleteSubject">删除</el-button>
				<el-button type="text" icon="el-icon-upload" size="small" @click="publish">发布</el-button>
				<el-button type="text" icon="el-icon-refresh" size="small" @click="refresh">刷新</el-button>
			</div>
		</div>
		<div class="block">
			<el-table :data="girdData" height="430" style="width: 100%" size="mini" sortable="true" border stripe @selection-change="selectItem">
				<el-table-column type="selection" width="55" prop="id" align="center">
				</el-table-column>
				<el-table-column prop="paperTitle" label="论文题目" width="240" align="center">
				</el-table-column>
				<el-table-column prop="teacherName" label="教师姓名" width="100" align="center">
				</el-table-column>
				<el-table-column prop="paperDescribtion" label="题目描述" align="center">
				</el-table-column>
				<el-table-column prop="paperType" label="选题类型" width="100" align="center">
				</el-table-column>
				<el-table-column prop="limitAccount" label="限选人数" width="70" align="center">
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
				<el-form-item label="题目描述：" prop="details" label-width="120px" :rules="[{ required: true, message: '请输入题目描述' }]">
					<el-input v-model="subjectEdit.details" auto-complete="off" type="textarea" :pageNo="3"></el-input>
				</el-form-item>
				<el-form-item label="选题类型：" prop="type" label-width="120px">
					<el-select v-model="subjectEdit.type" clearable placeholder="请选择选题类型">
						<el-option label="设计类" :value="1">
						</el-option>
						<el-option label="论文类" :value="2">
						</el-option>
					</el-select>
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
	import { addSubjectInfo, find, updatePaper, deletePaper, updatePaperList } from '../../../../api/api.js'
	export default {
		data() {
			return {
				subjectSearch: "",
				type: '设计类',
				/*选题类型*/
				girdData: [],
				/*表格数据对象*/
				currentPage: 1, //当前页码
				totalItems: 0, //总数据
				currentPageSize: 30, //当前页面显示条数
				show: { /*添加选题内容*/
					add: false,
					edit: false
				},
				subjectAdd: {
					title: '',
					teacher: '',
					details: '',
					type: '',
				},
				subjectEdit: {
					title: '',
					teacher: '',
					details: '',
					type: '',
					paperId: ''
				},
				temp: {
					title: '',
					teacher: '',
					details: '',
					type: '',
					status: '',
					paperId: '',
					selectItemId: ''
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
			find({
				pageNo: '1',
				pageSize: '30'
			}).then((res) => {
				console.log(res);
				this.girdData = res.data.output.data;
				this.totalItems = res.data.output.total;
			});
		},
		activated() {
			this.currentPage = 1;
			this.currentPageSize = 30;
		},
		methods: {
			submit() {
				if(this.selectItemsLength > 0) {
					var ids = [];
					var status = [];
					for(var i = 0; i < this.multipleSelection.length; i++) {
						ids.push(this.multipleSelection[i].paperId);
						if(status.indexOf(this.multipleSelection[i].status) == -1) {
							status.push(this.multipleSelection[i].status);
						}
					}
					var id = ids.join(',');
					var stat = status.join(',');
					if(stat == "新增" || stat == "更新") {
						updatePaperList({
							ids: id,
							status: '3'
						}).then((res) => {
							if(res.data.status == 0) {
								this.$message({
									showClose: true,
									message: '提交审核成功！',
									type: 'success'
								});
								find({
									pageNo: '1',
									pageSize: '30'
								}).then((res) => {
									this.girdData = res.data.output.data;
									this.totalItems = res.data.output.total;
									this.currentPageSize = 30;
									this.currentPage = 1;
								});
							} else {
								this.$message({
									showClose: true,
									message: '提交审核失败！',
									type: 'error'
								});
							}
						});
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
			handleCommand(command) {
				this.$message('click on item ' + command);
			},
			selectItem(selection) {
				this.multipleSelection = selection;
				this.selectItemsLength = selection.length;
				for(var i = 0; i < selection.length; i++) {
					this.temp.selectItemId = selection[0].paperId;
					this.temp.title = selection[0].paperTitle;
					this.temp.teacher = selection[0].teacherName;
					this.temp.type = selection[0].paperType;
					this.temp.details = selection[0].paperDescribtion;
					this.temp.num = selection[0].limitAccount;
					this.temp.status = selection[0].status;
				}
			},
			handleSizeChange(size) {
				this.currentPage = 1;
				find({
					pageNo: size,
					page: this.currentPage,
					userGroupName: this.subjectSearch
				}).then((res) => {
					this.girdData = res.data.output.data;
					this.currentPageSize = size;
					this.totalItems = res.data.output.total;
				});
			},
			handleCurrentChange(currentPage) {
				find({
					pageNo: this.currentPageSize,
					page: currentPage,
					userGroupName: this.subjectSearch
				}).then((res) => {
					this.girdData = res.data.output.data;
					this.currentPage = currentPage;
					this.totalItems = res.data.output.total;
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
						addSubjectInfo({
							paperTitle: this.subjectAdd.title,
							teacherName: getUserInfo().userId,
							paperDescribtion: this.subjectAdd.details,
							paperType: this.subjectAdd.type,
							limitAccount: this.subjectAdd.num,
							status: "1",
						}).then((res) => {
							if(res.data.status == 0) {
								this.$message({
									showClose: true,
									message: '录入成功！',
									type: 'success'
								});
								find({
									pageNo: '1',
									pageSize: '30'
								}).then((res) => {
									this.girdData = res.data.output.data;
									this.totalItems = res.data.output.total;
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
					if(this.temp.status == "新增") {
						this.show.edit = true;
						this.subjectEdit.title = this.temp.title;
						this.subjectEdit.teacher = this.temp.teacher;
						this.subjectEdit.details = this.temp.details;
						this.subjectEdit.type = this.temp.type;
						this.subjectEdit.num = this.temp.num;
						this.subjectEdit.paperId = this.temp.paperId;
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
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.subjectEdit.type == "设计类") {
							this.subjectEdit.type = "1";
						} else {
							this.subjectEdit.type = "2";
						}
						updatePaper({
							paperId: this.temp.selectItemId,
							paperTitle: this.subjectEdit.title,
							teacherName: getUserInfo().userId,
							paperDescribtion: this.subjectEdit.details,
							paperType: this.subjectEdit.type,
							limitAccount: this.subjectEdit.num,
							status: '2'
						}).then((res) => {
							if(res.data.status == 0) {
								this.$message({
									showClose: true,
									message: '编辑成功！',
									type: 'success'
								});
								find({
									pageNo: '1',
									pageSize: '30'
								}).then((res) => {
									this.girdData = res.data.output.data;
									this.totalItems = res.data.output.total;
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
			/*刷新*/
			refresh() {
				this.subjectSearch = '';
				if(this.currentPage != 1) {
					this.currentPageSize = 30;
					this.currentPage = 1;
				} else {
					find({
						pageNo: '1',
						pageSize: '30'
					}).then((res) => {
						this.girdData = res.data.output.data;
						this.totalItems = res.data.output.total;
						this.currentPage = 1;
						this.currentPageSize = 30;
					});
				}
			},
			/*删除*/
			deleteSubject() {
				if(this.selectItemsLength > 0) {
					var ids = [];
					for(var i = 0; i < this.multipleSelection.length; i++) {
						ids.push(this.multipleSelection[i].paperId);
					}
					var id = ids.join(',');
					console.log(id);
					this.$confirm('您确定要删除吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						deletePaper({
							ids: id
						}).then((res) => {
							if(res.data.status == 0) {
								this.$message({
									showClose: true,
									message: '删除成功！',
									type: 'success'
								});
								find({
									pageNo: '1',
									pageSize: '30'
								}).then((res) => {
									this.girdData = res.data.output.data;
									this.totalItems = res.data.output.total;
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
			/*发布*/
			publish() {
				if(this.selectItemsLength > 0) {
					var ids = [];
					var status = [];
					debugger;
					for(var i = 0; i < this.multipleSelection.length; i++) {
						ids.push(this.multipleSelection[i].paperId);
						if(status.indexOf(this.multipleSelection[i].status) == -1) {
							status.push(this.multipleSelection[i].status);
						}
					}
					var id = ids.join(',');
					var stat = status.join(',');
					
					if(stat == "审核通过") {
						updatePaperList({
							ids: id,
							status: '5'
						}).then((res) => {
							if(res.data.status == 0) {
								this.$message({
									showClose: true,
									message: '发布成功！',
									type: 'success'
								});
								find({
									pageNo: '1',
									pageSize: '30'
								}).then((res) => {
									this.girdData = res.data.output.data;
									this.totalItems = res.data.output.total;
									this.currentPageSize = 30;
									this.currentPage = 1;
								});
							} else {
								this.$message({
									showClose: true,
									message: '发布失败！',
									type: 'error'
								});
							}
						});
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

		},
		computed: {
			loading() {
				return this.$store.state.tableLoading.graduation;
			}
		},

	}
</script>

<style scoped="scoped">
	.box {
		height: inherit;
		width: inherit;
	}
	
	.top {
		width: 100%;
		position: relative;
		height: 40px !important;
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