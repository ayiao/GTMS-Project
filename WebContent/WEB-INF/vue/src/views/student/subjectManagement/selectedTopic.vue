<template>
	<div class="box">
		<div class="top">
			<div class="button">
				<el-button type="text" icon="el-icon-check" size="small " @click="isPass('1')">通过</el-button>
				<el-button type="text" icon="el-icon-close" size="small " @click="isPass('2')">不通过</el-button>
				<el-button type="text" icon="el-icon-refresh" size="small" @click="refresh">刷新</el-button>
				<el-button type="text" icon="el-icon-search" size="small" @click="search">搜索</el-button>
			</div>
			<el-form class="searchForm" :inline="true">
				<el-form-item label="论文题目：" label-width="100px">
					<el-input v-model="subjectSearch" id="subjectSearch" size="mini" style="width:160px;margin-right: 10px" clearable prefix-icon="el-icon-search"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="block">
			<el-table :data="girdData" height="430" style="width: 100%" size="mini" sortable="true" border stripe @selection-change="selectItem" @row-click="selectByRow">
				<el-table-column type="selection" width="55" prop="id" align="center">
				</el-table-column>
				<el-table-column prop="paperTitle" label="论文题目" width="240" align="center">
				</el-table-column>
				<el-table-column prop="createByName" label="教师姓名" width="100" align="center">
				</el-table-column>
				<el-table-column prop="selectBy" label="已选学生" width="100" align="center">
				</el-table-column>
				<el-table-column prop="paperDescribtion" label="题目描述" align="center">
				</el-table-column>
				<el-table-column prop="paperType" label="选题类型" width="100" align="center">
				</el-table-column>
				<el-table-column prop="isStudentCreate" label="是否自拟" width="70" align="center">
				</el-table-column>
				<el-table-column prop="selectStatus" label="状态" width="70" align="center">
				</el-table-column>
				<!--新增  审核中  审核通过  已发布-->
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { findList, update } from '../../../../api/api.js'
	export default {
		data() {
			return {
				subjectSearch:'',
				girdData: [],
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
			selectByRow(row) {
				this.$refs.multipleTable.clearSelection();
				this.$refs.multipleTable.toggleRowSelection(this.girdData[(row.rownum_) - (this.currentPage - 1) * this.currentPageSize - 1])
			},
			selectItem(selection) {
				this.multipleSelection = selection;
				this.selectItemsLength = selection.length;
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
			/*题目搜索*/
			search() {
				//				debugger;
				var param = {
					pageNo: '1',
					pageSize: '30',
					eq_status: '5'
				}
				if(this.subjectSearch) {
					param['like_paper_title'] = this.subjectSearch;
				}
				findList(param).then((res) => {
					this.girdData = res.data.output.data;
					this.totalItems = res.data.output.total;
					this.currentPage = 1;
					this.currentPageSize = 30;
				});
			},

			/*通过*/
			isPass(status) {
				debugger;
				if(this.selectItemsLength > 0) {
					var ids = [];
					var stat=[];
					for(var i = 0; i < this.multipleSelection.length; i++) {
						ids.push(this.multipleSelection[i].userPaperId);
						if(stat.indexOf(this.multipleSelection[i].selectStatus) == -1) {
							stat.push(this.multipleSelection[i].selectStatus);
						}
					}
					var id = ids.join(',');
					var stat = status.join(',');
					if(stat == "未确认") {
						update({
							ids: id,
							status: status
						}).then((res) => {
							if(res.data.status == 0) {
								this.$message({
									showClose: true,
									message: '审核成功！',
									type: 'success'
								});
								findList({
									eq_status: '5',
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
									message: '审核失败！',
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
					findList({
						eq_status: '5',
						pageNo: '1',
						pageSize: '30'
					}).then((res) => {
						this.girdData = res.data.output.data;
						this.totalItems = res.data.output.total;
						this.currentPageSize = 30;
						this.currentPage = 1;
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
			findList({
				eq_status: '5',
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