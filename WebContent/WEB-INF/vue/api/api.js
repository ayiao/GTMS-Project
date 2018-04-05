import Vue from 'vue'
import axios from 'axios'
import router from '../src/router/index.js'
import store from '../vuex/index.js'
import qs from 'qs'

axios.defaults.timeout = 60000; //响应时间
axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8'; //配置请求头
axios.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1MjIyNDU2OTQsInN1YiI6IntcInJvbGVpZFwiOlwiLCwsLCxcIixcInVzZXJpZFwiOjMxLFwicGxhdGZvcm1cIjpcIjEsMiw1LDlcIixcInVzZXJuYW1lXCI6XCJCVk4wMDFcIn0iLCJleHAiOjE1MjMxMDk2OTR9.ChE_a5sJxmRGHo6rcEJl181kyS0tV9u9Y9051mbi_M0'; //配置请求头
axios.defaults.headers['Accept-Language'] = 'en-US'; //配置请求头
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/apiurl';
//返回状态判断(添加响应拦截器)
Vue.prototype.$http = axios;
Vue.http = axios;
let base = 'http://35091590.all123.net:8080';
//let base = 'http://localhost:8080';

//let base = 'http://112.74.191.64:8080/gtms';

export default {}

const catchError = error => {
	console.log(error);

}
/*获取编辑发送列表接口*/
export const findList = params => {
	return axios.post(`${base}/api/admin/adminpaperext/find_list`, params).catch((error) => {
		catchError(error)
	});
};
/*获取编辑发送列表接口*/
export const find = params => {
	return axios.post(`${base}/api/admin/adminpaperext/find`, params).catch((error) => {
		catchError(error)
	});
};
//导师新增论文题目接口
export const addSubjectInfo = params => {
	return axios.post(`${base}/api/admin/adminpaperext/save_paper`, params).catch((error) => {
		catchError(error)
	});
};
//导师编辑论文题目接口
export const updatePaper = params => {
	return axios.post(`${base}/api/admin/adminpaperext/update_paper`, params).catch((error) => {
		catchError(error)
	});
};
//导师上传开题报告接口
export const uploadDocument = params => {
	return axios.post(`${base}/api/admin/admindocumentext/upload_document`, params).catch((error) => {
		catchError(error)
	});
};
//导师删除题目接口
export const deletePaper = params => {
	return axios.post(`${base}/api/admin/adminpaperext/delete_paper`, params).catch((error) => {
		catchError(error)
	});
};
//导师操作多条数据接口
export const updatePaperList = params => {
	return axios.post(`${base}/api/admin/adminpaperext/update_paper_list`, params).catch((error) => {
		catchError(error)
	});
};
//导师审核题目接口
export const update = params => {
	return axios.post(`${base}/api/admin/adminuserpaperext/update_user_paper_list`, params).catch((error) => {
		catchError(error)
	});
};
//导师获取开题报告列表接口
export const findReport = params => {
	return axios.post(`${base}/api/admin/admindocumentext/find_list`, params).catch((error) => {
		catchError(error)
	});
};
//导师删除开题报告接口
export const deleteDocument = params => {
	return axios.post(`${base}/api/admin/admindocumentext/delete_document`, params).catch((error) => {
		catchError(error)
	});
};
//管理员管理公告接口
export const findAnnounce = params => {
	return axios.post(`${base}/api/admin/adminnoticeext/find`, params).catch((error) => {
		catchError(error)
	});
};
//管理员管理公告详情接口
export const create = params => {
	return axios.post(`${base}/api/admin/adminnoticeext/create`, params).catch((error) => {
		catchError(error)
	});
};
//管理员编辑公告详情接口
export const updateNotice = params => {
	return axios.post(`${base}/api/admin/adminnoticeext/update_notice`, params).catch((error) => {
		catchError(error)
	});
};
//管理员发布公告详情接口
export const publishNotice = params => {
	return axios.post(`${base}/api/admin/adminnoticeext/update_notice_list`, params).catch((error) => {
		catchError(error)
	});
};
//管理员删除公告详情接口
export const remove = params => {
	return axios.post(`${base}/api/admin/adminnoticeext/delete_notice`, params).catch((error) => {
		catchError(error)
	});
};
