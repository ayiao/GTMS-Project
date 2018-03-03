<template>
	<!--外层容器-->
	<el-container style="height:100vh;">
		<!--顶栏容器-->
		<el-header>
			<el-dropdown>
				<i class="el-icon-setting" style="margin-right: 15px;color: #FFFFFF"></i>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>编辑</el-dropdown-item>
					<el-dropdown-item>注销</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<span>甄姬</span>
		</el-header>
		<el-container>
			<!--侧边栏容器-->
			<el-aside width="150px" style="background-color: #293c55" class="scrollbar">
				<navMenu></navMenu>
			</el-aside>
			<el-main style="background-color: #f9f9f9;">
				<!--主要区域容器-->
				<el-tabs v-model="tabsVal" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
					<el-tab-pane v-for="(item, index) in tabsInfo" :key="item.navIndex" :label="item.title" :name="item.navIndex"></el-tab-pane>
				</el-tabs>
				<div class="bgWhite">
					<keep-alive>
						<router-view></router-view>
					</keep-alive>
				</div>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	import navMenu from '../components/navMenu.vue'
	export default {
		components: {
			navMenu,
		},
		data() {
			return {
				tabsVal: "100"
			}
		},
		computed: {
			tabsInfo() {
				return this.$store.state.tabsInfo;
			},
			tabsValue1() {
				return this.$store.state.tabsValue;
			}
		},

		watch: {
			tabsValue1(curVal, oldVal) {
				this.tabsVal = curVal;
			}
		},
		mounted() {

		},
		methods: {
			removeTab(targetName) {
				if(this.tabsInfo.length > 1) {
					this.$store.commit('delTabs', targetName);
				}
			},
			clickTab(target) {
				this.$store.commit('changeTabsValue', target.name);
			}
		}
	}
</script>

<style>
	body,
	html {
		height: 100vh;
		margin: 0;
		padding: 0;
	}
	
	.el-header {
		background-color: #293c55;
		color: #fff;
		line-height: 50px;
		height: 50px !important;
		text-align: right;
		font-size: 16px
	}
	
	.el-aside {
		color: #333;
		overflow-x: hidden;
	}
	
	.el-main {
		padding: 10px;
	}
	
	.bgWhite {
		/*background-color: #ffffff;*/
		overflow-y: hidden;
		height: 90%;
	}
	
	.el-tabs__header {
		margin: 0px;
	}
</style>