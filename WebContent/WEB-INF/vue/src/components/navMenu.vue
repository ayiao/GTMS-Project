<template>
	<el-menu default-active="activeIndex" class="el-menu-vertical-demo" background-color="#293c55" text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item-group>
			<el-menu-item index="100" @click="homeClick"><i class="el-icon-star-off"></i>首页</el-menu-item>
			<div v-for="(data,dataindex) in menus" v-if="!data.menus">
				<el-menu-item :index="dataindex.toString()" @click="noChildClick(dataindex,data.menuname,data.url)"><i :class="data.icon"></i>{{data.menuname}}</el-menu-item>
			</div>
			<div v-else>
				<el-submenu :index="dataindex.toString()" :key="data.menuid">
					<template slot="title"><i :class="data.icon"></i>{{data.menuname}}</template>
					<el-menu-item :index="dataindex + '-' + childindex" v-for="(children,childindex) in data.menus" :key="children.menuid" @click="manageClick(dataindex,childindex,children.menuname,children.url)">{{children.menuname}}</el-menu-item>
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
			noChildClick(dataindex, menuname, url) {
				this.activeIndex = dataindex;
				let obj = {
					title: menuname,
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
				axios.get(this.getBaseURL()+ '/static/nav.json').then((res) => {
					/*将data.menu数据赋值给result*/
					var result = res.data.menu
					this.menus = result;
					console.log(result)
				});
				axios.get( this.getBaseURL()+ '/static/tabInfo.json').then((res) => {
					/*将data.tabsInfo数据赋值给result*/
					var result = res.data.tabsInfo
					this.tabsInfo = result;
					console.log(result)
				});
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