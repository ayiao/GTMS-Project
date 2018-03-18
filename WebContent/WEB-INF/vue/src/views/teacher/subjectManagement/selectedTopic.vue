<template>
	<div class="box">
		<div class="top">
			<div class="button">
				<el-button type="text" icon="el-icon-check" size="small " @click="pass">通过</el-button>
				<el-button type="text" icon="el-icon-close" size="small " @click="noPass">不通过</el-button>
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
				<el-table-column prop="title" label="论文题目" width="240" align="center">
				</el-table-column>
				<el-table-column prop="teacher" label="教师姓名" width="100" align="center">
				</el-table-column>
				<el-table-column prop="details" label="题目描述" align="center">
				</el-table-column>
				<el-table-column prop="type" label="选题类型" width="100" align="center">
				</el-table-column>
				<el-table-column prop="self" label="是否自拟" width="70" align="center">
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
			/*通过*/
			pass(){
				
			},
			/*不通过*/
			noPass(){
				
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
		height: 40px ;
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