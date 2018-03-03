const state = {
	info:{
		title:'vuex'
	},
	fullLoading:false,
	tableLoading:{
	  orderManage:false,
	  countAll:false,
	  departCount:false,
    departCountNotItem:false,
	  personalCount:false,
	  personalCountNotItem:false,
	  operateList:false,
    userManage:false,
    menuList:false,
    jobTypeList:false,
  },
	errorMessage:'',
	isLoginOut:'0',
	tabsInfo:[{title: '欢迎使用',navIndex: '100',viewsUrl: '/home/mainPage',content: ''}],
	tabsValue:"100"
}
export default state
