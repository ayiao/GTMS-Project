<template>
	<div class="box">
		<div class="top">
			<div class="button">
				<el-button type="text" icon="el-icon-plus" size="small " @click="addAnnounce">新增</el-button>
				<el-button type="text" icon="el-icon-edit" size="small " @click="editAnnounce">编辑</el-button>
				<el-button type="text" icon="el-icon-upload" size="small " @click="publishAnnounce">发布</el-button>
				<el-button type="text" icon="el-icon-upload" size="small " @click="deleteAnnounce">删除</el-button>
				<el-button type="text" icon="el-icon-refresh" size="small" @click="refresh">刷新</el-button>
				<el-button type="text" icon="el-icon-search" size="small" @click="searchAnnounce">搜索</el-button>
			</div>
			<el-form class="searchForm" :inline="true">
				<el-form-item label="标题：" label-width="100px">
					<el-input v-model="subjectSearch" id="subjectSearch" size="mini" style="width:160px;margin-right: 10px" clearable prefix-icon="el-icon-search" placeholder="请搜索公告标题"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="block">
			<el-table :data="girdData" height="430" style="width: 100%" size="mini" sortable="true" border stripe @selection-change="selectItem">
				<el-table-column type="selection" width="55" prop="noticeId" align="center">
				</el-table-column>
				<el-table-column prop="noticeTitle" label="公告标题" width="240" align="center">
				</el-table-column>
				<el-table-column prop="utcCreate" label="创建时间" width="140" align="center">
				</el-table-column>
				<el-table-column prop="noticeDescription" label="内容" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" align="center">
				</el-table-column>
				<!--<el-table-column fixed="right" label="操作" width="120">
					<template slot-scope="scope">
						<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
							<el-button size="small" type="text">上传附件</el-button>
						</el-upload>
						<el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>-->
				<!--新增  审核中  审核通过  已发布-->
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
			</el-pagination>
		</div>
		<el-dialog title="添加通知" :visible.sync="show.add" size="mini" :close-on-click-modal="false">
			<el-form :model="announceAdd" ref="announceAddForm">
				<el-form-item label="通知标题：" prop="noticeTitle" label-width="120px" :rules="[{ required: true, message: '请输入通知标题' }]">
					<el-input v-model="announceAdd.noticeTitle" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="通知内容：" prop="noticeTitle" label-width="120px" :rules="[{ required: true, message: '请输入通知内容' }]">
					<el-input v-model="announceAdd.noticeDescription" auto-complete="off" type="textarea" :pageNo="3"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -35px;">
				<el-button type="primary" @click="confirmAdd('announceAddForm')">确 定</el-button>
				<el-button @click="show.add = false">取 消</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑通知" :visible.sync="show.edit" size="mini" :close-on-click-modal="false">
			<el-form :model="announceEdit" ref="announceEditForm">
				<el-form-item label="通知标题：" prop="noticeTitle" label-width="120px" :rules="[{ required: true, message: '请输入通知标题' }]">
					<el-input v-model="announceEdit.noticeTitle" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="通知内容：" prop="noticeTitle" label-width="120px" :rules="[{ required: true, message: '请输入通知内容' }]">
					<el-input v-model="announceEdit.noticeDescription" auto-complete="off" type="textarea" :pageNo="3"></el-input>
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
	import { create, findAnnounce, updateNotice, remove,publishNotice } from '../../../../api/api.js'
	export default {
		data() {
			return {
				girdData: [],
				currentPage: 1, //当前页码
				totalItems: 0, //总数据
				currentPageSize: 30, //当前页面显示条数
				show: {
					add: false,
					edit: false,
				},
				announceAdd: {
					noticeTitle: '',
					noticeDescription: '',
				},
				announceEdit: {
					noticeTitle: '',
					noticeDescription: '',
					status: '',
					noticeId: ''
				},
				temp: {
					noticeTitle: '',
					noticeDescription: '',
					status: '',
					noticeId: ''
				}
			}
		},
		activated() {
			this.currentPage = 1;
			this.currentPageSize = 30;
		},
		methods: {
			/*选择行*/
			selectItem(selection) {
				this.multipleSelection = selection;
				this.selectItemsLength = selection.length;
				for(var i = 0; i < selection.length; i++) {
					this.selectItemId = selection[0].noticeId;
					this.temp.noticeTitle = selection[0].noticeTitle;
					this.temp.noticeDescription = selection[0].noticeDescription;
					this.temp.status = selection[0].status;
				}
			},
			handleSizeChange(size) {
				this.currentPage = 1;
				findAnnounce({
					rows: size,
					page: this.currentPage,
				}).then((res) => {
					this.girdData = res.data.output.data;
					this.totalItems = res.data.output.total;
					this.currentPageSize = size;
				});
			},
			handleCurrentChange(currentPage) {
				findAnnounce({
					rows: this.currentPageSize,
					page: currentPage,
				}).then((res) => {
					this.girdData = res.data.output.data;
					this.totalItems = res.data.output.total;
					this.currentPage = currentPage;
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
						create({
							createBy: getUserInfo().userId,
							status: "1",
							noticeTitle: this.announceAdd.noticeTitle,
							noticeDescription: this.announceAdd.noticeDescription,
						}).then((res) => {
							if(res.data.status == 0) {
								this.$message({
									showClose: true,
									message: '录入成功！',
									type: 'success'
								});
								findAnnounce({
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
			/*编辑公告*/
			editAnnounce() {
				if(this.selectItemsLength == 1) {
					if(this.temp.status != "已发布") {
						this.show.edit = true;
						this.announceEdit.noticeTitle = this.temp.noticeTitle;
						this.announceEdit.noticeDescription = this.temp.noticeDescription;
						this.announceEdit.status = this.temp.status;
						this.announceEdit.noticeId = this.selectItemId;
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
					updateNotice({
						updateby: getUserInfo().userId,
						status: "2",
						noticeId: this.selectItemId,
						noticeTitle: this.announceEdit.noticeTitle,
						noticeDescription: this.announceEdit.noticeDescription,
					}).then((res) => {
						if(res.data.status == 0) {
							this.$message({
								showClose: true,
								message: '编辑成功！',
								type: 'success'
							});
							findAnnounce({
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
				});
			},
			/*删除公告*/
			deleteAnnounce() {
				if(this.selectItemsLength > 0) {
					var ids = [];
					for(var i = 0; i < this.multipleSelection.length; i++) {
						ids.push(this.multipleSelection[i].noticeId);
					}
					var id = ids.join(',');
					console.log(id);
					this.$confirm('您确定要删除吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						remove({
							ids: id,
							status: "2",
						}).then((res) => {
							if(res.data.status == 0) {
								this.$message({
									showClose: true,
									message: '删除成功！',
									type: 'success'
								});
								findAnnounce({
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
			/*发布公告*/
			publishAnnounce() {
				if(this.selectItemsLength > 0) {
					var ids = [];
					var status = [];
					for(var i = 0; i < this.multipleSelection.length; i++) {
						ids.push(this.multipleSelection[i].noticeId);
						if(status.indexOf(this.multipleSelection[i].status) == -1) {
							status.push(this.multipleSelection[i].status);
						}
					}
					var id = ids.join(',');
					var stat = status.join(',');

					if(stat != "已发布") {
						publishNotice({
							status:'5',
							ids: id,
							createBy: getUserInfo().userId,
						}).then((res) => {
							if(res.data.status == 0) {
								this.$message({
									showClose: true,
									message: '发布成功！',
									type: 'success'
								});
								findAnnounce({
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
			/*刷新*/
			refresh() {
				this.subjectSearch = '';
				if(this.currentPage != 1) {
					this.currentPageSize = 30;
					this.currentPage = 1;
				} else {
					findAnnounce({
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
			/*搜索公告*/
			searchAnnounce() {
				var param = {
					pageNo: '1',
					pageSize: '30'
				}
				if(this.subjectSearch) {
					param['like_notice_title'] = this.subjectSearch;
				}
				findAnnounce(param).then((res) => {
					this.girdData = res.data.output.data;
					this.totalItems = res.data.output.total;
					this.currentPage = 1;
					this.currentPageSize = 30;
					this.subjectSearch = '';
				});
			},
		},
		computed: {
			loading() {
				return this.$store.state.tableLoading.graduation;
			}
		},
		created: function() {
			findAnnounce({
				pageNo: '1',
				pageSize: '30'
			}).then((res) => {
				console.log(res);
				this.girdData = res.data.output.data;
				this.totalItems = res.data.output.total;
			});
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
</style>