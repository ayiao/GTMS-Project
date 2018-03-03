import Vue from 'vue'
import axios from 'axios'
import router from '../src/router/index.js'
import store from '../vuex/index.js'
import qs from 'qs'

axios.defaults.timeout = 60000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';//配置请求头
axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'':'/apiurl';
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
	config => {
		config.data = qs.stringify(config.data);
		let baseurl = process.env.NODE_ENV === 'production'?'':'/apiurl';
		switch(config.url){
			default:
				break;
			case baseurl+"/api/checkCodeController/getImage":
				store.commit('showLoading');
				break;
			case baseurl+"/indexController/login":
				store.commit('showLoading');
				break;
			case baseurl+"/api/menuController/getMenuToRole":
				store.commit('showLoading');
				break;
			case baseurl+"/indexController/logout":
				store.commit('showLoading');
				break;
			case baseurl+"/itsmController/ItsmInterface":
				store.commit('showLoading');
				break;
			case baseurl+"/api/uploadFileController/updateStandardTime":
				store.commit('showLoading');
				break;
			case baseurl+"/api/uploadFileController/uploadJobId":
				store.commit('showLoading');
				break;
			case baseurl+"/api/uploadFileController/upload":
				store.commit('showLoading');
				break;
			case baseurl+"/api/userController/getPageList":
				store.commit('showTableLoading','userManage');
				break;
			case baseurl+"/api/logController/getPageList":
				store.commit('showTableLoading','operateList');
				break;
			case baseurl+"/api/menuController/getDataList":
				store.commit('showTableLoading','menuList');
				break;
			case baseurl+"/api/joboController/getDataList":
				store.commit('showTableLoading','orderManage');
				break;
			case baseurl+"/api/jobTypeController/getComboTree":
        store.commit('showTableLoading','jobTypeList');
				break;
			case baseurl+"/api/newCountJobController/countTimeForTotal":
				store.commit('showTableLoading','countAll');
				break;
			case baseurl+"/api/newCountJobController/getStatisticalAnalysisByGroup":
        let page=config.data;
        if (page.indexOf('excHangXiang=0')!=-1){
          store.commit('showTableLoading','departCount');
        }
        if (page.indexOf('excHangXiang=1')!=-1){
          store.commit('showTableLoading','departCountNotItem');
        }
				break;
			case baseurl+"/api/newCountJobController/countTimeForUserName":
				store.commit('showTableLoading','personalCount');
				break;
			case baseurl+"/api/newCountJobController/countEventReqForUserName":
				store.commit('showTableLoading','personalCountNotItem');
				break;
		}
		return config;
	},
	error=>{
		console.log(error);
		Vue.prototype.$message.error('错了哦,这是一条错误消息');
		return Promise.reject(error);
	}
);
//返回状态判断(添加响应拦截器)
// http response 拦截器
axios.interceptors.response.use(
	response => {
		let newobj = response.data.object,
			baseurl = process.env.NODE_ENV === 'production'?'':'/apiurl';
		let errorMessage = '';
		if(response.data.message == "登录失败！" && response.data.code == "0"){
			errorMessage = "登录授权已过期，请重新登录！";
			store.commit('setErrorMsg',errorMessage);
			setTimeout( () => { router.push({path:'/'}) },3000);
		}
		switch(response.config.url){
			default:
				break;
			case baseurl+"/api/checkCodeController/getImage":
				store.commit('hideLoading');
				break;
			case baseurl+"/indexController/login":
				store.commit('hideLoading');
				break;
			case baseurl+"/api/menuController/getMenuToRole":
				store.commit('hideLoading');
				break;
			case baseurl+"/indexController/logout":
				store.commit('hideLoading');
				break;
			case baseurl+"/itsmController/ItsmInterface":
				store.commit('hideLoading');
				break;
			case baseurl+"/api/uploadFileController/updateStandardTime":
				store.commit('hideLoading');
				break;
			case baseurl+"/api/uploadFileController/uploadJobId":
				store.commit('hideLoading');
				break;
			case baseurl+"/api/uploadFileController/upload":
				store.commit('hideLoading');
				break;
			case baseurl+"/api/userController/getPageList":
				store.commit('hideTableLoading','userManage');
				break;
			case baseurl+"/api/logController/getPageList":
				store.commit('hideTableLoading','operateList');
				break;
			case baseurl+"/api/menuController/getDataList":
				store.commit('hideTableLoading','menuList');
				break;
			case baseurl+"/api/joboController/getDataList":
				store.commit('hideTableLoading','orderManage');
				break;
			case baseurl+"/api/jobTypeController/getComboTree":
        store.commit('hideTableLoading','jobTypeList');
				break;
			case baseurl+"/api/newCountJobController/countTimeForTotal":
				store.commit('hideTableLoading','countAll');
				break;
			case baseurl+"/api/newCountJobController/getStatisticalAnalysisByGroup":
        let page=response.config.data;
        if (page.indexOf('excHangXiang=0')!=-1){
          store.commit('hideTableLoading','departCount');
        }
        if (page.indexOf('excHangXiang=1')!=-1){
          store.commit('hideTableLoading','departCountNotItem');
        }
				break;
			case baseurl+"/api/newCountJobController/countTimeForUserName":
				store.commit('hideTableLoading','personalCount');
				break;
			case baseurl+"/api/newCountJobController/countEventReqForUserName":
				store.commit('hideTableLoading','personalCountNotItem');
				break;
		}

		return response;
	},
	error => {
		let errorMessage = '';
		if (error.response) {
			switch (error.response.status) {
				case -1:
					errorMessage = '网络连接超时！';
					break;
				case 408:
					errorMessage = '网络连接超时！';
					break;
				case 500:
					errorMessage = '服务器繁忙，请重新登入。';
					break;
				case 404:
					errorMessage = '错误代码：404，服务器未找到请求的网页。';
					break;
				default:
					errorMessage = '错误代码：' + error.response.status;
					break;
			}
		}
		store.commit('hideLoading');
		return Promise.reject(error.response)   // 返回接口返回的错误信息
	}
);
Vue.prototype.$http = axios;
Vue.http = axios;
let base = '';
export default {}

