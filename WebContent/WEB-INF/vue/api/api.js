import Vue from 'vue'
import axios from 'axios'
import router from '../src/router/index.js'
import store from '../vuex/index.js'
import qs from 'qs'

axios.defaults.timeout = 60000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';//配置请求头
axios.defaults.headers.post['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1MjEzMzc0OTYsInN1YiI6IntcInJvbGVpZFwiOlwiLFwiLFwidXNlcmlkXCI6MzEsXCJwbGF0Zm9ybVwiOlwiMSwyLDMsNVwiLFwidXNlcm5hbWVcIjpcIkJWTjAwMVwifSIsImV4cCI6MTUyMjIwMTQ5Nn0.-6husDsi6dRRwxINkS_GUwgp54HcvMN_IXENbLdBcew';//配置请求头
axios.defaults.headers.post['Accept-Language'] = 'en-US';//配置请求头
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
let base = 'http://192.168.16.103:8080';
export default {}

const catchError = error => {
	console.log(error);

}
//导师新增论文题目接口
export const addSubjectInfo = params => {return axios.post(`${base}/api/admin/adminpaperext/create`,params).catch((error) => {catchError(error)});};
