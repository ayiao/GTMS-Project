// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import api from '../api/api.js'
import store from '../vuex/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import $ from 'jquery'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	api,
	template: '<App/>',
	components: {
		App
	}
})

global.getUserInfo = function() {
	return Vue.prototype.UserInfo;
}

global.setUserInfo = function(UserInfo) {
	Vue.prototype.UserInfo = UserInfo;
}

Vue.prototype.getBaseURL = function() {
	return 'http://35091590.all123.net:8080';
	//	return 'http://112.74.191.64:8080/gtms';

	//		return 'http://localhost:8080';
}

Vue.prototype.GLOBAL_Http = function($http, url, method, data, successCallBack, errorCallBack) {
	var myUrl = "";
	myUrl = this.getBaseURL() + url;
	return $.ajax({
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1MjIyNDU2OTQsInN1YiI6IntcInJvbGVpZFwiOlwiLCwsLCxcIixcInVzZXJpZFwiOjMxLFwicGxhdGZvcm1cIjpcIjEsMiw1LDlcIixcInVzZXJuYW1lXCI6XCJCVk4wMDFcIn0iLCJleHAiOjE1MjMxMDk2OTR9.ChE_a5sJxmRGHo6rcEJl181kyS0tV9u9Y9051mbi_M0',
				'Accept-Language': 'en-US',
				'Content-Type': 'application/json; charset=UTF-8'
			},
			method: method,
			url: myUrl,
			data: data,
			async: false,
			crossDomain: true,
			dataType: 'json'
		})
		.success(function(data, status, headers, config) {
			successCallBack(data);
		})
		.error(function(data, status, headers, config) {
			if(!data) {
				var language;
				try {
					language = (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 5);
				} catch(e) {
					language = "en-GB";
				}

				if(language === 'zh-CN')
					data = '连接失败,请稍后重试';
				else if(language === 'en-GB')
					data = 'The connection fails, please try again later';
			}
			errorCallBack(data);
		})
}