const catchError = error => {
	console.log(error);

}
//登录页验证码接口
export const getImage = params => {return axios.post(`${base}/api/checkCodeController/getImage`,params).catch((error) => {catchError(error)});};
//登录接口
export const loginSys = params => {return axios.post(`${base}/indexController/login`,params).catch((error) => {catchError(error)});};
//验证验证码接口
export const checkCode = params => {return axios.post(`${base}/api/checkCodeController/checkCode`,params).catch((error) => {catchError(error)});};
//获取导航栏接口
export const getMenu = params => {return axios.post(`${base}/api/menuController/getMenuToRole`,params).catch((error) => {catchError(error)});};
//首页echarts初始化接口
export const getJobCount = params => {return axios.post(`${base}/api/indexController/getJobCountBygroup`,params).catch((error) => {catchError(error)});};
export const getJobTime = params => {return axios.post(`${base}/api/indexController/getJobTimeOrderByUser`,params).catch((error) => {catchError(error)});};
export const getEvaluate = params => {return axios.post(`${base}/api/indexController/getEvaluate`,params).catch((error) => {catchError(error)});};
export const getGlobalJobRatio = params => {return axios.post(`${base}/api/indexController/getGlobalJobRatio`,params).catch((error) => {catchError(error)});};
export const getAVGEventFinishTime = params => {return axios.post(`${base}/api/indexController/getAVGEventFinishTime`,params).catch((error) => {catchError(error)});};
export const getAVGFinishJobCountOnDay = params => {return axios.post(`${base}/api/indexController/getAVGFinishJobCountOnDay`,params).catch((error) => {catchError(error)});};
export const getEventResponseRate = params => {return axios.post(`${base}/api/indexController/getEventResponseRate`,params).catch((error) => {catchError(error)});};
export const getAVGResponseTime = params => {return axios.post(`${base}/api/indexController/getAVGResponseTime`,params).catch((error) => {catchError(error)});};
//用户管理select框数据接口
export const getComboTree = params => {return axios.post(`${base}/api/departController/getComboTree`,params).catch((error) => {catchError(error)});};
//用户管理数据列表接口
export const getPageList = params => {return axios.post(`${base}/api/userController/getPageList`,params).catch((error) => {catchError(error)});};
//退出登录接口
export const exitSys = params => {return axios.post(`${base}/indexController/logout`,params).catch((error) => {catchError(error)});};
//用户管理页面数据操作接口
export const getOneData = params => {return axios.post(`${base}/api/userController/getOneData`,params).catch((error) => {catchError(error)});};
export const delUser = params => {return axios.post(`${base}/api/userController/delUser`,params).catch((error) => {catchError(error)});};
export const getRoleList = params => {return axios.post(`${base}/api/userController/getRoleList`,params).catch((error) => {catchError(error)});};
export const getGroupList = params => {return axios.post(`${base}/api/userController/getGroupList`,params).catch((error) => {catchError(error)});};
export const addUser = params => {return axios.post(`${base}/api/userController/addUser`,params).catch((error) => {catchError(error)});};
export const editUser = params => {return axios.post(`${base}/api/userController/editUser`,params).catch((error) => {catchError(error)});};
export const resetUserPassword = params => {return axios.post(`${base}/api/userController/resetUserPassword`,params).catch((error) => {catchError(error)});};
//接口管理
export const ItsmInterface = params => {return axios.post(`${base}/itsmController/ItsmInterface`,params).catch((error) => {catchError(error)});};
//文件上传
export const updateStandardTime = params => {return axios.post(`${base}/api/uploadFileController/updateStandardTime`,params).catch((error) => {catchError(error)});};
export const uploadJobId = params => {return axios.post(`${base}/api/uploadFileController/uploadJobId`,params).catch((error) => {catchError(error)});};
export const upload = params => {return axios.post(`${base}/api/uploadFileController/upload`,params).catch((error) => {catchError(error)});};
export const executeSQLbySelect = params => {return axios.post(`${base}/api/executeSQLController/executeSQLbySelect`,params).catch((error) => {catchError(error)});};
//操作日志
export const getLogPageList = params => {return axios.post(`${base}/api/logController/getPageList`,params).catch((error) => {catchError(error)});};
//角色管理
export const getRolePageList = params => {return axios.post(`${base}/api/roleController/getPageList`,params).catch((error) => {catchError(error)});};
export const addRole = params => {return axios.post(`${base}/api/roleController/addRole`,params).catch((error) => {catchError(error)});};
export const editRole = params => {return axios.post(`${base}/api/roleController/editRole`,params).catch((error) => {catchError(error)});};
export const delRole = params => {return axios.post(`${base}/api/roleController/delRole`,params).catch((error) => {catchError(error)});};
export const getComboTreeUser = params => {return axios.post(`${base}/api/roleUserController/getComboTreeUser`,params).catch((error) => {catchError(error)});};
export const saveFunction = params => {return axios.post(`${base}/api/roleUserController/saveFunction`,params).catch((error) => {catchError(error)});};
export const findUserOutRole = params => {return axios.post(`${base}/api/roleController/findUserOutRole`,params).catch((error) => {catchError(error)});};
export const findUserInRole = params => {return axios.post(`${base}/api/roleController/findUserInRole`,params).catch((error) => {catchError(error)});};
export const addUsersInRole = params => {return axios.post(`${base}/api/roleUserController/addUsersInRole`,params).catch((error) => {catchError(error)});};
export const delUsersInRole = params => {return axios.post(`${base}/api/roleUserController/delUsersInRole`,params).catch((error) => {catchError(error)});};
//数据字典
export const getTypePageList = params => {return axios.post(`${base}/api/typeGroupController/getPageList`,params).catch((error) => {catchError(error)});};
export const addType = params => {return axios.post(`${base}/api/typeGroupController/add`,params).catch((error) => {catchError(error)});};
export const editType = params => {return axios.post(`${base}api/typeGroupController/edit`,params).catch((error) => {catchError(error)});};
export const delType = params => {return axios.post(`${base}/api/typeGroupController/del`,params).catch((error) => {catchError(error)});};
export const getTypeGroupList = params => {return axios.post(`${base}/api/typeController/getPageList`,params).catch((error) => {catchError(error)});};
export const addTypeList = params => {return axios.post(`${base}/api/typeController/add`,params).catch((error) => {catchError(error)});};
export const editTypeList = params => {return axios.post(`${base}/api/typeController/edit`,params).catch((error) => {catchError(error)});};
export const delTypeList = params => {return axios.post(`${base}/api/typeController/del`,params).catch((error) => {catchError(error)});};
//功能管理列表
export const getMenuList = params => {return axios.post(`${base}/api/menuController/getDataList`,params).catch((error) => {catchError(error)});};
//功能管理图标数据
export const getIconList = params => {return axios.post(`${base}/api/menuController/getIconList`,params).catch((error) => {catchError(error)});};
//添加菜单
export const addMenu = params => {return axios.post(`${base}/api/menuController/addMenu`,params).catch((error) => {catchError(error)});};
//删除菜单
export const delMenu = params => {return axios.post(`${base}/api/menuController/delMenu`,params).catch((error) => {catchError(error)});};
//获取某一菜单信息
export const getOneMenu = params => {return axios.post(`${base}/api/menuController/getOneData`,params).catch((error) => {catchError(error)});};
//编辑菜单
export const editMenu = params => {return axios.post(`${base}/api/menuController/editMenu`,params).catch((error) => {catchError(error)});};
//图标管理
export const getIconPageList = params => {return axios.post(`${base}/api/iconController/getPageList`,params).catch((error) => {catchError(error)});};
export const getImgStream = params => {return axios.post(`${base}/api/iconController/getImgStream`,params).catch((error) => {catchError(error)});};
export const getOneIconData = params => {return axios.post(`${base}/api/iconController/getOneData`,params).catch((error) => {catchError(error)});};
export const delIcon = params => {return axios.post(`${base}/api/iconController/del`,params).catch((error) => {catchError(error)});};
//用户组管理
export const getUserGroupList = params => {return axios.post(`${base}/api/userGroupController/getPageList`,params).catch((error) => {catchError(error)});};
export const addUsersInGroup = params => {return axios.post(`${base}/api/userGroupRelController/addUsersInGroup`,params).catch((error) => {catchError(error)});};
export const delUsersInGroup = params => {return axios.post(`${base}/api/userGroupRelController/delUsersInGroup`,params).catch((error) => {catchError(error)});};
export const addUserGroup = params => {return axios.post(`${base}/api/userGroupController/addUserGroup`,params).catch((error) => {catchError(error)});};
export const editUserGroup = params => {return axios.post(`${base}/api/userGroupController/editUserGroup`,params).catch((error) => {catchError(error)});};
export const delUserGroup = params => {return axios.post(`${base}/api/userGroupController/delUserGroup`,params).catch((error) => {catchError(error)});};
export const findUserOutGroup = params => {return axios.post(`${base}/api/userGroupController/findUserOutGroup`,params).catch((error) => {catchError(error)});};
export const findUserInGroup = params => {return axios.post(`${base}/api/userGroupController/findUserInGroup`,params).catch((error) => {catchError(error)});};
//工单管理
export const getOrderList = params => {return axios.post(`${base}/api/joboController/getDataList`,params).catch((error) => {catchError(error)});};
export const editAllJob = params => {return axios.post(`${base}/api/joboController/editAllJob`,params).catch((error) => {catchError(error)});};
export const getTypeComboTree = params => {return axios.post(`${base}/api/jobTypeController/getComboTree2`,params).catch((error) => {catchError(error)});};
export const deleteJobDate = params => {return axios.post(`${base}/api/joboController/deleteJobDate`,params).catch((error) => {catchError(error)});};
export const updateOneData = params => {return axios.post(`${base}/api/joboController/updateOneData`,params).catch((error) => {catchError(error)});};
export const getOneOrderData = params => {return axios.post(`${base}/api/joboController/getOneData`,params).catch((error) => {catchError(error)});};

