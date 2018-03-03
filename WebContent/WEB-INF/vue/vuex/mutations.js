const mutations = {
	showLoading(state) {
		state.fullLoading = true;
	},
	hideLoading(state) {
		// setTimeout(() => {state.fullLoading = false;},500);
		state.fullLoading = false;
	},
	showTableLoading(state, page) {
		state.tableLoading[page] = true;
	},
	hideTableLoading(state, page) {
		state.tableLoading[page] = false;
	},
	setErrorMsg(state, code) {
		state.errorMessage = code;
	},
	addTabs(state, obj) {
		let check = true;
		for(let i = 0; i < state.tabsInfo.length; i++) {
			if(obj.navIndex == state.tabsInfo[i].navIndex) {
				check = false;
				break;
			}
		}
		if(check) {
			state.tabsInfo.push(obj);
		}
		state.tabsValue = obj.navIndex;

		let tabsObj = {
			info: state.tabsInfo
		};
		sessionStorage.tabsInfo = JSON.stringify(tabsObj);
		sessionStorage.tabsValue = state.tabsValue;
		if(obj.fromMain != '' && obj.fromMain != null && obj.fromMain != undefined) {
			sessionStorage.fromMain = obj.fromMain;
		}
	},
	delTabs(state, code) {
		let index = '';
		for(let i = 0; i < state.tabsInfo.length; i++) {
			if(code == state.tabsInfo[i].navIndex) {
				index = i;
			}
		}
		if(code == state.tabsValue) {
			if(index + 1 == state.tabsInfo.length) {
				state.tabsValue = state.tabsInfo[index - 1].navIndex;
			} else {
				state.tabsValue = state.tabsInfo[index + 1].navIndex;
			}
		}
		state.tabsInfo.splice(index, 1);

		let tabsObj = {
			info: state.tabsInfo
		};
		sessionStorage.tabsInfo = JSON.stringify(tabsObj);
		sessionStorage.tabsValue = state.tabsValue;
	},
	changeTabsValue(state, code) {
		sessionStorage.tabsValue = code;
		state.tabsValue = code;
	},
	cleanSessionTabs(state) {
		state.tabsInfo = [{
			title: '欢迎使用',
			navIndex: '100',
			viewsUrl: '/home/mainPage',
			content: ''
		}];
		state.tabsValue = "100";
		sessionStorage.tabsInfo = '';
		sessionStorage.tabsValue = '';
	},
	getSessionTabs(state) {
		if(sessionStorage.tabsInfo != undefined && sessionStorage.tabsInfo != '') {
			let infoObj = JSON.parse(sessionStorage.tabsInfo);
			state.tabsInfo = infoObj.info;
			state.tabsValue = sessionStorage.tabsValue;
		}
	}
}
export default mutations