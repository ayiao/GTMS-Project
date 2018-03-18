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


Vue.prototype.getBaseURL=function(){
	return 'http://192.168.16.103:8080';
}

Vue.prototype.GLOBAL_Http = function($http, url, method, data, successCallBack, errorCallBack) {
	var myUrl = "";
	myUrl = this.getBaseURL() + url;
	return $.ajax({
			headers:{
				'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1MjEzMzc0OTYsInN1YiI6IntcInJvbGVpZFwiOlwiLFwiLFwidXNlcmlkXCI6MzEsXCJwbGF0Zm9ybVwiOlwiMSwyLDMsNVwiLFwidXNlcm5hbWVcIjpcIkJWTjAwMVwifSIsImV4cCI6MTUyMjIwMTQ5Nn0.-6husDsi6dRRwxINkS_GUwgp54HcvMN_IXENbLdBcew',
				'Accept-Language':'en-US',
				'Content-Type':'application/json; charset=UTF-8'
			},
			method: method,
			url: myUrl,
			data: data,
			async: false,
			crossDomain:true,
			dataType:'json'
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