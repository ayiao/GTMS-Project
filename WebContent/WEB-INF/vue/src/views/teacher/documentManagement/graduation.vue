<template>
	<div class="box">
		<div class="top">
			<div class="button">
				<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到学院老师</el-button>
				</el-upload>
			</div>
		</div>
		<div class="block">
			<el-table :data="openingDate" size="small" height="510" border style="width: 100%">
				<el-table-column type="index" fixed width="55" prop="id" align="center">
				</el-table-column>
				<el-table-column prop="date" label="上传时间" align="center">
				</el-table-column>
				<el-table-column prop="address" label="开题报告" width="200" align="center">
				</el-table-column>
				<el-table-column prop="name" label="上传人" align="center">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
						<el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="发送开题报告" :visible.sync="show.submit" size="mini" :close-on-click-modal="false">
			<el-form :model="submitTo" ref="submitForm">
				<el-form-item label="院系导师：" prop="teacher" label-width="120px">
					<el-select v-model="submitTo.teacher" clearable placeholder="请选择发送院系导师">
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
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				openingDate: [],
				show: {
					submit: false,
				},
				submitTo: {
					teacher: '',
				},
			};
		},
		created: function() {
			axios.get('http://localhost:8080/static/opening.json').then((res) => {
				var result = res.data.openingDate
				this.openingDate = result;
				console.log(result);
			});
		},
		computed: {

		},
		methods: {
			submitUpload() {
				this.show.submit = true;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			submitTo(formName) {
				debugger;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$refs.upload.submit();
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

			downLoad(row) {
				window.open("http://183.63.70.12:25000/api/wav/", '_blank');

			},
			deleteRow(index, row) {
				this.$confirm('您确定要删除吗？', '提示', {
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
								userGroupName: this.groupSearch
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
			}
		},

	}
</script>

<style scoped="scoped">
	.box {
		height: 100%;
	}
	
	.top {
		width: 100%;
		position: relative;
		height: 80px;
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