<template>
	<div class="dialog">
		<div class="loginPage">
			<h2>毕业设计管理系统</h2>
			<el-form label-width="50px" class="demo-ruleForm" v-bind:rules="rules" ref="ruleForm" v-bind:model="ruleForm">
				<el-form-item label="账号" prop="name">
					<el-input type="text" auto-complete="off" v-model="ruleForm.name" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" auto-complete="off" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item label="验证" prop="code">
					<div class="ln">
						<div id="dom_id" v-model="ruleForm.code"></div>
					</div>
					<input type='hidden' id='csessionid' name='csessionid' />
					<input type='hidden' id='sig' name='sig' />
					<input type='hidden' id='token' name='token' />
					<input type='hidden' id='scene' name='scene' />
				</el-form-item>
				<el-form-item>
					<!-- 点击进行登录提交 -->
					<el-button type="primary" v-on:click="handleSubmit">登录</el-button>
					<!-- 点击重置表单 -->
					<el-button v-on:click="handleReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			// 姓名验证
			let validatorName = function(rule, value, callback) {
				if(!value) {
					callback(new Error('请输入账号'))
				} else {
					callback()
				}
			}
			// 密码验证
			let validatorPass = (rule, value, callback) => {
				if(!value) {
					callback(new Error('请输入密码'))
				} else {
					callback()
				}
			}
			return {
				// 表单数据
				ruleForm: {
					code: '',
					name: '',
					password: '',
				},
				// 验证规则
				rules: {
					name: [{
						validator: validatorName,
						trigger: 'blur'
					}],
					password: [{
						validator: validatorPass,
						trigger: 'blur' /*失去焦点*/
					}]
				}
			}
		},
		// 方法
		methods: {
			// 表单提交
			handleSubmit() {
				var _this=this;
				// 验证表单
				if(!this.ruleForm.name || !this.ruleForm.password) {
					this.$message({
						showClose: true,
						message: '用户名或密码不能为空！！！',
						type: 'warning'
					});
				} else {
					var param = {
						account: this.ruleForm.name,
						password: this.ruleForm.password
					};
					this.GLOBAL_Http(this.$http, "/GTMS/api/user/login?", 'GET', param, function(data) {
						_this.$router.push({
							path: '/home'
						});

						alert('登录成功');
					}, function(data) {
						debugger;
						alert(data.message);
					});

//					loginSys({
//						name: this.name,
//						password: password
//					}).then((res) => {
//						if(res.data.code == 1) {
//							this.$router.push({
//								path: '/home'
//							});
//						} else if(res.data.code == 2) {
//							this.$message({
//								showClose: true,
//								message: '用户名或密码错误！',
//								type: 'error'
//							});
//							this.password = '';
//							this.refreshCaptcha();
//						} else if(res.data.code == 3) {
//							this.$message({
//								showClose: true,
//								message: '该用户已离职，无法登录本系统！',
//								type: 'error'
//							});
//							this.password = '';
//							this.refreshCaptcha();
//						}
//					});
				}
			},
			// 重置表单
			handleReset() {
				this.$refs.ruleForm.resetFields()
			}
		},
		mounted() {
			var nc = new noCaptcha();
			var nc_appkey = 'FFFF00000000017847B2'; // 应用标识,不可更改
			var nc_scene = 'login'; //场景,不可更改
			var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
			var nc_option = {
				renderTo: '#dom_id', //渲染到该DOM ID指定的Div位置
				appkey: nc_appkey,
				scene: nc_scene,
				token: nc_token,
				callback: function(data) { // 校验成功回调
					document.getElementById('csessionid').value = data.csessionid;
					document.getElementById('sig').value = data.sig;
					document.getElementById('token').value = nc_token;
					document.getElementById('scene').value = nc_scene;
				}
			};
			nc.init(nc_option);
		}
	}
</script>

<style>
	html,
	body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		position: relative;
		overflow: hidden;
	}
	
	h2 {
		color: #FFFFFF;
	}
	
	.dialog {
		width: 100%;
		height: 700px;
		background: url(../assets/bg.jpg) no-repeat;
		background-size: 100%;
		margin-top: 3%;
	}
	
	.loginPage {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -150px;
		margin-left: -200px;
		width: 400px;
		min-height: 300px;
		padding: 30px 20px 20px;
		border-radius: 10px;
		box-sizing: border-box;
		background-color: transparent;
		/*必须将背景色设为透明，否则无效。（除非对于要设置的元素本身已经是透明的，如：span元素等）*/
		background-color: rgba(0, 0, 0, 0.2);
		/*opacity: 0.7;*/
	}
	
	.el-form-item__label {
		color: #FFFFFF;
	}
</style>