//部门列表
export const getDepartList = params => {return axios.post(`${base}/api/departController/getComboTree`,params).catch((error) => {catchError(error)});};
//添加部门
export const addDepart = params => {return axios.post(`${base}/api/departController/addDepart`,params).catch((error) => {catchError(error)});};
//删除部门
export const delDepart = params => {return axios.post(`${base}/api/departController/delDepart`,params).catch((error) => {catchError(error)});};
//获取某一部门信息
export const getOneDepart = params => {return axios.post(`${base}/api/departController/getOneData`,params).catch((error) => {catchError(error)});};
//编辑部门信息
export const editDepart = params => {return axios.post(`${base}/api/departController/editDepart`,params).catch((error) => {catchError(error)});};
//删除部门成员
export const delDepartUser = params => {return axios.post(`${base}/api/departController/delDepartUser`,params).catch((error) => {catchError(error)});};
//工单类型管理列表
export const jobTypeTree = params => {return axios.post(`${base}/api/jobTypeController/getComboTree`,params).catch((error) => {catchError(error)});};
export const insertExcel2TBJobType = params => {return axios.post(`${base}/api/importExcel2DBController/insertExcel2TBJobType`,params).catch((error) => {catchError(error)});};
//添加工单类型
export const addJobType = params => {return axios.post(`${base}/api/jobTypeController/AddJobType`,params).catch((error) => {catchError(error)});};
//获取工单类型数据
export const getOneJobType = params => {return axios.post(`${base}/api/jobTypeController/getOneData`,params).catch((error) => {catchError(error)});};
//判断编辑工单类型
export const editJobTypeOne = params => {return axios.post(`${base}/api/jobTypeController/PanDuan`,params).catch((error) => {catchError(error)});};
//编辑工单类型
export const editJobTypeTwo = params => {return axios.post(`${base}/api/jobTypeController/editJobType`,params).catch((error) => {catchError(error)});};
//删除工单类型
export const delJobType = params => {return axios.post(`${base}/api/jobTypeController/delJobType`,params).catch((error) => {catchError(error)});};
//用户组下拉列表
export const getAssignGroup = params => {return axios.post(`${base}/api/countJobController/getAssignGroup`,params).catch((error) => {catchError(error)});};
//总体统计分析列表
export const countAllList = params => {return axios.post(`${base}/api/newCountJobController/countTimeForTotal`,params).catch((error) => {catchError(error)});};
//总体统计分析弹窗
export const jobForTotal = params => {return axios.post(`${base}/api/newCountJobController/jobForTotal`,params).catch((error) => {catchError(error)});};
//总体统计分析导出
export const countTimeForTotalExcel = params => {return axios.post(`${base}/api/reportController/countTimeForTotalExcel`,params).catch((error) => {catchError(error)});};
//个人统计
export const xyTimeoutOrJjTimeoutJobForUser = params => {return axios.post(`${base}/api/newCountJobController/xyTimeoutOrJjTimeoutJobForUser`,params).catch((error) => {catchError(error)});};
export const countTimeForUserName = params => {return axios.post(`${base}/api/newCountJobController/countTimeForUserName`,params).catch((error) => {catchError(error)});};
export const getAssignGroupPer = params => {return axios.post(`${base}/api/countJobController/getAssignGroup`,params).catch((error) => {catchError(error)});};
export const countTimeForUserExcel = params => {return axios.post(`${base}/api/reportController/countTimeForUserExcel`,params).catch((error) => {catchError(error)});};
//个人统计（不含行项单）
export const countEventReqForUserName = params => {return axios.post(`${base}/api/newCountJobController/countEventReqForUserName`,params).catch((error) => {catchError(error)});};
export const xyTimeoutOrJjTimeoutEvnetReqForUser = params => {return axios.post(`${base}/api/newCountJobController/xyTimeoutOrJjTimeoutEvnetReqForUser`,params).catch((error) => {catchError(error)});};
//分配组统计
export const getStatisticalAnalysisByGroup = params => {return axios.post(`${base}/api/newCountJobController/getStatisticalAnalysisByGroup`,params).catch((error) => {catchError(error)});};
export const exportStatisticalAnalysisByGroup = params => {return axios.post(`${base}/api/reportController/exportStatisticalAnalysisByGroup`,params).catch((error) => {catchError(error)});};
export const getJobDetailForUserGroup = params => {return axios.post(`${base}/api/newCountJobController/getJobDetailForUserGroup`,params).catch((error) => {catchError(error)});};
//评价管理
export const getEvaluateByLevel = params => {return axios.post(`${base}/api/evaluateController/getEvaluateByLevel`,params).catch((error) => {catchError(error)});};
export const addEvaluate = params => {return axios.post(`${base}/api/evaluateController/addEvaluate`,params).catch((error) => {catchError(error)});};
export const editEvaluateContent = params => {return axios.post(`${base}/api/evaluateController/editEvaluateContent`,params).catch((error) => {catchError(error)});};
export const delEvaluateContent = params => {return axios.post(`${base}/api/evaluateController/delEvaluateContent`,params).catch((error) => {catchError(error)});};

