<template>
	<div class="box">
		<div class="block">
			<el-table :data="girdData" size="small" height="510" border style="width: 100%">
				<el-table-column type="index" fixed width="55" prop="documentIdExt" align="center">
				</el-table-column>
				<el-table-column prop="paperTitle" label="论文题目" align="center">
				</el-table-column>
				<el-table-column prop="createByName" label="上传人" align="center">
				</el-table-column>
				<el-table-column prop="documentName" label="文件名" width="200" align="center">
				</el-table-column>
				<el-table-column prop="utcCreate" label="上传时间" align="center">
				</el-table-column>
				<el-table-column prop="documentType" label="文件类型" align="center">
				</el-table-column>
				<el-table-column prop="documentStatus" label="状态" align="center">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-upload :action="importFileUrl" name="file" :headers="uploadHeaders" :data="upLoadData(scope.row)" :onError="uploadError" :onSuccess="uploadSuccess">
							<el-button slot="trigger" size="small" type="text">上传</el-button>
						</el-upload>
						<el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
						<el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { findReport, deleteDocument } from '../../../../api/api.js'
	export default {
		data() {
			return {
				girdData: [],
				importFileUrl: this.getBaseURL() + '/api/admin/admindocumentext/upload_document',
				uploadHeaders: {
					'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1MjIyNDU2OTQsInN1YiI6IntcInJvbGVpZFwiOlwiLCwsLCxcIixcInVzZXJpZFwiOjMxLFwicGxhdGZvcm1cIjpcIjEsMiw1LDlcIixcInVzZXJuYW1lXCI6XCJCVk4wMDFcIn0iLCJleHAiOjE1MjMxMDk2OTR9.ChE_a5sJxmRGHo6rcEJl181kyS0tV9u9Y9051mbi_M0',
					'Accept-Language': 'en-US'
				},
			};
		},
		created: function() {
			/*axios.get('http://localhost:8080/static/opening.json').then((res) => {
				var result = res.data.openingDate;
				this.openingDate = result;
				console.log(result);
			});*/
			findReport({
				userId: getUserInfo().userId,
				pageNo: '1',
				pageSize: '30'
			}).then((res) => {
				console.log(res);
				this.girdData = res.data.output.data;
				this.totalItems = res.data.output.total;
			});
		},
		computed: {

		},
		methods: {
			handleSizeChange(size) {
				this.currentPage = 1;
				findReport({
					pageNo: size,
					page: this.currentPage,
				}).then((res) => {
					this.girdData = res.data.output.data;
					this.currentPageSize = size;
					this.totalItems = res.data.output.total;
				});
			},
			handleCurrentChange(currentPage) {
				findReport({
					pageNo: this.currentPageSize,
					page: currentPage,
				}).then((res) => {
					this.girdData = res.data.output.data;
					this.currentPage = currentPage;
					this.totalItems = res.data.output.total;
				});
			},
			export_path(data, url) {
				var array = new Array();
				for(var a in data) {
					array.push(a + "=" + data[a]);
				}
				var string = array.join("&");
				var myUrl = this.getBaseURL() + url + string;
				return myUrl;
			},
			downLoad(row) {
				var paramObj = {
					eq_document_id: row.documentIdExt
				}
				window.open(this.export_path(paramObj, "/api/admin/admindocumentext/portal/export_document?"), "_blank");

			},
			upLoadData(row) {
				var param={}
				param['documentType'] = 1;
				param['belongTo'] = row.teacherId;
				param['uploadBy'] = getUserInfo().userId;
				param['relateTo'] = row.paperId;
				return param;
			},
			uploadError(response, file, fileList) {
				this.$message({
					showClose: true,
					message: "上传失败，请重新上传",
					type: 'error'
				});
			},
			uploadSuccess(response, file, fileList) {
				this.$message({
					showClose: true,
					message: "上传成功",
					type: 'success'
				});

				findReport({
					userId: getUserInfo().userId,
					pageNo: '1',
					pageSize: '30'
				}).then((res) => {
					this.girdData = res.data.output.data;
					this.totalItems = res.data.output.total;
					this.currentPage = 1;
					this.currentPageSize = 30;
				});
			},
			//			upload(row, event) {
			//				debugger;
			//				event.preventDefault();
			//				let formData = new FormData();
			//				formData.append('belongTo', row.id);
			////				formData.append('createBy',getUserInfo().userId);
			//				let config = {
			//					headers: {
			//						'Content-Type': 'multipart/form-data'
			//					}
			//				}
			//				this.$http.post('/api/admin/admindocumentext/upload_document', formData, config).then(function(res) {
			//					if(res.data.status == 0) {
			//						this.$message({
			//							showClose: true,
			//							message: '录入成功！',
			//							type: 'success'
			//						});
			//					}
			//				})
			//			},
			deleteRow(index, row) {
				this.$confirm('您确定要删除吗？', '提示', {
					type: 'warning'
				}).then(() => {
					debugger;
					deleteDocument({
						ids: row.documentIdExt
					}).then((res) => {
						if(res.data.status == 0) {
							this.$message({
								showClose: true,
								message: '删除成功！',
								type: 'success'
							});
							findReport({
								userId: getUserInfo().userId,
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
								message: "删除失败",
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
		mounted() {

		},

	}
</script>

<style scoped="scoped">
	.box {
		height: 100%;
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