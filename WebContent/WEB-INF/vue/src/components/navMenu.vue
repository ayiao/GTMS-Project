<template>
	<el-menu default-active="activeIndex" class="el-menu-vertical-demo" background-color="#293c55" text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item-group>
			<el-menu-item index="100" @click="homeClick"><i class="el-icon-star-off"></i>首页</el-menu-item>
			<div v-for="(data,dataindex) in menus" v-if="data.menus.length==0">
				<el-menu-item :index="dataindex.toString()" @click="noChildClick(dataindex,data.menuName,data.menuUrl)"><i :class="data.icon"></i>{{data.menuName}}</el-menu-item>
			</div>
			<div v-else>
				<el-submenu :index="dataindex.toString()" :key="data.menuid">
					<template slot="title"><i :class="data.icon"></i>{{data.menuName}}</template>
					<el-menu-item :index="dataindex + '-' + childindex" v-for="(children,childindex) in data.menus" :key="children.menuid" @click="manageClick(dataindex,childindex,children.menuName,children.menuUrl)">{{children.menuName}}</el-menu-item>
				</el-submenu>
			</div>

		</el-menu-item-group>
	</el-menu>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'nav',
		data() {
			return {
				menus: [],
				tabsInfo: [],
				activeIndex: "100"
			}
		},
		computed: {
			tabsValue() {
				return this.$store.state.tabsValue;
			}
		},
		watch: {
			tabsValue(curVal, oldVal) {
				this.activeIndex = curVal;
				const tabsList = this.$store.state.tabsInfo;
				let curUrl = '',
					pageName = '';
				for(let i = 0; i < tabsList.length; i++) {
					if(curVal == tabsList[i].navIndex) {
						curUrl = tabsList[i].viewsUrl;
						pageName = tabsList[i].title;
						break;
					}
				}
				switch(pageName) {
					case '欢迎使用':
						this.$router.push({
							path: '/home/mainPage'
						});
						break;
					case '开题报告':
						this.$router.push({
							path: '/home/openingReport'
						});
						break;
					case '毕业论文':
						this.$router.push({
							path: '/home/graduation'
						});
						break;
					case '公告管理':
						this.$router.push({
							path: '/home/announcement'
						});
						break;
					case '编辑发布':
						this.$router.push({
							path: '/home/subject'
						});
						break;
					case '查看选题':
						this.$router.push({
							path: '/home/selectedTopic'
						});
						break;
					case '毕设管理':
						this.$router.push({
							path: '/home/graduationManagement'
						});
						break;

				}
				//            this.$router.push({path:curUrl});
			}
		},
		/*实时计算里关联了对象，那么当对象的某个值改变的时候，同时会出发实时计算*/
		methods: {
			manageClick(parent, child, name, url) {
				this.activeIndex = parent + '-' + child;
				let obj = {
					title: name,
					navIndex: this.activeIndex,
					viewsUrl: url,
					content: ''
				};
				this.$store.commit('addTabs', obj);
			},
			noChildClick(dataindex, menuName, url) {
				debugger;
				this.activeIndex = dataindex;
				let obj = {
					title: menuName,
					navIndex: this.activeIndex,
					viewsUrl: url,
					content: ''
				};
				this.$store.commit('addTabs', obj);
			},
			homeClick() {
				this.activeIndex = '100';
				let obj = {
					title: '欢迎使用',
					navIndex: '100',
					viewsUrl: '/home/mainPage',
					content: '',
				};
				this.$store.commit('addTabs', obj);
			},
			menuList() {
				
				JSON.stringify(this.$route.params)	;
				debugger;
				this.menus=[];
				this.tabsInfo=[];
				
				var menuList=this.$route.params.output.roleMenuExts;
				for(var i=0;i<menuList.length;i++){
					var menuData=menuList[i];
					var menu={
						icon:menuData.menuIcon,
						menuid:menuData.roleMenuId,
						menuName:menuData.menuName,
						menuUrl:menuData.menuUrl
					}
					var tabsInfoData={
						title:menuData.menuName,
						navIndex:menuData.roleMenuId,
						viewsUrl:menuData.menuUrl
					}
					var subMenuList=menuData.subRoleMenus;
					var subMenus=[];
					var subTabsInfos=[];
					if(subMenuList){
						for(var j=0;j<subMenuList.length;j++){
							var subMenuData=subMenuList[j];
							var subMenu={
								icon:subMenuData.menuIcon,
								menuid:subMenuData.roleMenuId,
								menuName:subMenuData.menuName,
								menuUrl:subMenuData.menuUrl
							}
							var subTabsInfo={
								title:subMenuData.menuName,
								navIndex:subMenuData.roleMenuId,
								viewsUrl:subMenuData.menuUrl
							}
							subMenus.push(subMenu);
							subTabsInfos.push(subTabsInfo);
						}
					}
					menu['menus']=subMenus;
					this.menus.push(menu);
					tabsInfoData['item']=subTabsInfos;
					this.tabsInfo.push(tabsInfoData);
				}
			},

		},
		mounted() {
			this.menuList()
		},
	}
</script>

<style>
	.el-menu-vertical-demo {
		width: 150px;
		border: none;
	}
</style>