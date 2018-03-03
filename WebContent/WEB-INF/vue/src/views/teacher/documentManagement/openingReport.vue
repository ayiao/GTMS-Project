<template>
	<div class="box">
		<div id="left">
			<el-upload class="upload-demo" :auto-upload="flase" drag :action="importFileUrl" :data="upLoadData" :before-upload="beforeUpload" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将开题报告文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<!--<el-button type="primary" @click="newSubmitForm()" class="yes-btn">
				确 定
			</el-button>-->
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
				/*importFileUrl: "https://jsonplaceholder.typicode.com/posts/",*/
				upLoadData: {
					userId: '要传递的用户信息参数'
				}
			}
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
			newVideo(data) {
				debugger;
				return axios({
					method: 'post',
					url: 'https://jsonplaceholder.typicode.com/posts/',
					timeout: 20000,
					data: data
				})
			},
			beforeUpload(file) {
				console.log("file="+file);
				let fd = new FormData();
				fd.append('file', file);
				fd.append('groupId', this.groupId);
				debugger;
				this.$options.methods.newVideo(fd);
				return true;
			},
			newSubmitForm() {
				this.$refs.newupload.submit()
			},

			downLoad(row) {
				window.open("http://183.63.70.12:25000/api/wav/", '_blank');

			},
			deleteRow(index, row) {
				   this.$confirm('您确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    delUserGroup({id:row.id}).then((res) => {
                    if(res.data.code==1){
                    this.$message({
                        showClose: true,
                        message: '删除成功！',
                        type: 'success'
                    });
                    getUserGroupList({rows:'30',userGroupName:this.groupSearch}).then((res) => {
                        this.girdData=res.data.rows;
                    this.totalItems=res.data.total;
                    this.currentPage=1;
                    this.currentPageSize=30;
                });
                }else{
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