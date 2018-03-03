<template>
	<div class="box">
		<div id="left">
			<el-upload class="upload-demo" drag :action="importFileUrl" :data="upLoadData" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将开题报告文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</div>
		<div id="right">
			<el-table :data="openingDate" size="small" height="510" border style="width: 100%">
				<el-table-column type="index" fixed width="55" prop="id" align="center">
				</el-table-column>
				<el-table-column prop="date" label="日期" width="120" align="center">
				</el-table-column>
				<el-table-column prop="name" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="province" label="省份" align="center">
				</el-table-column>
				<el-table-column prop="city" label="城市" align="center">
				</el-table-column>
				<el-table-column prop="address" label="地址" align="center" width="260">
				</el-table-column>
				<el-table-column prop="zip" label="邮编" align="center">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
						<el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				openingDate: [],
				importFileUrl: "https://jsonplaceholder.typicode.com/posts/",
				upLoadData: {
					userId: '要传递的用户信息参数'
				}
			}
		},
		created: function() {
			axios.get('http://localhost:8080/static/opening.json').then((res) => {
				var result = res.data.openingDate
				this.openingDate = result;
				console.log(result)
			});
		},
		methods: {
			downLoad(row) {
				window.open("http://183.63.70.12:25000/api/wav/", '_blank');

			},
			deleteRow(index, row) {
				this.$confirm('此操作将永久删除用户 , 是否继续?', '提示', {
						type: 'warning'
					})
					.then(() => { // 向请求服务端删除 
						var resource = this.$resource(this.url + "{/id}");
						resource.delete({
								id: row.id
						}).then((response) => {
								this.$message.success('删除成功');
								this.getUsers();
						}).catch((response) => {
								this.$message.error('删除失败!');
							});
					}).catch(() => {
						this.$message.info('已取消操作!');
					});
			}
		}
		}
</script>

<style>
	.box {
		position: relative;
		height: 100%;
	}
	
	#left {
		width: 40%;
		float: left;
		height: 100%;
	}
	
	#right {
		width: 60%;
		float: right;
		height: 100%;
	}
	
	.upload-demo {
		position: absolute;
		top: 50%;
		left: 4%;
		margin-top: -90px;
	}
</style>